import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';
import { motion } from "framer-motion";

const CustomTooltip: React.FC<{
  active?: boolean;
  payload?: any[];
  label?: string;
}> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 shadow-sm rounded-lg border border-gray-200">
        <p className="text-[10px] font-medium text-gray-600">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-[10px]" style={{ color: entry.color }}>
            {`${entry.name}: ${typeof entry.value === 'number' ? 
              entry.payload?.amount ? 
                `$${entry.payload.amount.toLocaleString()}` : 
                `${entry.value.toLocaleString()}${entry.unit || '%'}`
              : entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const MonthlyProductionChart: React.FC<{
  data: any;
  title: string;
  total: number;
  isDesktop: boolean;
}> = ({ data, title, total, isDesktop }) => {
  const COLORS = ['#1E40AF', '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'];
  const formattedData = Object.entries(data).map(([name, values]: [string, any]) => ({
    name,
    ...values,
  }));

  return (
    <div className={`flex ${isDesktop ? 'flex-row' : 'flex-col'} items-center w-full h-full`}>
      <div className={`${isDesktop ? 'w-1/3' : 'w-full'} text-center`}>
        <p className="text-[10px] text-gray-600 font-medium">{title}</p>
        <p className="text-[14px] font-semibold text-gray-800">
          ${total.toLocaleString()}
        </p>
      </div>
      <div className={`${isDesktop ? 'w-2/3' : 'w-full'} h-[60px] md:h-[100px]`}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={formattedData}
              innerRadius={isDesktop ? 20 : 15}
              outerRadius={isDesktop ? 32 : 28}
              paddingAngle={2}
              dataKey="amount"
            >
              {formattedData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                  className="transition-opacity duration-200 hover:opacity-80"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const InsuranceDistributionChart: React.FC<{
  data: any;
  title: string;
  isDesktop: boolean;
}> = ({ data, title, isDesktop }) => {
  const formattedData = [
    { name: 'Public', value: data.public, color: '#1E40AF' },
    { name: 'Private', value: data.private, color: '#60A5FA' }
  ];

  return (
    <div className="flex flex-col items-center w-full h-full">
      {/* Chart at top */}
      <div className="h-[70px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={formattedData}
              innerRadius={isDesktop ? 30 : 15}
              outerRadius={isDesktop ? 45 : 25}
              startAngle={180}
              endAngle={0}
              paddingAngle={2}
              dataKey="value"
              cy={50}
            >
              {formattedData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  className="transition-opacity duration-200 hover:opacity-80"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Title text centered below with reduced gap */}
      <p className="text-[12px] text-gray-600 font-medium -mt-2">{title}</p>

      {/* Legend in one straight line */}
      <div className="flex justify-center items-center gap-2 mt-1">
        {formattedData.map((item) => (
          <div key={item.name} className="flex items-center gap-1">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[10px] text-gray-600 whitespace-nowrap">
              {item.name}: {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const GrowthIndicator: React.FC<{
  data: any;
  title: string;
  isDesktop: boolean;
}> = ({ data, title, isDesktop }) => {
  return (
    <div className={`flex ${isDesktop ? 'flex-row' : 'flex-col'} items-center w-full h-full min-h-[100px]`}>
      <div className="w-full text-center">
        <p className="text-[13px] text-gray-600 font-medium">{title}</p>
        <p className="text-[24px] font-semibold text-gray-800 mt-2">
          {data.percentage}%
        </p>
        <p className={`text-[12px] mt-1 ${data.yoyChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {data.yoyChange >= 0 ? '+' : ''}{data.yoyChange}% YoY
        </p>
      </div>
    </div>
  );
};

