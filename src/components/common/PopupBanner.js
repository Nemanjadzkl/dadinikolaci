import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'

function PopupBanner() {
  const [banner, setBanner] = useState(null)
  const [isOpen, setIsOpen] = useState(true)
  const router = useRouter()

  // Only show on homepage
  if (router.pathname !== '/') return null

  useEffect(() => {
    const fetchBanners = async () => {
      const response = await fetch('/api/banners')
      const data = await response.json()
      const activeBanners = data.banners.filter(banner => banner.isActive)
      if (activeBanners.length > 0) {
        setBanner(activeBanners[0])
      }
    }
    fetchBanners()
  }, [])

  if (!banner || !isOpen) return null

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
        onClick={() => setIsOpen(false)} // Close when clicking outside
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative bg-white rounded-lg max-w-2xl" // Reduced max-width
          onClick={e => e.stopPropagation()} // Prevent closing when clicking banner
        >
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-gray-800 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          >
            ×
          </button>

          <div className="relative w-full">
            <Image
              src={banner.imageUrl}
              alt="Promotional Banner"
              width={800} // Reduced size
              height={600}
              className="w-full h-auto rounded-lg"
              priority
            />
          </div>

          {banner.link && (
            <div className="absolute bottom-6 left-6">
              <Link 
                href={banner.link}
                className="bg-rosegold text-white px-6 py-2 rounded inline-block hover:bg-opacity-90 transition-colors"
              >
                Saznaj Više
              </Link>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default PopupBanner
