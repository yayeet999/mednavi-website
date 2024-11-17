'use client'
import React, { useState } from 'react';
import { Home, Grid, MapPin, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { BarChart, Bar } from 'recharts';

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="w-6 h-6 md:w-8 md:h-8 bg-[#E5F9FD] rounded-lg flex items-center justify-center">
    {children}
  </div>
);

const revenueData = [
  { month: 'Jan', value: 30000 },
  { month: 'Feb', value: 35000 },
  { month: 'Mar', value: 32000 },
  { month: 'Apr', value: 40000 },
];

const donutData = [
  { name: 'General', value: 400 },
  { name: 'Cosmetic', value: 300 },
  { name: 'Orthodontic', value: 200 },
];

const stackedData = [
  { month: 'Jan', preventive: 20, restorative: 15, cosmetic: 10 },
  { month: 'Feb', preventive: 25, restorative: 18, cosmetic: 12 },
  { month: 'Mar', preventive: 22, restorative: 20, cosmetic: 15 },
];

export const DashboardContainer = () => {
  const [activePage, setActivePage] = useState('home');

  const fadeInUp = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex h-full w-full">
      {/* Sidebar - minimized width */}
      <div className="bg-[#E5F9FD] w-[28px] md:w-[36px] flex flex-col items-center py-1.5 md:py-2">
        {[
          { id: 'home', icon: <Home className="text-[#103d68]" size={12} /> },
          { id: 'practice', icon: <Grid className="text-[#103d68]" size={12} /> },
          { id: 'connect', icon: <MapPin className="text-[#103d68]" size={12} /> },
          { id: 'reports', icon: <BarChart2 className="text-[#103d68]" size={12} /> }
        ].map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActivePage(item.id)}
            className={`w-4 h-4 md:w-6 md:h-6 mb-1 md:mb-2 rounded-lg flex items-center justify-center cursor-pointer transition-colors
                       ${activePage === item.id ? 'bg-white shadow-sm' : 'bg-transparent hover:bg-white/50'}`}
            aria-label={item.id}
          >
            {item.icon}
          </motion.button>
        ))}
      </div>

      {/* Main Content - optimized spacing */}
      <div className="flex-1 bg-[#103d68] rounded-r-xl flex flex-col">
        <div className="text-right px-1.5 py-1 md:px-2 md:py-1.5">
          <motion.h1 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xs md:text-sm text-white font-medium"
          >
            mednavi
          </motion.h1>
        </div>

      {activePage === 'home' && (
          <div className="flex-1 flex flex-col px-1.5 pb-1 md:px-3 md:pb-2">
            <div className="bg-white rounded-xl p-2 md:p-3 flex-1 overflow-hidden">
              <motion.div
                initial="hidden"
                animate="visible"
                className="flex flex-col h-full"
              >
                {/* Header */}
                <motion.h2 
                  variants={fadeInUp}
                  className="text-[#103d68] text-lg font-medium mb-3 md:mb-4"
                >
                  Your Dental Practice
                </motion.h2>

                {/* KPIs - Vertical layout on mobile, grid on desktop */}
                <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-3 md:gap-3 mb-4">
                  <motion.div
                    variants={fadeInUp}
                    className="bg-[#F8FAFC]/50 rounded-lg p-3 md:p-4"
                  >
                    <h3 className="text-[#103d68] text-base md:text-lg mb-1">Active Patients</h3>
                    <p className="text-[#103d68] text-2xl md:text-3xl font-bold">2,547</p>
                    <p className="text-green-500 text-sm">+12.5%</p>
                  </motion.div>

                  <motion.div
                    variants={fadeInUp}
                    className="bg-[#F8FAFC]/50 rounded-lg p-3 md:p-4"
                  >
                    <h3 className="text-[#103d68] text-base md:text-lg mb-1">Monthly Revenue</h3>
                    <p className="text-[#103d68] text-2xl md:text-3xl font-bold">$125.8K</p>
                    <p className="text-green-500 text-sm">+15.2%</p>
                  </motion.div>

                  <motion.div
                    variants={fadeInUp}
                    className="bg-[#F8FAFC]/50 rounded-lg p-3 md:p-4"
                  >
                    <h3 className="text-[#103d68] text-base md:text-lg mb-1">New Patients</h3>
                    <p className="text-[#103d68] text-2xl md:text-3xl font-bold">148</p>
                    <p className="text-green-500 text-sm">+8.3%</p>
                  </motion.div>
                </div>

                {/* Charts with optimized heights */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1">
                  {/* Line Chart */}
                  <motion.div
                    variants={fadeInUp}
                    className="bg-[#F8FAFC]/50 rounded-lg p-2"
                  >
                    <h3 className="text-[#103d68] text-sm mb-1">Revenue Trends</h3>
                    <div className="h-[80px] md:h-[100px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={revenueData}>
                          <XAxis 
                            dataKey="month" 
                            tick={{ fontSize: 10, fill: '#103d68' }}
                            axisLine={false}
                            tickLine={false}
                          />
                          <YAxis 
                            tick={{ fontSize: 10, fill: '#103d68' }}
                            width={25}
                            axisLine={false}
                            tickLine={false}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#103d68" 
                            strokeWidth={2}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>

                  {/* Donut Chart */}
                  <motion.div
                    variants={fadeInUp}
                    className="bg-[#F8FAFC]/50 rounded-lg p-2"
                  >
                    <h3 className="text-[#103d68] text-sm mb-1">Services Distribution</h3>
                    <div className="h-[80px] md:h-[100px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={donutData}
                            innerRadius="45%"
                            outerRadius="70%"
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {donutData.map((_, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={`${index === 0 ? '#103d68' : `${index === 1 ? '#40C4FF' : '#E5F9FD'}`}`}
                              />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>

                  {/* Stacked Bar Chart */}
                  <motion.div
                    variants={fadeInUp}
                    className="bg-[#F8FAFC]/50 rounded-lg p-2 md:col-span-2"
                  >
                    <h3 className="text-[#103d68] text-sm mb-1">Procedures by Category</h3>
                    <div className="h-[80px] md:h-[100px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={stackedData} barSize={20}>
                          <XAxis 
                            dataKey="month" 
                            tick={{ fontSize: 10, fill: '#103d68' }}
                            axisLine={false}
                            tickLine={false}
                          />
                          <YAxis 
                            tick={{ fontSize: 10, fill: '#103d68' }}
                            width={25}
                            axisLine={false}
                            tickLine={false}
                          />
                          <Bar dataKey="preventive" stackId="a" fill="#103d68" />
                          <Bar dataKey="restorative" stackId="a" fill="#40C4FF" />
                          <Bar dataKey="cosmetic" stackId="a" fill="#E5F9FD" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {activePage === 'practice' && (
          <div className="p-1.5 md:p-2">
            <h2 className="text-xs md:text-sm mb-1 text-white">Your Practice</h2>
            <div className="bg-white rounded-xl p-2">
              <h3 className="text-xs md:text-sm font-medium text-[#103d68] mb-1">Practice Overview</h3>
              <div className="grid gap-1 md:gap-2">
                <div className="flex items-center justify-between border-b pb-1">
                  <span className="text-xs text-[#103d68]">Practice Name</span>
                  <span className="text-xs text-[#40C4FF] font-medium">MedCenter Plus</span>
                </div>
                <div className="flex items-center justify-between border-b pb-1">
                  <span className="text-xs text-[#103d68]">Location</span>
                  <span className="text-xs text-[#40C4FF] font-medium">San Francisco, CA</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#103d68]">Practitioners</span>
                  <span className="text-xs text-[#40C4FF] font-medium">12</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activePage === 'connect' && (
          <div className="p-1.5 md:p-2">
            <h2 className="text-xs md:text-sm mb-1 text-white">Connect Your PMS</h2>
            <div className="bg-white rounded-xl p-2">
              <h3 className="text-xs md:text-sm font-medium text-[#103d68] mb-1">Available Integrations</h3>
              <div className="grid gap-1">
                <button className="flex items-center justify-between p-1.5 border rounded-lg hover:bg-[#E5F9FD] transition-colors">
                  <span className="text-xs font-medium text-[#103d68]">Practice Fusion</span>
                  <span className="text-[10px] text-green-500">Connected</span>
                </button>
                <button className="flex items-center justify-between p-1.5 border rounded-lg hover:bg-[#E5F9FD] transition-colors">
                  <span className="text-xs font-medium text-[#103d68]">Epic Systems</span>
                  <span className="text-[10px] text-[#40C4FF]">Connect</span>
                </button>
                <button className="flex items-center justify-between p-1.5 border rounded-lg hover:bg-[#E5F9FD] transition-colors">
                  <span className="text-xs font-medium text-[#103d68]">Athenahealth</span>
                  <span className="text-[10px] text-[#40C4FF]">Connect</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activePage === 'reports' && (
          <div className="p-1.5 md:p-2">
            <h2 className="text-xs md:text-sm mb-1 text-white">Data Reports</h2>
            <div className="bg-white rounded-xl p-2">
              <h3 className="text-xs md:text-sm font-medium text-[#103d68] mb-1">Analytics Dashboard</h3>
              <div className="grid gap-1">
                <div className="border rounded-lg p-1.5">
                  <h4 className="text-xs font-medium text-[#103d68] mb-1">Patient Demographics</h4>
                  <div className="h-12 md:h-20 bg-[#E5F9FD] rounded-lg flex items-center justify-center">
                    <span className="text-xs text-[#40C4FF]">Demographics Chart</span>
                  </div>
                </div>
                <div className="border rounded-lg p-1.5">
                  <h4 className="text-xs font-medium text-[#103d68] mb-1">Revenue Trends</h4>
                  <div className="h-12 md:h-20 bg-[#E5F9FD] rounded-lg flex items-center justify-center">
                    <span className="text-xs text-[#40C4FF]">Revenue Chart</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardContainer;