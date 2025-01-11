import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

const testimonials = [
  {
    id: 1,
    name: "Marija Petrović",
    text: "Najbolje torte u gradu! Naručila sam za ćerkinu maturu i svi su bili oduševljeni.",
    image: "/images/testimonial1.jpg"
  },
  {
    id: 2,
    name: "Stefan Jovanović",
    text: "Prefinjeni ukusi i predivna dekoracija. Dadini kolači su nezamenljivi za sve naše proslave.",
    image: "/images/testimonial2.jpg"
  },
  {
    id: 3,
    name: "Ana Đorđević",
    text: "Svadbena torta je bila kao iz snova. Hvala na profesionalnosti i posvećenosti.",
    image: "/images/testimonial3.jpg"
  }
]

export default function Testimonials() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-serif text-center mb-12"
        >
          Šta Kažu Naši Kupci
        </motion.h2>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-cream p-6 rounded-lg">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4"
                />
                <p className="text-gray-700 mb-4 text-center">{testimonial.text}</p>
                <p className="font-serif text-center text-rosegold">{testimonial.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
