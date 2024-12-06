'use client'
import { motion } from 'framer-motion'
import { Bot, Sparkles, Zap } from 'lucide-react'
import ChatBot from '@/components/chat/ChatBot'

const aiFeatures = [
  {
    icon: <Bot className="w-8 h-8 text-mednavi-blue" />,
    title: 'AI-Powered Assistant',
    description: 'Get instant answers about MedNavi features and dental practice analytics.',
  },
  {
    icon: <Sparkles className="w-8 h-8 text-mednavi-blue" />,
    title: 'Smart Insights',
    description: 'Leverage artificial intelligence to uncover actionable insights from your practice data.',
  },
  {
    icon: <Zap className="w-8 h-8 text-mednavi-blue" />,
    title: 'Automated Analysis',
    description: 'Let AI handle complex data analysis while you focus on patient care.',
  }
]

export default function AISection() {
  return (
    <section className="py-20 bg-gray-50 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-900">AI-Powered Intelligence</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the future of dental practice management with our advanced AI capabilities.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {aiFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-8 hover:shadow-lg transition-shadow"
            >
              <div className="bg-gray-50 rounded-lg p-4 inline-block mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <ChatBot />
    </section>
  )
} 