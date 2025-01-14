import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/router'

export default function CartSidebar({ isOpen, onClose }) {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const router = useRouter()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckout = () => {
    onClose()
    router.push('/checkout')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 p-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif">Vaša Korpa</h2>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <p>Vaša korpa je prazna</p>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 border-b pb-4">
                      <div className="relative w-20 h-20">
                        <Image
                          src={item.images[0]}
                          alt={item.name}
                          fill
                          className="rounded-lg object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-rosegold">{item.price} RSD</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full"
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-8 border-t pt-4">
                  <div className="flex justify-between text-xl mb-4">
                    <span>Ukupno:</span>
                    <span>{total} RSD</span>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-rosegold text-white py-3 rounded-xl hover:opacity-90 transition-opacity"
                  >
                    Završi Kupovinu
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
