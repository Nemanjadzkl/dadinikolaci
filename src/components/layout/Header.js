import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { motion } from 'framer-motion'
import CartSidebar from '../cart/CartSidebar'

export default function Header() {
  const { cart } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl">
            Dadini Kolači
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-rosegold transition-colors">
              Početna
            </Link>
            <Link href="/products" className="hover:text-rosegold transition-colors">
              Proizvodi
            </Link>
            <Link href="/about" className="hover:text-rosegold transition-colors">
              O nama
            </Link>
            <Link href="/contact" className="hover:text-rosegold transition-colors">
              Kontakt
            </Link>
          </nav>

          <button
            className="relative"
            onClick={() => setIsCartOpen(true)}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
              />
            </svg>
            {mounted && totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-rosegold text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </header>
  )
}
