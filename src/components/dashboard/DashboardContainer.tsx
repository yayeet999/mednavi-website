'use client'
import React, { useState } from 'react';
import { Home, Grid, MapPin, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="w-10 h-10 md:w-16 md:h-16 bg-[#E5F9FD] rounded-xl flex items-center justify-center">
    {children}
  </div>
);

export const DashboardContainer = () => {
  const [activePage, setActivePage] = useState('home');

  return (
    <div className="flex h-full w-full">
      {/* Sidebar */}
      <div className="bg-[#E5F9FD] w-[40px] md:w-[50px] flex flex-col items-center pt-2 md:pt-4">
        {[
          { id: 'home', icon: <Home className="text-[#103d68]" size={18} /> },
          { id: 'practice', icon: <Grid className="text-[#103d68]" size={18} /> },
          { id: 'connect', icon: <MapPin className="text-[#103d68]" size={18} /> },
          { id: 'reports', icon: <BarChart2 className="text-[#103d68]" size={18} /> }
        ].map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActivePage(item.id)}
            className={`w-7 h-7 md:w-9 md:h-9 mb-2 md:mb-3 rounded-xl flex items-center justify-center cursor-pointer transition-colors
                       ${activePage === item.id ? 'bg-white shadow-md' : 'bg-transparent hover:bg-white/50'}`}
            aria-label={item.id}
          >
            {item.icon}
          </motion.button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-[#103d68] rounded-r-xl flex flex-col">
        <div className="text-right p-2 md:p-4">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-base md:text-xl text-white font-medium"
          >
            mednavi
          </motion.h1>
        </div>

        {activePage === 'home' && (
          <div className="flex-1 flex flex-col px-2 md:px-4 pb-1 md:pb-4">
            <div className="bg-white rounded-xl p-2 md:p-6 mb-1 md:mb-4 flex-1">
            </div>
          </div>
        )}

        {activePage === 'practice' && (
          <div className="p-2 md:p-4">
            <h2 className="text-sm md:text-lg mb-2 text-white">Your Practice</h2>
            <div className="bg-white rounded-xl p-3 md:p-4">
              <h3 className="text-xs md:text-base font-medium text-[#103d68] mb-2">Practice Overview</h3>
              <div className="grid gap-2 md:gap-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-xs md:text-sm text-[#103d68]">Practice Name</span>
                  <span className="text-xs md:text-sm text-[#40C4FF] font-medium">MedCenter Plus</span>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-xs md:text-sm text-[#103d68]">Location</span>
                  <span className="text-xs md:text-sm text-[#40C4FF] font-medium">San Francisco, CA</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs md:text-sm text-[#103d68]">Practitioners</span>
                  <span className="text-xs md:text-sm text-[#40C4FF] font-medium">12</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activePage === 'connect' && (
          <div className="p-2 md:p-4">
            <h2 className="text-sm md:text-lg mb-2 text-white">Connect Your PMS</h2>
            <div className="bg-white rounded-xl p-3 md:p-4">
              <h3 className="text-xs md:text-base font-medium text-[#103d68] mb-2">Available Integrations</h3>
              <div className="grid gap-2 md:gap-3">
                <button className="flex items-center justify-between p-2 md:p-3 border rounded-lg hover:bg-[#E5F9FD] transition-colors">
                  <span className="text-xs md:text-sm font-medium text-[#103d68]">Practice Fusion</span>
                  <span className="text-[10px] md:text-xs text-green-500">Connected</span>
                </button>
                <button className="flex items-center justify-between p-2 md:p-3 border rounded-lg hover:bg-[#E5F9FD] transition-colors">
                  <span className="text-xs md:text-sm font-medium text-[#103d68]">Epic Systems</span>
                  <span className="text-[10px] md:text-xs text-[#40C4FF]">Connect</span>
                </button>
                <button className="flex items-center justify-between p-2 md:p-3 border rounded-lg hover:bg-[#E5F9FD] transition-colors">
                  <span className="text-xs md:text-sm font-medium text-[#103d68]">Athenahealth</span>
                  <span className="text-[10px] md:text-xs text-[#40C4FF]">Connect</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activePage === 'reports' && (
          <div className="p-2 md:p-4">
            <h2 className="text-sm md:text-lg mb-2 text-white">Data Reports</h2>
            <div className="bg-white rounded-xl p-3 md:p-4">
              <h3 className="text-xs md:text-base font-medium text-[#103d68] mb-2">Analytics Dashboard</h3>
              <div className="grid gap-2 md:gap-4">
                <div className="border rounded-lg p-2 md:p-4">
                  <h4 className="text-xs md:text-sm font-medium text-[#103d68] mb-2">Patient Demographics</h4>
                  <div className="h-16 md:h-32 bg-[#E5F9FD] rounded-lg flex items-center justify-center">
                    <span className="text-xs md:text-sm text-[#40C4FF]">Demographics Chart</span>
                  </div>
                </div>
                <div className="border rounded-lg p-2 md:p-4">
                  <h4 className="text-xs md:text-sm font-medium text-[#103d68] mb-2">Revenue Trends</h4>
                  <div className="h-16 md:h-32 bg-[#E5F9FD] rounded-lg flex items-center justify-center">
                    <span className="text-xs md:text-sm text-[#40C4FF]">Revenue Chart</span>
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