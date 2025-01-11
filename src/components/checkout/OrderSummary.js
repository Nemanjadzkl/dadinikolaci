import Image from 'next/image'
import { useCart } from '@/context/CartContext'

function OrderSummary() {
  const { items } = useCart()

  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0)
  const shipping = items.length > 0 ? 300 : 0
  const total = subtotal + shipping

  return (
    <div className="bg-cream p-6 rounded-lg">
      <h2 className="font-serif text-2xl mb-4">Vaša Porudžbina</h2>

      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center">
            <div className="relative h-16 w-16 flex-shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-gray-600">
                Količina: {item.quantity} x {item.price} RSD
              </p>
            </div>
            <div className="text-right">
              {item.quantity * item.price} RSD
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 space-y-2">
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

      <div className="mt-6 text-sm text-gray-600">
        <p>Prihvatamo sledeće načine plaćanja:</p>
        <div className="flex gap-2 mt-2">
          <span>💳 Kartica</span>
          <span>💰 Gotovina</span>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
