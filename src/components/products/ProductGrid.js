import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import { motion } from 'framer-motion'

const products = [
  {
    id: 1,
    name: 'Čokoladna Torta',
    price: 2500,
    category: 'torte',
    image: '/images/chocolate-cake.jpg',
    description: 'Bogata čokoladna torta sa ganache prelivom'
  },
  // Add more products...
]

export default function ProductGrid({ category, sortBy }) {
  const [filteredProducts, setFilteredProducts] = useState(products)

  useEffect(() => {
    let result = [...products]
    
    // Apply category filter
    if (category !== 'all') {
      result = result.filter(product => product.category === category)
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name))
        break
      default:
        // 'featured' sorting - keep original order
        break
    }

    setFilteredProducts(result)
  }, [category, sortBy])

  return (
    <motion.div 
      layout
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {filteredProducts.map((product) => (
        <motion.div
          key={product.id}
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  )
}
