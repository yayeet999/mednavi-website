'use client'
import { useCallback } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'
import { Engine } from '@tsparticles/engine' // Import Engine type

// Dynamically import the Particles component to prevent SSR issues
const Particles = dynamic(() => import('@tsparticles/react'), { ssr: false })

export default function Hero() {
  // Initialize particles
  const particlesInit = useCallback(async (engine: Engine) => {
    // Load the necessary tsParticles plugins here, if any
    // For the basic setup, loadFull is sufficient
    const { loadFull } = await import('tsparticles')
    await loadFull(engine)
  }, [])

  const particlesOptions = {
    particles: {
      number: {
        value: 120,
        density: {
          enable: true,
          area: 900, // Adjusted property name
        },
      },
      color: {
        value: ['#007BFF', '#00C6D7', '#33FF99'], // Light blue, teal, and mint green
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
        },
        polygon: {
          sides: 6,
        },
      },
      opacity: {
        value: 0.7,
        random: true,
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.3,
          sync: false,
        },
      },
      size: {
        value: 4,
        random: true,
        animation: {
          enable: true,
          speed: 5,
          minimumValue: 0.1,
          sync: false,
        },
      },
      links: {
        enable: true,
        distance: 120,
        color: '#007BFF',
        opacity: 0.4,
        width: 1.5,
      },
      move: {
        enable: true,
        speed: 2.5,
        direction: 'none',
        random: false,
        straight: false,
        outModes: {
          default: 'out',
        },
        attract: {
          enable: true,
          rotate: {
            x: 600,
            y: 1200,
          },
        },
      },
    },
    interactivity: {
      detectsOn: 'canvas',
      events: {
        onHover: {
          enable: true,
          mode: 'grab',
        },
        onClick: {
          enable: true,
          mode: 'push',
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 200,
          links: {
            opacity: 0.7,
          },
        },
        bubble: {
          distance: 250,
          size: 6,
          duration: 2,
          opacity: 0.8,
          speed: 2,
        },
        repulse: {
          distance: 150,
          duration: 0.4,
        },
        push: {
          quantity: 3,
        },
        remove: {
          quantity: 2,
        },
      },
    },
    detectRetina: true, // Adjusted property name
  }

  return (
    <section className="relative min-h-[85vh] overflow-hidden">
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        className="absolute inset-0 -z-10"
        init={particlesInit}
        options={particlesOptions}
      />

      {/* Hero Content */}
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
            Empower your dental practice with real-time analytics to improve patient experience and
            operational efficiency.
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