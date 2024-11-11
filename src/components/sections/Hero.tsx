'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative h-[90vh] flex items-center bg-gradient-to-br from-white to-blue-50">
      <div className="absolute inset-0 z-0">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d="M0 100 C 20 0 50 0 100 100 Z"
            className="fill-blue-100/30"
          />
          <path
            d="M0 100 C 30 30 70 30 100 100 Z"
            className="fill-blue-50/20"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-mednavi-blue mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Transforming Dental Data into Actionable Insights
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Empower your dental practice with real-time analytics to improve patient experience and operational efficiency.
          </motion.p>
          
          <motion.div 
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/contact">
              <Button size="lg" className="bg-mednavi-blue hover:bg-mednavi-blue/90">
                Get Started
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline" className="border-mednavi-blue text-mednavi-blue hover:bg-mednavi-blue/10">
                Learn More
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
