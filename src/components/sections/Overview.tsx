'use client'
import { motion } from 'framer-motion'

export default function Overview() {
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
            Overview of MedNavi
          </h2>
          <p className="text-gray-600 max-w-4xl mx-auto text-lg leading-relaxed">
            MedNavi is a dental analytics platform built to help practices unlock the full potential of their data. By transforming complex data into easy-to-understand insights, mednavi supports practices in making smart, real-time decisions—whether it's improving patient flow, fine-tuning appointment schedules, or tracking treatment outcomes. This allows dental teams to spend more time focusing on what truly matters: providing top-notch patient care. With mednavi, you can streamline day-to-day operations, identify new revenue opportunities, and gain a deeper understanding of your patients' needs and satisfaction. It's more than just a reporting tool; mednavi is a powerful partner that helps you build a thriving, patient-centered practice in today's data-driven world.
          </p>
        </div>
      </div>
    </section>
  )
} 