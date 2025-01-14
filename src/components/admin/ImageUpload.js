import { useState } from 'react'
import Image from 'next/image'

export default function ImageUpload({ onImagesSelected }) {
  const [previewUrls, setPreviewUrls] = useState([])

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    const urls = files.map(file => URL.createObjectURL(file))
    setPreviewUrls(urls)
    onImagesSelected(files)
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Dodaj slike proizvoda
      </label>
      
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-rosegold file:text-white
          hover:file:bg-rosegold-dark"
      />

      <div className="grid grid-cols-3 gap-4 mt-4">
        {previewUrls.map((url, index) => (
          <div key={index} className="relative h-40">
            <Image
              src={url}
              alt={`Preview ${index + 1}`}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
