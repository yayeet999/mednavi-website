'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import { BarChartIcon, ActivityIcon, UsersIcon } from 'lucide-react'

interface AnalysisState {
  isAnalyzing: boolean
  isComplete: boolean
}

// Monthly new patients data with seasonality
const generateMonthlyData = (baseValue: number, improvement: number = 0) => {
  const seasonality = [0.9, 0.95, 1.1, 1.2, 1.15, 1.1, 1.05, 1, 0.95, 0.9, 0.85, 1]
  return Array.from({ length: 12 }, (_, i) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    value: Math.round((baseValue + improvement) * seasonality[i])
  }))
}

const LoadingSpinner = () => (
  <motion.div
    className="w-5 h-5 rounded-full border-2 border-mednavi-blue border-t-transparent"
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
  />
)

const AnalysisButton = ({ isAnalyzing, isComplete, onClick }: { isAnalyzing: boolean; isComplete: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    disabled={isAnalyzing}
    className={`inline-flex items-center space-x-2 px-3 py-1 rounded-md text-sm transition-all ${
      isComplete
        ? 'bg-green-50 text-green-700'
        : isAnalyzing
        ? 'bg-blue-50 text-blue-600'
        : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
    }`}
  >
    {isAnalyzing ? (
      <><LoadingSpinner /><span>Analyzing...</span></>
    ) : isComplete ? (
      <span>Analysis Complete</span>
    ) : (
      <span>Analyze Impact</span>
    )}
  </button>
)

const KPIDisplay = ({ value, label }: { value: string; label: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="absolute top-0 right-0 bg-green-50 text-green-700 px-3 py-1 rounded-md text-sm"
  >
    <span className="font-medium">{value}</span>
    <span className="ml-1 text-xs">{label}</span>
  </motion.div>
)

const NewPatientsChart = ({ analysis }: { analysis: AnalysisState }) => {
  const baseData = generateMonthlyData(25)
  const improvedData = generateMonthlyData(25, 5)
  
  return (
    <div className="relative h-[300px]">
      <ResponsiveContainer>
        <LineChart margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <XAxis dataKey="month" />
          <YAxis domain={[0, 'auto']} />
          <Tooltip />
          <Line
            data={baseData}
            type="monotone"
            dataKey="value"
            stroke="#94A3B8"
            strokeWidth={2}
            dot={false}
            name="Current"
          />
          {analysis.isComplete && (
            <Line
              data={improvedData}
              type="monotone"
              dataKey="value"
              stroke="#059669"
              strokeWidth={2}
              dot={false}
              name="Improved"
              isAnimationActive={true}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
      {analysis.isComplete && (
        <KPIDisplay value="+20%" label="Monthly New Patients" />
      )}
    </div>
  )
}

const ProductionChart = ({ analysis }: { analysis: AnalysisState }) => {
  const baseData = [
    { month: 'Jan', value: 180 },
    { month: 'Feb', value: 185 },
    { month: 'Mar', value: 190 },
    { month: 'Apr', value: 195 },
    { month: 'May', value: 200 },
    { month: 'Jun', value: 205 },
    { month: 'Jul', value: 200 },
    { month: 'Aug', value: 195 },
    { month: 'Sep', value: 190 },
    { month: 'Oct', value: 185 },
    { month: 'Nov', value: 180 },
    { month: 'Dec', value: 185 }
  ]

  const improvedData = baseData.map(item => ({
    ...item,
    improvedValue: item.value * 1.15
  }))

  return (
    <div className="relative h-[300px]">
      <ResponsiveContainer>
        <BarChart data={improvedData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <XAxis dataKey="month" />
          <YAxis domain={[0, 'auto']} />
          <Tooltip />
          <Bar dataKey="value" fill="#94A3B8" />
          {analysis.isComplete && (
            <Bar dataKey="improvedValue" fill="#059669" />
          )}
        </BarChart>
      </ResponsiveContainer>
      {analysis.isComplete && (
        <KPIDisplay value="+15%" label="Avg Production/Visit" />
      )}
    </div>
  )
}

const ActivePatientsCharts = ({ analysis }: { analysis: AnalysisState }) => {
  const baseActive = 75
  const baseUnscheduled = 35
  const improvement = analysis.isComplete ? 10 : 0

  return (
    <div className="relative h-[300px] flex justify-between">
      <div className="w-1/2">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={[
                { name: 'Active', value: baseActive + improvement },
                { name: 'Inactive', value: 100 - (baseActive + improvement) }
              ]}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#059669"
              paddingAngle={5}
              dataKey="value"
            >
              <Cell fill="#059669" />
              <Cell fill="#E2E8F0" />
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="text-center mt-2 text-sm font-medium">Active Patients</div>
      </div>
      <div className="w-1/2">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={[
                { name: 'Unscheduled', value: baseUnscheduled - improvement },
                { name: 'Scheduled', value: 100 - (baseUnscheduled - improvement) }
              ]}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#059669"
              paddingAngle={5}
              dataKey="value"
            >
              <Cell fill="#059669" />
              <Cell fill="#E2E8F0" />
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="text-center mt-2 text-sm font-medium">Unscheduled Patients</div>
      </div>
      {analysis.isComplete && (
        <KPIDisplay value="+10%" label="Patient Activity" />
      )}
    </div>
  )
}

export default function AnalyticsComparison() {
  const [newPatientsAnalysis, setNewPatientsAnalysis] = useState<AnalysisState>({ isAnalyzing: false, isComplete: false })
  const [productionAnalysis, setProductionAnalysis] = useState<AnalysisState>({ isAnalyzing: false, isComplete: false })
  const [patientsAnalysis, setPatientsAnalysis] = useState<AnalysisState>({ isAnalyzing: false, isComplete: false })

  const startAnalysis = (
    analysisState: AnalysisState,
    setAnalysisState: (state: AnalysisState) => void
  ) => {
    if (!analysisState.isAnalyzing && !analysisState.isComplete) {
      setAnalysisState({ isAnalyzing: true, isComplete: false })
      setTimeout(() => {
        setAnalysisState({ isAnalyzing: false, isComplete: true })
      }, 2000)
    }
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            The Power of Data-Driven Decisions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how data analytics transforms dental practice performance
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            className="bg-white rounded-xl shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">New Patients Monthly</h3>
              <AnalysisButton
                isAnalyzing={newPatientsAnalysis.isAnalyzing}
                isComplete={newPatientsAnalysis.isComplete}
                onClick={() => startAnalysis(newPatientsAnalysis, setNewPatientsAnalysis)}
              />
            </div>
            <NewPatientsChart analysis={newPatientsAnalysis} />
          </motion.div>

          <motion.div
            className="bg-white rounded-xl shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Average Production per Visit</h3>
              <AnalysisButton
                isAnalyzing={productionAnalysis.isAnalyzing}
                isComplete={productionAnalysis.isComplete}
                onClick={() => startAnalysis(productionAnalysis, setProductionAnalysis)}
              />
            </div>
            <ProductionChart analysis={productionAnalysis} />
          </motion.div>

          <motion.div
            className="bg-white rounded-xl shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Patient Activity Status</h3>
              <AnalysisButton
                isAnalyzing={patientsAnalysis.isAnalyzing}
                isComplete={patientsAnalysis.isComplete}
                onClick={() => startAnalysis(patientsAnalysis, setPatientsAnalysis)}
              />
            </div>
            <ActivePatientsCharts analysis={patientsAnalysis} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}