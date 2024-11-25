import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const HomeContent: React.FC = () => {
  const revenueData = [
    { month: 'Jan', value: 30000 },
    { month: 'Feb', value: 35000 },
    { month: 'Mar', value: 32000 },
    { month: 'Apr', value: 40000 },
  ];

  const donutData = [
    { name: 'General', value: 400, color: '#103d68' },
    { name: 'Cosmetic', value: 300, color: '#40C4FF' },
    { name: 'Orthodontic', value: 200, color: '#E5F9FD' }
  ];

  const proceduresData = [
    { category: 'Checkups', value: 45 },
    { category: 'Cleanings', value: 35 },
    { category: 'Fillings', value: 20 },
    { category: 'Crowns', value: 15 },
  ];

  const patientCategoriesData = [
    { month: 'Jan', new: 45, returning: 65, referred: 35 },
    { month: 'Feb', new: 55, returning: 70, referred: 40 },
    { month: 'Mar', new: 50, returning: 75, referred: 45 },
    { month: 'Apr', new: 60, returning: 80, referred: 50 }
  ];

  const CustomizedLegend = () => (
    <div className="text-[8px] md:text-[11px] flex flex-col text-[#103d68] pr-1 md:pr-3">
      {donutData.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center mb-0.5 md:mb-1">
          <div 
            className="w-2 h-2 md:w-2.5 md:h-2.5 mr-1 md:mr-1.5 rounded-sm"
            style={{ backgroundColor: entry.color }}
          />
          <span className="whitespace-nowrap">{entry.name}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full h-full bg-gray-100 rounded-lg p-2 md:p-3">
      <div className="flex flex-col space-y-2 md:space-y-3">
        <h2 className="text-base md:text-xl font-bold text-[#103d68] pl-1 md:pl-2">
          Dashboard Overview
        </h2>

        {/* KPIs - Reduced height */}
        <div className="grid grid-cols-3 gap-2 md:gap-4">
          <div className="bg-white rounded-lg p-1.5 md:p-3 shadow-sm flex flex-col justify-center h-[50px] md:h-[83px]">
            <h3 className="text-[#103d68] text-[9px] md:text-base truncate">Active Patients</h3>
            <div className="flex items-center space-x-1.5 mt-1">
              <p className="text-[#103d68] text-xs md:text-2xl font-bold">2,547</p>
              <p className="text-green-500 text-[8px] md:text-sm">+12.5%</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-1.5 md:p-3 shadow-sm flex flex-col justify-center h-[50px] md:h-[83px]">
            <h3 className="text-[#103d68] text-[9px] md:text-base truncate">New Patients</h3>
            <div className="flex items-center space-x-1.5 mt-1">
              <p className="text-[#103d68] text-xs md:text-2xl font-bold">148</p>
              <p className="text-green-500 text-[8px] md:text-sm">+8.3%</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-1.5 md:p-3 shadow-sm flex flex-col justify-center h-[50px] md:h-[83px]">
            <h3 className="text-[#103d68] text-[9px] md:text-base truncate">Monthly Revenue</h3>
            <div className="flex items-center space-x-0.5 mt-1">
              <p className="text-[#103d68] text-xs md:text-2xl font-bold">$125.8K</p>
              <p className="text-green-500 text-[8px] md:text-sm">+15.2%</p>
            </div>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-2 gap-2 md:gap-4">
          {/* Revenue Trends */}
          <div className="bg-white rounded-lg p-2 md:p-3 shadow-sm w-[101.5%] md:w-auto h-[85px] md:h-[120px]">
            <h3 className="text-[#103d68] text-[10px] md:text-sm mb-1">Revenue Trends</h3>
            <div className="h-[60px] md:h-[95px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData} margin={{ top: 5, right: 10, bottom: 0, left: 5 }}>
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 8, fill: '#103d68' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 8, fill: '#103d68' }}
                    width={15}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#103d68" 
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Services Distribution */}
          <div className="bg-white rounded-lg p-2 md:p-3 shadow-sm w-[101.5%] md:w-auto h-[85px] md:h-[120px]">
            <h3 className="text-[#103d68] text-[10px] md:text-sm mb-1">Services Distribution</h3>
            <div className="h-[50px] md:h-[90px] flex items-center md:-mb-4">
              <div className="w-1/3">
                <CustomizedLegend />
              </div>
              <div className="w-2/3 h-full scale-110 transform translate-x-2 md:scale-115 md:-translate-y-2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: -5, right: 0, bottom: 1, left: 0 }}>
                    <Pie
                      data={donutData}
                      innerRadius="40%"
                      outerRadius="85%"
                      paddingAngle={2}
                      dataKey="value"
                      animationBegin={0}
                      animationDuration={1000}
                      animationEasing="ease-out"
                    >
                      {donutData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-2 gap-2 md:gap-4">
          {/* Procedures */}
          <div className="bg-white rounded-lg p-2 md:p-3 shadow-sm h-[85px] md:h-[120px]">
            <h3 className="text-[#103d68] text-[10px] md:text-sm mb-1">Procedures</h3>
            <div className="h-[70px] md:h-[90px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={proceduresData} layout="vertical" margin={{ top: 5, right: 10, bottom: 5, left: 5 }}>
                  <XAxis type="number" 
                    tick={{ fontSize: 7, fill: '#103d68' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    dataKey="category" 
                    type="category"
                    tick={{ fontSize: 7, fill: '#103d68' }}
                    width={40}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Bar dataKey="value" fill="#103d68" radius={[0, 2, 2, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Patient Categories */}
          <div className="bg-white rounded-lg p-2 md:p-3 shadow-sm h-[85px] md:h-[120px]">
            <h3 className="text-[#103d68] text-[10px] md:text-sm mb-1">Patient Categories</h3>
            <div className="h-[70px] md:h-[90px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={patientCategoriesData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 7, fill: '#103d68' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 7, fill: '#103d68' }}
                    width={15}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Bar dataKey="new" fill="#103d68" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="returning" fill="#40C4FF" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="referred" fill="#E5F9FD" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
