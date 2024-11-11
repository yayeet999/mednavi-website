'use client'
import Hero from '@/components/sections/Hero'
import Features from '@/components/sections/Features'
import AnalyticsComparison from '@/components/sections/AnalyticsComparison'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="pt-16">
      <Hero />
      <AnalyticsComparison />
      <Features />
    </div>
  )
}