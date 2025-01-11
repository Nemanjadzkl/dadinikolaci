import Header from './Header'
import Footer from './Footer'
import { Toaster } from 'react-hot-toast'

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
