import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { BarChart2, X } from 'lucide-react';

interface AxisTickProps {
  x: number;
  y: number;
  payload: {
    value: string | number;
  };
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    color: string;
  }>;
  label?: string;
}

const FinancialsContent = () => {
  const [showDistributionPopup, setShowDistributionPopup] = useState(false);

  const expensesData = [
    { name: 'Lab Fees', value: 12355, color: '#1E40AF' },
    { name: 'Marketing', value: 8240, color: '#2563EB' },
    { name: 'Other', value: 6820, color: '#3B82F6' },
    { name: 'Rent/Mortgage', value: 15240, color: '#60A5FA' },
    { name: 'Supplies', value: 9870, color: '#93C5FD' },
    { name: 'Utilities', value: 5830, color: '#BFDBFE' },
    { name: 'Wages', value: 21000, color: '#1E3A8A' }
  ];

  const monthlyProductionData = [
    { month: 'Jan', value: 554 },
    { month: 'Feb', value: 534 },
    { month: 'Mar', value: 590 },
    { month: 'Apr', value: 522 },
    { month: 'May', value: 588 },
    { month: 'Jun', value: 623 },
    { month: 'Jul', value: 678 },
    { month: 'Aug', value: 784 },
    { month: 'Sep', value: 712 },
    { month: 'Oct', value: 769 }
  ];

  const productionDistData = [
    { name: 'Aligners', public: 30, private: 20, cash: 50 },
    { name: 'Dentures', public: 45, private: 35, cash: 20 },
    { name: 'Hygiene', public: 35, private: 45, cash: 20 },
    { name: 'Implants', public: 15, private: 55, cash: 30 },
    { name: 'Veneers', public: 5, private: 15, cash: 80 },
    { name: 'Whitening', public: 10, private: 5, cash: 85 }
  ];

  const CustomTooltip: React.FC<TooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-sm rounded-md">
          <p className="font-medium text-[10px] text-gray-700 mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p 
              key={index} 
              className="text-[10px]"
              style={{ color: entry.color }}
            >
              {`${entry.name}: ${typeof entry.value === 'number' ? 
                entry.name === 'Monthly Production' ? 
                  `$${entry.value}` : 
                  `${entry.value}%` 
                : entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex-1 h-full pr-1 md:pr-3 flex flex-col min-h-0">
      {/* Top Stats Row */}
      <div className="w-full flex gap-1 md:gap-2 px-2 md:px-4 mb-3">
        <div className="flex-1 min-w-0 rounded-lg border border-blue-100/50 shadow-sm p-1 md:p-1.5 bg-blue-50/20 h-[50px] md:h-[77px] animate-[slide-up_1.7s_ease-out] relative">
          <div className="text-xs text-blue-900/70 font-medium mb-0.5 md:mb-0.5 min-h-[20px] md:min-h-[22px] flex flex-col justify-center">
            <span className="text-[6.7px] md:text-[13px] leading-[1.1] md:leading-normal block">Total Gross</span>
            <span className="text-[6.7px] md:text-[13px] leading-[1.1] md:leading-normal block">Production</span>
          </div>
          <div className="flex items-baseline gap-1 md:gap-1.5">
            <span className="text-[9px] md:text-[19px] font-semibold text-blue-900">$884,322</span>
            <span className="hidden md:inline text-[4.1px] md:text-[9.7px] font-medium text-emerald-600">+8.2%</span>
          </div>
          <button 
            onClick={() => setShowDistributionPopup(true)}
            className="hidden md:flex absolute top-1 right-1 p-1 rounded-full hover:bg-blue-50 transition-colors group"
            title="View Production Distribution"
          >
            <BarChart2 
              className="w-4 h-4 text-blue-600 animate-[pulse-subtle_3s_ease-in-out_infinite]"
            />
            <div className="absolute -bottom-1 left-1/2 w-1 h-1 bg-blue-400 rounded-full opacity-75 animate-[glow_2s_ease-in-out_infinite]" />
          </button>
        </div>

        <div className="flex-1 min-w-0 rounded-lg border border-blue-100/50 shadow-sm p-1 md:p-1.5 bg-blue-50/20 h-[50px] md:h-[77px] animate-[slide-up_1.7s_ease-out]">
          <div className="text-xs text-blue-900/70 font-medium mb-0.5 md:mb-0.5 min-h-[20px] md:min-h-[22px] flex flex-col justify-center">
            <span className="text-[6.7px] md:text-[13px] leading-[1.1] md:leading-normal block">Total Practice</span>
            <span className="text-[6.7px] md:text-[13px] leading-[1.1] md:leading-normal block">Profits</span>
          </div>
          <div className="flex items-baseline gap-1 md:gap-1.5">
            <span className="text-[9px] md:text-[19px] font-semibold text-blue-900">$429,812</span>
            <span className="hidden md:inline text-[4.1px] md:text-[9.7px] font-medium text-emerald-600">+2.1%</span>
          </div>
        </div>

        <div className="flex-1 min-w-0 rounded-lg border border-blue-100/50 shadow-sm p-1 md:p-1.5 bg-blue-50/20 h-[50px] md:h-[77px] animate-[slide-up_1.7s_ease-out]">
          <div className="text-xs text-blue-900/70 font-medium mb-0.5 md:mb-0.5 min-h-[20px] md:min-h-[22px] flex flex-col justify-center">
            <span className="text-[6.7px] md:text-[13px] leading-[1.1] md:leading-normal block">Monthly Avg</span>
            <span className="text-[6.7px] md:text-[13px] leading-[1.1] md:leading-normal block">Production</span>
          </div>
          <div className="flex items-baseline gap-1 md:gap-1.5">
            <span className="text-[9px] md:text-[19px] font-semibold text-blue-900">$635.4</span>
            <span className="hidden md:inline text-[4.1px] md:text-[9.7px] text-blue-900/50">Per Patient</span>
          </div>
        </div>

        <div className="flex-1 min-w-0 rounded-lg border border-blue-100/50 shadow-sm p-1 md:p-1.5 bg-blue-50/20 h-[50px] md:h-[77px] animate-[slide-up_1.7s_ease-out]">
          <div className="text-xs text-blue-900/70 font-medium mb-0.5 md:mb-0.5 min-h-[20px] md:min-h-[22px] flex flex-col justify-center">
            <span className="text-[6.7px] md:text-[13px] leading-[1.1] md:leading-normal block">Total</span>
            <span className="text-[6.7px] md:text-[13px] leading-[1.1] md:leading-normal block">Expenses</span>
          </div>
          <div className="flex items-baseline gap-1 md:gap-1.5">
            <span className="text-[9px] md:text-[19px] font-semibold text-blue-900">$79,355</span>
            <span className="hidden md:inline text-[4.1px] md:text-[9.7px] font-medium text-rose-600">-3.2%</span>
          </div>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-3 px-2 md:px-4 flex-1 h-[190px] md:max-h-[400px]">
        {/* Monthly Production Chart */}
        <div className="bg-white rounded-lg p-0.5 md:p-2.5 shadow-sm w-full h-[90px] md:h-full border border-gray-200 animate-[slide-up_1.7s_ease-out] overflow-hidden">
          <h3 className="text-[8.5px] md:text-[13px] font-medium text-gray-700 mb-1.5">
            Average Monthly Production/Patient
          </h3>
          <div className="h-[75px] md:h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={monthlyProductionData}
                margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis
                  dataKey="month"
                  tick={{
                    fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? 7 : 9,
                    fill: '#4B5563'
                  }}
                  axisLine={{ stroke: '#E5E7EB' }}
                  tickLine={{ stroke: '#E5E7EB' }}
                />
                <YAxis
                  tick={{
                    fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? 7 : 9,
                    fill: '#4B5563'
                  }}
                  axisLine={{ stroke: '#E5E7EB' }}
                  tickLine={{ stroke: '#E5E7EB' }}
                  tickFormatter={(value) => `$${value}`}
                  width={35}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#2563EB"
                  strokeWidth={2}
                  dot={{ r: 3, fill: '#2563EB', strokeWidth: 0 }}
                  activeDot={{ r: 4, strokeWidth: 0 }}
                  className="animate-[grow-line_1.7s_ease-out]"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expenses Pie Chart */}
        <div className="bg-white rounded-lg p-0.5 md:p-2.5 shadow-sm w-full h-[90px] md:h-full border border-gray-200 animate-[slide-up_1.7s_ease-out] overflow-hidden">
          <h3 className="text-[8.5px] md:text-[13px] font-medium text-gray-700 mb-1.5">
            Total Expenses Distribution
          </h3>
          <div className="h-[75px] md:h-[200px] w-full flex items-center">
            <div className="w-[35%] space-y-0.25 md:space-y-1 text-[6px] md:text-[7px]">
              {expensesData.map((entry, index) => (
                <div key={index} className="flex items-center gap-1 md:gap-2">
                  <div 
                    className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-[7px] md:text-[9px] text-gray-600">
                    {entry.name}: ${(entry.value / 1000).toFixed(1)}k
                  </span>
                </div>
              ))}
            </div>
            <div className="w-[65%] h-full flex items-start justify-center relative pt-2 md:items-center md:pt-0">
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="text-center translate-y-[2px] md:translate-y-0">
      <div className="text-[7.5px] md:text-xs text-gray-500">Total</div>
      <div className="text-[9.5px] md:text-sm font-semibold text-gray-800">$79,355</div>
    </div>
  </div>
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={expensesData}
        innerRadius="60%"
        outerRadius="90%"
        paddingAngle={2}
        dataKey="value"
        className="animate-[rotate-pie_1.7s_ease-out]"
      >
        {expensesData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
    </PieChart>
  </ResponsiveContainer>
</div>
          </div>
        </div>
      </div>

      {/* Production Distribution Popup */}
      {showDistributionPopup && (
        <div className="hidden md:block fixed inset-0 z-50 overflow-auto bg-black/20 backdrop-blur-sm">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-4xl bg-white rounded-lg shadow-xl animate-[fade-in-scale_0.3s_ease-out]">
            <div className="relative p-4">
              <button
                onClick={() => setShowDistributionPopup(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Production Distribution by Payment Type
              </h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={productionDistData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 5, bottom: 5 }}
                    barSize={12}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 10, fill: '#4B5563' }}
                      axisLine={{ stroke: '#E5E7EB' }}
                      tickLine={{ stroke: '#E5E7EB' }}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={80}
                      tick={{ fontSize: 10, fill: '#4B5563' }}
                      axisLine={{ stroke: '#E5E7EB' }}
                      tickLine={{ stroke: '#E5E7EB' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="public" name="Public Ins" stackId="a" fill="#1E40AF" className="animate-[grow-bar_1.7s_ease-out]" />
                    <Bar dataKey="private" name="Private Ins" stackId="a" fill="#3B82F6" className="animate-[grow-bar_1.7s_ease-out]" />
                    <Bar dataKey="cash" name="Cash" stackId="a" fill="#93C5FD" className="animate-[grow-bar_1.7s_ease-out]" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes grow-line {
          from { stroke-dasharray: 1000; stroke-dashoffset: 1000; }
          to { stroke-dasharray: 1000; stroke-dashoffset: 0; }
        }
        @keyframes grow-bar {
          from { transform: scaleX(0); transform-origin: left; }
          to { transform: scaleX(1); transform-origin: left; }
        }
        @keyframes rotate-pie {
          from { transform: rotate(-180deg); }
          to { transform: rotate(0); }
        }
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes glow {
          0%, 100% { transform: scale(1); opacity: 0.75; }
          50% { transform: scale(1.5); opacity: 0.5; }
        }
        @keyframes fade-in-scale {
          from { transform: translate(-50%, -50%) scale(0.95); opacity: 0; }
          to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default FinancialsContent;
