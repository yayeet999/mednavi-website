'use client'
import { motion } from 'framer-motion'
import { LineChart, PieChart, BarChart, Users, Clock, FileText } from 'lucide-react'

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
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

export default function ServicesList() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-6 rounded-lg border border-gray-200 hover:border-mednavi-blue/50 transition-colors duration-300"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-mednavi-green mt-1 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
