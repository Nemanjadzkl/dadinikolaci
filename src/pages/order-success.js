import Layout from '@/components/layout/Layout'
import Link from 'next/link'
import { CheckCircleIcon } from '@heroicons/react/outline'

function OrderSuccessPage() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-serif mb-4">Hvala na porudžbini!</h1>
        <p className="text-gray-600 mb-8">
          Vaša porudžbina je uspešno primljena. Kontaktiraćemo Vas uskoro radi potvrde i dogovora oko isporuke.
        </p>
        <Link 
          href="/"
          className="inline-block bg-rosegold text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors"
        >
          Nazad na početnu
        </Link>
      </div>
    </Layout>
  )
}

export default OrderSuccessPage
