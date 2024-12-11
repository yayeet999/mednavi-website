'use client'
import { AnimatePresence } from 'framer-motion'
import ServicesHero from '@/components/sections/ServicesHero'
import ServicesList from '@/components/sections/ServicesList'
import Integration from '@/components/sections/Integration'
import WhyChoose from '@/components/sections/WhyChoose'
import Overview from '@/components/sections/Overview'
import { useEffect } from 'react'

export default function Services() {
  useEffect(() => {
    return () => {
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
        <Overview />
        <ServicesList />
        <Integration />
        <WhyChoose />
      </div>
    </AnimatePresence>
  )
}
