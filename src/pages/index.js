import { motion } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import Hero from '@/components/common/Hero'
import FeaturedProducts from '@/components/products/FeaturedProducts'
import Categories from '@/components/products/Categories'
import Testimonials from '@/components/common/Testimonials'
import InstagramFeed from '@/components/common/InstagramFeed'
import Newsletter from '@/components/common/Newsletter'

function HomePage() {
  return (
    <Layout>
      <div className="bg-gray-900">
        <Hero />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <FeaturedProducts />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Categories />
        </motion.div>
        <Testimonials />
        <InstagramFeed />
        <Newsletter />
      </div>
    </Layout>
  )
}

export default HomePage
