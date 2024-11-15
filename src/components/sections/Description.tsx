'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Description() {
  return (
    <section className="bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6 bg-gray-50 p-6 rounded-md"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-mednavi-blue">
              Run Your Practice Like a Pro
            </h2>

            <div className="space-y-4 text-gray-600">
              <p className="text-lg">
                <span className="font-semibold text-mednavi-blue">Would you drive blindfolded,</span> guessing when to refuel or service your car? Running your practice without the <span className="font-semibold">right data</span> is no different.
              </p>

              <ul className="space-y-3 list-none">
                <li className="flex items-start">
                  <span className="w-3 h-3 rounded-full bg-mednavi-blue mt-1 mr-2"></span>
                  <span>MedNavi provides <span className="font-semibold text-mednavi-blue">advanced insights</span> and strategies used by top organizations</span>
                </li>
                <li className="flex items-start">
                  <span className="w-3 h-3 rounded-full bg-mednavi-blue mt-1 mr-2"></span>
                  <span>Affordable and tailored for smaller practices</span>
                </li>
                <li className="flex items-start">
                  <span className="w-3 h-3 rounded-full bg-mednavi-blue mt-1 mr-2"></span>
                  <span>Focus on patient care while we handle the data and analytics</span>
                </li>
              </ul>

              <p className="text-lg">
                Staying competitive means knowing exactly how your practice is performing and where to improve. With MedNavi, you'll have everything you need to make <span className="font-semibold text-mednavi-blue">smarter decisions</span> and <span className="font-semibold text-mednavi-blue">drive real growth</span>.
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
