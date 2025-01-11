import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Here you would typically make an API call to your backend
      // await axios.post('/api/newsletter', { email })
      toast.success('Uspešno ste se prijavili na newsletter!')
      setEmail('')
    } catch (error) {
      toast.error('Došlo je do greške. Pokušajte ponovo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-serif mb-4">
            Pridružite se našoj slatkoj zajednici
          </h2>
          <p className="text-gray-600 mb-8">
            Budite prvi koji će saznati o novim proizvodima i specijalnim ponudama
          </p>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Vaša email adresa"
                required
                className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rosegold"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-rosegold text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-50"
              >
                {loading ? 'Slanje...' : 'Prijavi se'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
