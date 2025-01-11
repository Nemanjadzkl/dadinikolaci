import { motion } from 'framer-motion'

export default function ProductFilters({ 
  categories, 
  activeCategory, 
  setActiveCategory,
  sortBy,
  setSortBy 
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-full ${
              activeCategory === category.id
                ? 'bg-rosegold text-white'
                : 'bg-cream text-gray-700 hover:bg-brown-light hover:text-white'
            } transition-colors`}
          >
            {category.name}
          </motion.button>
        ))}
      </div>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="border rounded-md px-4 py-2"
      >
        <option value="featured">Izdvojeno</option>
        <option value="price-asc">Cena: Rastuće</option>
        <option value="price-desc">Cena: Opadajuće</option>
        <option value="name-asc">Naziv: A-Z</option>
        <option value="name-desc">Naziv: Z-A</option>
      </select>
    </div>
  )
}
