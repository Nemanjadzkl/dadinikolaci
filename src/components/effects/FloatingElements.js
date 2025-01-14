import { motion } from 'framer-motion'

export default function FloatingElements() {
  const elements = [
    { id: 1, icon: '🍰', delay: 0, size: '2xl' },
    { id: 2, icon: '🧁', delay: 1.5, size: 'xl' },
    { id: 3, icon: '🎂', delay: 2.5, size: '2xl' },
    { id: 4, icon: '🍪', delay: 3.5, size: 'xl' }
  ]

  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className={`absolute text-${element.size}`}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.1, 0.2, 0.1],
            y: [-10, 10, -10],
            x: [-10, 10, -10],
            rotate: [0, 180],
          }}
          transition={{
            duration: 12,
            delay: element.delay,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            top: `${Math.random() * 70 + 15}%`,
            left: `${Math.random() * 70 + 15}%`,
          }}
        >
          {element.icon}
        </motion.div>
      ))}
    </div>
  )
}
