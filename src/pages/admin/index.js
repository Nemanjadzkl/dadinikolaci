import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '@/components/admin/AdminLayout'
import AdminDashboard from '@/components/admin/Dashboard'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const authStatus = localStorage.getItem('adminAuth')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <LoginForm setIsAuthenticated={setIsAuthenticated} />
  }

  return (
    <AdminLayout onLogout={() => {
      setIsAuthenticated(false)
      localStorage.removeItem('adminAuth')
      router.push('/admin')
    }}>
      <AdminDashboard />
    </AdminLayout>
  )
}

function LoginForm({ setIsAuthenticated }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' })

  const handleLogin = (e) => {
    e.preventDefault()
    if (credentials.username === 'spalevic' && credentials.password === 'OgnjenZen24') {
      setIsAuthenticated(true)
      localStorage.setItem('adminAuth', 'true')
    } else {
      alert('Pogrešno korisničko ime ili lozinka!')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-serif text-center mb-6">Admin Panel</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Korisničko ime</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rosegold focus:ring-rosegold"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Lozinka</label>
            <input
              type="password"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rosegold focus:ring-rosegold"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-rosegold text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors"
          >
            Prijavi se
          </button>
        </form>
      </div>
    </div>
  )
}
