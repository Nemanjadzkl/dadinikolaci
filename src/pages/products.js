import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import ProductGrid from '@/components/products/ProductGrid'
import ProductFilters from '@/components/products/ProductFilters'
import { motion } from 'framer-motion'

const categories = [
  { id: 'all', name: 'Sve', icon: '🍰' },
  { id: 'Torte', name: 'Torte', icon: '🎂' },
  { id: 'Kolači', name: 'Kolači', icon: '🧁' },
  { id: 'Sitni kolači', name: 'Sitni Kolači', icon: '🍪' },
  { id: 'Svadbene torte', name: 'Svadbene Torte', icon: '👰' },
  { id: 'Rođendanske torte', name: 'Rođendanske Torte', icon: '🎈' },
  { id: 'Praznične poslastice', name: 'Praznične Poslastice', icon: '🎄' }
]

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')

  return (
    <Layout>
      <motion.div 
        initial="initial"
        animate="animate"
        variants={stagger}
        className="max-w-7xl mx-auto px-4 py-16"
      >
        <motion.div 
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-serif mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Naši Proizvodi
          </motion.h1>
          <motion.div
            className="w-24 h-1 bg-rosegold mx-auto"
            whileHover={{ width: '120px' }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        <motion.div
          variants={fadeInUp}
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="mb-12"
        >
          <ProductFilters 
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6,
            delay: 0.2
          }}
        >
          <ProductGrid 
            category={activeCategory}
            sortBy={sortBy}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <motion.p
            className="text-gray-600 italic"
            whileHover={{ scale: 1.05 }}
          >
            Pronađite savršenu poslasticu za svaku priliku
          </motion.p>
        </motion.div>
      </motion.div>
    </Layout>
  )
}
