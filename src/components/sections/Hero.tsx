'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function Hero() {
  const decorativeDotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!decorativeDotsRef.current) return;
      const { clientX, clientY } = e;
      const moveX = clientX * 0.01;
      const moveY = clientY * 0.01;
      decorativeDotsRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent" />

        {/* Subtle computational data waves */}
        <motion.div
          className="absolute inset-0 w-full h-full opacity-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
          style={{
            backgroundImage: `radial-gradient(circle at 20px 20px, rgba(30, 58, 138, 0.1) 1px, transparent 0),
              linear-gradient(120deg, rgba(30, 58, 138, 0.05) 1px, transparent 1px)`,
            backgroundSize: '100px 100px, 200px 200px'
          }}
        />

        {/* Data visualization elements positioned closer to the center */}
        <div className="absolute inset-0 flex flex-col items-end justify-center pr-36 space-y-10">
          {/* Enhanced pie chart with varying slice proportions and continuous rotation */}
          <motion.svg
            className="w-56 h-56 opacity-25 hidden lg:block"
            viewBox="0 0 100 100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <defs>
              <linearGradient id="3dGradientPie" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'rgba(60, 78, 160, 0.5)', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: 'rgba(30, 40, 80, 0.2)', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            {/* Pie chart slices with varied proportions */}
            {[{ start: 0, end: 70, color: 'rgba(60, 78, 160, 0.4)' }, { start: 70, end: 160, color: 'rgba(60, 78, 160, 0.3)' }, { start: 160, end: 270, color: 'rgba(60, 78, 160, 0.2)' }, { start: 270, end: 360, color: 'rgba(60, 78, 160, 0.15)' }].map((segment, i) => (
              <motion.path
                key={`segment-${i}`}
                d={`M50,50 L${50 + 45 * Math.cos(segment.start * Math.PI / 180)},${50 + 45 * Math.sin(segment.start * Math.PI / 180)} A45,45 0 ${segment.end - segment.start > 180 ? 1 : 0},1 ${50 + 45 * Math.cos(segment.end * Math.PI / 180)},${50 + 45 * Math.sin(segment.end * Math.PI / 180)} Z`}
                fill={segment.color}
              />
            ))}
            {/* Continuous slow rotation */}
            <motion.g
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              {[{ start: 0, end: 70, color: 'rgba(60, 78, 160, 0.4)' }, { start: 70, end: 160, color: 'rgba(60, 78, 160, 0.3)' }, { start: 160, end: 270, color: 'rgba(60, 78, 160, 0.2)' }, { start: 270, end: 360, color: 'rgba(60, 78, 160, 0.15)' }].map((segment, i) => (
                <motion.path
                  key={`rotate-segment-${i}`}
                  d={`M50,50 L${50 + 45 * Math.cos(segment.start * Math.PI / 180)},${50 + 45 * Math.sin(segment.start * Math.PI / 180)} A45,45 0 ${segment.end - segment.start > 180 ? 1 : 0},1 ${50 + 45 * Math.cos(segment.end * Math.PI / 180)},${50 + 45 * Math.sin(segment.end * Math.PI / 180)} Z`}
                  fill={segment.color}
                />
              ))}
            </motion.g>
          </motion.svg>

          {/* Enhanced 3D bar chart with five wider bars */}
          <motion.svg
            className="w-64 h-40 opacity-25 hidden md:block"
            viewBox="0 0 240 150"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <defs>
              <linearGradient id="3dGradientBar" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'rgba(60, 78, 160, 0.5)', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: 'rgba(30, 40, 80, 0.3)', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            {[{ x: 20, height: 40 }, { x: 70, height: 80 }, { x: 120, height: 110 }, { x: 170, height: 130 }, { x: 220, height: 150 }].map((bar, i) => (
              <motion.rect
                key={`bar-${i}`}
                x={bar.x - 18}  // Slightly wider bars
                width="36"
                y={150 - bar.height}
                height={bar.height}
                fill="url(#3dGradientBar)"
                rx="3"
                initial={{ height: 0, y: 150 }}
                animate={{ height: bar.height, y: 150 - bar.height }}
                transition={{
                  duration: 1,
                  delay: i * 0.3,
                  repeat: Infinity,
                  repeatType: "mirror",
                  repeatDelay: 3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.svg>
        </div>
      </div>

      {/* Main content */}
      <div className="relative container mx-auto px-4 pt-20 pb-16 flex items-center min-h-[85vh]">
        <div className="max-w-3xl">
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-mednavi-blue mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Transforming Dental Data into{' '}
            <span className="relative">
              Actionable
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-3 bg-blue-200/30 -z-10"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
            </span>{' '}
            Insights
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
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/contact">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-mednavi-blue hover:bg-mednavi-blue/90 transform hover:translate-y-[-2px] transition-all shadow-lg hover:shadow-xl"
              >
                Get Started
              </Button>
            </Link>
            <Link href="/services">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto border-2 border-mednavi-blue text-mednavi-blue hover:bg-mednavi-blue/5 transform hover:translate-y-[-2px] transition-all"
              >
                Learn More
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
