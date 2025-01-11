import Layout from '@/components/layout/Layout'
import { useState } from 'react'

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-serif mb-8">Kontaktirajte nas</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-serif mb-4">Informacije</h2>
            <div className="space-y-2">
              <p>📍 Adresa: Vaša adresa</p>
              <p>📞 Telefon: +381 XX XXX XXXX</p>
              <p>✉️ Email: info@dadinikolaci.rs</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-serif mb-4">Radno vreme</h2>
            <div className="space-y-2">
              <p>Ponedeljak - Petak: 09:00 - 20:00</p>
              <p>Subota: 09:00 - 16:00</p>
              <p>Nedelja: Zatvoreno</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Ime</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rosegold focus:ring-rosegold"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rosegold focus:ring-rosegold"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Poruka</label>
            <textarea
              rows={4}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rosegold focus:ring-rosegold"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-rosegold text-white py-3 rounded-md hover:bg-opacity-90 transition-colors"
          >
            Pošalji poruku
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default ContactPage
