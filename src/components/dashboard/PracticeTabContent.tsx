import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Users, DollarSign, Stethoscope } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DemographicsContent = () => {
  // Retention data
  const retentionData = [
    {
      age: '18-30',
      initial: 1000,
      retained: 850,
    },
    {
      age: '31-45',
      initial: 1380,
      retained: 1200,
    },
    {
      age: '46-60',
      initial: 1100,
      retained: 980,
    },
    {
      age: '60+',
      initial: 810,
      retained: 720,
    }
  ];

  // Demographics data
  const demographicsData = [
    {
      ageRange: '18-30',
      male: 320,
      female: 380,
      other: 25
    },
    {
      ageRange: '31-45',
      male: 480,
      female: 520,
      other: 35
    },
    {
      ageRange: '46-60',
      male: 420,
      female: 460,
      other: 30
    },
    {
      ageRange: '61-75',
      male: 280,
      female: 310,
      other: 20
    },
    {
      ageRange: '75+',
      male: 180,
      female: 220,
      other: 15
    }
  ];

  // Color palette
  const colors = {
    male: '#1E40AF',    // Deep blue
    female: '#3B82F6',  // Medium blue
    other: '#93C5FD'    // Light blue
  };

  // Custom tooltip for demographics chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-sm rounded-md">
          <p className="font-medium text-[9px] md:text-xs text-gray-700 mb-1">{`Age Range: ${label}`}</p>
          {payload.map((entry, index) => (
            <p 
              key={index} 
              className="text-[8px] md:text-[11px]"
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
    <div className="h-full p-2 overflow-y-auto space-y-3">
      {/* Patient Retention Analysis */}
      <div className="bg-white rounded-lg p-3 shadow-sm">
        <h3 className="text-[10px] md:text-sm font-medium text-gray-700 mb-3">Patient Retention Analysis</h3>
        <div className="space-y-4">
          {retentionData.map((group, idx) => {
            const retentionRate = ((group.retained / group.initial) * 100).toFixed(1);
            const maxValue = Math.max(...retentionData.map(d => d.initial));
            const widthScale = 0.7;
            const initialWidth = `${(group.initial / maxValue) * 100 * widthScale}%`;
            const retainedWidth = `${(group.retained / maxValue) * 100 * widthScale}%`;
            
            return (
              <div key={idx} className="relative">
                <div className="text-[9px] md:text-xs text-gray-500 mb-1">Age {group.age}</div>
                <div className="relative h-5 md:h-7">
                  <div 
                    className="absolute top-0 left-0 h-full bg-blue-100 rounded"
                    style={{ width: initialWidth }}
                  >
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[8px] md:text-xs text-gray-600">
                      {group.initial.toLocaleString()}
                    </span>
                  </div>
                  <div 
                    className="absolute top-0 left-0 h-full bg-blue-600 rounded"
                    style={{ width: retainedWidth }}
                  >
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[8px] md:text-xs text-white">
                      {group.retained.toLocaleString()}
                    </span>
                  </div>
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 text-[8px] md:text-xs text-gray-500 whitespace-nowrap">
                    {retentionRate}%
                  </div>
                </div>
              </div>
            );
          })}

          {/* Legend */}
          <div className="flex gap-3 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded bg-blue-100"></div>
              <span className="text-[8px] md:text-xs text-gray-500">Initial Patients</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded bg-blue-600"></div>
              <span className="text-[8px] md:text-xs text-gray-500">Retained Patients</span>
            </div>
          </div>
        </div>
      </div>

      {/* Age Distribution by Gender */}
      <div className="bg-white rounded-lg p-3 shadow-sm">
        <h3 className="text-[10px] md:text-sm font-medium text-gray-700 mb-3">Age Distribution by Gender</h3>
        <div className="h-[180px] md:h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={demographicsData}
              margin={{ top: 10, right: 10, left: -15, bottom: 5 }}
              barSize={16}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#E5E7EB"
                vertical={false}
              />
              <XAxis 
                dataKey="ageRange"
                tick={{ fontSize: 10, fill: '#4B5563' }}
                tickLine={{ stroke: '#E5E7EB' }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <YAxis
                tick={{ fontSize: 10, fill: '#4B5563' }}
                tickLine={{ stroke: '#E5E7EB' }}
                axisLine={{ stroke: '#E5E7EB' }}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{
                  fontSize: '10px',
                  paddingTop: '8px'
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
  );
};

const PracticeTabContent = () => {
  return (
    <div className="h-full w-full overflow-hidden">
      <Tabs defaultValue="demographics" className="h-full flex flex-col [&>div]:bg-transparent">
        {/* Tabs Container */}
        <div className="flex justify-center">
          <div className="bg-[#1E2433] rounded-[14px] md:min-w-[632px] h-[32px] md:h-[40px] flex items-center px-0.5 md:px-1">
            <TabsList className="flex bg-transparent h-[28px] md:h-[36px] gap-0.5 w-full justify-center">
              <TabsTrigger 
                value="demographics"
                className="rounded-lg h-[23px] md:h-[31px] text-[9px] md:text-xs px-2.5 md:px-6 md:min-w-[210px] font-normal flex items-center justify-center gap-1 md:gap-2
                  text-gray-300 data-[state=active]:bg-white data-[state=active]:text-[#1C2434] md:data-[state=active]:shadow-sm
                  hover:bg-white/10 hover:text-white data-[state=active]:hover:bg-white data-[state=active]:hover:text-[#1C2434]
                  transition-all duration-200"
              >
                <Users className="w-2.5 h-2.5 md:w-4 md:h-4" />
                Demographics
              </TabsTrigger>
              <TabsTrigger 
                value="financials"
                className="rounded-lg h-[23px] md:h-[31px] text-[9px] md:text-xs px-2.5 md:px-6 md:min-w-[210px] font-normal flex items-center justify-center gap-1 md:gap-2
                  text-gray-300 data-[state=active]:bg-white data-[state=active]:text-[#1C2434] md:data-[state=active]:shadow-sm
                  hover:bg-white/10 hover:text-white data-[state=active]:hover:bg-white data-[state=active]:hover:text-[#1C2434]
                  transition-all duration-200"
              >
                <DollarSign className="w-2.5 h-2.5 md:w-4 md:h-4" />
                Financials
              </TabsTrigger>
              <TabsTrigger 
                value="procedures"
                className="rounded-lg h-[23px] md:h-[31px] text-[9px] md:text-xs px-2.5 md:px-6 md:min-w-[210px] font-normal flex items-center justify-center gap-1 md:gap-2
                  text-gray-300 data-[state=active]:bg-white data-[state=active]:text-[#1C2434] md:data-[state=active]:shadow-sm
                  hover:bg-white/10 hover:text-white data-[state=active]:hover:bg-white data-[state=active]:hover:text-[#1C2434]
                  transition-all duration-200"
              >
                <Stethoscope className="w-2.5 h-2.5 md:w-4 md:h-4" />
                Procedures
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden bg-gray-100 mt-2">
          <TabsContent value="demographics" className="h-full m-0">
            <DemographicsContent />
          </TabsContent>

          <TabsContent value="financials" className="h-full m-0">
            <div className="h-full p-2 overflow-y-auto">
              {/* KPI Cards */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white rounded-lg p-2 h-[48px] shadow-sm">
                  <div className="text-[9px] text-gray-500">Revenue</div>
                  <div className="text-xs font-medium mt-0.5">$124.5k</div>
                </div>
                <div className="bg-white rounded-lg p-2 h-[48px] shadow-sm">
                  <div className="text-[9px] text-gray-500">Expenses</div>
                  <div className="text-xs font-medium mt-0.5">$67.8k</div>
                </div>
                <div className="bg-white rounded-lg p-2 h-[48px] shadow-sm">
                  <div className="text-[9px] text-gray-500">Net Profit</div>
                  <div className="text-xs font-medium mt-0.5">$56.7k</div>
                </div>
                <div className="bg-white rounded-lg p-2 h-[48px] shadow-sm">
                  <div className="text-[9px] text-gray-500">Growth</div>
                  <div className="text-xs font-medium mt-0.5">+12.4%</div>
                </div>
              </div>

              {/* Chart Area */}
              <div className="bg-white rounded-lg p-2 mt-2 h-[120px] shadow-sm">
                <div className="text-[9px] text-gray-500">Financial Trends</div>
                <div className="h-[90px] flex items-center justify-center text-[9px] text-gray-400">
                  Chart Area
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="procedures" className="h-full m-0">
            <div className="h-full p-2 overflow-y-auto">
              {/* Distribution Chart */}
              <div className="bg-white rounded-lg p-2 h-[120px] shadow-sm">
                <div className="text-[9px] text-gray-500">Procedure Distribution</div>
                <div className="h-[90px] flex items-center justify-center text-[9px] text-gray-400">
                  Pie Chart
                </div>
              </div>

              {/* Recent Procedures List */}
              <div className="bg-white rounded-lg p-2 mt-2 shadow-sm">
                <div className="text-[9px] text-gray-500 mb-1">Recent Procedures</div>
                <div className="space-y-1.5">
                  {['Cleaning', 'Check-up', 'Filling', 'Root Canal'].map((proc, i) => (
                    <div key={i} className="flex justify-between items-center bg-gray-50 rounded-lg p-1.5">
                      <span className="text-[9px]">{proc}</span>
                      <span className="text-[8px] text-gray-500">Today</span>
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