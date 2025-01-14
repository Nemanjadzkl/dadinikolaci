import { useEffect, useState } from 'react'
import { useCart } from '@/context/CartContext'
import Confirmation from './Confirmation'

export default function CheckoutForm({ step, setStep }) {
  const { cart, clearCart } = useCart()
  const [isClient, setIsClient] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: ''
  })

  useEffect(() => {
    setIsClient(true)
  }, [])

  const steps = [
    { id: 'details', name: 'Detalji' },
    { id: 'confirmation', name: 'Potvrda' }
  ]

  if (step === 'confirmation') {
    return <Confirmation />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const orderData = {
        orderDetails: {
          items: cart,
          total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 300,
        },
        customerEmail: formData.email,
        customerDetails: formData
      }

      const response = await fetch('/api/send-order-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      })

      const data = await response.json()

      if (response.ok) {
        clearCart()
        setStep('confirmation')
      } else {
        console.error('Order submission failed:', data.message)
      }
    } catch (error) {
      console.error('Error submitting order:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-center">
          {steps.map((s, index) => (
            <div key={s.id} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step === s.id ? 'bg-rosegold text-white' : 'bg-gray-200'
              }`}>
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className="w-20 h-1 mx-2 bg-gray-200">
                  <div className={`h-full ${
                    step === steps[index + 1].id ? 'bg-rosegold' : 'bg-gray-200'
                  }`} />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-around mt-2">
          {steps.map((s) => (
            <span key={s.id} className="text-sm text-gray-600">
              {s.name}
            </span>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2">Ime i Prezime</label>
          <input
            type="text"
            required
            className="w-full border rounded-lg px-4 py-2"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            required
            className="w-full border rounded-lg px-4 py-2"
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <div>
          <label className="block mb-2">Telefon</label>
          <input
            type="tel"
            required
            className="w-full border rounded-lg px-4 py-2"
            value={formData.phone}
            onChange={e => setFormData({...formData, phone: e.target.value})}
          />
        </div>
        <div>
          <label className="block mb-2">Adresa</label>
          <input
            type="text"
            required
            className="w-full border rounded-lg px-4 py-2"
            value={formData.address}
            onChange={e => setFormData({...formData, address: e.target.value})}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Grad</label>
            <input
              type="text"
              required
              className="w-full border rounded-lg px-4 py-2"
              value={formData.city}
              onChange={e => setFormData({...formData, city: e.target.value})}
            />
          </div>
          <div>
            <label className="block mb-2">Poštanski Broj</label>
            <input
              type="text"
              required
              className="w-full border rounded-lg px-4 py-2"
              value={formData.postalCode}
              onChange={e => setFormData({...formData, postalCode: e.target.value})}
            />
          </div>
        </div>
        <div>
          <label className="block mb-2">Napomena</label>
          <textarea
            className="w-full border rounded-lg px-4 py-2"
            rows="4"
            value={formData.notes}
            onChange={e => setFormData({...formData, notes: e.target.value})}
          />
        </div>
        <button
  type="submit"
  disabled={isSubmitting}
  className="w-full bg-rosegold text-white py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
>
  {isSubmitting ? 'Obrađuje se...' : 'Potvrdi Porudžbinu'}
</button>


      </form>
    </div>
  )
}
