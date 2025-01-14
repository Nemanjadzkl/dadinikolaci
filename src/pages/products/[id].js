import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import Layout from '@/components/layout/Layout'
import productsData from '@/data/products.json'

export default function ProductDetails({ product }) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Image
                src={product.images[0]}
                alt={product.name}
                width={600}
                height={600}
                className="rounded-xl"
              />
            </motion.div>
          </div>

          <div>
            <h1 className="text-4xl font-serif mb-4">{product.name}</h1>
            <p className="text-2xl text-rosegold mb-6">{product.price} RSD</p>
            <p className="text-gray-600 mb-8">{product.description}</p>

            <div className="flex items-center gap-4 mb-8">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="bg-gray-100 p-2 rounded-full"
              >
                -
              </button>
              <span className="text-xl">{quantity}</span>
              <button 
                onClick={() => setQuantity(q => q + 1)}
                className="bg-gray-100 p-2 rounded-full"
              >
                +
              </button>
            </div>

            <button
              onClick={() => addToCart(product, quantity)}
              className="w-full bg-rosegold text-white py-4 rounded-xl hover:scale-105 transition-transform"
            >
              Dodaj u korpu
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  const product = productsData.products.find(p => p.id === params.id)

  if (!product) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      product
    }
  }
}
