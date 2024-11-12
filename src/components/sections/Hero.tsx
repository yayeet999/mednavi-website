'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

const DataFlow = () => {
  const flows = Array.from({ length: 15 }, (_, i) => ({
    startX: Math.random() * 100,
    startY: Math.random() * 100,
    endX: Math.random() * 100,
    endY: Math.random() * 100,
    delay: i * 0.2,
    duration: 3 + Math.random() * 2
  }))

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-blue-50/30" />
      {flows.map((flow, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-mednavi-blue/20 rounded-full"
          initial={{ x: `${flow.startX}%`, y: `${flow.startY}%`, scale: 0, opacity: 0 }}
          animate={{
            x: [`${flow.startX}%`, `${flow.endX}%`],
            y: [`${flow.startY}%`, `${flow.endY}%`],
            scale: [0, 1.5, 0],
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: flow.duration,
            delay: flow.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      {/* Data Grid Pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-5">
        <pattern
          id="grid"
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-br from-white to-blue-50">
      <DataFlow />
      
      <motion.div 
        className="relative container mx-auto px-4 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-3xl">
          <motion.h1>