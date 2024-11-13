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
        
        {/* Enhanced grid pattern */}
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `
              radial-gradient(circle at 1px 1px, rgba(30, 58, 138, 0.07) 1px, transparent 0),
              linear-gradient(to right, rgba(30, 58, 138, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px, 100px 100px'
          }}
        />

        {/* Data visualization elements */}
        <div className="absolute inset-0">
          {/* Animated bar chart */}
          <motion.svg
            className="absolute top-20 right-20 w-64 h-48 opacity-20 hidden md:block"
            viewBox="0 0 200 150"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={`grid-${i}`}
                x1="0"
                y1={30 * i}
                x2="200"
                y2={30 * i}
                stroke="rgba(30, 58, 138, 0.1)"
                strokeWidth="1"
              />
            ))}
            
            {[
              { x: 20, height: 80 },
              { x: 60, height: 120 },
              { x: 100, height: 60 },
              { x: 140, height: 90 },
              { x: 180, height: 100 },
            ].map((bar, i) => (
              <motion.rect
                key={`bar-${i}`}
                x={bar.x - 15}
                width="30"
                y={150 - bar.height}
                height={bar.height}
                fill="rgba(30, 58, 138, 0.2)"
                initial={{ height: 0, y: 150 }}
                animate={{ height: bar.height, y: 150 - bar.height }}
                transition={{
                  duration: 1,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 2
                }}
              />
            ))}
          </motion.svg>

          {/* Animated pie chart */}
          <motion.svg
            className="absolute top-40 right-96 w-48 h-48 opacity-20 hidden lg:block"
            viewBox="0 0 100 100"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {[
              { start: 0, end: 45, color: 'rgba(30, 58, 138, 0.3)' },
              { start: 45, end: 170, color: 'rgba(30, 58, 138, 0.2)' },
              { start: 170, end: 360, color: 'rgba(30, 58, 138, 0.1)' },
            ].map((segment, i) => (
              <motion.path
                key={`segment-${i}`}
                d={`M50,50 L${50 + 40 * Math.cos(segment.start * Math.PI / 180)},${50 + 40 * Math.sin(segment.start * Math.PI / 180)} A40,40 0 ${segment.end - segment.start > 180 ? 1 : 0},1 ${50 + 40 * Math.cos(segment.end * Math.PI / 180)},${50 + 40 * Math.sin(segment.end * Math.PI / 180)} Z`}
                fill={segment.color}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.svg>

          {/* Modern dental icon */}
          <motion.svg
            className="absolute top-60 right-40 w-32 h-32 opacity-20 hidden md:block"
            viewBox="0 0 100 100"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.path
              d="M50,20 C65,20 75,30 75,45 C75,60 70,80 50,80 C30,80 25,60 25,45 C25,30 35,20 50,20"
              fill="none"
              stroke="rgba(30, 58, 138, 0.3)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
            <motion.g
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <line
                x1="42"
                y1="45"
                x2="58"
                y2="45"
                stroke="rgba(30, 58, 138, 0.3)"
                strokeWidth="2"
              />
              <line
                x1="50"
                y1="37"
                x2="50"
                y2="53"
                stroke="rgba(30, 58, 138, 0.3)"
                strokeWidth="2"
              />
            </motion.g>
          </motion.svg>

          {/* Data connection lines */}
          <svg className="absolute inset-0 w-full h-full opacity-10">
            <motion.path
              d="M100,100 C150,150 200,50 250,100 C300,150 350,50 400,100"
              fill="none"
              stroke="rgba(30, 58, 138, 0.2)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
          </svg>
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
