import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaInstagram } from 'react-icons/fa'

const instagramPosts = [
  {
    id: 1,
    image: '/images/insta1.jpg',
    link: 'https://instagram.com/dadini.kolaci',
    caption: 'Čokoladna torta sa malinama'
  },
  {
    id: 2,
    image: '/images/insta2.jpg',
    link: 'https://instagram.com/dadini.kolaci',
    caption: 'Svadbena torta u belom'
  },
  {
    id: 3,
    image: '/images/insta3.jpg',
    link: 'https://instagram.com/dadini.kolaci',
    caption: 'Sitni kolači'
  },
  {
    id: 4,
    image: '/images/insta4.jpg',
    link: 'https://instagram.com/dadini.kolaci',
    caption: 'Voćna torta'
  }
]

export default function InstagramFeed() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-serif mb-4"
          >
            Pratite nas na Instagramu
          </motion.h2>
          <a 
            href="https://instagram.com/dadini.kolaci" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-rosegold hover:text-brown-light transition-colors inline-flex items-center gap-2"
          >
            <FaInstagram className="text-xl" />
            @dadini.kolaci
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {instagramPosts.map((post) => (
            <motion.a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="relative aspect-square"
            >
              <Image
                src={post.image}
                alt={post.caption}
                fill
                className="object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-all flex items-center justify-center rounded-lg">
                <span className="text-white opacity-0 hover:opacity-100 transition-opacity text-center p-4">
                  {post.caption}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
