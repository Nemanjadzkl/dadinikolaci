import { useCart } from '@/context/CartContext'
import Link from 'next/link'

function CartSummary() {
  const { items } = useCart()

  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0)
  const shipping = items.length > 0 ? 300 : 0
  const total = subtotal + shipping

  return (
    <div className="bg-cream p-6 rounded-lg">
      <h2 className="font-serif text-2xl mb-4">Pregled Porudžbine</h2>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span>Međuzbir:</span>
          <span>{subtotal} RSD</span>
        </div>
        <div className="flex justify-between">
          <span>Dostava:</span>
          <span>{shipping} RSD</span>
        </div>
        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between font-semibold">
            <span>Ukupno:</span>
            <span>{total} RSD</span>
          </div>
        </div>
      </div>

      <Link href="/checkout">
        <button className="w-full bg-rosegold text-white py-3 rounded-md hover:bg-opacity-90 transition-colors">
          Nastavi ka plaćanju
        </button>
      </Link>
    </div>
  )
}

export default CartSummary
