'use client'
import { motion } from 'framer-motion'
import { Shield, Clock, LineChart, Users } from 'lucide-react'

const reasons = [
  {
    icon: <Shield className="w-12 h-12 text-mednavi-blue" />,
    title: "HIPAA Compliant",
    description: "Secure, encrypted data handling that meets all healthcare privacy requirements"
  },
  {
    icon: <Clock className="w-12 h-12 text-mednavi-blue" />,
    title: "24/7 Support",
    description: "Round-the-clock technical support and assistance for your practice"
  },
  {
    icon: <LineChart className="w-12 h-12 text-mednavi-blue" />,
    title: "Data-Driven Insights",
    description: "Advanced analytics that help you make informed decisions"
  },
  {
    icon: <Users className="w-12 h-12 text-mednavi-blue" />,
    title: "Team Collaboration",
    description: "Easy sharing and collaboration features for your entire staff"
  }
]

// Rest of the component remains the same
export default function WhyChoose() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Why Choose MedNavi?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We provide the tools and support you need to optimize your practice's performance
            and enhance patient care.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 rounded-lg border border-gray-200 hover:border-mednavi-blue/50 transition-colors duration-300"
            >
              <div className="inline-block mb-4">{reason.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{reason.title}</h3>
              <p className="text-gray-600">{reason.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
