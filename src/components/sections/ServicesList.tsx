'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { LineChart, PieChart, BarChart } from 'lucide-react'
import { useEffect } from 'react'

const services = [
  {
    icon: <LineChart className="w-12 h-12 text-mednavi-blue" />,
    title: "Real-Time Analytics",
    description: "Track key metrics in real-time, from patient attendance rates to revenue trends. Make informed decisions with up-to-the-minute data.",
    features: [
      "Patient attendance tracking",
      "Revenue analytics",
      "Appointment efficiency metrics",
      "Custom dashboard views"
    ]
  },
  {
    icon: <PieChart className="w-12 h-12 text-mednavi-blue" />,
    title: "Insurance Claims Analysis",
    description: "Streamline your insurance claims process with automated analysis and tracking. Identify patterns and optimize reimbursements.",
    features: [
      "Claims tracking dashboard",
      "Reimbursement analysis",
      "Payment cycle optimization",
      "Insurance trend reports"
    ]
  },
  {
    icon: <BarChart className="w-12 h-12 text-mednavi-blue" />,
    title: "Practice Management Integration",
    description: "Seamlessly integrate with your existing practice management system for comprehensive data analysis and insights.",
    features: [
      "Automated data extraction",
      "Real-time synchronization",
      "Custom report generation",
      "Historical data analysis"
    ]
  }
]

const containerVariants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3
    }
  }
}

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
}

export default function ServicesList() {
  useEffect(() => {
    return () => {
      // Cleanup for ServicesList
      const listElements = document.querySelectorAll('.services-list-animation')
      listElements.forEach(el => {
        if (el && el.parentNode) {
          el.parentNode.removeChild(el)
        }
      })
    }
  }, [])

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key="services-list"
            className="grid md:grid-cols-3 gap-8 services-list-animation"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-6 rounded-lg border border-gray-200 hover:border-mednavi-blue/50 transition-colors duration-300"
                layout
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-2">
                      <svg 
                        className="w-5 h-5 text-mednavi-green mt-1 flex-shrink-0" 
                        fill="none" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
