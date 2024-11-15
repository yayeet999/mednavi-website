'use client'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import Hero from '@/components/sections/Hero'
import KeyFeatures from '@/components/sections/KeyFeatures'
import Features from '@/components/sections/Features'
import AnalyticsComparison from '@/components/sections/AnalyticsComparison'

// Dynamically import SmoothJourney with no SSR
const SmoothJourney = dynamic(
  () => import('@/components/sections/SmoothJourney'),
  { ssr: false }
)

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
}

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
}

export default function Home() {
  return (
    <motion.div 
      className="pt-16"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.section variants={sectionVariants}>
        <Hero />
      </motion.section>
      <motion.section variants={sectionVariants}>
        <SmoothJourney />
      </motion.section>
      <motion.section variants={sectionVariants}>
        <KeyFeatures />
      </motion.section>
      <motion.section variants={sectionVariants}>
        <AnalyticsComparison />
      </motion.section>
      <motion.section variants={sectionVariants}>
        <Features />
      </motion.section>
    </motion.div>
  )
}
