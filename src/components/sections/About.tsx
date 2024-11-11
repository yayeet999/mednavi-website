'use client'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import * as Select from "@radix-ui/react-select"
import { SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { useState } from 'react'

// Sample data unchanged...
const monthlyData = [
  { month: 'Jan', started: 15, completed: 12 },
  { month: 'Feb', started: 18, completed: 14 },
  { month: 'Mar', started: 22, completed: 16 },
  { month: 'Apr', started: 20, completed: 19 },
  { month: 'May', started: 25, completed: 21 },
  { month: 'Jun', started: 28, completed: 23 }
]

const quarterlyData = [
  { month: 'Q1', started: 55, completed: 42 },
  { month: 'Q2', started: 73, completed: 63 },
  { month: 'Q3', started: 68, completed: 59 },
  { month: 'Q4', started: 82, completed: 71 }
]

const yearlyData = [
  { month: '2021', started: 220, completed: 185 },
  { month: '2022', started: 278, completed: 242 },
  { month: '2023', started: 315, completed: 276 },
  { month: '2024', started: 89, completed: 72 }
]

export default function About() {
  const [timeFrame, setTimeFrame] = useState('monthly')

  const getData = () => {
    switch (timeFrame) {
      case 'monthly':
        return monthlyData
      case 'quarterly':
        return quarterlyData
      case 'yearly':
        return yearlyData
      default:
        return monthlyData
    }
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left column content remains the same */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900">About MedNavi</h2>
            <p className="text-lg text-gray-600 mb-6">
              MedNavi transforms dental practice management through advanced analytics 
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
            className="bg-white p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Invisalign Production</h3>
              <Select.Root value={timeFrame} onValueChange={setTimeFrame}>
                <SelectTrigger className="w-[180px]">
                  <Select.Value placeholder="Select time frame" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Last 6 Months</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select.Root>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="started" 
                    name="Cases Started"
                    stroke="#1E3A8A" 
                    strokeWidth={2}
                    dot={{ fill: '#1E3A8A' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="completed" 
                    name="Cases Completed"
                    stroke="#059669" 
                    strokeWidth={2}
                    dot={{ fill: '#059669' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
