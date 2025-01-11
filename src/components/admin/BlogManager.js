import { useState } from 'react'
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/outline'

function BlogManager() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Top 10 Torti za Venčanja',
      author: 'Admin',
      category: 'Saveti',
      status: 'published',
      publishDate: '2024-03-15',
      views: 245
    }
  ])

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-serif">Upravljanje Blogom</h1>
        <button className="bg-rosegold text-white px-4 py-2 rounded-md flex items-center">
          <PlusIcon className="h-5 w-5 mr-2" />
          Nova Objava
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="p-4">Naslov</th>
              <th className="p-4">Autor</th>
              <th className="p-4">Kategorija</th>
              <th className="p-4">Status</th>
              <th className="p-4">Datum</th>
              <th className="p-4">Pregledi</th>
              <th className="p-4">Akcije</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b">
                <td className="p-4">{post.title}</td>
                <td className="p-4">{post.author}</td>
                <td className="p-4">{post.category}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    post.status === 'published' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {post.status === 'published' ? 'Objavljeno' : 'Nacrt'}
                  </span>
                </td>
                <td className="p-4">{post.publishDate}</td>
                <td className="p-4">{post.views}</td>
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

export default BlogManager
