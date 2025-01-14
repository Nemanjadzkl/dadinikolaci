import { motion } from 'framer-motion'
import { FiFilter, FiChevronDown } from 'react-icons/fi'

export default function ProductFilters({ 
  categories, 
  activeCategory, 
  setActiveCategory, 
  sortBy, 
  setSortBy 
}) {
  return (
    <div className="mb-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-cream rounded-2xl p-6">
        {/* Categories */}
        <motion.div 
          layout 
          className="flex flex-wrap gap-3 justify-center md:justify-start"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all
                ${activeCategory === category.id 
                  ? 'bg-rosegold text-white shadow-lg' 
                  : 'bg-white hover:bg-rosegold/10'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xl">{category.icon}</span>
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Sort Dropdown */}
        <div className="relative group">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white px-6 py-3 rounded-full flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <FiFilter className="text-rosegold" />
            <span>Sortiraj</span>
            <FiChevronDown className="text-gray-400 group-hover:rotate-180 transition-transform" />
          </motion.div>

          <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
            <div className="p-2">
              {[
                { value: 'featured', label: 'Izdvojeno' },
                { value: 'price-asc', label: 'Cena: Rastuće' },
                { value: 'price-desc', label: 'Cena: Opadajuće' },
                { value: 'name-asc', label: 'Naziv: A-Z' },
                { value: 'name-desc', label: 'Naziv: Z-A' }
              ].map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => setSortBy(option.value)}
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors
                    ${sortBy === option.value 
                      ? 'bg-rosegold/10 text-rosegold' 
                      : 'hover:bg-gray-50'}`}
                  whileHover={{ x: 5 }}
                >
                  {option.label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 flex items-center gap-2 text-sm text-gray-600"
      >
        <span>Aktivni filteri:</span>
        <span className="bg-rosegold/10 text-rosegold px-3 py-1 rounded-full">
          {categories.find(c => c.id === activeCategory)?.name}
        </span>
      </motion.div>
    </div>
  )
}
