'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

const heroVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3
    }
  }
}

const textVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: custom * 0.2
    }
  }),
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
}

export default function ServicesHero() {
  useEffect(() => {
    return () => {
      // Cleanup for ServicesHero
      const heroElements = document.querySelectorAll('.services-hero-animation')
      heroElements.forEach(el => {
        if (el && el.parentNode) {
          el.parentNode.removeChild(el)
        }
      })
    }
  }, [])

  return (
    <AnimatePresence mode="wait">
      <section className="relative py-20 bg-gradient-to-br from-white to-blue-50">
        <motion.div 
          className="container mx-auto px-4 services-hero-animation"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          layout
        >
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-mednavi-blue mb-6"
              variants={textVariants}
              custom={1}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              Comprehensive Analytics Solutions for Dental Practices
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600"
              variants={textVariants}
              custom={2}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              From real-time practice insights to automated insurance claims analysis,
              discover how MedNavi can transform your dental practice management.
            </motion.p>
          </div>
        </motion.div>
      </section>
    </AnimatePresence>
  )
}
