import Link from 'next/link'
import { 
  PhoneIcon, 
  MailIcon, 
  LocationMarkerIcon 
} from '@heroicons/react/outline'

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="font-serif text-xl mb-4">Dadini Kolači</h3>
            <p className="text-gray-400">
              Pravimo najukusnije torte i kolače za sve vaše posebne prilike.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-xl mb-4">Brzi Linkovi</h3>
            <nav className="space-y-2">
              <Link href="/products" className="block text-gray-400 hover:text-rosegold transition-colors">
                Proizvodi
              </Link>
              <Link href="/about" className="block text-gray-400 hover:text-rosegold transition-colors">
                O nama
              </Link>
              <Link href="/blog" className="block text-gray-400 hover:text-rosegold transition-colors">
                Blog
              </Link>
              <Link href="/contact" className="block text-gray-400 hover:text-rosegold transition-colors">
                Kontakt
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-xl mb-4">Kontakt</h3>
            <div className="space-y-2 text-gray-400">
              <p className="flex items-center">
                <PhoneIcon className="h-5 w-5 mr-2" />
                +381 XX XXX XXXX
              </p>
              <p className="flex items-center">
                <MailIcon className="h-5 w-5 mr-2" />
                info@dadinikolaci.rs
              </p>
              <p className="flex items-center">
                <LocationMarkerIcon className="h-5 w-5 mr-2" />
                Vaša adresa, Grad
              </p>
            </div>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="font-serif text-xl mb-4">Radno Vreme</h3>
            <div className="space-y-2 text-gray-400">
              <p>Ponedeljak - Petak: 09:00 - 20:00</p>
              <p>Subota: 09:00 - 16:00</p>
              <p>Nedelja: Zatvoreno</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Dadini Kolači. Sva prava zadržana.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
