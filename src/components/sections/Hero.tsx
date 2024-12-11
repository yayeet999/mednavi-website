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
    <section className="relative min-h-[85vh] overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent" />
      </div>

      {/* Decorative Pattern */}
      <div 
        ref={decorativeDotsRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20px 20px, rgba(30, 58, 138, 0.1) 1px, transparent 0),
            linear-gradient(120deg, rgba(30, 58, 138, 0.05) 1px, transparent 1px)`,
          backgroundSize: '100px 100px, 200px 200px'
        }}
      />

      {/* Data Visualization: Tooth + Arcs */}
      <div className="absolute right-0 inset-y-0 flex flex-col items-end justify-center pr-36 space-y-10">
        <motion.svg
          className="w-64 h-64 opacity-25 hidden lg:block"
          viewBox="0 0 200 200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Group for arcs and tooth silhouette */}
          <motion.g
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
          >
            {/* Central tooth silhouette (simplified) */}
            <motion.path
              d="M100,80 
                 c-10,-20 -30,-20 -40,0 
                 c-5,10 -5,25 0,35 
                 c5,10 10,20 20,20 
                 c10,0 15,-10 20,-20 
                 c5,-10 5,-25 0,-35 
                 c-10,-20 -30,-20 -40,0z"
              fill="rgba(30, 58, 138, 0.2)"
              initial={{ scale: 0.9 }}
              animate={{ scale: [0.9, 1, 0.95, 1] }}
              transition={{ duration: 5, repeat: Infinity, repeatType: "mirror" }}
              transform="translate(40,30)"
            />

            {/* Arcs representing data */}
            {/* Outer Arc */}
            <motion.path
              d="M50,100 a50,50 0 0,1 100,0"
              fill="none"
              stroke="rgba(30,58,138,0.2)"
              strokeWidth="4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            {/* Middle Arc */}
            <motion.path
              d="M60,100 a40,40 0 0,1 80,0"
              fill="none"
              stroke="rgba(30,58,138,0.15)"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
            />
            {/* Inner Arc */}
            <motion.path
              d="M70,100 a30,30 0 0,1 60,0"
              fill="none"
              stroke="rgba(30,58,138,0.1)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut", delay: 1 }}
            />
          </motion.g>
        </motion.svg>
      </div>

      {/* Main Content */}
      <div className="relative container mx-auto px-4 pt-20 pb-16 flex items-center min-h-[85vh]">
        <div className="max-w-3xl">
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-blue-900 mb-6"
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
