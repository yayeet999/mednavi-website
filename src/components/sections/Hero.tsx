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
          {/* Enhanced pie chart with upgraded colors and size */}
          <motion.svg
            className="w-56 h-56 opacity-25 hidden lg:block"
            viewBox="0 0 100 100"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 1 }}
          >
            {[{ start: 0, end: 90, color: 'rgba(60, 78, 160, 0.4)' }, { start: 90, end: 180, color: 'rgba(60, 78, 160, 0.3)' }, { start: 180, end: 360, color: 'rgba(60, 78, 160, 0.2)' }].map((segment, i) => (
              <motion.path
                key={`segment-${i}`}
                d={`M50,50 L${50 + 45 * Math.cos(segment.start * Math.PI / 180)},${50 + 45 * Math.sin(segment.start * Math.PI / 180)} A45,45 0 ${segment.end - segment.start > 180 ? 1 : 0},1 ${50 + 45 * Math.cos(segment.end * Math.PI / 180)},${50 + 45 * Math.sin(segment.end * Math.PI / 180)} Z`}
                fill={segment.color}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.3,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "mirror",
                  repeatDelay: 2,
                }}
              />
            ))}
            {/* Continuous slow spin with intermittent segment changes */}
            <motion.g
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {[{ start: 0, end: 45, color: 'rgba(60, 78, 160, 0.5)' }, { start: 45, end: 170, color: 'rgba(60, 78, 160, 0.35)' }, { start: 170, end: 360, color: 'rgba(60, 78, 160, 0.3)' }].map((segment, i) => (
                <motion.path
                  key={`dynamic-segment-${i}`}
                  d={`M50,50 L${50 + 45 * Math.cos(segment.start * Math.PI / 180)},${50 + 45 * Math.sin(segment.start * Math.PI / 180)} A45,45 0 ${segment.end - segment.start > 180 ? 1 : 0},1 ${50 + 45 * Math.cos(segment.end * Math.PI / 180)},${50 + 45 * Math.sin(segment.end * Math.PI / 180)} Z`}
                  fill={segment.color}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: i * 0.5,
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "mirror",
                    repeatDelay: 5,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.g>
          </motion.svg>

          {/* Enhanced bar chart positioned below pie chart with improved colors, size, and alignment */}
          <motion.svg
            className="w-56 h-40 opacity-25 hidden md:block"
            viewBox="0 0 200 150"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {[{ x: 20, height: 50 }, { x: 60, height: 80 }, { x: 100, height: 110 }, { x: 140, height: 130 }, { x: 180, height: 150 }].map((bar, i) => (
              <motion.rect
                key={`bar-${i}`}
                x={bar.x - 15}
                width="30"
                y={150 - bar.height}
                height={bar.height}
                fill="rgba(60, 78, 160, 0.4)"
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
