import { useState, useEffect } from 'react'
import Image from 'next/image'
import EditProductForm from './EditProductForm'
import { toast } from 'react-hot-toast'



export default function ProductsList() {
  const [products, setProducts] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data.products || []) // Access the products array from data
    } catch (error) {
      console.log('Error fetching products:', error)
      setProducts([]) // Set empty array if error occurs
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
  }

  const handleUpdate = () => {
    fetchProducts()
    setEditingProduct(null)
  }
  const handleDelete = async (productId) => {
    if (window.confirm('Da li ste sigurni da želite da obrišete ovaj proizvod?')) {
      const response = await fetch(`/api/products?id=${productId}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        fetchProducts() // Refresh the list
        toast.success('Proizvod je uspešno obrisan!')
      }
    }
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Lista proizvoda</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4">
            {product.images[0] && (
              <div className="relative h-48 mb-4">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            )}
            <h3 className="font-bold">{product.name}</h3>
            <p className="text-gray-600">{product.category}</p>
            <p className="text-rosegold font-bold">{product.price} RSD</p>
            <div className="mt-4 flex justify-end space-x-2">
  <button
    onClick={() => handleDelete(product.id)}
    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
  >
    Obriši
  </button>
  <button
    onClick={() => handleEdit(product)}
    className="bg-rosegold text-white px-3 py-1 rounded-md hover:bg-rosegold-dark"
  >
    Izmeni
  </button>
</div>
          </div>
        ))}
      </div>

      {editingProduct && (
        <EditProductForm
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  )
}