const ProgressCircle: React.FC<{
  percentage: number;
  total: number;
  title: string;
  isDesktop: boolean;
}> = ({ percentage, total, title, isDesktop }) => {
  const radius = isDesktop ? 35 : 30;
  const strokeWidth = isDesktop ? 6 : 5;
  const circumference = 2 * Math.PI * radius;
  const progress = (percentage / 100) * circumference;

  return (
    <div className={`flex ${isDesktop ? 'flex-row' : 'flex-col'} items-center w-full h-full`}>
      <div className={`${isDesktop ? 'w-1/2' : 'w-full'} text-center`}>
        <p className="text-[10px] text-gray-600 font-medium">{title}</p>
        <p className="text-[10px] text-gray-500">Total: {total.toLocaleString()}</p>
      </div>
      <div className={`${isDesktop ? 'w-1/2' : 'w-full'} flex justify-center`}>
        <svg
          className="transform -rotate-90 w-20 h-20"
          viewBox="0 0 100 100"
        >
          <circle
            className="text-gray-200"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="none"
            r={radius}
            cx="50"
            cy="50"
          />
          <circle
            className="text-blue-600 transition-all duration-1000 ease-out"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            stroke="currentColor"
            fill="none"
            r={radius}
            cx="50"
            cy="50"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: circumference - progress,
            }}
          />
          <text
            x="50"
            y="50"
            className="text-[12px] font-medium"
            dominantBaseline="middle"
            textAnchor="middle"
            fill="#1E40AF"
            transform="rotate(90 50 50)"
          >
            {percentage}%
          </text>
        </svg>
      </div>
    </div>
  );
};

