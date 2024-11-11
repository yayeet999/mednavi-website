'use client'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const integrations = [
  "Dentrix",
  "Open Dental",
  "Eaglesoft",
  "Curve Dental",
  "Denticon",
  "Practice Web"
]

const features = [
  {
    title: "Easy Setup",
    description: "Quick and seamless integration with your existing systems"
  },
  {
    title: "Secure Data Transfer",
    description: "End-to-end encryption for all your practice data"
  },
  {
    title: "Automated Sync",
    description: "Real-time data synchronization with your practice management software"
  }
]

export default function Integration() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Seamless Integration</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            MedNavi works with your existing practice management software for a smooth transition
            and immediate value.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-2 gap-4">
              {integrations.map((integration, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center space-x-2 p-4 bg-white rounded-lg shadow-sm"
                >
                  <Check className="w-5 h-5 text-mednavi-green" />
                  <span className="font-medium">{integration}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
