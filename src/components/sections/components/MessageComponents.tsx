import React from 'react';
import { Bot, User } from 'lucide-react';
import { renderChart } from './ChartComponents';
import { ConversationMessage } from '../types/commandCenter.types';

interface RenderAIMessageProps {
  msg: ConversationMessage;
  onSuggestionClick: (suggestion: string) => void;
}

export const renderUserMessage = (msg: ConversationMessage) => (
  <div className="flex items-start space-x-3 mb-4">
    <div className="flex-shrink-0">
      <div className="p-2 bg-gray-100 rounded-lg">
        <User className="w-4 h-4 text-gray-600" />
      </div>
    </div>
    <div className="flex-grow">
      <div className="bg-white border border-gray-200 rounded-lg p-3 text-sm text-gray-700">
        {msg.content}
      </div>
    </div>
  </div>
);

export const renderAIMessage = ({ msg, onSuggestionClick }: RenderAIMessageProps) => {
  if (!msg?.data) return null;

  const { summary, chartData, chartType, metrics, insights, suggestions } = msg.data;

  return (
    <div className="flex items-start space-x-3">
      <div className="flex-shrink-0">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Bot className="w-4 h-4 text-blue-600" />
        </div>
      </div>
      <div className="flex-grow space-y-4">
        {/* Summary */}
        {summary && (
          <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
            {summary}
          </div>
        )}

        {/* Chart */}
        {chartType && chartData && chartData.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            {renderChart({ chartType, chartData })}
          </div>
        )}

        {/* Metrics */}
        {metrics && metrics.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            {metrics.map((metric, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-lg p-3">
                <p className="text-xs text-gray-500">{metric.label}</p>
                <div className="flex items-baseline space-x-2 mt-1">
                  <p className="text-lg font-semibold text-gray-900">{metric.value}</p>
                  {metric.trend && (
                    <p className={`text-xs font-medium ${
                      metric.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.trend}
                    </p>
                  )}
                </div>
                {metric.benchmark && (
                  <p className="text-xs text-gray-500 mt-1">vs. {metric.benchmark}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Insights */}
        {insights && insights.length > 0 && (
          <div className="bg-blue-50 rounded-lg p-3">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Key Insights</h4>
            <ul className="space-y-1">
              {insights.map((insight, idx) => (
                <li key={idx} className="text-sm text-blue-800 flex items-start">
                  <span className="mr-2">•</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Suggestions */}
        {suggestions && suggestions.length > 0 && (
          <div>
            <h4 className="text-xs font-medium text-gray-700 mb-2">Suggested Actions</h4>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => onSuggestionClick(suggestion)}
                  className="px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 