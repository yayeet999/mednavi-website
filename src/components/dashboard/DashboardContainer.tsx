import React, { useState } from 'react';
import { Home, Plug2, ArrowRight } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

export const DashboardContainer = () => {
  const [activePage, setActivePage] = useState('home');

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
    <div className="flex h-[340px] md:h-[480px] w-full">
      {/* Sidebar */}
      <div className="bg-white w-[50px] md:w-[80px] flex-shrink-0 flex flex-col items-center pt-6 md:pt-10 rounded-tl-xl rounded-bl-xl">
        {[
          { id: 'home', icon: <Home size={24} /> },
          { id: 'practice', icon: <Plug2 size={24} /> }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`w-8 h-8 md:w-12 md:h-12 mb-4 md:mb-6 rounded-lg flex items-center justify-center cursor-pointer transition-colors
                       ${activePage === item.id 
                         ? 'bg-[#103d68] text-white shadow-sm' 
                         : 'bg-transparent text-[#103d68] hover:bg-[#103d68] hover:bg-opacity-10'}`}
          >
            {item.icon}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-[#103d68] rounded-r-xl flex flex-col overflow-hidden">
        {/* Header Area */}
        <div className="flex-shrink-0 flex justify-between items-center px-3 py-2 md:px-5 md:py-3">
          <h1 className="text-xs md:text-lg text-white font-medium">Your Dental Practice</h1>
          <h2 className="text-sm md:text-xl text-white font-medium">mednavi</h2>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-2 md:p-4">
          <div className="bg-gray-100 rounded-xl h-full">
            {activePage === 'home' && (
              <div className="flex flex-col p-2 md:p-3 space-y-2 md:space-y-3">
                <h2 className="text-base md:text-xl font-bold text-[#103d68] pl-1 md:pl-2">
                  Dashboard Overview
                </h2>

                {/* KPIs - Reordered */}
                <div className="grid grid-cols-3 gap-2 md:gap-9 px-2 md:px-6 mr-2 md:mr-4">
  {/* Active Patients */}
  <div className="bg-white rounded-lg p-2 md:p-3 shadow space-y-0.5 md:space-y-1 w-[110%] md:w-auto transform -translate-x-2 md:translate-x-0">
    <h3 className="text-[#103d68] text-[9px] md:text-base truncate">Active Patients</h3>
    <div className="flex items-center space-x-2">
      <p className="text-[#103d68] text-xs md:text-2xl font-bold">2,547</p>
      <p className="text-green-500 text-[8px] md:text-sm">+12.5%</p>
    </div>
  </div>

  {/* New Patients */}
  <div className="bg-white rounded-lg p-2 md:p-3 shadow space-y-0.5 md:space-y-1 w-full md:w-auto">
    <h3 className="text-[#103d68] text-[9px] md:text-base truncate">New Patients</h3>
    <div className="flex items-center space-x-2">
      <p className="text-[#103d68] text-xs md:text-2xl font-bold">148</p>
      <p className="text-green-500 text-[8px] md:text-sm">+8.3%</p>
    </div>
  </div>

  {/* Monthly Revenue */}
  <div className="bg-white rounded-lg p-2 md:p-3 shadow space-y-0.5 md:space-y-1 w-[120%] md:w-auto">
    <h3 className="text-[#103d68] text-[9px] md:text-base truncate">Monthly Revenue</h3>
    <div className="flex items-center space-x-2">
      <p className="text-[#103d68] text-xs md:text-2xl font-bold">$125.8K</p>
      <p className="text-green-500 text-[8px] md:text-sm">+15.2%</p>
    </div>
  </div>
</div>


             {/* Charts Row 1 */}
                <div className="grid grid-cols-2 gap-2 md:gap-4 px-2 md:px-3">
  {/* Revenue Trends */}
  <div className="bg-white rounded-lg p-2 md:p-3 shadow transform -translate-x-2 md:translate-x-0">
    <h3 className="text-[#103d68] text-[9px] md:text-sm mb-1">Revenue Trends</h3>
    <div className="h-[50px] md:h-[95px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={revenueData} margin={{ top: 5, right: 10, bottom: 5, left: 5 }}>
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
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#103d68" 
            strokeWidth={1.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>

  {/* Services Distribution */}
  <div className="bg-white rounded-lg p-2 md:p-3 shadow transform -translate-x-2 md:translate-x-0">
    <h3 className="text-[#103d68] text-[9px] md:text-sm mb-1">Services Distribution</h3>
    <div className="h-[50px] md:h-[95px] flex items-center">
      <div className="w-1/3">
        <CustomizedLegend />
      </div>
      <div className="w-2/3 h-full scale-110 transform translate-x-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <Pie
              data={donutData}
              innerRadius="40%"
              outerRadius="85%"
              paddingAngle={2}
              dataKey="value"
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
                <div className="grid grid-cols-2 gap-2 md:gap-4 px-2 md:px-3">
                  {/* Procedures */}
                  <div className="h-[105px] md:h-[120px]">
                    <h3 className="text-[#103d68] text-[9px] md:text-sm mb-1">Procedures</h3>
                    <div className="h-[90px] md:h-[105px]">
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
                  <div className="h-[105px] md:h-[120px]">
                    <h3 className="text-[#103d68] text-[9px] md:text-sm mb-1">Patient Categories</h3>
                    <div className="h-[90px] md:h-[105px]">
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
            )}

            {activePage === 'practice' && (
              <div className="p-4 md:p-6 space-y-3 md:space-y-4">
                <h2 className="text-base md:text-xl font-bold text-[#103d68]">Mednavi Setup & Connection</h2>
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-center justify-between border-b pb-2 md:pb-3">
                    <span className="text-[10px] md:text-sm text-[#103d68]">Practice Name</span>
                    <span className="text-[10px] md:text-sm text-[#103d68] font-medium">Your Amazing Dental Practice</span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2 md:pb-3">
                    <span className="text-[10px] md:text-sm text-[#103d68]">Location</span>
                    <span className="text-[10px] md:text-sm text-[#103d68] font-medium">Chicago, IL</span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2 md:pb-3">
                    <span className="text-[10px] md:text-sm text-[#103d68]">Practitioners</span>
                    <span className="text-[10px] md:text-sm text-[#103d68] font-medium">2</span>
                  </div>
                  <button 
                    className="w-full py-2 md:py-3 px-4 bg-[#103d68] hover:bg-[#0d2e4d] transition-colors text-white rounded-lg text-[11px] md:text-sm font-medium shadow-sm hover:shadow-md flex items-center justify-center"
                    onClick={() => console.log('Continue clicked')}
                  >
                    <span>Click to Continue!</span>
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

           </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContainer;
