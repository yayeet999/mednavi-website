'use client'
import { motion, useAnimation } from 'framer-motion'
import { useState } from 'react'
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts'
import { useInView } from 'react-intersection-observer'

// Mini Chart Data
const generateChartData = () => Array.from({ length: 12 }, (_, i) => ({
  name: i,
  value: Math.floor(Math.random() * 50) + 50
}))

// Interactive Feature Card Component
function FeatureCard({ title, description, chartData, icon: Icon, index }) {
  const [isHovered, setIsHovered] = useState(false)
  const [ref, inView] = useInView({ triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative bg-white rounded-xl shadow-lg overflow-hidden group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
    >
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-2 bg-mednavi-blue/10 rounded-lg">
            <Icon className="w-6 h-6 text-mednavi-blue" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        </div>
        <p className="text-gray-600 mb-4">{description}</p>
        
        <div className="h-[100px] transition-opacity duration-300">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="#1E3A8A"
                strokeWidth={2}
                dot={false}
                animationDuration={2000}
              />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <motion.div
        className="absolute inset-0 bg-mednavi-blue/5"
        initial={false}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

// Animated Timeline Component
function Timeline() {
  const timelineData = [
    {
      year: '2024',
      title: 'Advanced Analytics',
      description: 'Introducing AI-powered predictive analytics'
    },
    {
      year: '2023',
      title: 'Platform Launch',
      description: 'MedNavi platform goes live with core features'
    },
    {
      year: '2022',
      title: 'Development',
      description: 'Started development with expert dental consultants'
    }
  ]

  return (
    <div className="relative py-16">
      <div className="absolute left-1/2 transform -translate-x-px h-full w-[2px] bg-mednavi-blue/20" />
      
      {timelineData.map((item, index) => (
        <TimelineItem key={item.year} data={item} index={index} />
      ))}
    </div>
  )
}

function TimelineItem({ data, index }) {
  const [ref, inView] = useInView({ triggerOnce: true })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} mb-12`}
    >
      <div className="w-1/2 px-8">
        <div className={`${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
          <span className="text-mednavi-blue font-bold text-xl">{data.year}</span>
          <h3 className="text-lg font-semibold mb-2">{data.title}</h3>
          <p className="text-gray-600">{data.description}</p>
        </div>
      </div>
      
      <div className="relative">
        <div className="w-4 h-4 rounded-full bg-mednavi-blue" />
      </div>
      
      <div className="w-1/2 px-8" />
    </motion.div>
  )
}

// Live Mini Charts Section
function LiveCharts() {
  const charts = [
    { title: 'Patient Flow', color: '#1E3A8A' },
    { title: 'Revenue Trend', color: '#059669' },
    { title: 'Efficiency Score', color: '#7C3AED' }
  ]

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {charts.map((chart, index) => (
        <LiveChartCard key={chart.title} {...chart} index={index} />
      ))}
    </div>
  )
}

function LiveChartCard({ title, color, index }) {
  const [data, setData] = useState(generateChartData())
  const [ref, inView] = useInView({ triggerOnce: true })

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => [
        ...prev.slice(1),
        { name: prev[prev.length - 1].name + 1, value: Math.floor(Math.random() * 50) + 50 }
      ])
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-lg p-4"
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="h-[150px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={false}
              isAnimationActive={true}
            />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

// Main Export Component combining all features
export default function EnhancedFeatures() {
  const features = [
    {
      title: 'Real-Time Analytics',
      description: 'Track key metrics instantly with live updates and alerts.',
      icon: ChartIcon,
      chartData: generateChartData()
    },
    {
      title: 'Smart Predictions',
      description: 'AI-powered insights to optimize your practice performance.',
      icon: BrainIcon,
      chartData: generateChartData()
    },
    {
      title: 'Automated Reporting',
      description: 'Generate comprehensive reports with a single click.',
      icon: DocumentIcon,
      chartData: generateChartData()
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-16"
        >
          Powerful Features for Modern Dental Practices
        </motion.h2>

        {/* Interactive Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>

        {/* Animated Timeline */}
        <Timeline />

        {/* Live Mini Charts */}
        <div className="mt-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            Live Practice Insights
          </motion.h2>
          <LiveCharts />
        </div>
      </div>
    </section>
  )
}