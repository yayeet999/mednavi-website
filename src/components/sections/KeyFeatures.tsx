'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, LineChart, Zap, Clock, LayoutDashboard } from 'lucide-react'
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
    icon: <LineChart className="w-6 h-6" />,
    title: 'Real-Time Patient Analytics',
    content: 'With mednavi, access instant insights into patient metrics including appointment attendance, wait times, and treatment history. Make informed decisions to optimize patient flow and enhance the overall care experience.'
  },
  {
    id: 'revenue',
    icon: <Zap className="w-6 h-6" />,
    title: 'Revenue Optimization',
    content: 'mednavi helps identify high-performing services and growth opportunities through detailed financial analytics. Understand patient behavior and revenue trends to increase profitability while maintaining excellent care standards.'
  },
  {
    id: 'operations',
    icon: <Clock className="w-6 h-6" />,
    title: 'Operational Efficiency',
    content: 'Streamline your practice operations with mednavi\'s comprehensive tools for appointment scheduling and resource management. Identify workflow bottlenecks and optimize practice efficiency to reduce costs and improve productivity.'
  },
  {
    id: 'dashboards',
    icon: <LayoutDashboard className="w-6 h-6" />,
    title: 'Customizable Dashboards',
    content: 'mednavi provides tailored dashboards that match your practice\'s specific needs. Whether focusing on patient care, revenue, or operations, get a complete overview of your practice metrics at a glance.'
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
        "border-b border-blue-100/20 last:border-none overflow-hidden",
        "backdrop-blur-sm transition-colors duration-300",
        isActive ? "bg-white/40" : "bg-white/20 hover:bg-white/30"
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
              : "bg-blue-50 text-blue-600 group-hover:shadow-md group-hover:shadow-blue-500/10"
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
            <div className="px-6 pb-5 pl-[4.5rem]">
              <p className="text-gray-600 leading-relaxed">
                {feature.content}
              </p>
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
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white to-white" />
      
      <div className="container relative mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
            Overview of MedNavi
          </h2>
          <p className="text-gray-600 max-w-4xl mx-auto text-lg leading-relaxed">
            MedNavi is a dental analytics platform built to help practices unlock the full potential of their data. By transforming complex data into easy-to-understand insights, mednavi supports practices in making smart, real-time decisions—whether it's improving patient flow, fine-tuning appointment schedules, or tracking treatment outcomes. This allows dental teams to spend more time focusing on what truly matters: providing top-notch patient care. With mednavi, you can streamline day-to-day operations, identify new revenue opportunities, and gain a deeper understanding of your patients' needs and satisfaction. It's more than just a reporting tool; mednavi is a powerful partner that helps you build a thriving, patient-centered practice in today's data-driven world.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-white/50 to-blue-50/50 backdrop-blur-sm shadow-xl shadow-blue-500/10">
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

      {/* Decorative grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231E3A8A' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />
    </section>
  )
}
