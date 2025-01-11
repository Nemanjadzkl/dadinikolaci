import { useState } from 'react'
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/outline'

function ProductsManager() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Čokoladna torta',
      price: 2500,
      category: 'Torte',
      status: 'active'
    },
    // Add more sample products
  ])

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-serif">Upravljanje Proizvodima</h1>
        <button className="bg-rosegold text-white px-4 py-2 rounded-md flex items-center">
          <PlusIcon className="h-5 w-5 mr-2" />
          Novi Proizvod
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="p-4">Slika</th>
              <th className="p-4">Naziv</th>
              <th className="p-4">Cena</th>
              <th className="p-4">Kategorija</th>
              <th className="p-4">Status</th>
              <th className="p-4">Akcije</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="p-4">
                  <div className="h-12 w-12 bg-gray-200 rounded"></div>
                </td>
                <td className="p-4">{product.name}</td>
                <td className="p-4">{product.price} RSD</td>
                <td className="p-4">{product.category}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    product.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {product.status === 'active' ? 'Aktivno' : 'Neaktivno'}
                  </span>
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

export default ProductsManager
