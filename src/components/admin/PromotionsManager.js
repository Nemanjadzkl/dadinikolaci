
import { useState } from 'react'
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/outline'

function PromotionsManager() {
  const [promotions, setPromotions] = useState([
    {
      id: 1,
      name: 'Praznična Akcija',
      discount: '20%',
      type: 'percentage',
      startDate: '2024-04-01',
      endDate: '2024-04-15',
      status: 'active',
      products: ['Čokoladna torta', 'Voćna torta']
    }
  ])

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-serif">Upravljanje Akcijama</h1>
        <button className="bg-rosegold text-white px-4 py-2 rounded-md flex items-center">
          <PlusIcon className="h-5 w-5 mr-2" />
          Nova Akcija
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="p-4">Naziv</th>
              <th className="p-4">Popust</th>
              <th className="p-4">Period</th>
              <th className="p-4">Status</th>
              <th className="p-4">Proizvodi</th>
              <th className="p-4">Akcije</th>
            </tr>
          </thead>
          <tbody>
            {promotions.map((promo) => (
              <tr key={promo.id} className="border-b">
                <td className="p-4">{promo.name}</td>
                <td className="p-4">{promo.discount}</td>
                <td className="p-4">
                  <div className="text-sm">
                    <div>Od: {promo.startDate}</div>
                    <div>Do: {promo.endDate}</div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    promo.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {promo.status === 'active' ? 'Aktivno' : 'Neaktivno'}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {promo.products.map((product, index) => (
                      <span 
                        key={index}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
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

export default PromotionsManager
