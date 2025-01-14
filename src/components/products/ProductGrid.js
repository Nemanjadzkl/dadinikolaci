import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProductGrid({ category, sortBy }) {
  const [filteredProducts, setFilteredProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/products')
        const data = await response.json()
        let result = data.products || []

 
        // Debug log
        console.log('All products:', result)
        console.log('Current category:', category)

        if (category !== 'all') {
          result = result.filter(product => {
            const productCategory = product.category?.toLowerCase()
            const selectedCategory = category.toLowerCase()
            console.log(`Comparing: ${productCategory} with ${selectedCategory}`)
            return productCategory === selectedCategory
          })
        }

        // Debug log
        console.log('Filtered products:', result)

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
      } catch (error) {
        console.error('Error fetching products:', error)
        setFilteredProducts([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [category, sortBy])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="animate-pulse">
            <div className="bg-gray-200 h-72 rounded-xl mb-4" />
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  if (filteredProducts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <h3 className="text-2xl font-serif mb-4">Nema proizvoda u ovoj kategoriji</h3>
        <p className="text-gray-600">Molimo izaberite drugu kategoriju ili proverite kasnije.</p>
      </motion.div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  )
}
