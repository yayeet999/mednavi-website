'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ActivitySquare, LineChart, Clock, LayoutDashboard } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FeatureItem {
  id: string
  icon: React.ReactNode
  title: string
  content: string
  illustration: React.ReactNode
}

const features: FeatureItem[] = [
  {
    id: 'real-time',
    icon: <ActivitySquare className="w-6 h-6" />,
    title: 'Real-Time Patient Analytics',
    content: 'With MedNavi, practices can access real-time patient metrics, such as appointment attendance, wait times, and treatment history. This enables dental professionals to make data-driven decisions to improve patient flow, reduce wait times, and enhance the overall patient experience.',
    illustration: (
      <svg className="w-32 h-32" viewBox="0 0 100 100">
        <motion.path
          d="M10,50 L30,30 L50,60 L70,20 L90,40"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <motion.circle
          cx="30" cy="30" r="3"
          fill="currentColor"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
        />
        <motion.circle
          cx="50" cy="60" r="3"
          fill="currentColor"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.7 }}
        />
        <motion.circle
          cx="70" cy="20" r="3"
          fill="currentColor"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.9 }}
        />
      </svg>
    )
  },
  {
    id: 'revenue',
    icon: <LineChart className="w-6 h-6" />,
    title: 'Revenue Optimization',
    content: 'MedNavi provides revenue insights that help practices identify high-performing services, optimize pricing strategies, and uncover growth opportunities. By analyzing patient behavior and financial trends, practices can increase profitability while maintaining high standards of care.',
    illustration: (
      <svg className="w-32 h-32" viewBox="0 0 100 100">
        <motion.rect
          x="10" y="60"
          width="15" height="30"
          fill="currentColor"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.rect
          x="35" y="40"
          width="15" height="50"
          fill="currentColor"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        <motion.rect
          x="60" y="20"
          width="15" height="70"
          fill="currentColor"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />
      </svg>
    )
  },
  {
    id: 'operations',
    icon: <Clock className="w-6 h-6" />,
    title: 'Operational Efficiency',
    content: 'Streamline your practice\'s operations with MedNavi\'s tools for managing appointment scheduling, resource allocation, and staff performance. Our analytics help identify bottlenecks in workflows, allowing you to optimize every aspect of practice management to enhance productivity and reduce costs.',
    illustration: (
      <svg className="w-32 h-32" viewBox="0 0 100 100">
        <motion.circle
          cx="50" cy="50" r="40"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.line
          x1="50" y1="50"
          x2="75" y2="50"
          stroke="currentColor"
          strokeWidth="2"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: '50px 50px' }}
        />
      </svg>
    )
  },
  {
    id: 'dashboards',
    icon: <LayoutDashboard className="w-6 h-6" />,
    title: 'Customizable Dashboards',
    content: 'MedNavi offers customizable dashboards that cater to the unique needs of your practice. Whether you\'re focused on patient care, revenue, or operational efficiency, our dashboard allows you to tailor your analytics view to suit your goals, giving you a complete overview at a glance.',
    illustration: (
      <svg className="w-32 h-32" viewBox="0 0 100 100">
        <motion.rect
          x="10" y="10"
          width="35" height="35"
          rx="4"
          fill="currentColor"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.3 }}
        />
        <motion.rect
          x="55" y="10"
          width="35" height="35"
          rx="4"
          fill="currentColor"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        />
        <motion.rect
          x="10" y="55"
          width="35" height="35"
          rx="4"
          fill="currentColor"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        />
        <motion.rect
          x="55" y="55"
          width="35" height="35"
          rx="4"
          fill="currentColor"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        />
      </svg>
    )
  }
]

const AccordionItem = ({
  feature,
  isActive,
  onToggle,
  delay
}: {
  feature: FeatureItem
  isActive: boolean
  onToggle: () => void
  delay: number
}) => {
  const itemRef = useRef<HTMLDivElement>(null)
  
  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={cn(
        "border-b border-gray-100 last:border-none overflow-hidden",
        "group hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-transparent",
        "transition-all duration-300"
      )}
    >
      <div
        onClick={onToggle}
        className={cn(
          "flex items-center gap-4 p-6 cursor-pointer",
          "transition-colors duration-300"
        )}
      >
        <motion.div
          className={cn(
            "p-3 rounded-xl transition-all duration-300",
            isActive 
              ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white"
              : "bg-blue-50 text-blue-600 group-hover:bg-blue-100"
          )}
        >
          {feature.icon}
        </motion.div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
        </div>

        <motion.div
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "w-6 h-6 text-gray-400",
            "group-hover:text-blue-600 transition-colors"
          )}
        >
          <ChevronDown />
        </motion.div>
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 flex items-start gap-8">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 text-gray-600 leading-relaxed"
              >
                {feature.content}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="hidden lg:block text-blue-600"
              >
                {feature.illustration}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function KeyFeatures() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white pointer-events-none" />
      
      <motion.div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23blue' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`
        }}
      />

      <div className="container mx-auto px-4" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Overview of MedNavi
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            A comprehensive dental analytics platform designed to transform complex dental data into actionable insights. 
            Empowering dental practices with real-time analytics to enhance patient experience, optimize operations, and drive business growth.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-blue-50/30 pointer-events-none" />
          
          {features.map((feature, index) => (
            <AccordionItem
              key={feature.id}
              feature={feature}
              isActive={activeId === feature.id}
              onToggle={() => setActiveId(activeId === feature.id ? null : feature.id)}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>

      {/* Dynamic background pattern */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.05, 0] }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut",
        }}
      >
        {/* Fluid animation pattern */}
        <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'rgb(37, 99, 235)', stopOpacity: 0.1 }} />
              <stop offset="100%" style={{ stopColor: 'rgb(59, 130, 246)', stopOpacity: 0.05 }} />
            </linearGradient>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                result="goo"
              />
            </filter>
          </defs>
          <g filter="url(#goo)">
            <motion.circle
              cx="10%"
              cy="50%"
              r="50"
              fill="url(#gradient)"
              animate={{
                cx: ["10%", "90%", "10%"],
                cy: ["30%", "70%", "30%"],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.circle
              cx="90%"
              cy="50%"
              r="40"
              fill="url(#gradient)"
              animate={{
                cx: ["90%", "10%", "90%"],
                cy: ["70%", "30%", "70%"],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </g>
        </svg>
      </motion.div>
    </section>
  )
}
