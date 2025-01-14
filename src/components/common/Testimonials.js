import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination, Autoplay } from 'swiper'
import { FaQuoteLeft } from 'react-icons/fa'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'

const testimonials = [
  {
    id: 1,
    name: "Marija Petrović",
    text: "Najbolje torte u gradu! Naručila sam za ćerkinu maturu i svi su bili oduševljeni.",
    image: "/images/testimonial1.jpg",
    rating: 5
  },
  {
    id: 2,
    name: "Stefan Jovanović",
    text: "Prefinjeni ukusi i predivna dekoracija. Dadini kolači su nezamenljivi za sve naše proslave.",
    image: "/images/testimonial2.jpg",
    rating: 5
  },
  {
    id: 3,
    name: "Ana Đorđević",
    text: "Svadbena torta je bila kao iz snova. Hvala na profesionalnosti i posvećenosti.",
    image: "/images/testimonial3.jpg",
    rating: 5
  }
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-serif mb-4">Šta Kažu Naši Kupci</h2>
          <div className="w-24 h-1 bg-rosegold mx-auto"></div>
        </motion.div>

        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: false,
          }}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="testimonials-swiper"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id} className="max-w-lg">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-xl"
              >
                <div className="relative">
                  <FaQuoteLeft className="text-4xl text-rosegold/20 absolute -top-4 -left-4" />
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl">{testimonial.name}</h3>
                      <div className="flex text-yellow-400">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">{testimonial.text}</p>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
