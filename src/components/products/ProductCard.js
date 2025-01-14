import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function ProductCard({ product }) {
  const imageUrl = product.images && product.images.length > 0 
    ? product.images[0] 
    : '/images/placeholder.jpg'

  return (
    <Link href={`/products/${product.id}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ 
          y: -10,
          scale: 1.02,
          transition: { type: "spring", stiffness: 300 }
        }}
        className="bg-white rounded-xl shadow-lg overflow-hidden transform group"
      >
        <div className="relative h-72 overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="h-full w-full"
          >
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
          </motion.div>
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {product.isSpecialOffer && (
            <motion.div 
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              className="absolute top-4 right-4 bg-rosegold text-white px-4 py-2 rounded-full text-sm shadow-lg"
            >
              Posebna Ponuda
            </motion.div>
          )}
        </div>

        <div className="p-6 relative">
          <motion.h3 
            className="font-serif text-xl mb-2 group-hover:text-rosegold transition-colors"
            whileHover={{ x: 5 }}
          >
            {product.name}
          </motion.h3>
          
          <motion.p 
            className="text-gray-600 mb-4 line-clamp-2"
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1 }}
          >
            {product.description}
          </motion.p>

          <div className="flex justify-between items-center">
            <motion.p 
              className="text-rosegold font-semibold text-lg"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {product.price} RSD
            </motion.p>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="bg-rosegold text-white px-6 py-2 rounded-full text-sm shadow-md hover:shadow-lg transform"
            >
              Detaljnije
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
