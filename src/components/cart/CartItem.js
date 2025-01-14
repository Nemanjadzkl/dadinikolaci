import Image from 'next/image'
import { useCart } from '@/context/CartContext'

function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCart()

  return (
    <div className="flex items-center py-6 border-b">
      <div className="relative h-24 w-24 flex-shrink-0">
        <Image
          src={item.images[0]}
          alt={item.name}
          fill
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex-1 ml-4">
        <h3 className="font-serif text-lg">{item.name}</h3>
        <p className="text-gray-600">{item.price} RSD</p>
        <div className="flex items-center mt-2">
          <button
            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
            className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full"
          >
            -
          </button>
          <span className="mx-3">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full"
          >
            +
          </button>
        </div>
      </div>
      <div className="flex-shrink-0 ml-4">
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-gray-400 hover:text-red-500 transition-colors p-2"
        >
          ×
        </button>
      </div>
    </div>
  )
}

export default CartItem
