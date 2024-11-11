'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'

// DataPoint animation component
const DataGrid = () => {
  const points = Array.from({ length: 50 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2
  }))

  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      {points.map((point, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-mednavi-blue rounded-full"
          style={{
            left: `${point.x}%`,
            top: `${point.y}%`
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 3,
            delay: point.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      <svg className="absolute inset-0 w-full h-full">
        {points.slice(0, 20).map((point, i) => (
          <motion.path
            key={`line-${i}`}
            d={`M ${point.x} ${point.y} L ${points[(i + 1) % 20].x} ${points[(i + 1) % 20].y}`}
            stroke="rgba(30, 58, 138, 0.1)"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2,
              delay: point.delay,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </svg>
    </div>
  )
}

export default function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, -150])

  return (
    <section className="relative min-h-[80vh] overflow-hidden bg-gradient-to-br from-white via-blue-50/50 to-white">
      <DataGrid />
      
      <motion.div 
        className="relative container mx-auto px-4 pt-32 pb-16"
        style={{ y }}
      >
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/10 to-transparent animate-wave" />
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl font-bold text-mednavi-blue mb-6 relative"
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
              <Button 
                size="lg" 
                className="bg-mednavi-blue hover:bg-mednavi-blue/90 transform hover:scale-105 transition-transform"
              >
                Get Started
              </Button>
            </Link>
            <Link href="/services">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-mednavi-blue text-mednavi-blue hover:bg-mednavi-blue/10 transform hover:scale-105 transition-transform"
              >
                Learn More
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}