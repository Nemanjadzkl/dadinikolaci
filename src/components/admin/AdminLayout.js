import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const navigation = [
  { name: 'Dashboard', href: '/admin' },
  { name: 'Proizvodi', href: '/admin/products' },
  { name: 'Baneri', href: '/admin/banners' },
  { name: 'Akcije', href: '/admin/promotions' },
  { name: 'Blog', href: '/admin/blog' },
  { name: 'Analitika', href: '/admin/analytics' },
]

function AdminLayout({ children, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden">
        <button
          className="fixed z-20 top-4 left-4 p-2 bg-white rounded-md"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? 'X' : '≡'}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-10 w-64 bg-white transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition-transform duration-200 ease-in-out`}>
        <div className="h-16 flex items-center justify-center border-b">
          <h1 className="text-xl font-serif">Admin Panel</h1>
        </div>
        <nav className="mt-6">
          {navigation.map((item) => {
            const isActive = router.pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-6 py-3 text-sm ${
                  isActive
                    ? 'bg-rosegold text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            )
          })}
          
          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="w-full flex items-center px-6 py-3 text-sm text-red-600 hover:bg-red-50"
          >
            Odjavi se
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
