'use client'
import { motion } from 'framer-motion'
import { BarChart, Brain, FileText } from 'lucide-react'

const features = [
  {
    icon: <BarChart className="w-8 h-8 text-mednavi-blue" />,
    title: 'Real-Time Analytics',
    description: 'Track key metrics instantly with live updates and alerts.',
    benefit: 'Make informed decisions backed by real-time data insights.'
  },
  {
    icon: <Brain className="w-8 h-8 text-mednavi-blue" />,
    title: 'Smart Predictions',
    description: 'AI-powered insights to optimize your practice performance.',
    benefit: 'Anticipate trends and optimize operations proactively.'
  },
  {
    icon: <FileText className="w-8 h-8 text-mednavi-blue" />,
    title: 'Automated Reporting',
    description: 'Generate comprehensive reports with a single click.',
    benefit: 'Save time and maintain consistent performance tracking.'
  }
]

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow"
            >
              <div className="bg-white rounded-lg p-4 inline-block mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <p className="text-mednavi-blue font-medium">{feature.benefit}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}