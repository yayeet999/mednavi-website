'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Description() {
  return (
    // Reduce py-20 to py-8 or remove it entirely if you want minimal padding
    <section className="bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-mednavi-blue">
              Run Your Practice Like a Pro
            </h2>
            
            <div className="space-y-4 text-gray-600">
              <p className="text-lg">
                Would you drive blindfolded, guessing when to refuel or service your car? Running your practice without the right data is no different.
              </p>
              
              <p>
                MedNavi provides the same advanced insights and strategies that power the biggest organizations, but made affordable for smaller practices. We handle the details—tracking, analyzing, and keeping everything organized—so you can focus on what you do best: taking care of your patients.
              </p>
              
              <p>
                Staying competitive means knowing exactly how your practice is performing and where to improve. With MedNavi, you'll have everything you need to make smarter decisions and drive real growth.
              </p>
            </div>
          </motion.div>

          {/* SVG Diagram - Hidden on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            {/* Adjust the height of the container */}
            <div className="relative w-full h-[400px] max-w-[600px] mx-auto">
              <Image
                src="/Minimalist 5 Cycle Diagram Graph.svg"
                alt="MedNavi Practice Management Cycle"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
