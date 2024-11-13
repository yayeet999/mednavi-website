'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useAnimation } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function Hero() {
  const decorativeDotsRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

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

  useEffect(() => {
    controls.start(i => ({
      scaleY: 1,
      opacity: 1,
      transition: { 
        delay: i * 0.2,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }));
  }, [controls]);

  return (
    <section className="relative min-h-[85vh] overflow-hidden">
      {/* Enhanced background with subtle noise texture */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100/80" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
            backgroundSize: '256px 256px'
          }} 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent" />
      </div>

      {/* Enhanced decorative pattern */}
      <div 
        ref={decorativeDotsRef}
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20px 20px, rgba(37, 99, 235, 0.1) 2px, transparent 0),
            linear-gradient(120deg, rgba(37, 99, 235, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px, 120px 120px'
        }}
      />

      {/* Enhanced data visualizations */}
      <div className="absolute right-0 inset-y-0 flex flex-col items-end justify-center pr-36 space-y-12">
        {/* Animated pie chart */}
        <motion.svg
          className="w-56 h-56 opacity-20 hidden lg:block"
          viewBox="0 0 100 100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(37, 99, 235, 0.3)"
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.path
            d="M50,50 L50,5 A45,45 0 0,1 95,50 Z"
            fill="rgba(37, 99, 235, 0.25)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          />
        </motion.svg>

        {/* Enhanced animated bar chart */}
        <motion.svg
          className="w-64 h-48 opacity-20 hidden md:block"
          viewBox="0 0 240 180"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {[
            { height: 60, delay: 0 },
            { height: 100, delay: 0.2 },
            { height: 140, delay: 0.4 },
            { height: 120, delay: 0.6 },
            { height: 160, delay: 0.8 }
          ].map((bar, i) => (
            <motion.rect
              key={i}
              x={20 + i * 48}
              width="32"
              y={180}
              height={bar.height}
              fill="rgba(37, 99, 235, 0.25)"
              rx="6"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={controls}
              custom={i}
              style={{ originY: 1 }}
            >
              <animate
                attributeName="height"
                values={`${bar.height - 20};${bar.height};${bar.height - 20}`}
                dur="4s"
                repeatCount="indefinite"
                begin={`${bar.delay}s`}
              />
            </motion.rect>
          ))}
        </motion.svg>
      </div>

      {/* Main content */}
      <div className="relative container mx-auto px-4 pt-20 pb-16 flex items-center min-h-[85vh]">
        <div className="max-w-3xl">
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-blue-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Transforming Dental Data into{' '}
            <span className="relative inline-block">
              Actionable
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-3 bg-blue-200/40 rounded-full"
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
            className="flex flex-col sm:flex-row gap-4 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/contact">
              <Button 
                size="lg" 
                className="w-full sm:w-auto"
              >
                Get Started
              </Button>
            </Link>
            <Link href="/services">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto"
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
