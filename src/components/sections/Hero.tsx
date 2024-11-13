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
          {/* Animated chart lines */}
          <motion.svg
            className="absolute top-20 right-20 w-64 h-32 opacity-20"
            viewBox="0 0 256 128"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.path
              d="M0,64 C32,32 64,96 96,64 C128,32 160,96 192,64 C224,32 256,64 256,64"
              fill="none"
              stroke="rgba(30, 58, 138, 0.3)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            />
          </motion.svg>

          {/* Dental-inspired decorative elements */}
          <motion.div
            className="absolute left-20 top-40 w-40 h-40 opacity-10"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d="M50,20 C70,20 80,40 80,60 C80,80 70,90 50,90 C30,90 20,80 20,60 C20,40 30,20 50,20"
                className="fill-none stroke-blue-500"
                strokeWidth="1"
              />
              {/* Simplified tooth root lines */}
              <path
                d="M40,80 L35,95 M60,80 L65,95"
                className="stroke-blue-500"
                strokeWidth="1"
              />
            </svg>
          </motion.div>

          {/* Data points and connection lines */}
          <div ref={decorativeDotsRef} className="absolute inset-0 transition-transform duration-300 ease-out">
            <motion.div 
              className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-blue-400/30"
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div 
              className="absolute top-1/3 right-1/3 w-3 h-3 rounded-full bg-blue-300/40"
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            />
            <motion.div 
              className="absolute bottom-1/3 left-1/4 w-2 h-2 rounded-full bg-blue-500/30"
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
            />
          </div>
        </div>

        {/* Animated bottom wave */}
        <div className="absolute -bottom-10 left-0 right-0 h-40 opacity-10">
          <svg viewBox="0 0 1000 200" className="w-full h-full">
            <motion.path
              d="M0,100 Q250,150 500,100 T1000,100"
              className="stroke-blue-500 fill-none"
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
