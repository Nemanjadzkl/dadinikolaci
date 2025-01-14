import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaInstagram, FaHeart, FaComment } from 'react-icons/fa'

const instagramPosts = [
  {
    id: 1,
    image: '/images/insta1.jpg',
    link: 'https://instagram.com/dadini.kolaci',
    caption: 'Čokoladna torta sa malinama',
    likes: 124,
    comments: 18
  },
  {
    id: 2,
    image: '/images/insta2.jpg',
    link: 'https://instagram.com/dadini.kolaci',
    caption: 'Svadbena torta u belom',
    likes: 156,
    comments: 22
  },
  {
    id: 3,
    image: '/images/insta3.jpg',
    link: 'https://instagram.com/dadini.kolaci',
    caption: 'Sitni kolači',
    likes: 98,
    comments: 12
  },
  {
    id: 4,
    image: '/images/insta4.jpg',
    link: 'https://instagram.com/dadini.kolaci',
    caption: 'Voćna torta',
    likes: 145,
    comments: 20
  }
]

export default function InstagramFeed() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-serif mb-4">Pratite nas na Instagramu</h2>
          <a 
            href="https://instagram.com/dadini.kolaci" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-rosegold hover:text-brown-light transition-colors inline-flex items-center gap-2 text-lg"
          >
            <FaInstagram className="text-2xl" />
            @dadini.kolaci
          </a>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {instagramPosts.map((post) => (
            <motion.a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="relative aspect-square group"
            >
              <Image
                src={post.image}
                alt={post.caption}
                fill
                className="object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex flex-col items-center justify-center text-white p-4">
                <h3 className="text-lg font-serif text-center mb-4">{post.caption}</h3>
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <FaHeart />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaComment />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a 
            href="https://instagram.com/dadini.kolaci"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full hover:scale-105 transition-transform"
          >
            Pratite nas na Instagramu
          </a>
        </motion.div>
      </div>
    </section>
  )
}
