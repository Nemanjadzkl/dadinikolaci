import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import ProductGrid from '@/components/products/ProductGrid'
import ProductFilters from '@/components/products/ProductFilters'
import { motion } from 'framer-motion'

const categories = [
  { id: 'all', name: 'Sve' },
  { id: 'torte', name: 'Torte' },
  { id: 'kolaci', name: 'Kolači' },
  { id: 'sitni-kolaci', name: 'Sitni Kolači' },
  { id: 'svadbene-torte', name: 'Svadbene Torte' }
]

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-serif mb-8"
        >
          Naši Proizvodi
        </motion.h1>

        <ProductFilters 
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <ProductGrid 
          category={activeCategory}
          sortBy={sortBy}
        />
      </div>
    </Layout>
  )
}
