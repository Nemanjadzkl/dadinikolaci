import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import CheckoutForm from '@/components/checkout/CheckoutForm'
import OrderSummary from '@/components/checkout/OrderSummary'
import { useCart } from '@/context/CartContext'

function CheckoutPage() {
  const { items } = useCart()
  const [step, setStep] = useState('details') // ['details', 'payment', 'confirmation']

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-serif mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CheckoutForm step={step} setStep={setStep} />
          </div>
          <div>
            <OrderSummary items={items} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CheckoutPage
