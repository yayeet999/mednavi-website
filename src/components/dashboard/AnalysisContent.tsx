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
        <p className="text-[14px] md:text-[12.5px] font-semibold text-gray-800">
          ${total.toLocaleString()}
        </p>
      </div>
      <div className={`${isDesktop ? 'w-2/3' : 'w-full'} h-[60px] md:h-[68px]`}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={formattedData}
              innerRadius={isDesktop ? 18 : 15}
              outerRadius={isDesktop ? 29 : 28}
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
    <div className={`
      w-full h-[120px] md:h-[73px] bg-white rounded-lg shadow-sm p-2 md:p-0.5
      flex flex-col justify-center items-center relative
    `}>
      <div className="h-[60px] w-full -mt-3">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={formattedData}
              innerRadius={isDesktop ? 22 : 15}
              outerRadius={isDesktop ? 34 : 25}
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
    <div className={`flex ${isDesktop ? 'flex-row' : 'flex-col'} items-center w-full h-full min-h-[70px]`}>
      <div className="w-full text-center">
        <p className="text-[13px] text-gray-600 font-medium">{title}</p>
        <div className={`${isDesktop ? 'flex justify-center items-center gap-2' : ''} mt-1 md:mt-2`}>
          <p className="text-[19px] font-semibold text-gray-800 inline-block">
            {data.percentage}%
          </p>
          <p className={`text-[12px] ${isDesktop ? 'mt-0 inline-block' : 'mt-0.5 md:mt-1'} ${data.yoyChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {data.yoyChange >= 0 ? '+' : ''}{data.yoyChange}% YoY
          </p>
        </div>
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
  const radius = isDesktop ? 30 : 30;
  const strokeWidth = isDesktop ? 7 : 5;
  const circumference = 2 * Math.PI * radius;
  const progress = (percentage / 100) * circumference;

  return (
    <div className={`flex ${isDesktop ? 'flex-row' : 'flex-col'} items-center w-full h-full`}>
      <div className={`${isDesktop ? 'w-1/2' : 'w-full'} text-center`}>
        <p className="text-[9px] md:text-[11px] text-gray-700 font-medium">{title}</p>
        <p className="text-[9.5px] md:text-[11px] text-gray-500">Total: {total.toLocaleString()}</p>
      </div>
      <div className={`${isDesktop ? 'w-1/2' : 'w-full'} flex justify-center`}>
        <motion.svg
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-20 h-20"
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
          <motion.circle
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - progress }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="text-blue-600"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            stroke="currentColor"
            fill="none"
            r={radius}
            cx="50"
            cy="50"
            style={{
              strokeDasharray: circumference,
            }}
          />
          <motion.text
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.8 }}
            x="50"
            y="50"
            className="text-[16px] md:text-[16px] font-medium"
            dominantBaseline="middle"
            textAnchor="middle"
            fill="#1E40AF"
          >
            {percentage}%
          </motion.text>
        </motion.svg>
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
      <div className="relative h-[65px] md:h-[71px] w-[130%] md:w-[135%] pt-2"> 
        <div className="absolute left-[-14%] md:left-[-15%] w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={chartData}
              margin={isDesktop ? { top: 5, right: 15, bottom: 0, left: 40 } : { top: 0, right: 10, bottom: 0, left: 35 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={true} vertical={false} />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 4.5, fill: "#0f172a" }}
                stroke="#64748b"
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 4.5, fill: "#0f172a" }}
                stroke="#64748b"
                axisLine={false}
                tickLine={false}
                domain={[0, 'dataMax + 2']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#1E40AF"
                strokeWidth={1.5}
                dot={{ fill: '#1E40AF', r: 2.5, strokeWidth: 0 }}
                activeDot={{ r: 3, fill: '#3B82F6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-[8px] md:text-[9px] text-gray-800 font-medium -mt-1.5">
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
    <div className={`flex ${isDesktop ? 'flex-row' : 'flex-col'} items-center w-full h-full min-h-[57px]`}>
      <div className="w-full text-center">
        <p className="text-[10px] text-gray-600 font-medium">{title}</p>
        <p className="text-[12.5px] md:text-[11.9px] font-semibold text-gray-800 mt-2">
          {data.name}
        </p>
        <p className="text-[9.5px] md:text-[10.2px] mt-1 text-gray-700">
          Procedure Avg: ${data.procedureAvg}
        </p>
        <p className="text-[9.5px] md:text-[10.2px] text-gray-700">
          Total Avg: ${data.totalAvg}
        </p>
      </div>
    </div>
  );
};

const AgeDistributionChart: React.FC<{
  title: string;
  isDesktop: boolean;
  selectedZip: string;
}> = ({ title, isDesktop, selectedZip }) => {
  const getChartData = (title: string, zip: string) => {
    // Regional Average data variations
    if (title === 'Regional Average') {
      switch (zip) {
        case '33311':
          return [
            { age: '0-18', value: 25 },
            { age: '19-35', value: 45 },
            { age: '36-50', value: 30 }
          ];
        case '33312':
          return [
            { age: '0-18', value: 28 },
            { age: '19-35', value: 42 },
            { age: '36-50', value: 30 }
          ];
        case '33313':
          return [
            { age: '0-18', value: 22 },
            { age: '19-35', value: 48 },
            { age: '36-50', value: 30 }
          ];
        case '33314':
          return [
            { age: '0-18', value: 30 },
            { age: '19-35', value: 40 },
            { age: '36-50', value: 30 }
          ];
        default:
          return [
            { age: '0-18', value: 25 },
            { age: '19-35', value: 45 },
            { age: '36-50', value: 30 }
          ];
      }
    }
    // Your Practice data variations
    switch (zip) {
      case '33311':
        return [
          { age: '0-18', value: 20 },
          { age: '19-35', value: 50 },
          { age: '36-50', value: 30 }
        ];
      case '33312':
        return [
          { age: '0-18', value: 35 },
          { age: '19-35', value: 35 },
          { age: '36-50', value: 30 }
        ];
      case '33313':
        return [
          { age: '0-18', value: 15 },
          { age: '19-35', value: 55 },
          { age: '36-50', value: 30 }
        ];
      case '33314':
        return [
          { age: '0-18', value: 25 },
          { age: '19-35', value: 45 },
          { age: '36-50', value: 30 }
        ];
      default:
        return [
          { age: '0-18', value: 20 },
          { age: '19-35', value: 50 },
          { age: '36-50', value: 30 }
        ];
    }
  };

  const chartData = getChartData(title, selectedZip);

  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="relative h-[65px] md:h-[65px] w-[130%] md:w-[105%] pt-2"> 
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
                barSize={35}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-[9px] md:text-[10px] text-gray-700 font-medium -mt-1.5">
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
  selectedZip: string;
}> = ({ title, isDesktop, selectedZip }) => {
  const getChartData = (title: string, zip: string) => {
    // Regional Average data variations
    if (title === 'Regional Average') {
      switch (zip) {
        case '60714':
          return [
            { ageGroup: '0-18', aligners: 28, hygiene: 42, whitening: 18 },
            { ageGroup: '19-35', aligners: 45, hygiene: 38, whitening: 32 },
            { ageGroup: '36-50', aligners: 35, hygiene: 48, whitening: 22 }
          ];
        case '60631':
          return [
            { ageGroup: '0-18', aligners: 25, hygiene: 45, whitening: 15 },
            { ageGroup: '19-35', aligners: 48, hygiene: 35, whitening: 30 },
            { ageGroup: '36-50', aligners: 32, hygiene: 50, whitening: 20 }
          ];
        case '60656':
          return [
            { ageGroup: '0-18', aligners: 30, hygiene: 40, whitening: 20 },
            { ageGroup: '19-35', aligners: 42, hygiene: 40, whitening: 28 },
            { ageGroup: '36-50', aligners: 38, hygiene: 45, whitening: 25 }
          ];
        case '60068':
          return [
            { ageGroup: '0-18', aligners: 32, hygiene: 38, whitening: 22 },
            { ageGroup: '19-35', aligners: 40, hygiene: 42, whitening: 35 },
            { ageGroup: '36-50', aligners: 35, hygiene: 52, whitening: 18 }
          ];
        default:
          return [
            { ageGroup: '0-18', aligners: 28, hygiene: 42, whitening: 18 },
            { ageGroup: '19-35', aligners: 45, hygiene: 38, whitening: 32 },
            { ageGroup: '36-50', aligners: 35, hygiene: 48, whitening: 22 }
          ];
      }
    }
    // Your Practice data variations
    switch (zip) {
      case '60714':
        return [
          { ageGroup: '0-18', aligners: 32, hygiene: 45, whitening: 20 },
          { ageGroup: '19-35', aligners: 48, hygiene: 40, whitening: 35 },
          { ageGroup: '36-50', aligners: 38, hygiene: 50, whitening: 25 }
        ];
      case '60631':
        return [
          { ageGroup: '0-18', aligners: 28, hygiene: 48, whitening: 18 },
          { ageGroup: '19-35', aligners: 50, hygiene: 38, whitening: 32 },
          { ageGroup: '36-50', aligners: 35, hygiene: 52, whitening: 22 }
        ];
      case '60656':
        return [
          { ageGroup: '0-18', aligners: 35, hygiene: 42, whitening: 22 },
          { ageGroup: '19-35', aligners: 45, hygiene: 42, whitening: 30 },
          { ageGroup: '36-50', aligners: 40, hygiene: 48, whitening: 28 }
        ];
      case '60068':
        return [
          { ageGroup: '0-18', aligners: 35, hygiene: 40, whitening: 25 },
          { ageGroup: '19-35', aligners: 42, hygiene: 45, whitening: 38 },
          { ageGroup: '36-50', aligners: 38, hygiene: 55, whitening: 20 }
        ];
      default:
        return [
          { ageGroup: '0-18', aligners: 32, hygiene: 45, whitening: 20 },
          { ageGroup: '19-35', aligners: 48, hygiene: 40, whitening: 35 },
          { ageGroup: '36-50', aligners: 38, hygiene: 50, whitening: 25 }
        ];
    }
  };

  const chartData = getChartData(title, selectedZip);

  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="relative h-[65px] md:h-[68px] w-[130%] md:w-[135%] pt-2"> 
        <div className="absolute left-[-14%] md:left-[-15%] w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={chartData}
              layout="vertical"
              margin={isDesktop ? { top: 0, right: 15, bottom: 0, left: 40 } : { top: 0, right: 10, bottom: 0, left: 35 }}
              barGap={0}
              barCategoryGap={isDesktop ? 12 : 12}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={false} />
              <XAxis 
                type="number"
                tick={{ fontSize: 4.5, fill: "#0f172a" }}
                stroke="#64748b"
              />
              <YAxis 
                type="category"
                dataKey="ageGroup"
                tick={{ fontSize: 4.5, fill: "#0f172a" }}
                stroke="#64748b"
                tickMargin={2}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="aligners" 
                stackId="a"
                fill="#1E40AF"
                radius={[0, 4, 4, 0]}
              />
              <Bar 
                dataKey="hygiene" 
                stackId="a"
                fill="#3B82F6"
                radius={[0, 0, 0, 0]}
              />
              <Bar 
                dataKey="whitening" 
                stackId="a"
                fill="#60A5FA"
                radius={[0, 0, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-[8px] md:text-[9px] text-gray-800 font-medium -mt-1.5">
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
            className="grid grid-rows-2 gap-2 w-full md:mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Patient Section */}
            {selectedIcon === 'patients' && selectedSubData === 'Avg Active Patient %' && (
              <>
                <div className="bg-white rounded-lg px-2 py-1 md:px-2 md:py-0.5 shadow-sm w-full mt-1 md:mt-0 h-[120px] md:h-[65px]">
                  <ProgressCircle
                    percentage={data.patients.activePatients.regional.percentage}
                    total={data.patients.activePatients.regional.total}
                    title="Regional Average"
                    isDesktop={isDesktop}
                  />
                </div>
                <div className="bg-white rounded-lg px-2 py-1 md:px-2 md:py-0.5 shadow-sm w-full h-[120px] md:h-[65px]">
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
                    selectedZip={selectedZip}
                  />
                </div>
                <div className="bg-white rounded-lg px-2 py-1 md:px-2 md:py-1 shadow-sm w-full">
                  <AgeDistributionChart
                    title="Your Practice"
                    isDesktop={isDesktop}
                    selectedZip={selectedZip}
                  />
                </div>
              </>
            )}

            {selectedIcon === 'patients' && selectedSubData === 'Most Apts/Age Group' && (
              <>
                <div className="bg-white rounded-lg px-2 py-1 md:px-2 md:py-0.5 shadow-sm w-full mt-2 md:mt-0 h-[120px] md:h-[68px]">
                  <AppointmentsByAgeChart
                    title="Regional Average"
                    isDesktop={isDesktop}
                    selectedZip={selectedZip}
                  />
                </div>
                <div className="bg-white rounded-lg px-2 py-1 md:px-2 md:py-0.5 shadow-sm w-full h-[120px] md:h-[68px]">
                  <AppointmentsByAgeChart
                    title="Your Practice"
                    isDesktop={isDesktop}
                    selectedZip={selectedZip}
                  />
                </div>
              </>
            )}

            {/* Procedures Section */}
            {selectedIcon === 'procedures' && selectedSubData === 'Highest Vol Procedure' && (
              <>
                <div className="bg-white rounded-lg px-2 py-1 md:px-2 md:py-0.5 shadow-sm w-full h-[120px] md:h-[71px]">
                  <VolumeLineChart
                    data={data.procedures.highestVolume.regional.data}
                    title="Regional Average"
                    procedureName={data.procedures.highestVolume.regional.name}
                    isDesktop={isDesktop}
                  />
                </div>
                <div className="bg-white rounded-lg px-2 py-1 md:px-2 md:py-0.5 shadow-sm w-full h-[120px] md:h-[71px]">
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
                <div className="bg-white rounded-lg px-2 py-1 md:px-2 md:py-1 shadow-sm w-full min-h-[85px]">
                  <LargestProductionChart
                    data={data.procedures.largestProduction.regional}
                    title="Regional Average"
                    isDesktop={isDesktop}
                  />
                </div>
                <div className="bg-white rounded-lg px-2 py-1 md:px-2 md:py-1 shadow-sm w-full min-h-[85px]">
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
                <div className="bg-white rounded-lg px-2 py-1 md:px-2 md:py-0.5 shadow-sm w-full">
                  <VolumeLineChart
                    data={data.procedures.lowestVolume.regional.data}
                    title="Regional Average"
                    procedureName={data.procedures.lowestVolume.regional.name}
                    isDesktop={isDesktop}
                  />
                </div>
                <div className="bg-white rounded-lg px-2 py-1 md:px-2 md:py-0.5 shadow-sm w-full">
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
                <div className="bg-white rounded-lg px-2 py-1 md:px-0.5 md:py-0.5 shadow-sm w-full">
                  <MonthlyProductionChart
                    data={data.financial.monthlyProduction.regional.breakdown}
                    title="Regional Average"
                    total={data.financial.monthlyProduction.regional.total}
                    isDesktop={isDesktop}
                  />
                </div>
                <div className="bg-white rounded-lg px-2 py-1 md:px-0.5 md:py-0.5 shadow-sm w-full">
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
                <div className="bg-white rounded-lg px-2 py-1 md:px-0.5 md:pt-0 md:pb-0.5 shadow-sm w-full">
                  <InsuranceDistributionChart
                    data={data.financial.insurance.regional}
                    title="Regional Average"
                    isDesktop={isDesktop}
                  />
                </div>
                <div className="bg-white rounded-lg px-2 py-1 md:px-0.5 md:pt-0 md:pb-0.5 shadow-sm w-full">
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
