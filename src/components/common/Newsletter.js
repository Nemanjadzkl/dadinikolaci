import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { FaPaperPlane } from 'react-icons/fa'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // API call simulation
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Uspešno ste se prijavili na newsletter!')
      setEmail('')
    } catch (error) {
      toast.error('Došlo je do greške. Pokušajte ponovo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-24 bg-cream relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.1 }}
        viewport={{ once: true }}
        className="absolute inset-0 bg-[url('/images/pattern.png')] bg-repeat opacity-10"
      />
      
      <div className="max-w-7xl mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-4xl font-serif mb-4">
            Pridružite se našoj slatkoj zajednici
          </h2>
          <p className="text-gray-600 mb-8">
            Budite prvi koji će saznati o novim proizvodima i specijalnim ponudama
          </p>

          <motion.form 
            onSubmit={handleSubmit}
            className="relative max-w-md mx-auto"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Vaša email adresa"
              required
              className="w-full px-6 py-4 rounded-full border-2 border-rosegold/30 focus:border-rosegold focus:outline-none pr-36"
            />
            <motion.button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-2 bg-rosegold text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-colors disabled:opacity-50 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <span>{loading ? 'Slanje...' : 'Prijavi se'}</span>
              <motion.span
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaPaperPlane />
              </motion.span>
            </motion.button>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-gray-500 mt-4"
          >
            Vaši podaci su bezbedni. Možete se odjaviti u bilo kom trenutku.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
