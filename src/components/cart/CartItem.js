import Image from 'next/image'
import { TrashIcon } from '@heroicons/react/outline'
import { useCart } from '@/context/CartContext'

function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCart()

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value)
    updateQuantity(item.id, newQuantity)
  }

  return (
    <div className="flex items-center py-6 border-b">
      <div className="relative h-24 w-24 flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex-1 ml-4">
        <h3 className="font-serif text-lg">{item.name}</h3>
        <p className="text-gray-600">{item.price} RSD</p>
        <div className="flex items-center mt-2">
          <select
            value={item.quantity}
            onChange={handleQuantityChange}
            className="border rounded-md px-2 py-1"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex-shrink-0 ml-4">
        <button
          onClick={() => removeFromCart(item)}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <TrashIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}

export default CartItem
