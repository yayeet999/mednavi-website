import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';
import { motion, AnimatePresence } from "framer-motion";

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
      <div className="h-[60px] w-full -mt-3">
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
              cy={45}
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

      <div className="flex flex-col md:flex-row items-center justify-center">
        <p className="text-[10px] md:text-[12px] text-gray-700 font-medium -mt-2">
          {isDesktop ? (
            <span>{title}</span>
          ) : (
            title.split(' ').map((word, index) => (
              <span key={index} className="block text-center">{word}</span>
            ))
          )}
        </p>
      </div>

      <div className={`flex flex-col md:flex-row justify-center items-center gap-1 md:gap-3 ${isDesktop ? 'mt-0' : 'mt-1'}`}>
        {formattedData.map((item) => (
          <div key={item.name} className="flex items-center gap-1">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[8px] md:text-[10px] text-gray-700 whitespace-nowrap">
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
        <p className="text-[24px] font-semibold text-gray-800 mt-1 md:mt-2">
          {data.percentage}%
        </p>
        <p className={`text-[12px] mt-0.5 md:mt-1 ${data.yoyChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
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
  const strokeWidth = isDesktop ? 8 : 5;
  const circumference = 2 * Math.PI * radius;
  const progress = (percentage / 100) * circumference;

  return (
    <div className={`flex ${isDesktop ? 'flex-row' : 'flex-col'} items-center w-full h-full`}>
      <div className={`${isDesktop ? 'w-1/2' : 'w-full'} text-center`}>
        <p className="text-[9px] md:text-[11px] text-gray-700 font-medium">{title}</p>
        <p className="text-[9.5px] md:text-[11px] text-gray-500">Total: {total.toLocaleString()}</p>
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
            x="55"
            y="50"
            className="text-[16px] md:text-[18px] font-medium"
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
  data: any;
  title: string;
  procedureName: string;
  isDesktop: boolean;
}> = ({ data, title, procedureName, isDesktop }) => {
  const chartData = data.map((value: number, index: number) => ({
    month: `Month ${index + 1}`,
    value
  }));

  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="relative h-[65px] md:h-[81px] w-[130%] md:w-[105%] pt-2"> 
        <div className="absolute left-[-14%] md:left-[-2%] w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={chartData}
              margin={isDesktop ? { top: 0, right: 10, bottom: 0, left: -20 } : { top: 0, right: 10, bottom: 0, left: -20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 7 }}
                stroke="#64748b"
              />
              <YAxis 
                tick={{ fontSize: 7 }}
                stroke="#64748b"
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
      <div className="flex flex-col items-center">
        <p className="text-[9px] md:text-[12px] text-gray-700 font-medium -mt-1.5">
          {isDesktop ? (
            <span className="inline-block whitespace-nowrap">{`${title}: ${procedureName}`}</span>
          ) : (
            <>
              {title.replace('Average', '')}:
              <br />
              <span className="text-gray-800 block">{procedureName}</span>
            </>
          )}
        </p>
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
        <p className="text-[11px] text-gray-600 font-medium">{title}</p>
        <p className="text-[12.5px] md:text-[14px] font-semibold text-gray-800 mt-2">
          {data.name}
        </p>
        <p className="text-[9.5px] md:text-[12px] mt-1 text-gray-700">
          Procedure Avg: ${data.procedureAvg}
        </p>
        <p className="text-[9.5px] md:text-[12px] text-gray-700">
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
      <div className="relative h-[65px] md:h-[90px] w-[130%] md:w-[105%] pt-2"> 
        <div className="absolute left-[-14%] md:left-[-2%] w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={chartData}
              margin={isDesktop ? { top: 0, right: 10, bottom: 0, left: -20 } : { top: 0, right: 10, bottom: 0, left: -20 }}
              barGap={isDesktop ? 2 : 10}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="age" 
                tick={{ fontSize: 7 }}
                stroke="#64748b"
              />
              <YAxis 
                tick={{ fontSize: 7 }}
                stroke="#64748b"
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="value" 
                fill="#1E40AF"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-[10.5px] md:text-[12px] text-gray-700 font-medium -mt-1.5">
          {isDesktop ? (
            <span className="inline-block whitespace-nowrap">{title}</span>
          ) : (
            title.split(' ').map((word, index) => (
              <span key={index} className="block text-center">{word}</span>
            ))
          )}
        </p>
      </div>
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
    <div className="flex flex-col items-center w-full h-full">
      <div className="relative h-[65px] md:h-[81px] w-[130%] md:w-[105%] pt-2"> 
        <div className="absolute left-[-14%] md:left-[-2%] w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={chartData}
              margin={isDesktop ? { top: 0, right: 10, bottom: 0, left: -20 } : { top: 0, right: 10, bottom: 0, left: -20 }}
              barGap={isDesktop ? 2 : 10}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="ageGroup" 
                tick={{ fontSize: 7 }}
                stroke="#64748b"
              />
              <YAxis 
                tick={{ fontSize: 7 }}
                stroke="#64748b"
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="procedures" 
                fill="#1E40AF"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-[10.5px] md:text-[12px] text-gray-700 font-medium -mt-1.5">
          {isDesktop ? (
            <span className="inline-block whitespace-nowrap">{title}</span>
          ) : (
            title.split(' ').map((word, index) => (
              <span key={index} className="block text-center">{word}</span>
            ))
          )}
        </p>
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
  const [showContainers, setShowContainers] = React.useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = React.useState(false);

  React.useEffect(() => {
    if (selectedSubData) {
      setIsAnimatingOut(false);
      const timer = setTimeout(() => {
        setShowContainers(true);
      }, 500);
      return () => clearTimeout(timer);
    } else if (showContainers) {
      setIsAnimatingOut(true);
      const timer = setTimeout(() => {
        setShowContainers(false);
        setIsAnimatingOut(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setShowContainers(false);
      setIsAnimatingOut(false);
    }
  }, [selectedSubData, showContainers]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full"
    >
      <AnimatePresence mode="wait">
        {showContainers && (
          <motion.div 
            className="grid grid-rows-2 gap-2 w-full"
            initial={{ opacity: 0, x: -20, y: typeof window !== 'undefined' && window.innerWidth < 768 ? -15 : 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut", exit: { duration: 0 } }}
          >
            {/* Patient Section */}
            {selectedIcon === 'patients' && selectedSubData === 'Avg Active Patient %' && (
              <>
                <div className="bg-white rounded-lg px-2 py-1 md:px-2 md:py-1 shadow-sm w-full mt-1 md:mt-0">
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
              </>
            )}

            {selectedIcon === 'patients' && selectedSubData === 'Avg Patient Age' && (
              <>
                <div className="bg-white rounded-lg px-2 py-1 md:px-2 md:py-1 shadow-sm w-full mt-2 md:mt-0">
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
              </>
            )}

            {selectedIcon === 'patients' && selectedSubData === 'Most Apts/Age Group' && (
              <>
                <div className="bg-white rounded-lg px-2 py-1 md:px-2 md:pt-4 md:pb-1 shadow-sm w-full mt-2 md:mt-0">
                  <AppointmentsByAgeChart
                    title="Regional Average"
                    isDesktop={isDesktop}
                  />
                </div>
                <div className="bg-white rounded-lg px-2 py-1 md:px-2 md:pt-4 md:pb-1 shadow-sm w-full">
                  <AppointmentsByAgeChart
                    title="Your Practice"
                    isDesktop={isDesktop}
                  />
                </div>
              </>
            )}

            {/* Procedures Section */}
            {selectedIcon === 'procedures' && selectedSubData === 'Highest Vol Procedure' && (
              <>
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
              </>
            )}

            {selectedIcon === 'procedures' && selectedSubData === 'Largest Avg Production' && (
              <>
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
              </>
            )}

            {selectedIcon === 'procedures' && selectedSubData === 'Lowest Vol Procedure' && (
              <>
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
              </>
            )}

            {/* Financial Section */}
            {selectedIcon === 'financial' && selectedSubData === 'Avg Monthly Production' && (
              <>
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
              </>
            )}

            {selectedIcon === 'financial' && selectedSubData === 'Insurance Public/Private' && (
              <>
                <div className="bg-white rounded-lg px-2 py-1 md:px-2 md:pt-5 md:pb-0.5 shadow-sm w-full">
                  <InsuranceDistributionChart
                    data={data.financial.insurance.regional}
                    title="Regional Average"
                    isDesktop={isDesktop}
                  />
                </div>
                <div className="bg-white rounded-lg px-2 py-1 md:px-2 md:pt-5 md:pb-0.5 shadow-sm w-full">
                  <InsuranceDistributionChart
                    data={data.financial.insurance.practice}
                    title="Your Practice"
                    isDesktop={isDesktop}
                  />
                </div>
              </>
            )}

            {selectedIcon === 'financial' && selectedSubData === 'Avg Annual Growth %' && (
              <>
                <div className="bg-white rounded-lg px-2 py-1 md:px-2 md:py-1 shadow-sm w-full mt-2 md:mt-0">
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
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AnalysisContent;
