'use client'
import React, { useState } from 'react';
import { Home, Grid, MapPin, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';

// Sample data
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
  { 
    month: 'Jan',
    new: 45,
    returning: 65,
    referred: 35
  },
  {
    month: 'Feb',
    new: 55,
    returning: 70,
    referred: 40
  },
  {
    month: 'Mar',
    new: 50,
    returning: 75,
    referred: 45
  },
  {
    month: 'Apr',
    new: 60,
    returning: 80,
    referred: 50
  }
];

export const DashboardContainer = () => {
  const [activePage, setActivePage] = useState('home');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const CustomizedLegend = () => (
    <div className="text-[8px] md:text-[10px] flex flex-col text-[#103d68]">
      {donutData.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center mb-0.5">
          <div 
            className="w-2 h-2 mr-1 rounded-sm"
            style={{ backgroundColor: entry.color }}
          />
          <span>{entry.name}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex h-full w-full max-h-[370px] md:max-h-[480px]">
      {/* Sidebar */}
      <div className="bg-[#E5F9FD] w-[24px] md:w-[36px] flex flex-col items-center pt-1.5 md:pt-2">
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
            className={`w-4 h-4 md:w-6 md:h-6 mb-1.5 md:mb-2 rounded-lg flex items-center justify-center cursor-pointer transition-colors
                       ${activePage === item.id ? 'bg-white shadow-sm' : 'bg-transparent hover:bg-white/50'}`}
            aria-label={item.id}
          >
            {item.icon}
          </motion.button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-[#103d68] rounded-r-xl flex flex-col overflow-hidden">
        {/* Adjusted mednavi text positioning and size */}
        <div className="text-right px-3 py-2 md:px-4 md:py-2.5">
          <motion.h1 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-base md:text-xl text-white font-medium mr-1"
          >
            mednavi
          </motion.h1>
        </div>

       {activePage === 'home' && (
          <div className="flex-1 flex flex-col px-3 md:px-4 pb-1 md:pb-2">
            <div className="bg-white rounded-xl p-2 md:p-3 flex-1 overflow-hidden">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="flex flex-col h-full space-y-2 md:space-y-3"
              >
                {/* Row 1: Header */}
                <motion.h2 
                  variants={itemVariants}
                  className="text-lg md:text-xl font-medium text-[#103d68]"
                >
                  Your Dental Practice
                </motion.h2>

                {/* Row 2: KPIs with consistent heights */}
                <motion.div 
                  variants={itemVariants}
                  className="grid grid-cols-3 gap-3 md:gap-6 px-1 md:px-2"
                >
                  <div className="space-y-0.5 md:space-y-1">
                    <h3 className="text-[#103d68] text-[11px] md:text-base truncate">Active Patients</h3>
                    <p className="text-[#103d68] text-sm md:text-2xl font-bold">2,547</p>
                    <p className="text-green-500 text-[10px] md:text-sm">+12.5%</p>
                  </div>
                  <div className="space-y-0.5 md:space-y-1">
                    <h3 className="text-[#103d68] text-[11px] md:text-base truncate">Monthly Revenue</h3>
                    <p className="text-[#103d68] text-sm md:text-2xl font-bold">$125.8K</p>
                    <p className="text-green-500 text-[10px] md:text-sm">+15.2%</p>
                  </div>
                  <div className="space-y-0.5 md:space-y-1">
                    <h3 className="text-[#103d68] text-[11px] md:text-base truncate">New Patients</h3>
                    <p className="text-[#103d68] text-sm md:text-2xl font-bold">148</p>
                    <p className="text-green-500 text-[10px] md:text-sm">+8.3%</p>
                  </div>
                </motion.div>

                {/* Row 3: Revenue Trends + Donut */}
                <motion.div 
                  variants={itemVariants}
                  className="grid grid-cols-2 gap-2 md:gap-3"
                >
                  {/* Revenue Trends Line Chart - Increased height */}
                  <div className="h-[70px] md:h-[110px]">
                    <h3 className="text-[#103d68] text-[10px] md:text-sm mb-1">Revenue Trends</h3>
                    <div className="h-[55px] md:h-[95px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={revenueData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
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
                            strokeWidth={1.5}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Services Distribution with Legend */}
                  <div className="h-[70px] md:h-[110px]">
                    <h3 className="text-[#103d68] text-[10px] md:text-sm mb-1">Services Distribution</h3>
                    <div className="h-[55px] md:h-[95px] flex items-center">
                      <div className="w-1/4">
                        <CustomizedLegend />
                      </div>
                      <div className="w-3/4 h-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                            <Pie
                              data={donutData}
                              innerRadius="40%"
                              outerRadius="80%"
                              paddingAngle={2}
                              dataKey="value"
                            >
                              {donutData.map((entry, index) => (
                                <Cell 
                                  key={`cell-${index}`} 
                                  fill={entry.color}
                                />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Row 4: Procedures Bar Chart + Patient Categories */}
                <motion.div 
                  variants={itemVariants}
                  className="grid grid-cols-2 gap-2 md:gap-3 flex-1"
                >
                  {/* Procedures Bar Chart - Elongated */}
                  <div className="h-[80px] md:h-[120px]">
                    <h3 className="text-[#103d68] text-[10px] md:text-sm mb-1">Procedures</h3>
                    <div className="h-[65px] md:h-[105px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={proceduresData} layout="vertical" margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                          <XAxis type="number" 
                            tick={{ fontSize: 8, fill: '#103d68' }}
                            axisLine={false}
                            tickLine={false}
                          />
                          <YAxis 
                            dataKey="category" 
                            type="category"
                            tick={{ fontSize: 8, fill: '#103d68' }}
                            width={40}
                            axisLine={false}
                            tickLine={false}
                          />
                          <Bar dataKey="value" fill="#103d68" radius={[0, 2, 2, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Patient Categories Grouped Bar Chart */}
                  <div className="h-[80px] md:h-[120px]">
                    <h3 className="text-[#103d68] text-[10px] md:text-sm mb-1">Patient Categories</h3>
                    <div className="h-[65px] md:h-[105px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={patientCategoriesData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
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
                          <Bar dataKey="new" fill="#103d68" radius={[2, 2, 0, 0]} />
                          <Bar dataKey="returning" fill="#40C4FF" radius={[2, 2, 0, 0]} />
                          <Bar dataKey="referred" fill="#E5F9FD" radius={[2, 2, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        )}

        {activePage === 'practice' && (
          <div className="p-1.5 md:p-2">
            <h2 className="text-[10px] md:text-sm mb-1 text-white">Your Practice</h2>
            <div className="bg-white rounded-xl p-2">
              <h3 className="text-[10px] md:text-sm font-medium text-[#103d68] mb-1">Practice Overview</h3>
              <div className="grid gap-1">
                <div className="flex items-center justify-between border-b pb-1">
                  <span className="text-[10px] text-[#103d68]">Practice Name</span>
                  <span className="text-[10px] text-[#40C4FF] font-medium">MedCenter Plus</span>
                </div>
                <div className="flex items-center justify-between border-b pb-1">
                  <span className="text-[10px] text-[#103d68]">Location</span>
                  <span className="text-[10px] text-[#40C4FF] font-medium">San Francisco, CA</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#103d68]">Practitioners</span>
                  <span className="text-[10px] text-[#40C4FF] font-medium">12</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activePage === 'connect' && (
          <div className="p-1.5 md:p-2">
            <h2 className="text-[10px] md:text-sm mb-1 text-white">Connect Your PMS</h2>
            <div className="bg-white rounded-xl p-2">
              <h3 className="text-[10px] md:text-sm font-medium text-[#103d68] mb-1">Available Integrations</h3>
              <div className="grid gap-1">
                <button className="flex items-center justify-between p-1.5 border rounded-lg hover:bg-[#E5F9FD] transition-colors">
                  <span className="text-[10px] font-medium text-[#103d68]">Practice Fusion</span>
                  <span className="text-[8px] text-green-500">Connected</span>
                </button>
                <button className="flex items-center justify-between p-1.5 border rounded-lg hover:bg-[#E5F9FD] transition-colors">
                  <span className="text-[10px] font-medium text-[#103d68]">Epic Systems</span>
                  <span className="text-[8px] text-[#40C4FF]">Connect</span>
                </button>
                <button className="flex items-center justify-between p-1.5 border rounded-lg hover:bg-[#E5F9FD] transition-colors">
                  <span className="text-[10px] font-medium text-[#103d68]">Athenahealth</span>
                  <span className="text-[8px] text-[#40C4FF]">Connect</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activePage === 'reports' && (
          <div className="p-1.5 md:p-2">
            <h2 className="text-[10px] md:text-sm mb-1 text-white">Data Reports</h2>
            <div className="bg-white rounded-xl p-2">
              <h3 className="text-[10px] md:text-sm font-medium text-[#103d68] mb-1">Analytics Dashboard</h3>
              <div className="grid gap-1">
                <div className="border rounded-lg p-1.5">
                  <h4 className="text-[10px] font-medium text-[#103d68] mb-1">Patient Demographics</h4>
                  <div className="h-8 md:h-16 bg-[#E5F9FD] rounded-lg flex items-center justify-center">
                    <span className="text-[10px] text-[#40C4FF]">Demographics Chart</span>
                  </div>
                </div>
                <div className="border rounded-lg p-1.5">
                  <h4 className="text-[10px] font-medium text-[#103d68] mb-1">Revenue Trends</h4>
                  <div className="h-8 md:h-16 bg-[#E5F9FD] rounded-lg flex items-center justify-center">
                    <span className="text-[10px] text-[#40C4FF]">Revenue Chart</span>
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