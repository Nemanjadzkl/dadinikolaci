import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import dynamic from 'next/dynamic'
import Image from 'next/image'

const Editor = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

export default function BlogManager() {
  const [posts, setPosts] = useState([])
  const [newPost, setNewPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    image: null,
    isPublished: false
  })

  const categories = [
    "Recepti",
    "Saveti",
    "Novosti",
    "Eventi",
    "Intervjui"
  ]

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    const response = await fetch('/api/blog')
    const data = await response.json()
    setPosts(data.posts)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    
    Object.keys(newPost).forEach(key => {
      formData.append(key, newPost[key])
    })

    const response = await fetch('/api/blog', {
      method: 'POST',
      body: formData
    })

    if (response.ok) {
      toast.success('Blog post je uspešno dodat!')
      fetchPosts()
      setNewPost({
        title: '',
        excerpt: '',
        content: '',
        category: '',
        image: null,
        isPublished: false
      })
    }
  }

  const togglePostStatus = async (postId, currentStatus) => {
    const response = await fetch(`/api/blog/${postId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ isPublished: !currentStatus })
    })

    if (response.ok) {
      fetchPosts()
      toast.success('Status blog posta je ažuriran')
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Upravljanje blogom</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Dodaj novi post</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Naslov</label>
              <input
                type="text"
                value={newPost.title}
                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Kratak opis</label>
              <textarea
                value={newPost.excerpt}
                onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                rows={2}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Kategorija</label>
              <select
                value={newPost.category}
                onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              >
                <option value="">Izaberi kategoriju</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Sadržaj</label>
              <Editor
                value={newPost.content}
                onChange={(content) => setNewPost({...newPost, content})}
                className="mt-1 block w-full"
                theme="snow"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Naslovna slika</label>
              <input
                type="file"
                onChange={(e) => setNewPost({...newPost, image: e.target.files[0]})}
                className="mt-1 block w-full"
                accept="image/*"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={newPost.isPublished}
                onChange={(e) => setNewPost({...newPost, isPublished: e.target.checked})}
                className="h-4 w-4 text-rosegold border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Objavi odmah
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-rosegold text-white px-4 py-2 rounded-md hover:bg-rosegold-dark"
            >
              Dodaj blog post
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Objavljeni postovi</h2>
          <div className="space-y-4">
            {posts.map(post => (
              <div key={post.id} className="border rounded-lg p-4">
                <div className="relative h-40 mb-4">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-sm text-gray-600">{post.excerpt}</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    post.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {post.isPublished ? 'Objavljeno' : 'Nacrt'}
                  </span>
                  <button
                    onClick={() => togglePostStatus(post.id, post.isPublished)}
                    className="text-sm text-rosegold hover:underline"
                  >
                    {post.isPublished ? 'Sakrij' : 'Objavi'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
