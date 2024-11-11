import Hero from '@/components/sections/Hero'
import Features from '@/components/sections/Features'
import About from '@/components/sections/About'
import Testimonials from '@/components/sections/Testimonials'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="pt-16">
      <Hero />
      <About />
      <Features />
      <Testimonials />
    </div>
  )
}
