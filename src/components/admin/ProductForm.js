import { useState } from 'react'
import { toast } from 'react-hot-toast'
import ImageUpload from './ImageUpload'

export default function ProductForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    ingredients: '',
    preparation: '',
    servingSize: '',
    price: '',
    category: '',
    allergens: '',
    storageInfo: '',
    isSpecialOffer: false,
    images: []
  })

  const categories = [
    "Torte",
    "Kolači",
    "Sitni kolači",
    "Svadbene torte",
    "Rođendanske torte",
    "Praznične poslastice"
  ]


  const handleImagesSelected = (files) => {
    setFormData(prev => ({
      ...prev,
      images: files
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formDataToSend = new FormData()

    // Append all text fields
    Object.keys(formData).forEach(key => {
      if (key !== 'images') {
        formDataToSend.append(key, formData[key])
      }
    })

    // Append images
    formData.images.forEach((image, index) => {
      formDataToSend.append(`images`, image)
    })

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        body: formDataToSend
      })

      if (response.ok) {
        toast.success('Proizvod je uspešno dodat!')
        setFormData({
          name: '',
          description: '',
          ingredients: '',
          preparation: '',
          servingSize: '',
          price: '',
          category: '',
          allergens: '',
          storageInfo: '',
          isSpecialOffer: false,
          images: []
        })
      }
    } catch (error) {
      toast.error('Greška pri dodavanju proizvoda')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Naziv proizvoda</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Kategorija</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          >
            <option value="">Izaberi kategoriju</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Cena (RSD)</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Porcije</label>
          <input
            type="text"
            value={formData.servingSize}
            onChange={(e) => setFormData({...formData, servingSize: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="npr. 8-10 porcija"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Kratak opis</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          rows={2}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Sastojci</label>
        <textarea
          value={formData.ingredients}
          onChange={(e) => setFormData({...formData, ingredients: e.target.value})}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          placeholder="Unesite sastojke, jedan po liniji"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Način čuvanja</label>
        <textarea
          value={formData.storageInfo}
          onChange={(e) => setFormData({...formData, storageInfo: e.target.value})}
          rows={2}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          placeholder="Npr. Čuvati na temperaturi do 4°C"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Alergeni</label>
        <input
          type="text"
          value={formData.allergens}
          onChange={(e) => setFormData({...formData, allergens: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          placeholder="npr. mleko, jaja, orašasti plodovi"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          checked={formData.isSpecialOffer}
          onChange={(e) => setFormData({...formData, isSpecialOffer: e.target.checked})}
          className="h-4 w-4 text-rosegold border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-700">
          Posebna ponuda
        </label>
      </div>

      <ImageUpload onImagesSelected={handleImagesSelected} />

      <button
        type="submit"
        className="w-full bg-rosegold text-white px-4 py-2 rounded-md hover:bg-rosegold-dark transition-colors"
      >
        Dodaj proizvod
      </button>
    </form>
  )
}
