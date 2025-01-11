import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/router'

function CheckoutForm({ step, setStep }) {
  const router = useRouter()
  const { items, clearCart } = useCart()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: '',
    paymentMethod: 'cash'
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const order = {
      ...formData,
      items: items,
      total: items.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 300,
      status: 'pending',
      createdAt: new Date()
    }

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order)
      })

      if (response.ok) {
        clearCart()
        router.push('/order-success')
      }
    } catch (error) {
      console.error('Error creating order:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ime
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rosegold focus:ring-rosegold"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Prezime
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rosegold focus:ring-rosegold"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rosegold focus:ring-rosegold"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Telefon
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rosegold focus:ring-rosegold"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Adresa
        </label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rosegold focus:ring-rosegold"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Grad
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rosegold focus:ring-rosegold"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Poštanski broj
          </label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rosegold focus:ring-rosegold"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Napomena
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rosegold focus:ring-rosegold"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-rosegold text-white py-3 rounded-md hover:bg-opacity-90 transition-colors"
      >
        Potvrdi porudžbinu
      </button>
    </form>
  )
}

export default CheckoutForm
