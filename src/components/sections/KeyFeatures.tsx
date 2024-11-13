'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { BarChart3, DollarSign, Clock, LayoutDashboard } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FeatureItem {
  id: string
  icon: React.ReactNode
  title: string
  content: string
}

const features: FeatureItem[] = [
  {
    id: 'real-time',
    icon: <BarChart3 className="w-5 h-5" />,
    title: 'Real-Time Patient Analytics',
    content: 'With MedNavi, practices can access real-time patient metrics, such as appointment attendance, wait times, and treatment history. This enables dental professionals to make data-driven decisions to improve patient flow, reduce wait times, and enhance the overall patient experience.'
  },
  {
    id: 'revenue',
    icon: <DollarSign className="w-5 h-5" />,
    title: 'Revenue Optimization',
    content: 'MedNavi provides revenue insights that help practices identify high-performing services, optimize pricing strategies, and uncover growth opportunities. By analyzing patient behavior and financial trends, practices can increase profitability while maintaining high standards of care.'
  },
  {
    id: 'operations',
    icon: <Clock className="w-5 h-5" />,
    title: 'Operational Efficiency',
    content: 'Streamline your practice\'s operations with MedNavi\'s tools for managing appointment scheduling, resource allocation, and staff performance. Our analytics help identify bottlenecks in workflows, allowing you to optimize every aspect of practice management to enhance productivity and reduce costs.'
  },
  {
    id: 'dashboards',
    icon: <LayoutDashboard className="w-5 h-5" />,
    title: 'Customizable Dashboards',
    content: 'MedNavi offers customizable dashboards that cater to the unique needs of your practice. Whether you\'re focused on patient care, revenue, or operational efficiency, our dashboard allows you to tailor your analytics view to suit your goals, giving you a complete overview at a glance.'
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
  const [hasAnimated, setHasAnimated] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

  useEffect(() => {
    if (!hasAnimated) {
      controls.start({
        opacity: 1,
        x: 0,
        transition: { delay, duration: 0.5 }
      })
      setHasAnimated(true)
    }
  }, [controls, delay, hasAnimated])

  useEffect(() => {
    if (isActive && !isTyping) {
      setIsTyping(true)
    }
  }, [isActive])

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={controls}
      className={cn(
        "border-b border-gray-100 last:border-none",
        isActive && "bg-blue-50/30"
      )}
    >
      <div
        onClick={onToggle}
        className={cn(
          "flex items-center gap-4 p-6 cursor-pointer transition-colors",
          "hover:bg-blue-50/50"
        )}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: delay + 0.3 }}
          className={cn(
            "p-2 rounded-lg transition-colors",
            isActive ? "bg-mednavi-blue text-white" : "bg-blue-50 text-mednavi-blue"
          )}
        >
          {feature.icon}
        </motion.div>

        <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
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
            <div className="pl-16 pr-6 pb-6" ref={contentRef}>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-gray-600 leading-relaxed"
              >
                {feature.content}
              </motion.p>
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-mednavi-blue mb-4">
            Overview of MedNavi
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            A comprehensive dental analytics platform designed to transform complex dental data into actionable insights. 
            Empowering dental practices with real-time analytics to enhance patient experience, optimize operations, and drive business growth.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
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
    </section>
  )
}
