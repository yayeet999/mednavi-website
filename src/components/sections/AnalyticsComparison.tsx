'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts'

const beforeAfterColors = {
  before: '#94A3B8', // Slate
  after: '#059669',  // Green
}

const lineData = {
  before: Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    value: 75 + Math.random() * 7
  })),
  after: Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    value: 85 + Math.random() * 7
  }))
}

const barData = {
  before: [
    { name: 'Q1', value: 165 },
    { name: 'Q2', value: 175 },
    { name: 'Q3', value: 180 },
    { name: 'Q4', value: 170 }
  ],
  after: [
    { name: 'Q1', value: 190 },
    { name: 'Q2', value: 200 },
    { name: 'Q3', value: 210 },
    { name: 'Q4', value: 205 }
  ]
}

const pieData = {
  before: [
    { name: 'Accepted', value: 60 },
    { name: 'Declined', value: 40 }
  ],
  after: [
    { name: 'Accepted', value: 72 },
    { name: 'Declined', value: 28 }
  ]
}

export default function AnalyticsComparison() {
  const [isAfter, setIsAfter] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAfter(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            The Power of Data-Driven Decisions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how data analytics transforms dental practice performance
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Patient Retention Rate */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-4">Patient Retention Rate</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart>
                  <XAxis dataKey="month" />
                  <YAxis domain={[70, 100]} />
                  <Tooltip />
                  <Line
                    data={lineData.before}
                    type="monotone"
                    dataKey="value"
                    stroke={beforeAfterColors.before}
                    strokeWidth={2}
                    dot={false}
                  />
                  {isAfter && (
                    <Line
                      data={lineData.after}
                      type="monotone"
                      dataKey="value"
                      stroke={beforeAfterColors.after}
                      strokeWidth={2}
                      dot={false}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Revenue per Visit */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-4">Revenue per Visit</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={isAfter ? barData.after : barData.before}>
                  <XAxis dataKey="name" />
                  <YAxis domain={[150, 220]} />
                  <Tooltip />
                  <Bar
                    dataKey="value"
                    fill={isAfter ? beforeAfterColors.after : beforeAfterColors.before}
                    animate={{
                      duration: 1000,
                      easing: "ease-in-out"
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Treatment Plan Acceptance */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold mb-4">Treatment Plan Acceptance</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={isAfter ? pieData.after : pieData.before}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill={beforeAfterColors.before}
                    paddingAngle={5}
                    dataKey="value"
                    animate={{
                      duration: 1000,
                      easing: "ease-in-out"
                    }}
                  >
                    {(isAfter ? pieData.after : pieData.before).map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === 0 ? (isAfter ? beforeAfterColors.after : beforeAfterColors.before) : '#E2E8F0'}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="text-center mt-8 text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          {isAfter ? "↑ Improved metrics with data-driven decisions" : "Initial metrics before analysis"}
        </motion.div>
      </div>
    </section>
  )
}