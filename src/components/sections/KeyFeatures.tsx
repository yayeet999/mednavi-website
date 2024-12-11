'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, LineChart, Zap, Clock, LayoutDashboard, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FeatureItem {
  id: string
  icon: React.ReactNode
  title: string
  content: string
  benefits: string[]
  metrics: string[]
}

const features: FeatureItem[] = [
  {
    id: 'real-time',
    icon: <LineChart className="w-6 h-6" />,
    title: 'Real-Time Patient Analytics',
    content: 'With mednavi, access instant insights into patient metrics including appointment attendance, wait times, and treatment history. Make informed decisions to optimize patient flow and enhance the overall care experience.',
    benefits: [
      'Track patient wait times and optimize scheduling',
      'Monitor treatment plan completion rates',
      'Analyze patient satisfaction metrics in real-time',
      'Identify and reduce appointment bottlenecks'
    ],
    metrics: [
      'Reduce wait times by up to 30%',
      'Improve patient satisfaction scores',
      'Increase appointment efficiency',
      'Better resource allocation'
    ]
  },
  {
    id: 'revenue',
    icon: <Zap className="w-6 h-6" />,
    title: 'Revenue Optimization',
    content: 'mednavi helps identify high-performing services and growth opportunities through detailed financial analytics. Understand patient behavior and revenue trends to increase profitability while maintaining excellent care standards.',
    benefits: [
      'Track revenue trends across all services',
      'Analyze insurance claim success rates',
      'Monitor treatment acceptance rates',
      'Identify most profitable procedures'
    ],
    metrics: [
      'Increase revenue per patient visit',
      'Improve insurance claim acceptance',
      'Optimize pricing strategies',
      'Enhance treatment plan acceptance'
    ]
  },
  {
    id: 'operations',
    icon: <Clock className="w-6 h-6" />,
    title: 'Operational Efficiency',
    content: 'Streamline your practice operations with mednavi\'s comprehensive tools for appointment scheduling and resource management. Identify workflow bottlenecks and optimize practice efficiency to reduce costs and improve productivity.',
    benefits: [
      'Streamline appointment scheduling',
      'Optimize staff scheduling',
      'Track equipment utilization',
      'Reduce administrative overhead'
    ],
    metrics: [
      'Improve staff productivity',
      'Reduce scheduling conflicts',
      'Optimize resource utilization',
      'Minimize operational costs'
    ]
  },
  {
    id: 'dashboards',
    icon: <LayoutDashboard className="w-6 h-6" />,
    title: 'Customizable Dashboards',
    content: 'mednavi provides tailored dashboards that match your practice\'s specific needs. Whether focusing on patient care, revenue, or operations, get a complete overview of your practice metrics at a glance.',
    benefits: [
      'Create role-specific dashboards',
      'Customize metric tracking',
      'Set automated alerts',
      'Generate custom reports'
    ],
    metrics: [
      'Real-time performance tracking',
      'Automated report generation',
      'Key metric monitoring',
      'Trend analysis visualization'
    ]
  }
]

const AccordionItem = ({
  feature,
  isActive,
  onToggle
}: {
  feature: FeatureItem
  isActive: boolean
  onToggle: () => void
}) => {
  return (
    <div
      className={cn(
        "border-b border-blue-200/30 last:border-none overflow-hidden",
        "backdrop-blur-sm transition-colors duration-300",
        isActive ? "bg-white/80" : "bg-blue-50/80 hover:bg-white/60"
      )}
    >
      <button
        onClick={onToggle}
        className="w-full text-left px-6 py-5 flex items-center gap-4 group"
      >
        <div
          className={cn(
            "p-3 rounded-xl transition-all duration-300",
            isActive 
              ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/20"
              : "bg-blue-100 text-blue-600 group-hover:shadow-md group-hover:shadow-blue-500/10"
          )}
        >
          {feature.icon}
        </div>

        <h3 className="flex-1 text-lg font-semibold text-gray-900">
          {feature.title}
        </h3>

        <ChevronDown 
          className={cn(
            "w-5 h-5 text-gray-400 transition-transform duration-300",
            isActive && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pl-[4.5rem]">
              <p className="text-gray-600 leading-relaxed mb-4">
                {feature.content}
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-blue-900 mb-3">Key Benefits</h4>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-blue-900 mb-3">Impact Metrics</h4>
                  <ul className="space-y-2">
                    {feature.metrics.map((metric, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                        <span className="text-gray-600">{metric}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function KeyFeatures() {
  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated dots background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50/30" />
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0.03 }}
          animate={{
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `radial-gradient(circle at center, #1E40AF 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
            Key Features
          </h2>
          <p className="text-gray-600 max-w-4xl mx-auto text-lg">
            Explore the powerful features that make MedNavi the ultimate solution for dental practice analytics.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden bg-white/70 backdrop-blur-sm shadow-xl shadow-blue-500/10 border border-blue-100/50">
            {features.map((feature) => (
              <AccordionItem
                key={feature.id}
                feature={feature}
                isActive={activeId === feature.id}
                onToggle={() => setActiveId(activeId === feature.id ? null : feature.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
