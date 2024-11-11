import { motion } from 'framer-motion'
import { useState } from 'react'

const testimonials = [
  {
    quote: "MedNavi has revolutionized how we handle our practice data. The insights we've gained have helped us improve patient care and optimize our operations.",
    author: "Dr. Sarah Johnson",
    role: "Dental Practice Owner",
    location: "Boston, MA"
  },
  {
    quote: "The real-time analytics have made a huge difference in our scheduling efficiency. We've seen a 30% reduction in no-shows since implementing MedNavi.",
    author: "Dr. Michael Chen",
    role: "Practice Manager",
    location: "San Francisco, CA"
  },
  {
    quote: "Insurance claims management has never been easier. MedNavi's platform has streamlined our entire billing process.",
    author: "Dr. Emily Rodriguez",
    role: "Clinical Director",
    location: "Miami, FL"
  }
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

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
          What Our Clients Say
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className={`${
                  index === activeIndex ? 'block' : 'hidden'
                } text-center`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <blockquote className="text-xl text-gray-600 mb-8">
                  "{testimonial.quote}"
                </blockquote>
                <div className="font-semibold text-gray-900">{testimonial.author}</div>
                <div className="text-sm text-gray-500">{testimonial.role}</div>
                <div className="text-sm text-gray-500">{testimonial.location}</div>
              </motion.div>
            ))}

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === activeIndex ? 'bg-mednavi-blue' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
