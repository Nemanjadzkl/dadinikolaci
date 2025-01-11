import Link from 'next/link'
import Image from 'next/image'

const categories = [
  {
    id: 1,
    name: 'Torte',
    image: '/images/cakes.jpg',
    href: '/products?category=torte'
  },
  {
    id: 2,
    name: 'Kolači',
    image: '/images/cookies.jpg',
    href: '/products?category=kolaci'
  },
  {
    id: 3,
    name: 'Sitni Kolači',
    image: '/images/small-cookies.jpg',
    href: '/products?category=sitni-kolaci'
  },
  {
    id: 4,
    name: 'Svadbene Torte',
    image: '/images/wedding-cakes.jpg',
    href: '/products?category=svadbene-torte'
  }
]

function Categories() {
  return (
    <section className="py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-serif text-center mb-12">
          Naše Kategorije
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link key={category.id} href={category.href}>
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-serif">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories
