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
          {/* Improved bar chart */}
          <motion.svg
            className="absolute top-24 right-20 w-64 h-48 opacity-25 hidden md:block"
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
                strokeDasharray="4 4"
              />
            ))}
            {[20, 60, 100, 140, 180].map((x, i) => (
              <motion.rect
                key={`bar-${i}`}
                x={x - 12}
                width="24"
                y={150 - (i + 1) * 30}
                height={(i + 1) * 30}
                rx="4"
                fill="rgba(30, 58, 138, 0.2)"
                initial={{ height: 0, y: 150 }}
                animate={{ height: (i + 1) * 30, y: 150 - (i + 1) * 30 }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 1,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.svg>

          {/* Animated pie chart */}
          <motion.svg
            className="absolute top-28 right-96 w-48 h-48 opacity-25 hidden lg:block"
            viewBox="0 0 100 100"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 1 }}
          >
            {[120, 240, 360].map((end, i) => (
              <motion.path
                key={`segment-${i}`}
                d={`M50,50 L${50 + 40 * Math.cos((end - 120) * Math.PI / 180)},${50 + 40 * Math.sin((end - 120) * Math.PI / 180)} A40,40 0 ${end - (end - 120) > 180 ? 1 : 0},1 ${50 + 40 * Math.cos(end * Math.PI / 180)},${50 + 40 * Math.sin(end * Math.PI / 180)} Z`}
                fill={`rgba(30, 58, 138, ${0.15 * (i + 1)})`}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 1,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.svg>

          {/* Monitor with line chart moved down */}
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-80 h-48 hidden md:block">
            <motion.div
              className="relative w-full h-full bg-white rounded-lg shadow-lg overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="absolute inset-0 border-4 border-gray-200 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <motion.div
                  className="absolute inset-2 bg-white rounded-md overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.3 }}
                >
                  <svg className="w-full h-full" viewBox="0 0 300 200">
                    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} transition={{ delay: 1, duration: 0.5 }}>
                      {[0, 1, 2, 3, 4].map((i) => (
                        <line
                          key={`h-grid-${i}`}
                          x1="0"
                          y1={i * 50}
                          x2="300"
                          y2={i * 50}
                          stroke="#1E3A8A"
                          strokeWidth="1"
                          strokeDasharray="4 4"
                        />
                      ))}
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <line
                          key={`v-grid-${i}`}
                          x1={i * 60}
                          y1="0"
                          x2={i * 60}
                          y2="200"
                          stroke="#1E3A8A"
                          strokeWidth="1"
                          strokeDasharray="4 4"
                        />
                      ))}
                    </motion.g>
                    <motion.path
                      d="M0,180 C100,150 200,80 300,20"
                      fill="none"
                      stroke="rgba(30, 58, 138, 0.5)"
                      strokeWidth="3"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 1.3, duration: 1.5, ease: "easeInOut" }}
                    />
                    <motion.text
                      x="285"
                      y="15"
                      fontSize="24"
                      fill="rgba(30, 58, 138, 0.8)"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 2.8, duration: 0.3 }}
                    >
                      $
                    </motion.text>
                  </svg>
                </motion.div>
              </motion.div>
              <motion.div
                className="absolute -bottom-4 left-1/2 w-16 h-8 bg-gray-200 rounded-lg transform -translate-x-1/2"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative container mx-auto px-4 pt-16 pb-8 flex flex-col min-h-[85vh]">
        <div className="max-w-3xl mb-auto">
          <motion.h1 className="text-5xl md:text-6xl font-bold text-mednavi-blue mb-6"
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
          
          <motion.p className="text-xl text-gray-600 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Empower your dental practice with real-time analytics to improve patient experience and operational efficiency.
          </motion.p>
          
          <motion.div className="flex flex-col sm:flex-row gap-4 mb-8"
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
