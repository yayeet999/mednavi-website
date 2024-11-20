import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

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
    <div className="flex-1 overflow-y-auto pr-1 md:pr-3 h-full flex flex-col">
      {/* Top Stats Row */}
      <div className="w-full flex gap-1 md:gap-2 px-2 md:px-4 mb-3">
        <div className="flex-1 min-w-0 rounded-lg border border-blue-100/50 shadow-sm p-1 md:p-1.5 bg-blue-50/20 h-[50px] md:h-[77px] animate-[slide-up_1.7s_ease-out]">
          <div className="text-xs text-blue-900/70 font-medium mb-0.5 md:mb-0.5 min-h-[20px] md:min-h-[22px] flex flex-col justify-center">
            <span className="text-[6.7px] md:text-[13px] leading-[1.1] md:leading-normal block">Total Gross</span>
            <span className="text-[6.7px] md:text-[13px] leading-[1.1] md:leading-normal block">Production</span>
          </div>
          <div className="flex items-baseline gap-1 md:gap-1.5">
            <span className="text-[9px] md:text-[19px] font-semibold text-blue-900">$884,322</span>
            <span className="hidden md:inline text-[4.1px] md:text-[9.7px] font-medium text-emerald-600">+8.2%</span>
          </div>
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

{/* Charts Grid */}
      <div className="grid grid-cols-2 gap-2 md:gap-3 px-2 md:px-4">
        {/* Monthly Production Chart */}
        <div className="bg-white rounded-lg p-1.5 md:p-2.5 shadow-sm h-[140px] md:h-[200px] w-full border border-gray-200 animate-[slide-up_1.7s_ease-out]">
          <h3 className="text-[8.5px] md:text-[13px] font-medium text-gray-700 mb-1.5">
            Average Monthly Production/Patient
          </h3>
          <div className="h-[115px] md:h-[170px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={monthlyProductionData}
                margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
              >
                <CartesianGrid 
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E5E7EB"
                />
                <XAxis
                  dataKey="month"
                  tick={{
                    fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? 6 : 8,
                    fill: '#4B5563'
                  }}
                  axisLine={{ stroke: '#E5E7EB' }}
                  tickLine={{ stroke: '#E5E7EB' }}
                />
                <YAxis
                  tick={{
                    fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? 6 : 8,
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
        <div className="bg-white rounded-lg p-1.5 md:p-2.5 shadow-sm h-[140px] md:h-[200px] w-full border border-gray-200 animate-[slide-up_1.7s_ease-out]">
          <h3 className="text-[8.5px] md:text-[13px] font-medium text-gray-700 mb-1.5">
            Total Expenses Distribution
          </h3>
          <div className="h-[115px] md:h-[170px] w-full flex items-center">
            <div className="w-[35%] space-y-0.5 md:space-y-1">
              {expensesData.map((entry, index) => (
                <div key={index} className="flex items-center gap-1 md:gap-2">
                  <div 
                    className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-[6px] md:text-[9px] text-gray-600">
                    {entry.name}: ${(entry.value / 1000).toFixed(1)}k
                  </span>
                </div>
              ))}
            </div>
            <div className="w-[65%] h-full flex items-center justify-center relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-[8px] md:text-xs text-gray-500">Total</div>
                  <div className="text-[10px] md:text-sm font-semibold text-gray-800">$79,355</div>
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
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        className="animate-[fill-pie_1.7s_ease-out]"
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

 {/* Production Distribution Chart */}
        <div className="col-span-2 bg-white rounded-lg p-1.5 md:p-2.5 shadow-sm h-[180px] md:h-[240px] w-full border border-gray-200 animate-[slide-up_1.7s_ease-out]">
          <h3 className="text-[8.5px] md:text-[13px] font-medium text-gray-700 mb-1.5">
            Production Distribution by Payment Type
          </h3>
          <div className="h-[155px] md:h-[210px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={productionDistData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 5, bottom: 5 }}
                barSize={typeof window !== 'undefined' && window.innerWidth < 768 ? 8 : 12}
              >
                <CartesianGrid 
                  strokeDasharray="3 3"
                  horizontal={true}
                  vertical={false}
                  stroke="#E5E7EB"
                />
                <XAxis
                  type="number"
                  tick={{
                    fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? 6 : 8,
                    fill: '#4B5563'
                  }}
                  axisLine={{ stroke: '#E5E7EB' }}
                  tickLine={{ stroke: '#E5E7EB' }}
                  tickFormatter={(value) => `${value}%`}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={60}
                  tick={{
                    fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? 6 : 8,
                    fill: '#4B5563'
                  }}
                  axisLine={{ stroke: '#E5E7EB' }}
                  tickLine={{ stroke: '#E5E7EB' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="public" 
                  name="Public Ins" 
                  stackId="a" 
                  fill="#1E40AF"
                  className="animate-[grow-bar_1.7s_ease-out]"
                />
                <Bar 
                  dataKey="private" 
                  name="Private Ins" 
                  stackId="a" 
                  fill="#3B82F6"
                  className="animate-[grow-bar_1.7s_ease-out]"
                />
                <Bar 
                  dataKey="cash" 
                  name="Cash" 
                  stackId="a" 
                  fill="#93C5FD"
                  className="animate-[grow-bar_1.7s_ease-out]"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes grow-line {
          from { stroke-dasharray: 1000;
                 stroke-dashoffset: 1000; }
          to { stroke-dasharray: 1000;
               stroke-dashoffset: 0; }
        }
        @keyframes grow-bar {
          from { transform: scaleX(0); transform-origin: left; }
          to { transform: scaleX(1); transform-origin: left; }
        }
        @keyframes rotate-pie {
          from { transform: rotate(-180deg); }
          to { transform: rotate(0); }
        }
        @keyframes fill-pie {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default FinancialsContent;
