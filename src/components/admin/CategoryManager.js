import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import Image from 'next/image'

export default function CategoryManager() {
  const [categories, setCategories] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      toast.error('Error loading categories')
    }
  }

  const handleImageUpload = async (categoryId, file) => {
    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('categoryId', categoryId)

    try {
      const response = await fetch('/api/categories/image', {
        method: 'POST',
        body: formData
      })
      const data = await response.json()
      
      if (data.success) {
        await fetchCategories() // Refresh categories after successful upload
        toast.success('Image uploaded successfully!')
      }
    } catch (error) {
      toast.error('Error uploading image')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-serif mb-6">Category Management</h2>
      <div className="grid gap-6">
        {Object.values(categories).map((category) => (
          <div key={category.id} className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl mb-4">{category.name}</h3>
            <div className="flex items-center gap-4">
              {category.imageUrl && (
                <div className="relative w-24 h-24">
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(category.id, e.target.files[0])}
                disabled={loading}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-rosegold file:text-white
                  hover:file:bg-rosegold/90
                  disabled:opacity-50"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
