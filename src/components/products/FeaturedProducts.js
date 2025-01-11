import ProductCard from './ProductCard'

const featuredProducts = [
  {
    id: 1,
    name: 'Čokoladna Torta',
    price: 2500,
    image: '/images/chocolate-cake.jpg',
    category: 'torte'
  },
  {
    id: 2,
    name: 'Voćni Kolači',
    price: 1200,
    image: '/images/fruit-cookies.jpg',
    category: 'kolaci'
  },
  {
    id: 3,
    name: 'Svadbena Torta',
    price: 15000,
    image: '/images/wedding-cake.jpg',
    category: 'svadbene-torte'
  }
]

function FeaturedProducts() {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-serif text-center mb-12">Izdvojeni Proizvodi</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default FeaturedProducts
