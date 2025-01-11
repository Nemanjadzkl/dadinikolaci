import Image from 'next/image'
import { ShoppingCartIcon } from '@heroicons/react/outline'
import { useCart } from '@/context/CartContext'

function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-64">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-serif text-xl mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.price} RSD</p>
        <button 
          onClick={() => addToCart(product)}
          className="w-full bg-rosegold text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCartIcon className="h-5 w-5" />
          Dodaj u korpu
        </button>
      </div>
    </div>
  )
}

export default ProductCard
