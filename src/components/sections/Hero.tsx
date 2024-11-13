'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function Hero() {
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
          {/* Improved animated bar chart */}
          <motion.svg
            className="absolute top-16 right-12 w-64 h-48 opacity-25 hidden md:block"
            viewBox="0 0 200 150"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Background grid */}
            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={`grid-${i}`}
                x1="0"
                y1={30 * i}
                x2="200"
                y2={30 * i}
                stroke="rgba(30, 58, 138, 0.1)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            ))}
            
            {/* Animated bars with better aesthetics */}
            {[
              { x: 20, height: 100, delay: 0 },
              { x: 60, height: 120, delay: 0.1 },
              { x: 100, height: 80, delay: 0.2 },
              { x: 140, height: 110, delay: 0.3 },
              { x: 180, height: 130, delay: 0.4 },
            ].map((bar, i) => (
              <motion.rect
                key={`bar-${i}`}
                x={bar.x - 12}
                width="24"
                y={150 - bar.height}
                height={bar.height}
                rx="4"
                fill="rgba(30, 58, 138, 0.2)"
                initial={{ height: 0, y: 150 }}
                animate={{ 
                  height: bar.height, 
                  y: 150 - bar.height,
                }}
                transition={{
                  duration: 1,
                  delay: bar.delay,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.svg>

          {/* Improved animated pie chart */}
          <motion.svg
            className="absolute top-28 right-80 w-48 h-48 opacity-25 hidden lg:block"
            viewBox="0 0 100 100"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {[
              { start: 0, end: 120, color: 'rgba(30, 58, 138, 0.3)' },
              { start: 120, end: 240, color: 'rgba(30, 58, 138, 0.2)' },
              { start: 240, end: 360, color: 'rgba(30, 58, 138, 0.15)' },
            ].map((segment, i) => (
              <motion.path
                key={`segment-${i}`}
                d={`M50,50 L${50 + 40 * Math.cos(segment.start * Math.PI / 180)},${50 + 40 * Math.sin(segment.start * Math.PI / 180)} A40,40 0 ${segment.end - segment.start > 180 ? 1 : 0},1 ${50 + 40 * Math.cos(segment.end * Math.PI / 180)},${50 + 40 * Math.sin(segment.end * Math.PI / 180)} Z`}
                fill={segment.color}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: 1,
                  rotate: [0, 10, 0]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  rotate: {
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }
                }}
              />
            ))}
          </motion.svg>

          {/* Improved dental icon matching reference */}
          <motion.svg
            className="absolute top-44 right-32 w-28 h-28 opacity-25 hidden md:block"
            viewBox="0 0 100 100"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.path
              d="M35,25 C35,25 38,20 50,20 C62,20 65,25 65,25 C65,25 80,35 80,55 C80,85 65,95 50,95 C35,95 20,85 20,55 C20,35 35,25 35,25"
              fill="none"
              stroke="rgba(30, 58, 138, 0.3)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2 }}
            />
            {/* Cross icon */}
            <motion.g
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <circle
                cx="70"
                cy="30"
                r="12"
                fill="rgba(30, 58, 138, 0.1)"
                stroke="rgba(30, 58, 138, 0.3)"
                strokeWidth="2"
              />
              <line
                x1="65"
                y1="30"
                x2="75"
                y2="30"
                stroke="rgba(30, 58, 138, 0.3)"
                strokeWidth="2"
              />
              <line
                x1="70"
                y1="25"
                x2="70"
                y2="35"
                stroke="rgba(30, 58, 138, 0.3)"
                strokeWidth="2"
              />
            </motion.g>
          </motion.svg>

          {/* Added trend line chart */}
          <motion.svg
            className="absolute top-60 right-56 w-64 h-32 opacity-20 hidden lg:block"
            viewBox="0 0 200 100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.path
              d="M0,80 C40,70 80,60 120,40 C160,20 180,10 200,10"
              fill="none"
              stroke="rgba(30, 58, 138, 0.3)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2 }}
            />
            <motion.circle
              cx="120"
              cy="40"
              r="3"
              fill="rgba(30, 58, 138, 0.3)"
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.svg>
        </div>
      </div>

      {/* Main content */}
      <div className="relative container mx-auto px-4 pt-16 pb-8 flex flex-col min-h-[85vh]">
        <div className="max-w-3xl mb-auto">
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
            className="flex flex-col sm:flex-row gap-4 mb-12"
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

        {/* Power of Data-Driven Decisions section */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-mednavi-blue mb-2">
            The Power of Data-Driven Decisions
          </h2>
          <p className="text-gray-600">
            See how data analytics transforms dental practice performance
          </p>
        </motion.div>
      </div>
    </section>
  )
}
