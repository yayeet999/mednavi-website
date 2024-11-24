import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import FinancialsContent from './FinancialsContent';
import { Users, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    color: string;
  }>;
  label?: string;
}

interface AxisTickProps {
  x: number;
  y: number;
  payload: {
    value: string;
  };
}

const GrowthRateIndicator = () => {
  const percentage = 14;
  const radius = 20;
  const radiusDesktop = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const monthlyData = [
    { month: 'Jan', growth: 12 },
    { month: 'Feb', growth: 18 },
    { month: 'Mar', growth: 8 },
    { month: 'Apr', growth: 22 },
    { month: 'May', growth: 10 }
  ];

  return (
    <div className="bg-white p-1.5 md:p-2.5 rounded-lg h-full w-full shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 md:gap-3 h-full">
        <div className="flex flex-col justify-center">
          <span className="text-[11px] md:text-[13px] text-gray-600 leading-tight font-semibold">Avg Growth</span>
          <span className="text-[11px] md:text-[13px] text-gray-600 leading-tight font-semibold">Rate/Month</span>
        </div>
        <div className="relative w-12 h-12 md:w-12 md:h-12 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="24"
              cy="24"
              r={typeof window !== 'undefined' && window.innerWidth >= 768 ? radiusDesktop : radius}
              stroke="#EEF2FF"
              strokeWidth="5.5"
              fill="none"
              className="animate-[appear_1.7s_ease-out]"
            />
            <circle
              cx="24"
              cy="24"
              r={typeof window !== 'undefined' && window.innerWidth >= 768 ? radiusDesktop : radius}
              stroke="#3B82F6"
              strokeWidth={typeof window !== 'undefined' && window.innerWidth >= 768 ? "5.5" : "4.7"}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="animate-[progress-circle_1.7s_ease-out]"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[11px] md:text-[11px] font-medium text-blue-600 animate-[fade-in_1.7s_ease-out]">
            +14%
          </span>
        </div>
        <div className="hidden md:block h-16 w-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={monthlyData} 
              margin={{ top: 5, right: 8, bottom: 5, left: 5 }}
            >
              <CartesianGrid 
                horizontal={true}
                vertical={false}
                stroke="#F3F4F6"
                strokeDasharray="3 3"
              />
              <XAxis 
                dataKey="month"
                tick={(props: AxisTickProps) => (
                  <g transform={`translate(${props.x},${props.y})`}>
                    <text
                      x={0}
                      y={0}
                      dy={8}
                      textAnchor="middle"
                      fill="#6B7280"
                      fontSize={8}
                      fontWeight={500}
                    >
                      {props.payload.value}
                    </text>
                  </g>
                )}
                axisLine={{ stroke: '#E5E7EB', strokeWidth: 1 }}
                tickLine={false}
                height={20}
              />
              <YAxis 
                tick={{ fontSize: 8, fill: '#6B7280', fontWeight: 500 }}
                tickFormatter={(value) => `${value}%`}
                axisLine={{ stroke: '#E5E7EB', strokeWidth: 1 }}
                tickLine={false}
                width={35}
                dx={0}
                domain={[0, 25]}
                ticks={[0, 5, 10, 15, 20, 25]}
              />
              <Line
                type="monotone"
                dataKey="growth"
                stroke="#3B82F6"
                strokeWidth={1.5}
                dot={{ r: 2.5, fill: '#3B82F6', strokeWidth: 0 }}
                activeDot={{ r: 4, strokeWidth: 0 }}
                connectNulls={true}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-[grow-line_1.7s_ease-out]"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const PaymentDistribution = () => {
  const data = [
    { name: 'Public', value: 45, color: '#1E40AF' },
    { name: 'Private', value: 35, color: '#3B82F6' },
    { name: 'Cash', value: 20, color: '#93C5FD' }
  ];

  const generatePath = (startAngle: number, endAngle: number, radius: number, innerRadius: number) => {
    const start = startAngle * Math.PI / 180;
    const end = endAngle * Math.PI / 180;
    
    const outerX1 = 150 + radius * Math.cos(start);
    const outerY1 = 150 + radius * Math.sin(start);
    const outerX2 = 150 + radius * Math.cos(end);
    const outerY2 = 150 + radius * Math.sin(end);
    
    const innerX1 = 150 + innerRadius * Math.cos(end);
    const innerY1 = 150 + innerRadius * Math.sin(end);
    const innerX2 = 150 + innerRadius * Math.cos(start);
    const innerY2 = 150 + innerRadius * Math.sin(start);
    
    const largeArc = (endAngle - startAngle) > 180 ? 1 : 0;
    
    return `
      M ${outerX1},${outerY1}
      A ${radius},${radius} 0 ${largeArc} 1 ${outerX2},${outerY2}
      L ${innerX1},${innerY1}
      A ${innerRadius},${innerRadius} 0 ${largeArc} 0 ${innerX2},${innerY2}
      Z
    `;
  };

  let currentAngle = 180;

  return (
    <div className="bg-white p-1.5 md:p-2.5 rounded-lg h-full w-full shadow-sm border border-gray-100">
      <div className="flex flex-row justify-between items-center h-full">
        <div className="flex flex-col justify-center space-y-0.5 md:space-y-1">
          {data.map((entry, index) => (
            <div key={index} className="flex items-center gap-1 md:gap-2">
              <div 
                className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full shadow-[0_0_0_1px_rgba(255,255,255,0.8)]"
                style={{ backgroundColor: entry.color }}
              />
              <span 
                className="text-[7px] md:text-[11px] font-medium animate-[fade-in_1.7s_ease-out]"
                style={{ color: entry.color }}
              >
                {entry.name}: {entry.value}%
              </span>
            </div>
          ))}
        </div>
        
        <div className="w-[120px] md:w-[140px]">
          <svg viewBox="0 0 300 170" className="w-full h-full">
            <path
              d="M 40,150 A 110,110 0 1 1 260,150 L 260,150 A 70,70 0 1 0 40,150 Z"
              fill="#F3F4F6"
              className="drop-shadow-sm"
            />
            
            {data.map((segment, i) => {
              const angleSize = (segment.value / 100) * 180;
              const path = generatePath(
                currentAngle,
                currentAngle + angleSize,
                110,
                70
              );
              currentAngle += angleSize;
              return (
                <path
                  key={i}
                  d={path}
                  fill={segment.color}
                  stroke="white"
                  strokeWidth="1.5"
                  className="drop-shadow-sm animate-[fill-segment_1.7s_ease-out]"
                >
                  <title>{segment.name}: {segment.value}%</title>
                </path>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};

const DemographicsContent = () => {
  const retentionData = [
    { age: '18-30', initial: 450, retained: 385 },
    { age: '31-45', initial: 680, retained: 598 },
    { age: '46-60', initial: 520, retained: 472 },
    { age: '60+', initial: 350, retained: 308 }
  ];

  const demographicsData = [
    { ageRange: '18-30', male: 185, female: 245, other: 20 },
    { ageRange: '31-45', male: 290, female: 368, other: 22 },
    { ageRange: '46-60', male: 228, female: 276, other: 16 },
    { ageRange: '61-75', male: 146, female: 182, other: 12 },
    { ageRange: '75+', male: 68, female: 92, other: 8 }
  ];

  const colors = {
    male: '#1E40AF',
    female: '#3B82F6',
    other: '#93C5FD'
  };

const CustomTooltip: React.FC<TooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-sm rounded-md">
          <p className="font-medium text-[10px] text-gray-700 mb-1">{`Age Range: ${label}`}</p>
          {payload.map((entry, index) => (
            <p 
              key={index} 
              className="text-[10px]"
              style={{ color: entry.color }}
            >
              {`${entry.name}: ${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex-1 overflow-y-auto pr-1 md:pr-3 h-full flex flex-col">
      <div className="w-full flex gap-1 md:gap-2 px-2 md:px-4 mb-3">
        <div className="flex-1 min-w-0 rounded-lg border border-blue-100/50 shadow-sm p-1 md:p-1.5 bg-blue-50/20 h-[50px] md:h-[77px] animate-[slide-up_1.7s_ease-out]">
          <div className="text-xs text-blue-900/70 font-medium mb-0.5 md:mb-0.5 min-h-[20px] md:min-h-[22px] flex flex-col justify-center">
            <span className="text-[6.7px] md:text-[13px] leading-[1.1] md:leading-normal block">Total Active</span>
            <span className="text-[6.7px] md:text-[13px] leading-[1.1] md:leading-normal block">Patients</span>
          </div>
          <div className="flex items-baseline gap-1 md:gap-1.5">
            <span className="text-[9px] md:text-[19px] font-semibold text-blue-900">2,547</span>
            <span className="hidden md:inline text-[4.1px] md:text-[9.7px] font-medium text-emerald-600">+12.5%</span>
          </div>
        </div>

        <div className="flex-1 min-w-0 rounded-lg border border-blue-100/50 shadow-sm p-1 md:p-1.5 bg-blue-50/20 h-[50px] md:h-[77px] animate-[slide-up_1.7s_ease-out]">
          <div className="text-xs text-blue-900/70 font-medium mb-0.5 md:mb-0.5 min-h-[20px] md:min-h-[22px] flex flex-col justify-center">
            <span className="text-[6.7px] md:text-[13px] leading-[1.1] md:leading-normal block">Total Inactive</span>
            <span className="text-[6.7px] md:text-[13px] leading-[1.1] md:leading-normal block">Patients</span>
          </div>
          <div className="flex items-baseline gap-1 md:gap-1.5">
            <span className="text-[9px] md:text-[19px] font-semibold text-blue-900">854</span>
            <span className="hidden md:inline text-[4.1px] md:text-[9.7px] font-medium text-rose-600">-13.2%</span>
          </div>
        </div>

        <div className="flex-1 min-w-0 rounded-lg border border-blue-100/50 shadow-sm p-1 md:p-1.5 bg-blue-50/20 h-[50px] md:h-[77px] animate-[slide-up_1.7s_ease-out]">
          <div className="text-xs text-blue-900/70 font-medium mb-0.5 md:mb-0.5 min-h-[20px] md:min-h-[22px] flex flex-col justify-center">
            <span className="text-[6.7px] md:text-[13px] leading-[1.1] md:leading-normal block">Patient</span>
            <span className="text-[6.7px] md:text-[13px] leading-[1.1] md:leading-normal block">Population</span>
          </div>
          <div className="flex items-baseline gap-1 md:gap-1.5">
            <span className="text-[9px] md:text-[19px] font-semibold text-blue-900">3,401</span>
            <span className="hidden md:inline text-[4.1px] md:text-[9.7px] text-blue-900/50">Total</span>
          </div>
        </div>

        <div className="flex-[1.05] min-w-0 rounded-lg border border-blue-100/50 shadow-sm p-1 md:p-1.5 bg-blue-50/20 h-[50px] md:h-[77px] animate-[slide-up_1.7s_ease-out]">
          <div className="text-xs text-blue-900/70 font-medium mb-0.5 md:mb-0.5 min-h-[20px] md:min-h-[22px] flex flex-col justify-center">
            <span className="text-[6.7px] md:text-[13px] leading-[1.1] md:leading-normal block">Unsched Active</span>
            <span className="text-[6.7px] md:text-[13px] leading-[1.1] md:leading-normal block">Patients</span>
          </div>
          <div className="flex items-baseline gap-1 md:gap-1.5">
            <span className="text-[9px] md:text-[19px] font-semibold text-blue-900">577</span>
            <span className="hidden md:inline text-[6px] md:text-[10.5px] text-blue-900/70">23%</span>
            <span className="hidden md:inline text-[4.1px] md:text-[9px] font-medium text-rose-600">High</span>
          </div>
        </div>

        <div className="flex-[1.05] min-w-0 rounded-lg border border-blue-100/50 shadow-sm p-1 md:p-1.5 bg-blue-50/20 h-[50px] md:h-[77px] animate-[slide-up_1.7s_ease-out]">
          <div className="text-xs text-blue-900/70 font-medium mb-0.5 md:mb-0.5 min-h-[20px] md:min-h-[22px] flex flex-col justify-center">
            <span className="text-[6.7px] md:text-[13px] leading-[1.1] md:leading-normal block">Days Between</span>
            <span className="text-[6.7px] md:text-[13px] leading-[1.1] md:leading-normal block">Apts</span>
          </div>
          <div className="flex items-baseline gap-1 md:gap-1.5">
            <span className="text-[9px] md:text-[19px] font-semibold text-blue-900">162.6</span>
            <span className="hidden md:inline text-[4.1px] md:text-[9.7px] text-blue-900/50">Avg</span>
          </div>
        </div>
      </div>

<div className="flex gap-1 md:gap-2 px-1 md:px-3 mb-2 h-[70px] md:h-[80px]">
        <div className="flex-1 animate-[fade-in_1.7s_ease-out]">
          <GrowthRateIndicator />
        </div>
        <div className="w-[49%] md:w-[42%] animate-[fade-in_1.7s_ease-out]">
          <PaymentDistribution />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1 md:gap-2 w-full mt-1">
  <div className="bg-white rounded-lg p-1.5 md:p-2.5 shadow-sm h-[100px] md:h-[158px] w-full md:w-[115%] border border-blue-100/50 animate-[slide-up_1.7s_ease-out]">
          <h3 className="text-[8.5px] md:text-[13px] font-medium text-gray-700 mb-1.5">
            Patient Retention Analysis
          </h3>
          <div className="space-y-[6px] md:space-y-[8px] mb-[2px] md:mb-0">
            {retentionData.map((group, idx) => {
              const retentionRate = ((group.retained / group.initial) * 100).toFixed(1);
              const maxValue = Math.max(...retentionData.map(d => d.initial));
              const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
              const widthScale = isMobile ? 0.70 : 0.91;
              const initialWidth = `${(group.initial / maxValue) * 100 * widthScale}%`;
              const retainedWidth = `${(group.retained / maxValue) * 100 * widthScale}%`;
              
              return (
                <div key={idx} className="flex items-center">
                  <div className="flex items-center w-full space-x-[2px] md:space-x-[8px]">
                    <span className="text-[6px] md:text-[10px] text-gray-500 shrink-0 min-w-[34px] md:min-w-[52px]">
                      Age {group.age}
                    </span>
                    <div className="relative flex-1 h-[12px] md:h-[16px]">
                      <div 
                        className="absolute top-0 left-0 h-full bg-blue-100 rounded animate-[grow-width_1.7s_ease-out]"
                        style={{ width: initialWidth }}
                      >
                        <span className="absolute left-1 top-1/2 -translate-y-1/2 text-[7px] md:text-[9px] text-gray-600">
                          {group.initial.toLocaleString()}
                        </span>
                      </div>
                      <div 
                        className="absolute top-0 left-0 h-full bg-blue-600 rounded animate-[grow-width_1.7s_ease-out]"
                        style={{ width: retainedWidth }}
                      >
                        <span className="absolute left-1 top-1/2 -translate-y-1/2 text-[7px] md:text-[9px] text-white">
                          {group.retained.toLocaleString()}
                        </span>
                      </div>
                      <span 
                        className="absolute top-1/2 -translate-y-1/2 text-[7px] md:text-[9px] text-gray-500 animate-[fade-in_1.7s_ease-out]"
                        style={{ left: `calc(${initialWidth} + ${isMobile ? '4px' : '8px'})` }}
                      >
                        {retentionRate}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {typeof window !== 'undefined' && window.innerWidth >= 768 && (
              <div className="flex gap-2 md:gap-4 pt-1">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded bg-blue-100"></div>
                  <span className="text-[7px] md:text-[9px] text-gray-500">
                    Initial Patients
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded bg-blue-600"></div>
                  <span className="text-[7px] md:text-[9px] text-gray-500">
                    Retained Patients
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

  <div className="bg-white rounded-lg p-1.5 md:p-2.5 shadow-sm h-[100px] md:h-[158px] w-[100%] md:w-[70%] md:ml-auto border border-blue-100/50 animate-[slide-up_1.7s_ease-out]">
          <h3 className="text-[8.5px] md:text-[13px] font-medium text-gray-700 mb-1.5">
            Age Distribution by Gender
          </h3>
          <div className="h-[83px] md:h-[118px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={demographicsData}
                margin={{ 
                  top: typeof window !== 'undefined' && window.innerWidth < 768 ? 4 : 0,
                  right: 0,
                  left: -2,
                  bottom: typeof window !== 'undefined' && window.innerWidth < 768 ? 12 : 2
                }}
                barSize={typeof window !== 'undefined' && window.innerWidth < 768 ? 10 : 17}
                barGap={0}
              >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="#E5E7EB"
                  vertical={false}
                />
                <XAxis 
                  dataKey="ageRange"
                  tickLine={{ stroke: '#E5E7EB' }}
                  axisLine={{ stroke: '#E5E7EB' }}
                  interval={0}
                  tick={(props: AxisTickProps) => {
                    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
                    return (
                      <g transform={`translate(${props.x},${props.y})`}>
                        <text
                          x={0}
                          y={0}
                          dy={isMobile ? 8 : 6}
                          textAnchor="end"
                          fill="#4B5563"
                          fontSize={isMobile ? 5 : 7}
                          className="select-none"
                          transform={isMobile ? "rotate(-30)" : "rotate(-20)"}
                        >
                          {props.payload.value}
                        </text>
                      </g>
                    );
                  }}
                />
                <YAxis
                  tickLine={{ stroke: '#E5E7EB' }}
                  axisLine={{ stroke: '#E5E7EB' }}
                  tickFormatter={(value: number) => value.toLocaleString()}
                  width={22}
                  tick={{
                    fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? 5 : 7,
                    fill: '#4B5563'
                  }}
                  padding={{ top: 0 }}
                />
                <Tooltip 
                  content={<CustomTooltip />}
                  cursor={{ fill: 'rgba(229, 231, 235, 0.4)' }}
                />
                <Bar 
                  dataKey="male" 
                  name="Male" 
                  stackId="a" 
                  fill={colors.male}
                  maxBarSize={55}
                  className="animate-[grow-bar_1.2s_cubic-bezier(0.34, 1.56, 0.64, 1)]"
                />
                <Bar 
                  dataKey="female" 
                  name="Female" 
                  stackId="a" 
                  fill={colors.female}
                  maxBarSize={55}
                  className="animate-[grow-bar_1.2s_cubic-bezier(0.34, 1.56, 0.64, 1)]"
                />
                <Bar 
                  dataKey="other" 
                  name="Other" 
                  stackId="a" 
                  fill={colors.other}
                  maxBarSize={55}
                  className="animate-[grow-bar_1.2s_cubic-bezier(0.34, 1.56, 0.64, 1)]"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const PracticeTabContent = () => {
  return (
    <div className="h-full w-full overflow-hidden">
      <Tabs defaultValue="demographics" className="h-full flex flex-col [&>div]:bg-transparent">
        <div className="flex justify-center">
          <div className="bg-[#1E2433] rounded-[14px] w-full max-w-[320px] md:max-w-none md:min-w-[632px] h-[28px] md:h-[40px] flex items-center px-1.5 md:px-2 mx-1">
  <TabsList className="flex bg-transparent h-[24px] md:h-[36px] gap-1 md:gap-1.5 w-full">
    <TabsTrigger 
      value="demographics" 
      className="w-[calc(50%-2px)] rounded-lg h-[20px] md:h-[31px] text-[8px] md:text-xs font-normal flex items-center justify-center gap-1 md:gap-2 text-gray-300 data-[state=active]:bg-white data-[state=active]:text-[#1C2434] md:data-[state=active]:shadow-sm hover:bg-white/10 hover:text-white data-[state=active]:hover:bg-white data-[state=active]:hover:text-[#1C2434] transition-all duration-200"
    >
      <Users className="w-2 h-2 md:w-4 md:h-4" />
      Demographics
    </TabsTrigger>
    <TabsTrigger 
      value="financials" 
      className="w-[calc(50%-2px)] rounded-lg h-[20px] md:h-[31px] text-[8px] md:text-xs font-normal flex items-center justify-center gap-1 md:gap-2 text-gray-300 data-[state=active]:bg-white data-[state=active]:text-[#1C2434] md:data-[state=active]:shadow-sm hover:bg-white/10 hover:text-white data-[state=active]:hover:bg-white data-[state=active]:hover:text-[#1C2434] transition-all duration-200"
    >
      <DollarSign className="w-2 h-2 md:w-4 md:h-4" />
      Financials
    </TabsTrigger>
  </TabsList>
</div>
        </div>

        <div className="flex-1 overflow-hidden bg-[#103d68] mt-1 md:mt-2">
          <TabsContent value="demographics" className="h-full m-0">
            <DemographicsContent />
          </TabsContent>

          <TabsContent value="financials" className="h-full m-0">
            <FinancialsContent />
          </TabsContent>
        </div>
      </Tabs>

      <style jsx>{`
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes grow-width {
          from { width: 0; }
        }
        @keyframes grow-bar {
  0% { 
    transform: scaleY(0);
    transform-origin: bottom;
    opacity: 0.7;
  }
  50% {
    opacity: 0.85;
  }
  100% { 
    transform: scaleY(1);
    transform-origin: bottom;
    opacity: 1;
  }
}
        @keyframes grow-line {
          from { stroke-dasharray: 1000;
                 stroke-dashoffset: 1000; }
          to { stroke-dasharray: 1000;
               stroke-dashoffset: 0; }
        }
        @keyframes progress-circle {
          from { stroke-dashoffset: ${2 * Math.PI * 23}; }
        }
      `}</style>
    </div>
  );
};

export default PracticeTabContent;