const VolumeLineChart: React.FC<{
  data: number[];
  title: string;
  procedureName: string;
  isDesktop: boolean;
}> = ({ data, title, procedureName, isDesktop }) => {
  const chartData = data.map((value, index) => ({
    month: `Month ${index + 1}`,
    value
  }));

  return (
    <div className={`flex ${isDesktop ? 'flex-row' : 'flex-col'} items-center w-full h-full`}>
      <div className={`${isDesktop ? 'w-1/3' : 'w-full'} text-center`}>
        <p className="text-[10px] text-gray-600 font-medium">{title}</p>
        <p className="text-[12px] font-semibold text-gray-800">{procedureName}</p>
      </div>
      <div className={`${isDesktop ? 'w-2/3' : 'w-full'} h-[100px] md:h-[120px]`}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 8 }}
              stroke="#9CA3AF"
            />
            <YAxis 
              tick={{ fontSize: 8 }}
              stroke="#9CA3AF"
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#1E40AF"
              strokeWidth={2}
              dot={{ fill: '#1E40AF', r: 3 }}
              activeDot={{ r: 4, fill: '#3B82F6' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const LargestProductionChart: React.FC<{
  data: any;
  title: string;
  isDesktop: boolean;
}> = ({ data, title, isDesktop }) => {
  return (
    <div className={`flex ${isDesktop ? 'flex-row' : 'flex-col'} items-center w-full h-full min-h-[100px]`}>
      <div className="w-full text-center">
        <p className="text-[10px] text-gray-600 font-medium">{title}</p>
        <p className="text-[14px] font-semibold text-gray-800 mt-2">
          {data.name}
        </p>
        <p className="text-[12px] mt-1 text-blue-600">
          Procedure Avg: ${data.procedureAvg}
        </p>
        <p className="text-[12px] text-gray-500">
          Total Avg: ${data.totalAvg}
        </p>
      </div>
    </div>
  );
};

const AgeDistributionChart: React.FC<{
  title: string;
  isDesktop: boolean;
}> = ({ title, isDesktop }) => {
  const chartData = [
    { age: '0-18', value: 25 },
    { age: '19-35', value: 45 },
    { age: '36-50', value: 30 }
  ];

  return (
    <div className="flex flex-col items-center w-full h-full">
      {/* Chart takes full width at top */}
      <div className="w-full h-[100px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="age" 
              tick={{ fontSize: 8 }}
              stroke="#9CA3AF"
            />
            <YAxis 
              tick={{ fontSize: 8 }}
              stroke="#9CA3AF"
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="value" 
              fill="#1E40AF"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Title centered below chart */}
      <p className="text-[12px] text-gray-600 font-medium mt-1">{title}</p>
    </div>
  );
};

const AppointmentsByAgeChart: React.FC<{
  title: string;
  isDesktop: boolean;
}> = ({ title, isDesktop }) => {
  const chartData = [
    { ageGroup: '0-18', procedures: 35 },
    { ageGroup: '19-35', procedures: 45 },
    { ageGroup: '36-50', procedures: 20 }
  ];

  return (
    <div className={`flex ${isDesktop ? 'flex-row' : 'flex-col'} items-center w-full h-full`}>
      <div className={`${isDesktop ? 'w-1/3' : 'w-full'} text-center`}>
        <p className="text-[10px] text-gray-600 font-medium">{title}</p>
      </div>
      <div className={`${isDesktop ? 'w-2/3' : 'w-full'} h-[100px] md:h-[120px]`}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="ageGroup" 
              tick={{ fontSize: 8 }}
              stroke="#9CA3AF"
            />
            <YAxis 
              tick={{ fontSize: 8 }}
              stroke="#9CA3AF"
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="procedures" 
              fill="#1E40AF"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

interface AnalysisContentProps {
  selectedIcon: 'financial' | 'patients' | 'procedures' | null;
  selectedSubData: string | null;
  selectedZip: string;
  data: any;
}

const AnalysisContent: React.FC<AnalysisContentProps> = ({ 
  selectedIcon, 
  selectedSubData, 
  selectedZip,
  data 
}) => {
  if (!selectedSubData || !selectedZip) return null;
  if (!data) return null;

  const isDesktop = window.innerWidth >= 768;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`space-y-4 w-full`} 
    >
      {/* Patient Section */}
      {selectedIcon === 'patients' && selectedSubData === 'Avg Active Patient %' && (
        <div className="grid grid-rows-2 gap-2 h-full w-full pt-2">
          <div className="bg-white rounded-lg px-2 py-1 md:px-2 md:py-1 shadow-sm w-full">
            <ProgressCircle
              percentage={data.patients.activePatients.regional.percentage}
              total={data.patients.activePatients.regional.total}
              title="Regional Average"
              isDesktop={isDesktop}
            />
          </div>
          <div className="bg-white rounded-lg px-2 py-1 md:px-2 md:py-1 shadow-sm w-full">
            <ProgressCircle
              percentage={data.patients.activePatients.practice.percentage}
              total={data.patients.activePatients.practice.total}
              title="Your Practice"
              isDesktop={isDesktop}
            />
          </div>
        </div>
      )}

      {selectedIcon === 'patients' && selectedSubData === 'Avg Patient Age' && (
        <div className="grid grid-rows-2 gap-2 h-full w-full pt-2">
          <div className="bg-white rounded-lg px-2 py-1 md:px-2 md:py-1 shadow-sm w-full">
            <AgeDistributionChart
              title="Regional Average"
              isDesktop={isDesktop}
            />
          </div>
          <div className="bg-white rounded-lg px-2 py-1 md:px-2 md:py-1 shadow-sm w-full">
            <AgeDistributionChart
              title="Your Practice"
              isDesktop={isDesktop}
            />
          </div>
        </div>
      )}

      {selectedIcon === 'patients' && selectedSubData === 'Most Apts/Age Group' && (
        <div className="grid grid-rows-2 gap-2 h-full w-full pt-2">
          <div className="bg-white rounded-lg px-2 py-1 md:px-2 md:py-1 shadow-sm w-full">
            <AppointmentsByAgeChart
              title="Regional Average"
              isDesktop={isDesktop}
            />
          </div>
          <div className="bg-white rounded-lg px-2 py-1 md:px-2 md:py-1 shadow-sm w-full">
            <AppointmentsByAgeChart
              title="Your Practice"
              isDesktop={isDesktop}
            />
          </div>
        </div>
      )}

      {/* Procedures Section */}
      {selectedIcon === 'procedures' && selectedSubData === 'Highest Vol Procedure' && (
        <div className="grid grid-rows-2 gap-2 h-full w-full pt-2">
          <div className="bg-white rounded-lg px-2 py-1 md:px-2 md:py-1 shadow-sm w-full">
            <VolumeLineChart
              data={data.procedures.highestVolume.regional.data}
              title="Regional Average"
              procedureName={data.procedures.highestVolume.regional.name}
              isDesktop={isDesktop}
            />
          </div>
          <div className="bg-white rounded-lg px-2 py-1 md:px-2 md:py-1 shadow-sm w-full">
            <VolumeLineChart
              data={data.procedures.highestVolume.practice.data}
              title="Your Practice"
              procedureName={data.procedures.highestVolume.practice.name}
              isDesktop={isDesktop}
            />
          </div>
        </div>
      )}

      {selectedIcon === 'procedures' && selectedSubData === 'Largest Avg Production' && (
        <div className="grid grid-rows-2 gap-2 h-full w-full pt-2">
          <div className="bg-white rounded-lg px-2 py-1 md:px-2 md:py-1 shadow-sm w-full">
            <LargestProductionChart
              data={data.procedures.largestProduction.regional}
              title="Regional Average"
              isDesktop={isDesktop}
            />
          </div>
          <div className="bg-white rounded-lg px-2 py-1 md:px-2 md:py-1 shadow-sm w-full">
            <LargestProductionChart
              data={data.procedures.largestProduction.practice}
              title="Your Practice"
              isDesktop={isDesktop}
            />
          </div>
        </div>
      )}

      {selectedIcon === 'procedures' && selectedSubData === 'Lowest Vol Procedure' && (
        <div className="grid grid-rows-2 gap-2 h-full w-full pt-2">
          <div className="bg-white rounded-lg px-2 py-1 md:px-2 md:py-1 shadow-sm w-full">
            <VolumeLineChart
              data={data.procedures.lowestVolume.regional.data}
              title="Regional Average"
              procedureName={data.procedures.lowestVolume.regional.name}
              isDesktop={isDesktop}
            />
          </div>
          <div className="bg-white rounded-lg px-2 py-1 md:px-2 md:py-1 shadow-sm w-full">
            <VolumeLineChart
              data={data.procedures.lowestVolume.practice.data}
              title="Your Practice"
              procedureName={data.procedures.lowestVolume.practice.name}
              isDesktop={isDesktop}
            />
          </div>
        </div>
      )}

      {/* Financial Section */}
      {selectedIcon === 'financial' && selectedSubData === 'Avg Monthly Production' && (
        <div className="grid grid-rows-2 gap-2 h-full w-full pt-2"> 
          <div className="bg-white rounded-lg px-2 py-1 md:px-2 md:py-1 shadow-sm w-full">
            <MonthlyProductionChart
              data={data.financial.monthlyProduction.regional.breakdown}
              title="Regional Average"
              total={data.financial.monthlyProduction.regional.total}
              isDesktop={isDesktop}
            />
          </div>
          <div className="bg-white rounded-lg px-2 py-1 md:px-2 md:py-1 shadow-sm w-full">
            <MonthlyProductionChart
              data={data.financial.monthlyProduction.practice.breakdown}
              title="Your Practice"
              total={data.financial.monthlyProduction.practice.total}
              isDesktop={isDesktop}
            />
          </div>
        </div>
      )}

      {selectedIcon === 'financial' && selectedSubData === 'Insurance Public/Private' && (
        <div className="grid grid-rows-2 gap-2 h-full w-full pt-2"> 
          <div className="bg-white rounded-lg px-2 py-1 md:px-2 md:py-1 shadow-sm w-full">
            <InsuranceDistributionChart
              data={data.financial.insurance.regional}
              title="Regional Average"
              isDesktop={isDesktop}
            />
          </div>
          <div className="bg-white rounded-lg px-2 py-1 md:px-2 md:py-1 shadow-sm w-full">
            <InsuranceDistributionChart
              data={data.financial.insurance.practice}
              title="Your Practice"
              isDesktop={isDesktop}
            />
          </div>
        </div>
      )}

      {selectedIcon === 'financial' && selectedSubData === 'Avg Annual Growth %' && (
        <div className="grid grid-rows-2 gap-2 h-full w-full pt-2"> 
          <div className="bg-white rounded-lg px-2 py-1 md:px-2 md:py-1 shadow-sm w-full">
            <GrowthIndicator
              data={data.financial.growth.regional}
              title="Regional Average"
              isDesktop={isDesktop}
            />
          </div>
          <div className="bg-white rounded-lg px-2 py-1 md:px-2 md:py-1 shadow-sm w-full">
            <GrowthIndicator
              data={data.financial.growth.practice}
              title="Your Practice"
              isDesktop={isDesktop}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AnalysisContent;
