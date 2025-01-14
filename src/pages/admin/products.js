import { useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import ProductForm from '@/components/admin/ProductForm'
import ProductsList from '@/components/admin/ProductsList'

export default function ProductsPage() {
  const [showAddForm, setShowAddForm] = useState(false)

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Upravljanje proizvodima</h1>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-rosegold text-white px-4 py-2 rounded-md hover:bg-rosegold-dark"
          >
            {showAddForm ? 'Zatvori formu' : 'Dodaj novi proizvod'}
          </button>
        </div>

        {showAddForm && (
          <div className="mb-8">
            <ProductForm onSuccess={() => setShowAddForm(false)} />
          </div>
        )}

        <ProductsList />
      </div>
    </AdminLayout>
  )
}
