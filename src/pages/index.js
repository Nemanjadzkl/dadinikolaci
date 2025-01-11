import { useEffect } from 'react'
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
      <Hero />
      <FeaturedProducts />
      <Categories />
      <Testimonials />
      <InstagramFeed />
      <Newsletter />
    </Layout>
  )
}

export default HomePage