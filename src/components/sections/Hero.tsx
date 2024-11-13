'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function Hero() {
  const decorativeDotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Subtle movement of decorative elements on mouse move
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
        
        {/* Decorative grid pattern */}
        <div className="absolute inset-0" 
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(30, 58, 138, 0.05) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Animated decorative dots */}
        <div ref={decorativeDotsRef} className="absolute inset-0 transition-transform duration-300 ease-out">
          <div className="absolute top-20 left-[20%] w-3 h-3 rounded-full bg-blue-200/50" />
          <div className="absolute top-40 right-[30%] w-2 h-2 rounded-full bg-blue-300/50" />
          <div className="absolute bottom-40 left-[40%] w-4 h-4 rounded-full bg-blue-100/50" />
        </div>

        {/* Abstract data visualization shapes */}
        <motion.div 
          className="absolute right-10 top-20 w-32 h-32"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="40" className="fill-blue-500/10 stroke-blue-500/30" strokeWidth="1"/>
            <path d="M30,50 L70,50 M50,30 L50,70" className="stroke-blue-500/30" strokeWidth="1"/>
          </svg>
        </motion.div>

        {/* Data lines */}
        <div className="absolute -bottom-10 left-0 right-0 h-40 opacity-10">
          <svg viewBox="0 0 1000 200" className="w-full h-full preserve-3d">
            <motion.path
              d="M0,100 Q250,150 500,100 T1000,100"
              className="stroke-blue-500 fill-none"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
            <motion.path
              d="M0,150 Q250,50 500,150 T1000,150"
              className="stroke-blue-400 fill-none"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatDelay: 1 }}
            />
          </svg>
        </div>
      </div>

      {/* Main content */}
      <div className="relative container mx-auto px-4 pt-32 pb-16 flex items-center min-h-[85vh]">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="p-1.5 mb-8 inline-block rounded-full bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200"
          >
            <span className="text-sm text-blue-700 px-4 py-1">
              Dental Analytics Platform
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl font-bold text-mednavi-blue mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
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
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Empower your dental practice with real-time analytics to improve patient experience and operational efficiency.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
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
