import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import ImageUpload from './ImageUpload'

export default function EditProductForm({ product, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    images: product.images
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        toast.success('Proizvod uspešno izmenjen!')
        onUpdate()
        onClose()
      }
    } catch (error) {
      toast.error('Greška pri izmeni proizvoda')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Izmena proizvoda</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Naziv</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium">Kategorija</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              <option value="Torte">Torte</option>
              <option value="Kolači">Kolači</option>
              <option value="Sitni kolači">Sitni kolači</option>
              <option value="Svadbene torte">Svadbene torte</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Cena</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Opis</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>

          <ImageUpload onImagesSelected={(files) => setFormData({...formData, images: files})} />

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded-md"
            >
              Otkaži
            </button>
            <button
              type="submit"
              className="bg-rosegold text-white px-4 py-2 rounded-md"
            >
              Sačuvaj izmene
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
