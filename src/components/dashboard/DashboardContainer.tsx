'use client'
import React, { useState, useEffect } from 'react';
import { Home, Grid, MapPin, BarChart2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="w-8 h-8 md:w-14 md:h-14 bg-[#E5F9FD] rounded-lg flex items-center justify-center">
    {children}
  </div>
);

const Checkmark = () => (
  <motion.svg 
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.3, delay: 0.5 }}
    width="14" 
    height="14" 
    viewBox="0 0 20 20" 
    className="ml-1.5"
  >
    <circle cx="10" cy="10" r="10" fill="#4CAF50"/>
    <path d="M8 12.4L5.6 10L4.4 11.2L8 14.8L16 6.8L14.8 5.6L8 12.4Z" fill="white"/>
  </motion.svg>
);

export const DashboardContainer = () => {
  const [activePage, setActivePage] = useState('home');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex h-full w-full">
      {/* Sidebar */}
      <div className="bg-[#DCFAFD] w-[35px] md:w-[45px] flex flex-col items-center pt-2 md:pt-4">
        {[
          { id: 'home', icon: <Home className="text-[#103d68]" size={16} /> },
          { id: 'practice', icon: <Grid className="text-[#103d68]" size={16} /> },
          { id: 'connect', icon: <MapPin className="text-[#103d68]" size={16} /> },
          { id: 'reports', icon: <BarChart2 className="text-[#103d68]" size={16} /> }
        ].map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActivePage(item.id)}
            className={`w-6 h-6 md:w-8 md:h-8 mb-2 md:mb-3 rounded-lg flex items-center justify-center cursor-pointer transition-colors
                       ${activePage === item.id ? 'bg-white shadow-md' : 'bg-transparent hover:bg-white/50'}`}
            aria-label={item.id}
          >
            {item.icon}
          </motion.button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-[#103d68] rounded-r-xl flex flex-col">
        {/* Header */}
        <div className="h-[32px] md:h-[40px] text-right p-1.5 md:p-3">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-sm md:text-lg text-white font-medium"
          >
            mednavi
          </motion.h1>
        </div>

        {activePage === 'home' && (
          <div className="flex flex-col px-2 md:px-4 pb-2 md:pb-4">
            {/* Top Feature Box - Fixed height for mobile and desktop */}
            <div className="bg-white rounded-xl p-2 md:p-4 shadow-[0_2px_8px_rgba(0,0,0,0.1)] h-[235px] md:h-[300px] mb-2 md:mb-4">
              <motion.div
                variants={container}
                initial="hidden"
                animate={isVisible ? "show" : "hidden"}
                className="flex flex-col h-full"
              >
                {/* Text Section */}
                <div className="text-center mb-2 md:mb-4">
                  <motion.div variants={item} className="flex items-center justify-center mb-1 md:mb-2">
                    <span className="text-[10px] md:text-sm text-[#103d68]">
                      We don't do data as a feature, we do <strong>data as a complete service.</strong>
                    </span>
                    <Checkmark />
                  </motion.div>
                  <motion.div variants={item} className="flex items-center justify-center mb-1 md:mb-2">
                    <span className="text-[10px] md:text-sm text-[#103d68]">
                      Bringing the same high-level tools used by <strong>Fortune 500 companies.</strong>
                    </span>
                    <Checkmark />
                  </motion.div>
                  <motion.p 
                    variants={item} 
                    className="text-[10px] md:text-sm text-[#103d68] opacity-80"
                  >
                    Easy as...
                  </motion.p>
                </div>

                {/* Steps Section */}
                <motion.div 
                  variants={container}
                  className="flex justify-between items-center px-1 md:px-4 mt-auto"
                >
                  {[
                    { num: 1, icon: <Home size={14} className="text-[#40C4FF]" />, label: "Your Practice" },
                    { num: 2, icon: <MapPin size={14} className="text-[#40C4FF]" />, label: "Connect your PMS" },
                    { num: 3, icon: <BarChart2 size={14} className="text-[#40C4FF]" />, label: "Data Reports" }
                  ].map((step, index) => (
                    <motion.div
                      key={index}
                      variants={item}
                      className="flex flex-col items-center"
                    >
                      <motion.div 
                        className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#103d68] text-white flex items-center justify-center text-[10px] md:text-xs font-medium mb-1 md:mb-2"
                      >
                        {step.num}
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="transition-transform duration-200"
                      >
                        <IconBox>{step.icon}</IconBox>
                      </motion.div>
                      <p className="text-[9px] md:text-xs mt-1 font-medium text-[#103d68]">{step.label}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>

            {/* Metrics Row - Fixed height for mobile and desktop */}
            <div className="grid grid-cols-3 gap-2 md:gap-3 h-[90px] md:h-[120px]">
              <motion.div variants={item} 
                         className="bg-white rounded-xl p-2 md:p-3 shadow-[0_2px_8px_rgba(0,0,0,0.1)] flex flex-col justify-between">
                <h3 className="text-[9px] md:text-sm font-medium text-[#103d68]">Active Patients</h3>
                <div>
                  <p className="text-xs md:text-lg font-bold text-[#40C4FF]">2,547</p>
                  <p className="text-[8px] md:text-xs text-green-500">+12.5%</p>
                </div>
              </motion.div>

              <motion.div variants={item} 
                         className="bg-white rounded-xl p-2 md:p-3 shadow-[0_2px_8px_rgba(0,0,0,0.1)] flex flex-col justify-between">
                <h3 className="text-[9px] md:text-sm font-medium text-[#103d68]">Monthly Revenue</h3>
                <div>
                  <p className="text-xs md:text-lg font-bold text-[#40C4FF]">$125.8K</p>
                  <p className="text-[8px] md:text-xs text-green-500">+15.2%</p>
                </div>
              </motion.div>

              <motion.div variants={item} 
                         className="bg-white rounded-xl p-2 md:p-3 shadow-[0_2px_8px_rgba(0,0,0,0.1)] flex flex-col justify-between">
                <h3 className="text-[9px] md:text-sm font-medium text-[#103d68]">Growth Rate</h3>
                <div>
                  <p className="text-xs md:text-lg font-bold text-[#40C4FF]">+48.9%</p>
                  <p className="text-[8px] md:text-xs text-green-500">+11.6%</p>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* Other pages content - Same as before */}
        {activePage === 'practice' && (
          <div className="p-2 md:p-4">
            <h2 className="text-xs md:text-base mb-2 text-white">Your Practice</h2>
            <div className="bg-white rounded-xl p-2 md:p-4 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
              <h3 className="text-[10px] md:text-sm font-medium text-[#103d68] mb-2">Practice Overview</h3>
              <div className="grid gap-2 md:gap-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-[9px] md:text-sm text-[#103d68]">Practice Name</span>
                  <span className="text-[9px] md:text-sm text-[#40C4FF] font-medium">MedCenter Plus</span>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-[9px] md:text-sm text-[#103d68]">Location</span>
                  <span className="text-[9px] md:text-sm text-[#40C4FF] font-medium">San Francisco, CA</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] md:text-sm text-[#103d68]">Practitioners</span>
                  <span className="text-[9px] md:text-sm text-[#40C4FF] font-medium">12</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activePage === 'connect' && (
          <div className="p-2 md:p-4">
            <h2 className="text-xs md:text-base mb-2 text-white">Connect Your PMS</h2>
            <div className="bg-white rounded-xl p-2 md:p-4 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
              <h3 className="text-[10px] md:text-sm font-medium text-[#103d68] mb-2">Available Integrations</h3>
              <div className="grid gap-2 md:gap-3">
                <button className="flex items-center justify-between p-2 md:p-3 border rounded-lg hover:bg-[#E5F9FD] transition-colors">
                  <span className="text-[9px] md:text-sm font-medium text-[#103d68]">Practice Fusion</span>
                  <span className="text-[8px] md:text-xs text-green-500">Connected</span>
                </button>
                <button className="flex items-center justify-between p-2 md:p-3 border rounded-lg hover:bg-[#E5F9FD] transition-colors">
                  <span className="text-[9px] md:text-sm font-medium text-[#103d68]">Epic Systems</span>
                  <span className="text-[8px] md:text-xs text-[#40C4FF]">Connect</span>
                </button>
                <button className="flex items-center justify-between p-2 md:p-3 border rounded-lg hover:bg-[#E5F9FD] transition-colors">
                  <span className="text-[9px] md:text-sm font-medium text-[#103d68]">Athenahealth</span>
                  <span className="text-[8px] md:text-xs text-[#40C4FF]">Connect</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activePage === 'reports' && (
          <div className="p-2 md:p-4">
            <h2 className="text-xs md:text-base mb-2 text-white">Data Reports</h2>
            <div className="bg-white rounded-xl p-2 md:p-4 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
              <h3 className="text-[10px] md:text-sm font-medium text-[#103d68] mb-2">Analytics Dashboard</h3>
              <div className="grid gap-2 md:gap-4">
                <div className="border rounded-lg p-2 md:p-4">
                  <h4 className="text-[9px] md:text-sm font-medium text-[#103d68] mb-2">Patient Demographics</h4>
                  <div className="h-14 md:h-32 bg-[#E5F9FD] rounded-lg flex items-center justify-center">
                    <span className="text-[9px] md:text-sm text-[#40C4FF]">Demographics Chart</span>
                  </div>
                </div>
                <div className="border rounded-lg p-2 md:p-4">
                 <h4 className="text-[9px] md:text-sm font-medium text-[#103d68] mb-2">Revenue Trends</h4>
                 <div className="h-14 md:h-32 bg-[#E5F9FD] rounded-lg flex items-center justify-center">
                   <span className="text-[9px] md:text-sm text-[#40C4FF]">Revenue Chart</span>
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
