import { motion } from 'framer-motion';
import { renderChart } from './ChartComponents';

const messageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30
    }
  }
};

export const renderMetrics = (metrics: any[]) => (
  <div className="mt-6">
    <h4 className="text-sm font-medium text-gray-700 mb-3">Key Metrics</h4>
    <div className="grid grid-cols-3 gap-4">
      {metrics.map((m, i) => (
        <div key={i} className="bg-gray-50/80 p-3 rounded-lg backdrop-blur-sm shadow-inner">
          <div className="text-xs text-gray-500">{m.label}</div>
          <div className="text-lg font-semibold text-gray-900">{m.value}</div>
          <div className="flex justify-between items-center mt-1 text-sm">
            <span className={m.trend.startsWith('+') ? 'text-green-600' : m.trend.startsWith('-') ? 'text-red-600' : 'text-gray-600'}>
              {m.trend}
            </span>
            <span className="text-xs text-gray-400">Benchmark: {m.benchmark}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const renderInsights = (insights: string[]) => (
  <div className="mt-6">
    <h4 className="text-sm font-medium text-gray-700 mb-3">Top Insights</h4>
    <div className="space-y-2">
      {insights.map((ins, i) => (
        <div key={i} className="flex items-start gap-2">
          <div className="w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-400" />
          <p className="text-sm text-gray-600">{ins}</p>
        </div>
      ))}
    </div>
  </div>
);

export const renderSuggestionsList = (suggestions: string[], handleSuggestionClick: (s: string) => void) => (
  <div className="mt-6">
    <h4 className="text-sm font-medium text-gray-700 mb-3">Suggested Actions</h4>
    <div className="flex flex-wrap gap-2">
      {suggestions.map((s, i) => (
        <motion.button
          key={i}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSuggestionClick(s)}
          className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-full text-sm font-medium transition-colors"
        >
          {s}
        </motion.button>
      ))}
    </div>
  </div>
);

export const renderAIMessage = (data: any, handleSuggestionClick: (s: string) => void) => (
  <motion.div
    variants={messageVariants}
    initial="initial"
    animate="animate"
    className="bg-white rounded-2xl shadow-md w-full p-6"
  >
    <h3 className="font-semibold text-gray-900 mb-4">AI Analysis</h3>
    <p className="text-sm text-gray-700">{data.summary}</p>

    {data.chartData && data.chartType && (
      <div className="mt-6 bg-gray-50/50 rounded-xl p-4 shadow-inner max-w-full overflow-hidden">
        {renderChart(data)}
      </div>
    )}

    {data.metrics && renderMetrics(data.metrics)}
    {data.insights && renderInsights(data.insights)}
    {data.suggestions && renderSuggestionsList(data.suggestions, handleSuggestionClick)}
  </motion.div>
);

export const renderUserMessage = (content: string) => (
  <motion.div
    variants={messageVariants}
    initial="initial"
    animate="animate"
    className="bg-blue-600 text-white p-4 rounded-2xl shadow-md max-w-sm w-full ml-auto"
  >
    <p>{content}</p>
  </motion.div>
); 