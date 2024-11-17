'use client'
import React, { useState } from 'react';
import { Home, Grid, MapPin, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { BarChart, Bar } from 'recharts';

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="w-8 h-8 md:w-12 md:h-12 bg-[#E5F9FD] rounded-lg flex items-center justify-center">
    {children}
  </div>
);

// Sample data for charts
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <div className="flex h-full w-full">
      {/* Sidebar - reduced width */}
      <div className="bg-[#E5F9FD] w-[30px] md:w-[40px] flex flex-col items-center pt-1 md:pt-2">
        {[
          { id: 'home', icon: <Home className="text-[#103d68]" size={14} /> },
          { id: 'practice', icon: <Grid className="text-[#103d68]" size={14} /> },
          { id: 'connect', icon: <MapPin className="text-[#103d68]" size={14} /> },
          { id: 'reports', icon: <BarChart2 className="text-[#103d68]" size={14} /> }
        ].map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActivePage(item.id)}
            className={`w-5 h-5 md:w-7 md:h-7 mb-1 md:mb-2 rounded-lg flex items-center justify-center cursor-pointer transition-colors
                       ${activePage === item.id ? 'bg-white shadow-md' : 'bg-transparent hover:bg-white/50'}`}
            aria-label={item.id}
          >
            {item.icon}
          </motion.button>
        ))}
      </div>

      {/* Main Content - adjusted padding and spacing */}
      <div className="flex-1 bg-[#103d68] rounded-r-xl flex flex-col">
        <div className="text-right p-1 md:p-2">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-sm md:text-base text-white font-medium"
          >
            mednavi
          </motion.h1>
        </div>

      {activePage === 'home' && (
          <div className="flex-1 flex flex-col px-1 md:px-3 pb-1 md:pb-2">
            <div className="bg-white rounded-xl p-2 md:p-4 mb-1 md:mb-2 flex-1 overflow-hidden">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerChildren}
                className="flex flex-col h-full"
              >
                {/* Header - reduced vertical spacing */}
                <motion.h2 
                  variants={fadeInUp}
                  className="text-base md:text-lg font-medium text-[#103d68] mb-2 md:mb-3"
                >
                  Your Dental Practice
                </motion.h2>

                {/* KPI Cards - reduced height and spacing */}
                <motion.div 
                  variants={staggerChildren}
                  className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3 mb-2 md:mb-3"
                >
                  {[
                    { title: "Active Patients", value: "2,547", trend: "+12.5%" },
                    { title: "Monthly Revenue", value: "$125.8K", trend: "+15.2%" },
                    { title: "New Patients", value: "148", trend: "+8.3%" }
                  ].map((kpi, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      className="bg-[#F8FAFC] rounded-lg p-2 md:p-3 shadow-sm"
                    >
                      <h3 className="text-xs md:text-sm text-[#103d68] mb-1">{kpi.title}</h3>
                      <p className="text-sm md:text-lg font-bold text-[#103d68]">{kpi.value}</p>
                      <p className="text-xs md:text-sm text-green-500">{kpi.trend}</p>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Charts Grid - adjusted heights and spacing */}
                <motion.div 
                  variants={staggerChildren}
                  className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 flex-1"
                >
                  {/* Line Chart */}
                  <motion.div
                    variants={fadeInUp}
                    className="bg-[#F8FAFC] rounded-lg p-2 md:p-3"
                  >
                    <h3 className="text-xs md:text-sm text-[#103d68] mb-1">Revenue Trends</h3>
                    <div className="h-[100px] md:h-[120px]">
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
                            width={30}
                            axisLine={false}
                            tickLine={false}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#fff',
                              border: 'none',
                              borderRadius: '4px',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                              fontSize: '12px'
                            }}
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
                    className="bg-[#F8FAFC] rounded-lg p-2 md:p-3"
                  >
                    <h3 className="text-xs md:text-sm text-[#103d68] mb-1">Services Distribution</h3>
                    <div className="h-[100px] md:h-[120px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={donutData}
                            innerRadius="50%"
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
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#fff',
                              border: 'none',
                              borderRadius: '4px',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                              fontSize: '12px'
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>

                  {/* Stacked Bar Chart */}
                  <motion.div
                    variants={fadeInUp}
                    className="bg-[#F8FAFC] rounded-lg p-2 md:p-3 md:col-span-2"
                  >
                    <h3 className="text-xs md:text-sm text-[#103d68] mb-1">Procedures by Category</h3>
                    <div className="h-[100px] md:h-[120px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={stackedData}>
                          <XAxis 
                            dataKey="month" 
                            tick={{ fontSize: 10, fill: '#103d68' }}
                            axisLine={false}
                            tickLine={false}
                          />
                          <YAxis 
                            tick={{ fontSize: 10, fill: '#103d68' }}
                            width={30}
                            axisLine={false}
                            tickLine={false}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#fff',
                              border: 'none',
                              borderRadius: '4px',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                              fontSize: '12px'
                            }}
                          />
                          <Bar dataKey="preventive" stackId="a" fill="#103d68" />
                          <Bar dataKey="restorative" stackId="a" fill="#40C4FF" />
                          <Bar dataKey="cosmetic" stackId="a" fill="#E5F9FD" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        )}

        {/* Other tabs remain the same but with adjusted padding and spacing */}
        {activePage === 'practice' && (
          <div className="p-1 md:p-2">
            <h2 className="text-xs md:text-sm mb-1 text-white">Your Practice</h2>
            <div className="bg-white rounded-xl p-2 md:p-3">
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
          <div className="p-1 md:p-2">
            <h2 className="text-xs md:text-sm mb-1 text-white">Connect Your PMS</h2>
            <div className="bg-white rounded-xl p-2 md:p-3">
              <h3 className="text-xs md:text-sm font-medium text-[#103d68] mb-1">Available Integrations</h3>
              <div className="grid gap-1 md:gap-2">
                <button className="flex items-center justify-between p-1 md:p-2 border rounded-lg hover:bg-[#E5F9FD] transition-colors">
                  <span className="text-xs font-medium text-[#103d68]">Practice Fusion</span>
                  <span className="text-[10px] text-green-500">Connected</span>
                </button>
                <button className="flex items-center justify-between p-1 md:p-2 border rounded-lg hover:bg-[#E5F9FD] transition-colors">
                  <span className="text-xs font-medium text-[#103d68]">Epic Systems</span>
                  <span className="text-[10px] text-[#40C4FF]">Connect</span>
                </button>
                <button className="flex items-center justify-between p-1 md:p-2 border rounded-lg hover:bg-[#E5F9FD] transition-colors">
                  <span className="text-xs font-medium text-[#103d68]">Athenahealth</span>
                  <span className="text-[10px] text-[#40C4FF]">Connect</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activePage === 'reports' && (
          <div className="p-1 md:p-2">
            <h2 className="text-xs md:text-sm mb-1 text-white">Data Reports</h2>
            <div className="bg-white rounded-xl p-2 md:p-3">
              <h3 className="text-xs md:text-sm font-medium text-[#103d68] mb-1">Analytics Dashboard</h3>
              <div className="grid gap-1 md:gap-2">
                <div className="border rounded-lg p-1 md:p-2">
                  <h4 className="text-xs font-medium text-[#103d68] mb-1">Patient Demographics</h4>
                  <div className="h-12 md:h-24 bg-[#E5F9FD] rounded-lg flex items-center justify-center">
                    <span className="text-xs text-[#40C4FF]">Demographics Chart</span>
                  </div>
                </div>
                <div className="border rounded-lg p-1 md:p-2">
                  <h4 className="text-xs font-medium text-[#103d68] mb-1">Revenue Trends</h4>
                  <div className="h-12 md:h-24 bg-[#E5F9FD] rounded-lg flex items-center justify-center">
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