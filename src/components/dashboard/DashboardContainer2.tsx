import React, { useState } from 'react';
import { Home, BarChart2, Map } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import PracticeTabContent from './PracticeTabContent';

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
  <div className="flex flex-col text-[#103d68] pr-[calc(12*var(--scale-factor))]">
    {donutData.map((entry, index) => (
      <div key={`legend-${index}`} className="flex items-center mb-[calc(4*var(--scale-factor))]">
        <div 
          className="w-[calc(10*var(--scale-factor))] h-[calc(10*var(--scale-factor))] mr-[calc(6*var(--scale-factor))] rounded-sm"
          style={{ backgroundColor: entry.color }}
        />
        <span className="whitespace-nowrap text-[calc(11*var(--scale-factor))]">{entry.name}</span>
      </div>
    ))}
  </div>
);

export const DashboardContainer2 = () => {
  const [activePage, setActivePage] = useState('practice');
  return (
    <div className="flex h-[calc(480*var(--scale-factor))] w-full">
      {/* Sidebar */}
      <div className="bg-white w-[calc(80*var(--scale-factor))] flex-shrink-0 flex flex-col items-center pt-[calc(12*var(--scale-factor))] rounded-l-xl">
        {[
          { id: 'home', icon: <Home size={`calc(24*var(--scale-factor))`} /> },
          { id: 'practice', icon: <BarChart2 size={`calc(24*var(--scale-factor))`} /> },
          { id: 'map', icon: <Map size={`calc(24*var(--scale-factor))`} /> }
        ].map((item) => (
          <div key={item.id} className="relative">
            <button
              onClick={() => setActivePage(item.id)}
              className={`
                w-[calc(56*var(--scale-factor))] 
                h-[calc(48*var(--scale-factor))] 
                mb-[calc(8*var(--scale-factor))] 
                rounded-lg 
                flex 
                items-center 
                justify-center 
                cursor-pointer 
                transition-colors
                ${activePage === item.id 
                  ? 'bg-[#052b52] text-white shadow-sm' 
                  : 'bg-transparent text-[#052b52] hover:bg-[#103d68] hover:bg-opacity-10'}
                ${item.id === 'map' ? 'cursor-default' : ''}
              `}
              disabled={item.id === 'map'}
            >
              {item.icon}
            </button>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-[#103d68] rounded-r-xl flex flex-col overflow-hidden">
        {/* Header Area */}
        <div className="flex-shrink-0 flex justify-between items-start px-[calc(20*var(--scale-factor))] pt-[calc(12*var(--scale-factor))]">
          <h1 className="text-[calc(18*var(--scale-factor))] text-white font-bold pl-[calc(8*var(--scale-factor))] mt-auto mb-[calc(4*var(--scale-factor))]">
            Your Dental Practice
          </h1>
          <h2 className="text-[calc(28*var(--scale-factor))] text-white font-medium pr-[calc(32*var(--scale-factor))] mt-[calc(8*var(--scale-factor))]">
            mednavi
          </h2>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-[calc(16*var(--scale-factor))]">
          <div className="bg-gray-100 rounded-lg h-full p-[calc(12*var(--scale-factor))]">
            {activePage === 'practice' && (
              <div className="w-full h-full bg-white rounded-lg">
                <PracticeTabContent />
              </div>
            )}
            {activePage === 'home' && (
              <div className="flex flex-col space-y-[calc(12*var(--scale-factor))]">
                <h2 className="text-[calc(20*var(--scale-factor))] font-bold text-[#103d68] pl-[calc(8*var(--scale-factor))]">
                  Dashboard Overview
                </h2>

                {/* KPIs */}
                <div className="grid grid-cols-3 gap-[calc(16*var(--scale-factor))]">
                  <div className="bg-white rounded-lg p-[calc(12*var(--scale-factor))] shadow-sm flex flex-col justify-center h-[calc(83*var(--scale-factor))]">
                    <h3 className="text-[#103d68] text-[calc(16*var(--scale-factor))] truncate">Active Patients</h3>
                    <div className="flex items-center space-x-[calc(6*var(--scale-factor))] mt-[calc(4*var(--scale-factor))]">
                      <p className="text-[#103d68] text-[calc(24*var(--scale-factor))] font-bold">2,547</p>
                      <p className="text-green-500 text-[calc(14*var(--scale-factor))]">+12.5%</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-[calc(12*var(--scale-factor))] shadow-sm flex flex-col justify-center h-[calc(83*var(--scale-factor))]">
                    <h3 className="text-[#103d68] text-[calc(16*var(--scale-factor))] truncate">New Patients</h3>
                    <div className="flex items-center space-x-[calc(6*var(--scale-factor))] mt-[calc(4*var(--scale-factor))]">
                      <p className="text-[#103d68] text-[calc(24*var(--scale-factor))] font-bold">148</p>
                      <p className="text-green-500 text-[calc(14*var(--scale-factor))]">+8.3%</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-[calc(12*var(--scale-factor))] shadow-sm flex flex-col justify-center h-[calc(83*var(--scale-factor))]">
                    <h3 className="text-[#103d68] text-[calc(16*var(--scale-factor))] truncate">Monthly Revenue</h3>
                    <div className="flex items-center space-x-[calc(2*var(--scale-factor))] mt-[calc(4*var(--scale-factor))]">
                      <p className="text-[#103d68] text-[calc(24*var(--scale-factor))] font-bold">$125.8K</p>
                      <p className="text-green-500 text-[calc(14*var(--scale-factor))]">+15.2%</p>
                    </div>
                  </div>
                </div>

                {/* Charts Row 1 */}
                <div className="grid grid-cols-2 gap-[calc(16*var(--scale-factor))]">
                  {/* Revenue Trends */}
                  <div className="bg-white rounded-lg p-[calc(12*var(--scale-factor))] shadow-sm h-[calc(120*var(--scale-factor))]">
                    <h3 className="text-[#103d68] text-[calc(14*var(--scale-factor))] mb-[calc(4*var(--scale-factor))]">Revenue Trends</h3>
                    <div className="h-[calc(95*var(--scale-factor))]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={revenueData} margin={{ 
                          top: Math.ceil(5 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor'))), 
                          right: Math.ceil(10 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor'))), 
                          bottom: 0, 
                          left: Math.ceil(5 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor'))) 
                        }}>
                          <XAxis 
                            dataKey="month" 
                            tick={{ 
                              fontSize: Math.ceil(8 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor'))),
                              fill: '#103d68' 
                            }}
                            axisLine={false}
                            tickLine={false}
                          />
                          <YAxis 
                            tick={{ 
                              fontSize: Math.ceil(8 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor'))),
                              fill: '#103d68' 
                            }}
                            width={Math.ceil(15 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor')))}
                            axisLine={false}
                            tickLine={false}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#103d68" 
                            strokeWidth={Math.ceil(2 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor')))}
                            dot={true}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Services Distribution */}
                  <div className="bg-white rounded-lg p-[calc(12*var(--scale-factor))] shadow-sm h-[calc(120*var(--scale-factor))]">
                    <h3 className="text-[#103d68] text-[calc(14*var(--scale-factor))] mb-[calc(4*var(--scale-factor))]">Services Distribution</h3>
                    <div className="h-[calc(90*var(--scale-factor))] flex items-center">
                      <div className="w-1/3">
                        <CustomizedLegend />
                      </div>
                      <div className="w-2/3 h-full transform translate-x-[calc(8*var(--scale-factor))]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart margin={{ 
                            top: Math.ceil(-5 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor'))), 
                            right: 0, 
                            bottom: Math.ceil(1 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor'))), 
                            left: 0 
                          }}>
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
                <div className="grid grid-cols-2 gap-[calc(16*var(--scale-factor))]">
                  {/* Procedures */}
                  <div className="bg-white rounded-lg p-[calc(12*var(--scale-factor))] shadow-sm h-[calc(120*var(--scale-factor))]">
                    <h3 className="text-[#103d68] text-[calc(14*var(--scale-factor))] mb-[calc(4*var(--scale-factor))]">Procedures</h3>
                    <div className="h-[calc(90*var(--scale-factor))]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart 
                          data={proceduresData} 
                          layout="vertical" 
                          margin={{ 
                            top: Math.ceil(5 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor'))), 
                            right: Math.ceil(10 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor'))), 
                            bottom: Math.ceil(5 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor'))), 
                            left: Math.ceil(5 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor'))) 
                          }}
                        >
                          <XAxis 
                            type="number" 
                            tick={{ 
                              fontSize: Math.ceil(7 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor'))),
                              fill: '#103d68' 
                            }}
                            axisLine={false}
                            tickLine={false}
                          />
                          <YAxis 
                            dataKey="category" 
                            type="category"
                            tick={{ 
                              fontSize: Math.ceil(7 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor'))),
                              fill: '#103d68' 
                            }}
                            width={Math.ceil(40 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor')))}
                            axisLine={false}
                            tickLine={false}
                          />
                          <Bar 
                            dataKey="value" 
                            fill="#103d68" 
                            radius={[0, Math.ceil(2 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor'))), Math.ceil(2 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor'))), 0]} 
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Patient Categories */}
                  <div className="bg-white rounded-lg p-[calc(12*var(--scale-factor))] shadow-sm h-[calc(120*var(--scale-factor))]">
                    <h3 className="text-[#103d68] text-[calc(14*var(--scale-factor))] mb-[calc(4*var(--scale-factor))]">Patient Categories</h3>
                    <div className="h-[calc(90*var(--scale-factor))]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart 
                          data={patientCategoriesData} 
                          margin={{ 
                            top: Math.ceil(5 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor'))), 
                            right: Math.ceil(5 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor'))), 
                            bottom: Math.ceil(5 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor'))), 
                            left: Math.ceil(5 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor'))) 
                          }}
                        >
                          <XAxis 
                            dataKey="month" 
                            tick={{ 
                              fontSize: Math.ceil(7 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor'))),
                              fill: '#103d68' 
                            }}
                            axisLine={false}
                            tickLine={false}
                          />
                          <YAxis 
                            tick={{ 
                              fontSize: Math.ceil(7 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor'))),
                              fill: '#103d68' 
                            }}
                            width={Math.ceil(15 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor')))}
                            axisLine={false}
                            tickLine={false}
                          />
                          <Bar 
                            dataKey="new" 
                            fill="#103d68" 
                            radius={[Math.ceil(2 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor'))), Math.ceil(2 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor'))), 0, 0]} 
                          />
                          <Bar 
                            dataKey="returning" 
                            fill="#40C4FF" 
                            radius={[Math.ceil(2 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor'))), Math.ceil(2 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor'))), 0, 0]} 
                          />
                          <Bar 
                            dataKey="referred" 
                            fill="#E5F9FD" 
                            radius={[Math.ceil(2 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor'))), Math.ceil(2 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor'))), 0, 0]} 
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes smoothScale {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(calc(1 + (0.05 * var(--scale-factor))));
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardContainer2;
