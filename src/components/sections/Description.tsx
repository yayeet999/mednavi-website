'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Description() {
  return (
    <section className="bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-12 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 p-6 rounded-md lg:ml-10" // Adds left margin to move it toward the center
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-mednavi-blue"
            >
              Run Your Practice <span style={{ color: '#034660' }}>Like a Pro</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 text-black"
            >
              <p className="text-lg">
                <strong className="text-mednavi-blue">Would you drive blindfolded</strong>, guessing when to refuel or service your car? Running your practice without the <strong style={{ color: '#333333' }}>right data</strong> is no different.
              </p>

              <motion.ul
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-3 list-none"
              >
                <li className="flex items-start">
                  <span className="w-3 h-3 rounded-full bg-mednavi-blue mt-1 mr-2"></span>
                  <span>MedNavi provides <strong className="text-mednavi-blue">advanced insights and strategies</strong> used by top organizations</span>
                </li>
                <li className="flex items-start">
                  <span className="w-3 h-3 rounded-full bg-mednavi-blue mt-1 mr-2"></span>
                  <span><strong style={{ color: '#333333' }}>Affordable</strong> and tailored for <strong style={{ color: '#333333' }}>smaller practices</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="w-3 h-3 rounded-full bg-mednavi-blue mt-1 mr-2"></span>
                  <span>Focus on patient care while we handle the <strong style={{ color: '#333333' }}>data and analytics</strong></span>
                </li>
              </motion.ul>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg"
              >
                Staying competitive means knowing exactly how your practice is performing and where to improve. With MedNavi, you'll have everything you need to <strong style={{ color: '#034660' }}>make smarter decisions and drive real growth</strong>.
              </motion.p>
            </motion.div>
          </motion.div>

          {/* SVG Diagram - Hidden on mobile */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="hidden lg:block relative"
          >
            <div className="relative w-full h-[500px] lg:max-w-[1200px] mx-auto">
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
