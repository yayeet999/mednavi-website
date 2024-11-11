import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { month: 'Jan', rate: 75 },
  { month: 'Feb', rate: 82 },
  { month: 'Mar', rate: 87 },
  { month: 'Apr', rate: 89 },
  { month: 'May', rate: 92 },
  { month: 'Jun', rate: 95 },
]

export default function About() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900">About MedNavi</h2>
            <p className="text-lg text-gray-600 mb-6">
              MedNavi is transforming dental practice management through advanced analytics 
              and intelligent automation. Our platform provides real-time insights that help 
              you make data-driven decisions to improve patient care and practice efficiency.
            </p>
            <ul className="space-y-4">
              {['Improve patient attendance rates', 'Optimize scheduling efficiency', 'Enhance revenue management'].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-center space-x-2 text-gray-700"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <svg className="w-5 h-5 text-mednavi-green" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="h-[400px] bg-white p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Patient Attendance Rate</h3>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#1E3A8A"
                  strokeWidth={2}
                  dot={{ fill: '#1E3A8A' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
