'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import { ChevronRight } from 'lucide-react'

interface AnalysisState {
  isAnalyzing: boolean
  isComplete: boolean
}

interface ChartDataPoint {
  month: string
  value: number
  improvedValue?: number
}

// Analysis Loading Animation Component
const LoadingSpinner = () => (
  <motion.div 
    className="inline-flex items-center space-x-2"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="w-4 h-4 rounded-full border-2 border-mednavi-blue border-t-transparent"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
    <span className="text-sm text-mednavi-blue">Analyzing data...</span>
  </motion.div>
)

// Analysis Button Component
const AnalysisButton = ({ 
  isAnalyzing, 
  isComplete, 
  onClick 
}: { 
  isAnalyzing: boolean
  isComplete: boolean
  onClick: () => void 
}) => (
  <motion.button
    onClick={onClick}
    disabled={isAnalyzing}
    className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
      isComplete
        ? 'bg-green-50 text-green-700'
        : isAnalyzing
        ? 'bg-blue-50 text-blue-600'
        : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
    }`}
    whileHover={!isAnalyzing && !isComplete ? { scale: 1.02 } : {}}
  >
    <AnimatePresence mode="wait">
      {isAnalyzing ? (
        <LoadingSpinner />
      ) : isComplete ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center space-x-1"
        >
          <span>Analysis Complete</span>
          <ChevronRight className="w-4 h-4" />
        </motion.div>
      ) : (
        <span>Analyze Impact</span>
      )}
    </AnimatePresence>
  </motion.button>
)

// KPI Display Component
const KPIDisplay = ({ value, label }: { value: string; label: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-green-50 text-green-700 px-4 py-2 rounded-lg text-sm font-medium"
  >
    <span className="font-semibold">{value}</span>
    <span className="ml-1">{label}</span>
  </motion.div>
)

// Generate realistic dental practice seasonality data
const generateMonthlyPatients = (baseValue: number, improvement: number = 0): ChartDataPoint[] => {
  const seasonality = [0.85, 0.9, 1.1, 1.2, 1.15, 1.1, 1.05, 1, 0.95, 0.9, 0.85, 1]
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  return months.map((month, i) => {
    const seasonalFactor = seasonality[i]
    const value = Math.round(baseValue * seasonalFactor)
    const improvedValue = improvement ? Math.round((baseValue + improvement) * seasonalFactor) : undefined
    return {
      month,
      value,
      ...(improvement ? { improvedValue } : {}),
    }
  })
}

const generateProductionData = (baseValue: number, improvement: number = 0): ChartDataPoint[] => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return months.map(month => ({
    month,
    value: baseValue,
    improvedValue: baseValue * (1 + improvement)
  }))
}

// Custom tooltip formatter
const formatCurrency = (value: number) => `$${(value/1000).toFixed(1)}k`

export default function AnalyticsComparison() {
  const [newPatientsAnalysis, setNewPatientsAnalysis] = useState<AnalysisState>({ 
    isAnalyzing: false, 
    isComplete: false 
  })
  const [productionAnalysis, setProductionAnalysis] = useState<AnalysisState>({ 
    isAnalyzing: false, 
    isComplete: false 
  })
  const [patientActivityAnalysis, setPatientActivityAnalysis] = useState<AnalysisState>({ 
    isAnalyzing: false, 
    isComplete: false 
  })

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
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how data analytics transforms dental practice performance
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* New Patients Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="lg:flex lg:gap-8">
              <div className="lg:w-2/3">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">New Patients Monthly</h3>
                  <AnalysisButton
                    isAnalyzing={newPatientsAnalysis.isAnalyzing}
                    isComplete={newPatientsAnalysis.isComplete}
                    onClick={() => startAnalysis(newPatientsAnalysis, setNewPatientsAnalysis)}
                  />
                </div>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={generateMonthlyPatients(25, newPatientsAnalysis.isComplete ? 5 : 0)}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 'auto']} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={newPatientsAnalysis.isComplete ? "#94A3B8" : "#1E3A8A"}
                        strokeWidth={4}
                        dot={false}
                        name={newPatientsAnalysis.isComplete ? "Before" : "Current"}
                      />
                      {newPatientsAnalysis.isComplete && (
                        <Line
                          type="monotone"
                          dataKey="improvedValue"
                          stroke="#059669"
                          strokeWidth={4}
                          dot={false}
                          name="After Optimization"
                        />
                      )}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="lg:w-1/3 mt-6 lg:mt-0">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900">Impact Analysis</h4>
                  <p className="text-gray-600">
                    By analyzing regional trends, marketing effectiveness, and patient demographics, 
                    MedNavi helps optimize your patient acquisition strategies for sustainable growth.
                  </p>
                  {newPatientsAnalysis.isComplete && (
                    <KPIDisplay value="+20%" label="Monthly New Patients" />
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Production Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="lg:flex lg:gap-8">
              <div className="lg:w-2/3">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Average Production per Visit</h3>
                  <AnalysisButton
                    isAnalyzing={productionAnalysis.isAnalyzing}
                    isComplete={productionAnalysis.isComplete}
                    onClick={() => startAnalysis(productionAnalysis, setProductionAnalysis)}
                  />
                </div>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={generateProductionData(800, productionAnalysis.isComplete ? 0.15 : 0)}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 'auto']} tickFormatter={formatCurrency} />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Bar 
                        dataKey="value" 
                        fill="#1E3A8A" 
                        name="Current"
                        barSize={30}
                      />
                      {productionAnalysis.isComplete && (
                        <Bar 
                          dataKey="improvedValue" 
                          fill="#059669" 
                          name="Optimized"
                          barSize={30}
                        />
                      )}
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="lg:w-1/3 mt-6 lg:mt-0">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900">Revenue Optimization</h4>
                  <p className="text-gray-600">
                    Optimize your service mix and treatment plan acceptance rates through 
                    data-driven insights and patient engagement strategies.
                  </p>
                  {productionAnalysis.isComplete && (
                    <KPIDisplay value="+15%" label="Average Production/Visit" />
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Patient Activity Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="lg:flex lg:gap-8">
              <div className="lg:w-2/3">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Patient Activity Status</h3>
                  <AnalysisButton
                    isAnalyzing={patientActivityAnalysis.isAnalyzing}
                    isComplete={patientActivityAnalysis.isComplete}
                    onClick={() => startAnalysis(patientActivityAnalysis, setPatientActivityAnalysis)}
                  />
                </div>
                <div className="h-[400px] flex justify-center items-center">
                  <div className="grid grid-cols-2 gap-8 w-full max-w-2xl">
                    <div className="relative">
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={[
                              { 
                                name: 'Active', 
                                value: patientActivityAnalysis.isComplete ? 85 : 75 
                              },
                              { 
                                name: 'Inactive', 
                                value: patientActivityAnalysis.isComplete ? 15 : 25 
                              }
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            <Cell fill="#1E3A8A" />
                            <Cell fill="#E2E8F0" />
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="text-center mt-4 font-medium">Active Patients</div>
                    </div>
                    <div className="relative">
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={[
                              { 
                                name: 'Scheduled', 
                                value: patientActivityAnalysis.isComplete ? 70 : 60 
                              },
                              { 
                                name: 'Unscheduled', 
                                value: patientActivityAnalysis.isComplete ? 30 : 40 
                              }
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            <Cell fill="#059669" />
                            <Cell fill="#E2E8F0" />
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="text-center mt-4 font-medium">Scheduling Status</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/3 mt-6 lg:mt-0">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900">Patient Retention</h4>
                  <p className="text-gray-600">
                    Increase patient retention and recall effectiveness through personalized
                    communication and targeted follow-up strategies informed by data analytics.
                  </p>
                  {patientActivityAnalysis.isComplete && (
                    <div className="space-y-2">
                      <KPIDisplay value="+10%" label="Active Patient Base" />
                      <KPIDisplay value="+15%" label="Recall Effectiveness" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}