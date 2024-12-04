'use client'
import React, { useEffect, useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, BarChart2, Map, MapPin, Bot } from 'lucide-react'
import DashboardContainer from '@/components/dashboard/DashboardContainer'
import DashboardContainer2 from '@/components/dashboard/DashboardContainer2'
import DashboardContainer3 from '@/components/dashboard/DashboardContainer3'
import DashboardContainer4 from '@/components/dashboard/DashboardContainer4'

const stations = [
  { id: 'overview', x: '50%', y: '50%' },
  { id: 'practice', x: '50%', y: '50%' },
  { id: 'map', x: '50%', y: '50%' },
  { id: 'location', x: '50%', y: '50%' }
]

const navigationIcons = [
  { id: 'overview', Icon: Home },
  { id: 'practice', Icon: BarChart2 },
  { id: 'map', Icon: Map },
  { id: 'location', Icon: MapPin }
]

const SmoothJourney: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Cleanup function for animations
  useEffect(() => {
    const cleanup = () => {
      if (containerRef.current) {
        const elements = containerRef.current.querySelectorAll('.framer-motion-elements')
        elements.forEach(el => {
          if (el && el.parentNode) {
            try {
              el.parentNode.removeChild(el)
            } catch (error) {
              console.log('Animation cleanup error handled:', error)
            }
          }
        })
      }
    }

    return cleanup
  }, [])

  const navigate = useCallback((index: number) => {
    if (isAnimating || index === currentIndex) return
    
    setIsAnimating(true)
    
    // Cleanup previous animations before transition
    const elements = document.querySelectorAll('.framer-motion-elements')
    elements.forEach(el => {
      if (el && el.parentNode) {
        try {
          el.parentNode.removeChild(el)
        } catch (error) {
          console.log('Navigation cleanup error handled:', error)
        }
      }
    })

    setCurrentIndex(index)
    setTimeout(() => setIsAnimating(false), 1000)
  }, [currentIndex, isAnimating])

  const getNextIndex = useCallback(() => (currentIndex + 1) % stations.length, [currentIndex])
  
  const navigateToContainer = useCallback(() => navigate(1), [navigate])
  const navigateToHome = useCallback(() => navigate(0), [navigate])
  const navigateToPractice = useCallback(() => navigate(1), [navigate])
  const navigateToLocation = useCallback(() => navigate(3), [navigate])

  return (
    <div ref={containerRef} className="relative w-full h-[calc(100vh-4rem)] overflow-hidden bg-gray-50">
      <div className="absolute inset-0 flex items-center justify-center">
        <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {stations.map((_, i) => (
            <g key={i} className="transition-opacity duration-500">
              <path
                d={`M50,50 L${50 + Math.cos((i * Math.PI) / 2) * 40},${
                  50 + Math.sin((i * Math.PI) / 2) * 40
                }`}
                stroke="#E5E7EB"
                strokeWidth="0.5"
                className="opacity-70"
              />
            </g>
          ))}
        </svg>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="relative w-[360px] md:w-[840px] h-[340px] md:h-[480px] framer-motion-elements"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <div className="pb-4 md:pb-6">
              <div className="w-full h-full bg-white rounded-xl shadow-lg">
                {currentIndex === 0 ? (
                  <DashboardContainer onNavigate={navigateToContainer} />
                ) : currentIndex === 1 ? (
                  <DashboardContainer2 onNavigateToMap={() => navigate(2)} />
                ) : currentIndex === 2 ? (
                  <DashboardContainer3
                    onNavigateToHome={navigateToHome}
                    onNavigateToPractice={navigateToPractice}
                    onNavigateToLocation={navigateToLocation}
                  />
                ) : (
                  <DashboardContainer4
                    onNavigateToHome={navigateToHome}
                    onNavigateToPractice={navigateToPractice}
                    onNavigateToMap={() => navigate(2)}
                  />
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {isVisible && (
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-6 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {navigationIcons.map((nav, i) => {
            const { Icon } = nav
            return (
              <button
                key={i}
                onClick={() => navigate(i)}
                disabled={isAnimating}
                className={`
                  flex items-center justify-center
                  ${isMobile ? 'w-10 h-10' : 'w-6 h-6'}
                  rounded-full transform transition-all duration-300
                  ${i === currentIndex 
                    ? 'bg-blue-800 scale-110 ring-4 ring-blue-300 animate-pulse' 
                    : 'bg-blue-600 hover:bg-blue-700 hover:scale-105'}
                  disabled:opacity-50
                `}
                aria-label={`Navigate to ${nav.id}`}
              >
                <Icon 
                  size={isMobile ? 20 : 14} 
                  className={`transform transition-colors duration-300
                             ${i === currentIndex ? 'text-white' : 'text-white/90'}`}
                />
              </button>
            )
          })}
        </motion.div>
      )}

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1.1);
            opacity: 1;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  )
}

export default SmoothJourney
