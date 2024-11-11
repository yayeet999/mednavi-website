'use client'
import { motion } from 'framer-motion'
import { LineChart, BarChart, PieChart } from 'lucide-react'

const features = [
  {
    icon: <LineChart className="w-10 h-10 text-mednavi-blue" />,
    title: 'Real-Time Analytics',
    description: 'Automated appointment and patient tracking for better practice management.'
  },
  {
    icon: <BarChart className="w-10 h-10 text-mednavi-blue" />,
    title: 'Insurance Claims Analysis',
    description: 'Simplified billing insights and payment tracking for improved financial outcomes.'
  },
  {
    icon: <PieChart className="w-10 h-10 text-mednavi-blue" />,
    title: 'PMS Integration',
    description: 'Seamless integration with your existing practice management systems.'
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

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12 text-gray-900"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Key Features
        </motion.h2>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-lg border border-gray-200 hover:border-mednavi-blue/50 transition-colors duration-300"
              variants={itemVariants}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
