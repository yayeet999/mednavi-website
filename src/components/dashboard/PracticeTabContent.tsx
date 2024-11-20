import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Users, DollarSign, Stethoscope } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    color: string;
  }>;
  label?: string;
}

const DemographicsContent = () => {
  const retentionData = [
    {
      age: '18-30',
      initial: 450,
      retained: 385,
    },
    {
      age: '31-45',
      initial: 680,
      retained: 598,
    },
    {
      age: '46-60',
      initial: 520,
      retained: 472,
    },
    {
      age: '60+',
      initial: 350,
      retained: 308,
    }
  ];

  const demographicsData = [
    {
      ageRange: '18-30',
      male: 185,
      female: 245,
      other: 20
    },
    {
      ageRange: '31-45',
      male: 290,
      female: 368,
      other: 22
    },
    {
      ageRange: '46-60',
      male: 228,
      female: 276,
      other: 16
    },
    {
      ageRange: '61-75',
      male: 146,
      female: 182,
      other: 12
    },
    {
      ageRange: '75+',
      male: 68,
      female: 92,
      other: 8
    }
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
      {/* KPI Row */}
      <div className="w-full flex gap-2 md:gap-3 px-2 md:px-4 mb-4">
        {/* First KPI */}
        <div className="flex-1 min-w-0 rounded-lg border border-blue-100/50 shadow-sm p-1 md:p-2 bg-blue-50/20">
          <div className="text-xs text-blue-900/70 font-medium mb-0.5 md:mb-1 min-h-[20px] md:min-h-[26px] flex flex-col justify-center">
            <span className="text-[6.7px] md:text-[13px] leading-[1.1] md:leading-normal block">Total Active</span>
            <span className="text-[6.7px] md:text-[13px] leading-[1.1] md:leading-normal block">Patients</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-[9px] md:text-[19px] font-semibold text-blue-900">2,547</span>
            <span className="hidden md:inline text-[4.1px] md:text-[9.7px] font-medium text-emerald-600">+12.5%</span>
          </div>
        </div>

        {/* Second KPI */}
        <div className="flex-1 min-w-0 rounded-lg border border-blue-100/50 shadow-sm p-1 md:p-2 bg-blue-50/25">
          <div className="text-xs text-blue-900/70 font-medium mb-1 md:mb-1.5 min-h-[22px] md:min-h-[29px] flex flex-col justify-center">
            <span className="text-[6.7px] md:text-[13px] leading-[1.1] md:leading-normal nowrap">Total Inactive</span>
            <span className="text-[6.7px] md:text-[13px] leading-[1.1] md:leading-normal block">Patients</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-[9px] md:text-[19px] font-semibold text-blue-900">854</span>
            <span className="hidden md:inline text-[4.1px] md:text-[9.7px] font-medium text-rose-600">-13.2%</span>
          </div>
        </div>
      </div>

      {/* Retention Analysis */}
      <div className="bg-white rounded-lg p-1.5 md:p-2 shadow-sm h-[90px] md:h-[158px] w-full md:w-[130%] border border-gray-200">
        <h3 className="text-[7.5px] md:text-[12px] font-medium text-gray-700 mb-1.5 md:mb-2">
          Patient Retention Analysis
        </h3>
        <div className="space-y-[5px] md:space-y-[8px]">
          {retentionData.map((group, idx) => {
            const retentionRate = ((group.retained / group.initial) * 100).toFixed(1);
            const maxValue = Math.max(...retentionData.map(d => d.initial));
            const widthScale = window.innerWidth < 768 ? 0.70 : 0.91;
            const initialWidth = `${(group.initial / maxValue) * 100 * widthScale}%`;
            const retainedWidth = `${(group.retained / maxValue) * 100 * widthScale}%`;

            return (
              <div key={idx} className="flex items-center">
                <div className="flex items-center w-full space-x-[2px] md:space-x-[8px]">
                  <span className="text-[5px] md:text-[9px] text-gray-500 shrink-0 min-w-[34px] md:min-w-[50px]">
                    Age {group.age}
                  </span>
                  <div className="relative flex-1 h-[12px] md:h-[15px]">
                    <div 
                      className="absolute top-0 left-0 h-full bg-blue-100 rounded"
                      style={{ width: initialWidth }}
                    />
                    <div 
                      className="absolute top-0 left-0 h-full bg-blue-600 rounded"
                      style={{ width: retainedWidth }}
                    />
                    <span 
                      className="absolute top-1/2 -translate-y-1/2 text-[6px] md:text-[8px] text-gray-500"
                      style={{ left: `calc(${initialWidth} + ${window.innerWidth < 768 ? '4px' : '6px'})` }}
                    >
                      {retentionRate}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Age Distribution */}
      <div className="bg-white rounded-lg p-1.5 md:p-2 shadow-sm h-[100px] md:h-[160px] w-[100%] md:w-[70%] md:ml-auto border border-gray-200">
        <h3 className="text-[7.5px] md:text-[12px] font-medium text-gray-700 mb-1.5 md:mb-2">
          Age Distribution by Gender
        </h3>
        <div className="h-[80px] md:h-[140px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={demographicsData}
              margin={{ 
                top: 5, 
                right: 0, 
                left: -2, 
                bottom: window.innerWidth < 768 ? 15 : 2 
              }}
              barSize={10}
              barGap={2}
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
                tick={{
                  fontSize: window.innerWidth < 768 ? 5 : 7,
                  fill: '#4B5563'
                }}
              />
              <YAxis
                tickLine={{ stroke: '#E5E7EB' }}
                axisLine={{ stroke: '#E5E7EB' }}
                tick={{
                  fontSize: window.innerWidth < 768 ? 5 : 7,
                  fill: '#4B5563'
                }}
                tickFormatter={(value) => value.toLocaleString()}
                width={22}
              />
              <Tooltip 
                content={<CustomTooltip />}
                cursor={{ fill: 'rgba(229, 231, 235, 0.4)' }}
              />
              <Bar dataKey="male" name="Male" stackId="a" fill={colors.male} />
              <Bar dataKey="female" name="Female" stackId="a" fill={colors.female} />
              <Bar dataKey="other" name="Other" stackId="a" fill={colors.other} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const PracticeTabContent = () => {
  return (
    <div className="h-full w-full overflow-hidden">
      <Tabs defaultValue="demographics" className="h-full flex flex-col [&>div]:bg-transparent">
        <TabsList className="flex justify-center">
          <div className="bg-[#1E2433] rounded-[14px] w-full max-w-[320px] md:max-w-none md:min-w-[632px] h-[28px] md:h-[40px] flex items-center px-0.5 md:px-1 mx-1">
            <TabsTrigger value="demographics" className="rounded-lg text-[8px] md:text-xs px-2">Demographics</TabsTrigger>
            <TabsTrigger value="financials" className="rounded-lg text-[8px] md:text-xs px-2">Financials</TabsTrigger>
            <TabsTrigger value="procedures" className="rounded-lg text-[8px] md:text-xs px-2">Procedures</TabsTrigger>
          </div>
        </TabsList>
        <TabsContent value="demographics">
          <DemographicsContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PracticeTabContent;