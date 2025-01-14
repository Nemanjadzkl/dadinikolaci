import { useState } from 'react'
import CategoryManager from './CategoryManager'
import BannersManager from './BannersManager'
import ProductsList from './ProductsList'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products')

  const tabs = [
    { id: 'products', name: 'Proizvodi' },
    { id: 'categories', name: 'Kategorije' },
    { id: 'banners', name: 'Baneri' }
  ]

  return (
    <div className="p-6">
      <div className="mb-8">
        <nav className="flex space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md ${
                activeTab === tab.id
                  ? 'bg-rosegold text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="bg-white rounded-lg shadow">
        {activeTab === 'products' && <ProductsList />}
        {activeTab === 'categories' && <CategoryManager />}
        {activeTab === 'banners' && <BannersManager />}
      </div>
    </div>
  )
}
