import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import Image from 'next/image'

export default function BannersManager() {
  const [banners, setBanners] = useState([])
  const [newBanner, setNewBanner] = useState({
    title: '',
    description: '',
    link: '',
    startDate: '',
    endDate: '',
    isActive: true,
    image: null
  })

  useEffect(() => {
    fetchBanners()
  }, [])

  const fetchBanners = async () => {
    const response = await fetch('/api/banners')
    const data = await response.json()
    setBanners(data.banners)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    
    Object.keys(newBanner).forEach(key => {
      formData.append(key, newBanner[key])
    })

    const response = await fetch('/api/banners', {
      method: 'POST',
      body: formData
    })

    if (response.ok) {
      toast.success('Baner je uspešno dodat!')
      fetchBanners()
      setNewBanner({
        title: '',
        description: '',
        link: '',
        startDate: '',
        endDate: '',
        isActive: true,
        image: null
      })
    }
  }

  const toggleBannerStatus = async (bannerId, currentStatus) => {
    try {
      const response = await fetch(`/api/banners/${bannerId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isActive: !currentStatus
        })
      });
  
      if (response.ok) {
        toast.success(`Baner je uspešno ${!currentStatus ? 'aktiviran' : 'deaktiviran'}!`)
        fetchBanners()
      }
    } catch (error) {
      toast.error('Došlo je do greške pri promeni statusa')
    }
  }
  
  const deleteBanner = async (bannerId) => {
    const response = await fetch(`/api/banners/${bannerId}`, {
      method: 'DELETE'
    })
  
    if (response.ok) {
      toast.success('Baner je uspešno obrisan!')
      fetchBanners()
    }
  }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Upravljanje banerima</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Dodaj novi baner</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Naslov</label>
              <input
                type="text"
                value={newBanner.title}
                onChange={(e) => setNewBanner({...newBanner, title: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Opis</label>
              <textarea
                value={newBanner.description}
                onChange={(e) => setNewBanner({...newBanner, description: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Link</label>
              <input
                type="url"
                value={newBanner.link}
                onChange={(e) => setNewBanner({...newBanner, link: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Datum početka</label>
                <input
                  type="date"
                  value={newBanner.startDate}
                  onChange={(e) => setNewBanner({...newBanner, startDate: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Datum završetka</label>
                <input
                  type="date"
                  value={newBanner.endDate}
                  onChange={(e) => setNewBanner({...newBanner, endDate: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Slika banera</label>
              <input
                type="file"
                onChange={(e) => setNewBanner({...newBanner, image: e.target.files[0]})}
                className="mt-1 block w-full"
                accept="image/*"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-rosegold text-white px-4 py-2 rounded-md hover:bg-rosegold-dark"
            >
              Dodaj baner
            </button>
            
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Aktivni baneri</h2>
          <div className="space-y-4">
            {banners.map(banner => (
              <div key={banner.id} className="border rounded-lg p-4">
                <div className="relative h-40 mb-4">
                  <Image
                    src={banner.imageUrl}
                    alt={banner.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3 className="font-semibold">{banner.title}</h3>
                <p className="text-sm text-gray-600">{banner.description}</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    banner.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {banner.isActive ? 'Aktivan' : 'Neaktivan'}
                  </span>
                  <button
                    onClick={() => toggleBannerStatus(banner.id, banner.isActive)}
                    className="text-sm text-rosegold hover:underline"
                  >
                    {banner.isActive ? 'Deaktiviraj' : 'Aktiviraj'}
                  </button>
                  <button
  onClick={() => deleteBanner(banner.id)}
  className="text-red-600 hover:text-red-800 ml-2"
>
  Obriši
</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
