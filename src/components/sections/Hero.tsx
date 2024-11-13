'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

const DataWaveBackground = () => {
  const waves = Array.from({ length: 3 }, (_, i) => ({
    id: i,
    delay: i * 0.2,
    baseY: 40 + i * 20
  }))

  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    size: 1 + Math.random() * 2,
    duration: 3 + Math.random() * 2
  }))

  const flowLines = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    startX: Math.random() * 100,
    startY: Math.random() * 100,
    endX: Math.random() * 100,
    endY: Math.random() * 100,
    duration: 4 + Math.random() * 3,
    delay: i * 0.3
  }))

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-white/50 to-blue-50/80" />

      {/* Animated wave patterns */}
      {waves.map((wave) => (
        <motion.div
          key={wave.id}
          className="absolute w-full"
          style={{
            height: '100%',
            backgroundImage: 'linear-gradient(90deg, rgba(59, 130, 246, 0.05) 0%, rgba(59, 130, 246, 0.1) 50%, rgba(59, 130, 246, 0.05) 100%)',
            y: wave.baseY
          }}
          animate={{
            y: [wave.baseY - 20, wave.baseY + 20, wave.baseY - 20]
          }}
          transition={{
            duration: 8,
            delay: wave.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Animated particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-blue-400/30"
          style={{
            width: particle.size,
            height: particle.size
          }}
          initial={{ 
            x: `${particle.initialX}%`, 
            y: `${particle.initialY}%`,
            opacity: 0 
          }}
          animate={{
            x: [`${particle.initialX}%`, `${(particle.initialX + 30) % 100}%`],
            y: [`${particle.initialY}%`, `${(particle.initialY + 30) % 100}%`],
            opacity: [0, 0.8, 0]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      {/* Animated flow lines */}
      {flowLines.map((line) => (
        <motion.div
          key={line.id}
          className="absolute h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"
          style={{
            width: '100px',
            left: `${line.startX}%`,
            top: `${line.startY}%`,
            transform: `rotate(${Math.atan2(line.endY - line.startY, line.endX - line.startX) * 180 / Math.PI}deg)`
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 0.5, 0],
            x: [0, 100, 0]
          }}
          transition={{
            duration: line.duration,
            delay: line.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      {/* Grid pattern overlay */}
      <div className="absolute inset-0" style={{ opacity: 0.05 }}>
        <svg className="w-full h-full">
          <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden">
      <DataWaveBackground />
      
      <motion.div 
        className="relative container mx-auto px-4 pt-32 pb-16 flex items-center min-h-[85vh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
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