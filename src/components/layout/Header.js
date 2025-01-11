import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { MenuIcon, ShoppingBagIcon, XIcon } from '@heroicons/react/outline'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { items } = useCart()

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="font-serif text-2xl">
            Dadini Kolači
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/products" className="text-gray-600 hover:text-rosegold transition-colors">
              Proizvodi
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-rosegold transition-colors">
              O nama
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-rosegold transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-rosegold transition-colors">
              Kontakt
            </Link>
          </nav>

          {/* Cart Icon */}
          <Link href="/cart" className="relative">
            <ShoppingBagIcon className="h-6 w-6 text-gray-600" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-rosegold text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/products" 
                className="text-gray-600 hover:text-rosegold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Proizvodi
              </Link>
              <Link 
                href="/about" 
                className="text-gray-600 hover:text-rosegold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                O nama
              </Link>
              <Link 
                href="/blog" 
                className="text-gray-600 hover:text-rosegold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-600 hover:text-rosegold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Kontakt
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
