'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useInView } from 'react-intersection-observer'

// Particle component
const Particle = ({ size = 2, color = '#1E3A8A', position }: any) => {
  const particleRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset({
        x: Math.sin(Date.now() / 2000) * 20,
        y: Math.cos(Date.now() / 2000) * 20
      })
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      ref={particleRef}
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        left: position.x,
        top: position.y,
        opacity: 0.6,
      }}
      animate={{
        x: offset.x,
        y: offset.y,
      }}
      transition={{
        duration: 2,
        ease: "linear",
      }}
    />
  )
}

// Enhanced Hero component
export default function EnhancedHero() {
  const [particles, setParticles] = useState<Array<{ x: number; y: number }>>([])
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, -150])

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * 500,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Particle Background */}
      <div className="absolute inset-0 opacity-50">
        {particles.map((position, index) => (
          <Particle key={index} position={position} />
        ))}
      </div>

      {/* Main Content */}
      <motion.div 
        className="relative container mx-auto px-4 pt-32 pb-16"
        style={{ y }}
      >
        <div className="max-w-3xl mx-auto">
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

        {/* Floating Stats Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mt-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <StatsCard
            number="97%"
            label="Client Satisfaction"
            delay={0}
          />
          <StatsCard
            number="45%"
            label="Revenue Increase"
            delay={0.2}
          />
          <StatsCard
            number="2.5x"
            label="Efficiency Boost"
            delay={0.4}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

// Stats Card Component
function StatsCard({ number, label, delay = 0 }) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  return (
    <motion.div
      ref={ref}
      className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.h3
        className="text-4xl font-bold text-mednavi-blue mb-2"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: delay + 0.2 }}
      >
        {number}
      </motion.h3>
      <p className="text-gray-600">{label}</p>
    </motion.div>
  )
}
