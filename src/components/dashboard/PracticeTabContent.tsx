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
        <div className="bg-white p-[calc(8*var(--scale-factor))] border border-gray-200 shadow-sm rounded-md">
          <p className="font-medium text-[calc(10*var(--scale-factor))] text-gray-700 mb-[calc(4*var(--scale-factor))]">
            {`Age Range: ${label}`}
          </p>
          {payload.map((entry, index) => (
            <p 
              key={index} 
              className="text-[calc(10*var(--scale-factor))]"
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
    <div className="flex-1 overflow-y-auto px-[calc(12*var(--scale-factor))] h-full flex flex-col">
      {/* KPI Row */}
      <div className="w-full flex gap-[calc(12*var(--scale-factor))] px-[calc(16*var(--scale-factor))] mb-[calc(16*var(--scale-factor))]">
        {/* First KPI */}
        <div className="flex-1 min-w-0 rounded-lg border border-blue-100/50 shadow-sm p-[calc(8*var(--scale-factor))] bg-blue-50/20">
          <div className="text-[calc(13*var(--scale-factor))] text-blue-900/70 font-medium mb-[calc(4*var(--scale-factor))] min-h-[calc(26*var(--scale-factor))] flex flex-col justify-center">
            <span className="text-[calc(13*var(--scale-factor))] leading-normal block">Total Active</span>
            <span className="text-[calc(13*var(--scale-factor))] leading-normal block">Patients</span>
          </div>
          <div className="flex items-baseline gap-[calc(6*var(--scale-factor))]">
            <span className="text-[calc(19*var(--scale-factor))] font-semibold text-blue-900">2,547</span>
            <span className="text-[calc(9.7*var(--scale-factor))] font-medium text-emerald-600">+12.5%</span>
          </div>
        </div>

        {/* Second KPI */}
        <div className="flex-1 min-w-0 rounded-lg border border-blue-100/50 shadow-sm p-[calc(8*var(--scale-factor))] bg-blue-50/25">
          <div className="text-[calc(13*var(--scale-factor))] text-blue-900/70 font-medium mb-[calc(6*var(--scale-factor))] min-h-[calc(29*var(--scale-factor))] flex flex-col justify-center">
            <span className="text-[calc(13*var(--scale-factor))] leading-normal nowrap">Total Inactive</span>
            <span className="text-[calc(13*var(--scale-factor))] leading-normal block">Patients</span>
          </div>
          <div className="flex items-baseline gap-[calc(6*var(--scale-factor))]">
            <span className="text-[calc(19*var(--scale-factor))] font-semibold text-blue-900">854</span>
            <span className="text-[calc(9.7*var(--scale-factor))] font-medium text-rose-600">-13.2%</span>
          </div>
        </div>

        {/* Third KPI */}
        <div className="flex-1 min-w-0 rounded-lg border border-blue-100/50 shadow-sm p-[calc(8*var(--scale-factor))] bg-blue-50/30">
          <div className="text-[calc(13*var(--scale-factor))] text-blue-900/70 font-medium mb-[calc(6*var(--scale-factor))] min-h-[calc(29*var(--scale-factor))] flex flex-col justify-center">
            <span className="text-[calc(13*var(--scale-factor))] leading-normal block">Patient</span>
            <span className="text-[calc(13*var(--scale-factor))] leading-normal block">Population</span>
          </div>
          <div className="flex items-baseline gap-[calc(6*var(--scale-factor))]">
            <span className="text-[calc(19*var(--scale-factor))] font-semibold text-blue-900">3,401</span>
            <span className="text-[calc(9.7*var(--scale-factor))] text-blue-900/50">Total</span>
          </div>
        </div>

        {/* Fourth KPI */}
        <div className="flex-[1.05] min-w-0 rounded-lg border border-blue-100/50 shadow-sm p-[calc(8*var(--scale-factor))] bg-blue-50/35">
          <div className="text-[calc(13*var(--scale-factor))] text-blue-900/70 font-medium mb-[calc(6*var(--scale-factor))] min-h-[calc(29*var(--scale-factor))] flex flex-col justify-center">
            <span className="text-[calc(13*var(--scale-factor))] leading-normal block">Unsched Active</span>
            <span className="text-[calc(13*var(--scale-factor))] leading-normal block">Patients</span>
          </div>
          <div className="flex items-baseline gap-[calc(6*var(--scale-factor))]">
            <span className="text-[calc(19*var(--scale-factor))] font-semibold text-blue-900">577</span>
            <span className="text-[calc(10.5*var(--scale-factor))] text-blue-900/70">23%</span>
            <span className="text-[calc(9*var(--scale-factor))] font-medium text-rose-600">High</span>
          </div>
        </div>

        {/* Fifth KPI */}
        <div className="flex-[1.05] min-w-0 rounded-lg border border-blue-100/50 shadow-sm p-[calc(8*var(--scale-factor))] bg-blue-50/40">
          <div className="text-[calc(13*var(--scale-factor))] text-blue-900/70 font-medium mb-[calc(6*var(--scale-factor))] min-h-[calc(29*var(--scale-factor))] flex flex-col justify-center">
            <span className="text-[calc(13*var(--scale-factor))] leading-normal block">Days Between</span>
            <span className="text-[calc(13*var(--scale-factor))] leading-normal block">Apts</span>
          </div>
          <div className="flex items-baseline gap-[calc(6*var(--scale-factor))]">
            <span className="text-[calc(19*var(--scale-factor))] font-semibold text-blue-900">162.6</span>
            <span className="text-[calc(9.7*var(--scale-factor))] text-blue-900/50">Avg</span>
          </div>
        </div>
      </div>

   {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-[calc(12*var(--scale-factor))] w-full pb-[calc(12*var(--scale-factor))] mt-auto">
        <div className="bg-white rounded-lg p-[calc(12*var(--scale-factor))] shadow-sm h-fit w-[130%] border border-gray-200">
          <h3 className="text-[calc(13*var(--scale-factor))] font-medium text-gray-700 mb-[calc(8*var(--scale-factor))]">
            Patient Retention Analysis
          </h3>
          <div className="space-y-[calc(10*var(--scale-factor))] mb-0">
            {retentionData.map((group, idx) => {
              const retentionRate = ((group.retained / group.initial) * 100).toFixed(1);
              const maxValue = Math.max(...retentionData.map(d => d.initial));
              const widthScale = 0.91;
              const initialWidth = `${(group.initial / maxValue) * 100 * widthScale}%`;
              const retainedWidth = `${(group.retained / maxValue) * 100 * widthScale}%`;
              
              return (
                <div key={idx} className="flex items-center">
                  <div className="flex items-center w-full space-x-[calc(10*var(--scale-factor))]">
                    <span className="text-[calc(10*var(--scale-factor))] text-gray-500 shrink-0 min-w-[calc(52*var(--scale-factor))]">
                      Age {group.age}
                    </span>
                    <div className="relative flex-1 h-[calc(18*var(--scale-factor))]">
                      <div 
                        className="absolute top-0 left-0 h-full bg-blue-100 rounded"
                        style={{ width: initialWidth }}
                      >
                        <span className="absolute left-[calc(4*var(--scale-factor))] top-1/2 -translate-y-1/2 text-[calc(9*var(--scale-factor))] text-gray-600">
                          {group.initial.toLocaleString()}
                        </span>
                      </div>
                      <div 
                        className="absolute top-0 left-0 h-full bg-blue-600 rounded"
                        style={{ width: retainedWidth }}
                      >
                        <span className="absolute left-[calc(4*var(--scale-factor))] top-1/2 -translate-y-1/2 text-[calc(9*var(--scale-factor))] text-white">
                          {group.retained.toLocaleString()}
                        </span>
                      </div>
                      <span 
                        className="absolute top-1/2 -translate-y-1/2 text-[calc(9*var(--scale-factor))] text-gray-500"
                        style={{ left: `calc(${initialWidth} + calc(8*var(--scale-factor)))` }}
                      >
                        {retentionRate}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="flex gap-[calc(16*var(--scale-factor))] pt-[calc(6*var(--scale-factor))]">
              <div className="flex items-center gap-[calc(6*var(--scale-factor))]">
                <div className="w-[calc(10*var(--scale-factor))] h-[calc(10*var(--scale-factor))] rounded bg-blue-100"></div>
                <span className="text-[calc(9*var(--scale-factor))] text-gray-500">
                  Initial Patients
                </span>
              </div>
              <div className="flex items-center gap-[calc(6*var(--scale-factor))]">
                <div className="w-[calc(10*var(--scale-factor))] h-[calc(10*var(--scale-factor))] rounded bg-blue-600"></div>
                <span className="text-[calc(9*var(--scale-factor))] text-gray-500">
                  Retained Patients
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-[calc(12*var(--scale-factor))] shadow-sm h-[calc(186*var(--scale-factor))] w-[70%] ml-auto border border-gray-200">
          <h3 className="text-[calc(13*var(--scale-factor))] font-medium text-gray-700 mb-[calc(8*var(--scale-factor))]">
            Age Distribution by Gender
          </h3>
          <div className="h-[calc(138*var(--scale-factor))] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={demographicsData}
                margin={{ 
                  top: 0,
                  right: 0,
                  left: Math.ceil(-2 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor'))),
                  bottom: Math.ceil(2 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor')))
                }}
                barSize={Math.ceil(20 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor')))}
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
                  tick={props => (
                    <g transform={`translate(${props.x},${props.y})`}>
                      <text
                        x={0}
                        y={0}
                        dy={Math.ceil(8 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor')))}
                        textAnchor="end"
                        fill="#4B5563"
                        fontSize={Math.ceil(8 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor')))}
                        className="select-none"
                        transform="rotate(-20)"
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
                  width={Math.ceil(25 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor')))}
                  tick={{
                    fontSize: Math.ceil(8 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor'))),
                    fill: '#4B5563'
                  }}
                  padding={{ top: 0 }}
                />
                <Tooltip 
                  content={<CustomTooltip />}
                  cursor={{ fill: 'rgba(229, 231, 235, 0.4)' }}
                />
                <Legend
                  content={() => (
                    <div className="flex gap-[calc(8*var(--scale-factor))] pt-[calc(8*var(--scale-factor))]">
                      {Object.entries(colors).map(([key, color]) => (
                        <div key={key} className="flex items-center gap-[calc(6*var(--scale-factor))]">
                          <div 
                            className="w-[calc(10*var(--scale-factor))] h-[calc(10*var(--scale-factor))] rounded"
                            style={{ backgroundColor: color }}
                          />
                          <span className="text-[calc(9*var(--scale-factor))] text-gray-500 capitalize">
                            {key}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                />
                <Bar 
                  dataKey="male" 
                  name="Male" 
                  stackId="a" 
                  fill={colors.male}
                  maxBarSize={Math.ceil(65 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor')))}
                />
                <Bar 
                  dataKey="female" 
                  name="Female" 
                  stackId="a" 
                  fill={colors.female}
                  maxBarSize={Math.ceil(65 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor')))}
                />
                <Bar 
                  dataKey="other" 
                  name="Other" 
                  stackId="a" 
                  fill={colors.other}
                  maxBarSize={Math.ceil(65 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor')))}
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
          <div className="bg-[#1E2433] rounded-[calc(14*var(--scale-factor))] w-full min-w-[calc(632*var(--scale-factor))] h-[calc(40*var(--scale-factor))] flex items-center px-[calc(4*var(--scale-factor))] mx-[calc(4*var(--scale-factor))]">
            <TabsList className="flex bg-transparent h-[calc(36*var(--scale-factor))] gap-[calc(2*var(--scale-factor))] w-full justify-center">
              <TabsTrigger 
                value="demographics"
                className={`
                  rounded-lg 
                  h-[calc(31*var(--scale-factor))] 
                  text-[calc(14*var(--scale-factor))] 
                  px-[calc(24*var(--scale-factor))] 
                  min-w-[calc(210*var(--scale-factor))] 
                  font-normal 
                  flex 
                  items-center 
                  justify-center 
                  gap-[calc(8*var(--scale-factor))]
                  text-gray-300 
                  data-[state=active]:bg-white 
                  data-[state=active]:text-[#1C2434] 
                  data-[state=active]:shadow-sm
                  hover:bg-white/10 
                  hover:text-white 
                  data-[state=active]:hover:bg-white 
                  data-[state=active]:hover:text-[#1C2434]
                  transition-all 
                  duration-200
                `}
              >
                <Users size={`calc(16*var(--scale-factor))`} />
                Demographics
              </TabsTrigger>
              <TabsTrigger 
                value="financials"
                className={`
                  rounded-lg 
                  h-[calc(31*var(--scale-factor))] 
                  text-[calc(14*var(--scale-factor))] 
                  px-[calc(24*var(--scale-factor))] 
                  min-w-[calc(210*var(--scale-factor))] 
                  font-normal 
                  flex 
                  items-center 
                  justify-center 
                  gap-[calc(8*var(--scale-factor))]
                  text-gray-300 
                  data-[state=active]:bg-white 
                  data-[state=active]:text-[#1C2434] 
                  data-[state=active]:shadow-sm
                  hover:bg-white/10 
                  hover:text-white 
                  data-[state=active]:hover:bg-white 
                  data-[state=active]:hover:text-[#1C2434]
                  transition-all 
                  duration-200
                `}
              >
                <DollarSign size={`calc(16*var(--scale-factor))`} />
                Financials
              </TabsTrigger>
              <TabsTrigger 
                value="procedures"
                className={`
                  rounded-lg 
                  h-[calc(31*var(--scale-factor))] 
                  text-[calc(14*var(--scale-factor))] 
                  px-[calc(24*var(--scale-factor))] 
                  min-w-[calc(210*var(--scale-factor))] 
                  font-normal 
                  flex 
                  items-center 
                  justify-center 
                  gap-[calc(8*var(--scale-factor))]
                  text-gray-300 
                  data-[state=active]:bg-white 
                  data-[state=active]:text-[#1C2434] 
                  data-[state=active]:shadow-sm
                  hover:bg-white/10 
                  hover:text-white 
                  data-[state=active]:hover:bg-white 
                  data-[state=active]:hover:text-[#1C2434]
                  transition-all 
                  duration-200
                `}
              >
                <Stethoscope size={`calc(16*var(--scale-factor))`} />
                Procedures
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <div className="flex-1 overflow-hidden bg-gray-100 mt-[calc(8*var(--scale-factor))]">
          <TabsContent value="demographics" className="h-full m-0">
            <DemographicsContent />
          </TabsContent>

          <TabsContent value="financials" className="h-full m-0">
            <div className="h-full p-[calc(8*var(--scale-factor))] overflow-y-auto">
              <div className="grid grid-cols-2 gap-[calc(8*var(--scale-factor))]">
                <div className="bg-white rounded-lg p-[calc(8*var(--scale-factor))] h-[calc(48*var(--scale-factor))] shadow-sm">
                  <div className="text-[calc(9*var(--scale-factor))] text-gray-500">Revenue</div>
                  <div className="text-[calc(12*var(--scale-factor))] font-medium mt-[calc(2*var(--scale-factor))]">$124.5k</div>
                </div>
                <div className="bg-white rounded-lg p-[calc(8*var(--scale-factor))] h-[calc(48*var(--scale-factor))] shadow-sm">
                  <div className="text-[calc(9*var(--scale-factor))] text-gray-500">Expenses</div>
                  <div className="text-[calc(12*var(--scale-factor))] font-medium mt-[calc(2*var(--scale-factor))]">$67.8k</div>
                </div>
                <div className="bg-white rounded-lg p-[calc(8*var(--scale-factor))] h-[calc(48*var(--scale-factor))] shadow-sm">
                  <div className="text-[calc(9*var(--scale-factor))] text-gray-500">Net Profit</div>
                  <div className="text-[calc(12*var(--scale-factor))] font-medium mt-[calc(2*var(--scale-factor))]">$56.7k</div>
                </div>
                <div className="bg-white rounded-lg p-[calc(8*var(--scale-factor))] h-[calc(48*var(--scale-factor))] shadow-sm">
                  <div className="text-[calc(9*var(--scale-factor))] text-gray-500">Growth</div>
                  <div className="text-[calc(12*var(--scale-factor))] font-medium mt-[calc(2*var(--scale-factor))]">+12.4%</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-[calc(8*var(--scale-factor))] mt-[calc(8*var(--scale-factor))] h-[calc(120*var(--scale-factor))] shadow-sm">
                <div className="text-[calc(9*var(--scale-factor))] text-gray-500">Financial Trends</div>
                <div className="h-[calc(90*var(--scale-factor))] flex items-center justify-center text-[calc(9*var(--scale-factor))] text-gray-400">
                  Chart Area
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="procedures" className="h-full m-0">
            <div className="h-full p-[calc(8*var(--scale-factor))] overflow-y-auto">
              <div className="bg-white rounded-lg p-[calc(8*var(--scale-factor))] h-[calc(120*var(--scale-factor))] shadow-sm">
                <div className="text-[calc(9*var(--scale-factor))] text-gray-500">Procedure Distribution</div>
                <div className="h-[calc(90*var(--scale-factor))] flex items-center justify-center text-[calc(9*var(--scale-factor))] text-gray-400">
                  Pie Chart
                </div>
              </div>

              <div className="bg-white rounded-lg p-[calc(8*var(--scale-factor))] mt-[calc(8*var(--scale-factor))] shadow-sm">
                <div className="text-[calc(9*var(--scale-factor))] text-gray-500 mb-[calc(4*var(--scale-factor))]">Recent Procedures</div>
                <div className="space-y-[calc(6*var(--scale-factor))]">
                  {['Cleaning', 'Check-up', 'Filling', 'Root Canal'].map((proc, i) => (
                    <div key={i} className="flex justify-between items-center bg-gray-50 rounded-lg p-[calc(6*var(--scale-factor))]">
                      <span className="text-[calc(9*var(--scale-factor))]">{proc}</span>
                      <span className="text-[calc(8*var(--scale-factor))] text-gray-500">Today</span>
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
