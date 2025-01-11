import Link from 'next/link'
import Image from 'next/image'

function Hero() {
  return (
    <div className="relative h-[70vh] min-h-[600px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Slatki kolači"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
        <div className="text-white max-w-xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
            Domaći Kolači i Torte za Svaku Priliku
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Pravimo najukusnije kolače i torte po tradicionalnim receptima, sa ljubavlju i pažnjom.
          </p>
          <div className="space-x-4">
            <Link 
              href="/products" 
              className="bg-rosegold text-white px-8 py-3 rounded-md hover:bg-opacity-90 transition-colors inline-block"
            >
              Pogledaj Ponudu
            </Link>
            <Link 
              href="/contact" 
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white hover:text-gray-900 transition-colors inline-block"
            >
              Kontaktiraj Nas
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
