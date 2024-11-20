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
        <div className="bg-white p-2 md:p-3 border border-gray-200 shadow-sm rounded-md">
          <p className="font-medium text-xs md:text-sm text-gray-700 mb-1">{`Age Range: ${label}`}</p>
          {payload.map((entry, index) => (
            <p 
              key={index} 
              className="text-xs md:text-sm"
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
    <div className="flex-1 overflow-y-auto px-2 md:px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 py-2">
        <div className="bg-white rounded-lg p-3 md:p-4 shadow-sm">
          <h3 className="text-[11px] md:text-[13px] font-medium text-gray-700 mb-3 md:mb-4">
            Patient Retention Analysis
          </h3>
          <div className="space-y-3 md:space-y-4">
            {retentionData.map((group, idx) => {
              const retentionRate = ((group.retained / group.initial) * 100).toFixed(1);
              const maxValue = Math.max(...retentionData.map(d => d.initial));
              const widthScale = 0.45;
              const initialWidth = `${(group.initial / maxValue) * 100 * widthScale}%`;
              const retainedWidth = `${(group.retained / maxValue) * 100 * widthScale}%`;
              
              return (
                <div key={idx} className="relative">
                  <div className="text-xs md:text-sm text-gray-500 mb-1 md:mb-2">
                    Age {group.age}
                  </div>
                  <div className="relative h-6 md:h-8">
                    <div 
                      className="absolute top-0 left-0 h-full bg-blue-100 rounded"
                      style={{ width: initialWidth }}
                    >
                      <span className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 text-xs md:text-sm text-gray-600">
                        {group.initial.toLocaleString()}
                      </span>
                    </div>
                    <div 
                      className="absolute top-0 left-0 h-full bg-blue-600 rounded"
                      style={{ width: retainedWidth }}
                    >
                      <span className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 text-xs md:text-sm text-white">
                        {group.retained.toLocaleString()}
                      </span>
                    </div>
                    <span className="absolute left-[calc(45%+16px)] top-1/2 -translate-y-1/2 text-xs md:text-sm text-gray-500">
                      {retentionRate}%
                    </span>
                  </div>
                </div>
              );
            })}

            <div className="flex gap-4 pt-2 md:pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 md:w-4 md:h-4 rounded bg-blue-100"></div>
                <span className="text-xs md:text-sm text-gray-500">Initial Patients</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 md:w-4 md:h-4 rounded bg-blue-600"></div>
                <span className="text-xs md:text-sm text-gray-500">Retained Patients</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-3 md:p-4 shadow-sm">
          <h3 className="text-[11px] md:text-[13px] font-medium text-gray-700 mb-3 md:mb-4">
            Age Distribution by Gender
          </h3>
          <div className="h-[250px] md:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={demographicsData}
                margin={{ 
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 20
                }}
                barSize={16}
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
                  tick={props => (
                    <g transform={`translate(${props.x},${props.y})`}>
                      <text
                        x={0}
                        y={0}
                        dy={16}
                        textAnchor="middle"
                        fill="#4B5563"
                        fontSize={10}
                        className="select-none"
                      >
                        {props.payload.value}
                      </text>
                    </g>
                  )}
                />
                <YAxis
                  tickLine={{ stroke: '#E5E7EB' }}
                  axisLine={{ stroke: '#E5E7EB' }}
                  tickFormatter={(value) => value.toLocaleString()}
                  width={45}
                  tick={{
                    fontSize: 10,
                    fill: '#4B5563'
                  }}
                />
                <Tooltip 
                  content={<CustomTooltip />}
                  cursor={{ fill: 'rgba(229, 231, 235, 0.4)' }}
                />
                <Legend 
                  wrapperStyle={{
                    fontSize: '11px',
                    paddingTop: '12px'
                  }}
                  iconType="circle"
                  iconSize={6}
                />
                <Bar 
                  dataKey="male" 
                  name="Male" 
                  stackId="a" 
                  fill={colors.male}
                />
                <Bar 
                  dataKey="female" 
                  name="Female" 
                  stackId="a" 
                  fill={colors.female}
                />
                <Bar 
                  dataKey="other" 
                  name="Other" 
                  stackId="a" 
                  fill={colors.other}
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
          <div className="bg-[#1E2433] rounded-[14px] w-full max-w-[320px] md:max-w-none md:min-w-[632px] h-[28px] md:h-[40px] flex items-center px-0.5 md:px-1 mx-1">
            <TabsList className="flex bg-transparent h-[24px] md:h-[36px] gap-0.5 w-full justify-center">
              <TabsTrigger 
                value="demographics"
                className="rounded-lg h-[20px] md:h-[31px] text-[8px] md:text-xs px-2 md:px-6 w-[90px] md:min-w-[210px] font-normal flex items-center justify-center gap-1 md:gap-2
                  text-gray-300 data-[state=active]:bg-white data-[state=active]:text-[#1C2434] md:data-[state=active]:shadow-sm
                  hover:bg-white/10 hover:text-white data-[state=active]:hover:bg-white data-[state=active]:hover:text-[#1C2434]
                  transition-all duration-200"
              >
                <Users className="w-2 h-2 md:w-4 md:h-4" />
                Demographics
              </TabsTrigger>
              <TabsTrigger 
                value="financials"
                className="rounded-lg h-[20px] md:h-[31px] text-[8px] md:text-xs px-2 md:px-6 w-[90px] md:min-w-[210px] font-normal flex items-center justify-center gap-1 md:gap-2
                  text-gray-300 data-[state=active]:bg-white data-[state=active]:text-[#1C2434] md:data-[state=active]:shadow-sm
                  hover:bg-white/10 hover:text-white data-[state=active]:hover:bg-white data-[state=active]:hover:text-[#1C2434]
                  transition-all duration-200"
              >
                <DollarSign className="w-2 h-2 md:w-4 md:h-4" />
                Financials
              </TabsTrigger>
              <TabsTrigger 
                value="procedures"
                className="rounded-lg h-[20px] md:h-[31px] text-[8px] md:text-xs px-2 md:px-6 w-[90px] md:min-w-[210px] font-normal flex items-center justify-center gap-1 md:gap-2
                  text-gray-300 data-[state=active]:bg-white data-[state=active]:text-[#1C2434] md:data-[state=active]:shadow-sm
                  hover:bg-white/10 hover:text-white data-[state=active]:hover:bg-white data-[state=active]:hover:text-[#1C2434]
                  transition-all duration-200"
              >
                <Stethoscope className="w-2 h-2 md:w-4 md:h-4" />
                Procedures
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <div className="flex-1 overflow-hidden bg-gray-100 mt-1 md:mt-2">
          <TabsContent value="demographics" className="h-full m-0">
            <DemographicsContent />
          </TabsContent>

          <TabsContent value="financials" className="h-full m-0">
            <div className="h-full p-1 md:p-2 overflow-y-auto">
              <div className="grid grid-cols-2 gap-1 md:gap-2">
                <div className="bg-white rounded-lg p-1.5 md:p-2 h-[40px] md:h-[48px] shadow-sm">
                  <div className="text-[7px] md:text-[9px] text-gray-500">Revenue</div>
                  <div className="text-[9px] md:text-xs font-medium mt-0.5">$124.5k</div>
                </div>
                <div className="bg-white rounded-lg p-1.5 md:p-2 h-[40px] md:h-[48px] shadow-sm">
                  <div className="text-[7px] md:text-[9px] text-gray-500">Expenses</div>
                  <div className="text-[9px] md:text-xs font-medium mt-0.5">$67.8k</div>
                </div>
                <div className="bg-white rounded-lg p-1.5 md:p-2 h-[40px] md:h-[48px] shadow-sm">
                  <div className="text-[7px] md:text-[9px] text-gray-500">Net Profit</div>
                  <div className="text-[9px] md:text-xs font-medium mt-0.5">$56.7k</div>
                </div>
                <div className="bg-white rounded-lg p-1.5 md:p-2 h-[40px] md:h-[48px] shadow-sm">
                  <div className="text-[7px] md:text-[9px] text-gray-500">Growth</div>
                  <div className="text-[9px] md:text-xs font-medium mt-0.5">+12.4%</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-1.5 md:p-2 mt-1 md:mt-2 h-[100px] md:h-[120px] shadow-sm">
                <div className="text-[7px] md:text-[9px] text-gray-500">Financial Trends</div>
                <div className="h-[80px] md:h-[90px] flex items-center justify-center text-[7px] md:text-[9px] text-gray-400">
                  Chart Area
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="procedures" className="h-full m-0">
            <div className="h-full p-1 md:p-2 overflow-y-auto">
              <div className="bg-white rounded-lg p-1.5 md:p-2 h-[100px] md:h-[120px] shadow-sm">
                <div className="text-[7px] md:text-[9px] text-gray-500">Procedure Distribution</div>
                <div className="h-[80px] md:h-[90px] flex items-center justify-center text-[7px] md:text-[9px] text-gray-400">
                  Pie Chart
                </div>
              </div>

              <div className="bg-white rounded-lg p-1.5 md:p-2 mt-1 md:mt-2 shadow-sm">
                <div className="text-[7px] md:text-[9px] text-gray-500 mb-1">Recent Procedures</div>
                <div className="space-y-1 md:space-y-1.5">
                  {['Cleaning', 'Check-up', 'Filling', 'Root Canal'].map((proc, i) => (
                    <div key={i} className="flex justify-between items-center bg-gray-50 rounded-lg p-1 md:p-1.5">
                      <span className="text-[7px] md:text-[9px]">{proc}</span>
                      <span className="text-[6px] md:text-[8px] text-gray-500">Today</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default PracticeTabContent;
