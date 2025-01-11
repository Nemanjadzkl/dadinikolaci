import { useState } from 'react'
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/outline'

function BannersManager() {
  const [banners, setBanners] = useState([
    {
      id: 1,
      title: 'Prolećna Akcija',
      position: 'Hero',
      status: 'active',
      startDate: '2024-03-01',
      endDate: '2024-03-31'
    }
  ])

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-serif">Upravljanje Banerima</h1>
        <button className="bg-rosegold text-white px-4 py-2 rounded-md flex items-center">
          <PlusIcon className="h-5 w-5 mr-2" />
          Novi Baner
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="p-4">Slika</th>
              <th className="p-4">Naslov</th>
              <th className="p-4">Pozicija</th>
              <th className="p-4">Status</th>
              <th className="p-4">Period</th>
              <th className="p-4">Akcije</th>
            </tr>
          </thead>
          <tbody>
            {banners.map((banner) => (
              <tr key={banner.id} className="border-b">
                <td className="p-4">
                  <div className="h-16 w-32 bg-gray-200 rounded"></div>
                </td>
                <td className="p-4">{banner.title}</td>
                <td className="p-4">{banner.position}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    banner.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {banner.status === 'active' ? 'Aktivno' : 'Neaktivno'}
                  </span>
                </td>
                <td className="p-4">
                  <div className="text-sm">
                    <div>Od: {banner.startDate}</div>
                    <div>Do: {banner.endDate}</div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <EyeIcon className="h-5 w-5" />
                    </button>
                    <button className="text-green-600 hover:text-green-800">
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BannersManager
