'use client'
import { AnimatePresence } from 'framer-motion'
import ServicesHero from '@/components/sections/ServicesHero'
import ServicesList from '@/components/sections/ServicesList'
import Integration from '@/components/sections/Integration'
import WhyChoose from '@/components/sections/WhyChoose'
import { useEffect } from 'react'

export default function Services() {
  // Add cleanup effect for the entire services page
  useEffect(() => {
    return () => {
      // Cleanup any lingering animation elements
      const elements = document.querySelectorAll('.framer-motion-elements')
      elements.forEach(el => {
        if (el && el.parentNode) {
          el.parentNode.removeChild(el)
        }
      })
    }
  }, [])

  return (
    <AnimatePresence mode="wait">
      <div className="pt-16">
        <ServicesHero />
        <ServicesList />
        <Integration />
        <WhyChoose />
      </div>
    </AnimatePresence>
  )
}
