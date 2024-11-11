'use client'
import { motion } from 'framer-motion'

export default function ServicesHero() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-white to-blue-50">
      <motion.div 
        className="container mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-mednavi-blue mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Comprehensive Analytics Solutions for Dental Practices
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            From real-time practice insights to automated insurance claims analysis,
            discover how MedNavi can transform your dental practice management.
          </motion.p>
        </div>
      </motion.div>
    </section>
  )
}
