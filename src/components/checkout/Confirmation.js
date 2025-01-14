import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Confirmation() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-12"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="mb-8"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center">
          <svg 
            className="w-12 h-12 text-green-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-3xl font-serif mb-4"
      >
        Hvala na porudžbini!
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-gray-600 mb-8 max-w-md mx-auto"
      >
        Vaša porudžbina je uspešno primljena. Poslali smo vam email sa detaljima porudžbine.
        Očekujte isporuku u narednih 24-48 sati.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Link 
          href="/"
          className="inline-block bg-rosegold text-white px-8 py-3 rounded-xl hover:opacity-90 transition-opacity"
        >
          Nazad na početnu
        </Link>
      </motion.div>
    </motion.div>
  )
}
