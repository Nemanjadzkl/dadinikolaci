import Layout from '@/components/layout/Layout'
import { useCart } from '@/context/CartContext'
import CartItem from '@/components/cart/CartItem'
import CartSummary from '@/components/cart/CartSummary'
import Link from 'next/link'

function CartPage() {
  const { items = [] } = useCart() // Initialize with empty array as default

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-serif mb-8">Korpa</h1>
        
        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            <div>
              <CartSummary />
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl mb-4">Vaša korpa je prazna</h2>
            <Link 
              href="/products"
              className="inline-block bg-rosegold text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors"
            >
              Pogledajte našu ponudu
            </Link>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default CartPage

// Add this to prevent static pre-rendering issues
export const dynamic = 'force-dynamic'
