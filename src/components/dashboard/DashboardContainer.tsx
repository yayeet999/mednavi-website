'use client'
import React, { useState, useEffect } from 'react';
import { Home, Grid, MapPin, BarChart2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="w-12 h-12 md:w-16 md:h-16 bg-[#E5F9FD] rounded-xl flex items-center justify-center">
    {children}
  </div>
);

const Checkmark = () => (
  <motion.svg 
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.3, delay: 0.5 }}
    width="16" 
    height="16" 
    viewBox="0 0 20 20" 
    className="ml-2"
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
      <div className="bg-[#E5F9FD] w-[45px] md:w-[50px] flex flex-col items-center pt-3 md:pt-4">
        {[
          { id: 'home', icon: <Home className="text-[#103d68]" size={20} /> },
          { id: 'practice', icon: <Grid className="text-[#103d68]" size={20} /> },
          { id: 'connect', icon: <MapPin className="text-[#103d68]" size={20} /> },
          { id: 'reports', icon: <BarChart2 className="text-[#103d68]" size={20} /> }
        ].map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActivePage(item.id)}
            className={`w-8 h-8 md:w-9 md:h-9 mb-3 rounded-xl flex items-center justify-center cursor-pointer transition-colors
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
        <div className="text-right p-2 md:p-4">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-lg md:text-xl text-white font-medium"
          >
            mednavi
          </motion.h1>
        </div>

        {activePage === 'home' && (
          <div className="flex-1 flex flex-col px-3 md:px-4 pb-3 md:pb-4">
            {/* White Card */}
            <div className="bg-white rounded-xl p-3 md:p-6 mb-3 md:mb-4 flex-1">
              <motion.div
                variants={container}
                initial="hidden"
                animate={isVisible ? "show" : "hidden"}
                className="flex flex-col h-full"
              >
                {/* Text Section */}
                <div className="text-center mb-2 md:mb-4">
                  <motion.div variants={item} className="flex items-center justify-center mb-2">
                    <span className="text-[#103d68] text-sm md:text-base">
                      We don't do data as a feature, we do <strong>data as a complete service.</strong>
                    </span>
                    <Checkmark />
                  </motion.div>
                  <motion.div variants={item} className="flex items-center justify-center mb-2">
                    <span className="text-[#103d68] text-sm md:text-base">
                      Bringing the same high-level tools used by <strong>Fortune 500 companies.</strong>
                    </span>
                    <Checkmark />
                  </motion.div>
                  <motion.p 
                    variants={item} 
                    className="text-[#103d68] text-sm md:text-base opacity-80"
                  >
                    Easy as...
                  </motion.p>
                </div>

                {/* Steps Section */}
                <motion.div 
                  variants={container}
                  className="flex justify-between items-center px-2 md:px-4 mb-4 md:mb-6"
                >
                  {[
                    { num: 1, icon: <Home size={20} className="text-[#40C4FF]" />, label: "Your Practice" },
                    { num: 2, icon: <MapPin size={20} className="text-[#40C4FF]" />, label: "Connect your PMS" },
                    { num: 3, icon: <BarChart2 size={20} className="text-[#40C4FF]" />, label: "Data Reports" }
                  ].map((step, index) => (
                    <motion.div
                      key={index}
                      variants={item}
                      className="flex flex-col items-center"
                      custom={index}
                    >
                      <motion.div 
                        className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#103d68] text-white flex items-center justify-center text-xs md:text-sm font-medium mb-2"
                        whileHover={{ scale: 1.1 }}
                      >
                        {step.num}
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="transition-transform duration-200"
                      >
                        <IconBox>{step.icon}</IconBox>
                      </motion.div>
                      <p className="text-[#103d68] text-xs md:text-sm mt-1 font-medium">{step.label}</p>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Info Boxes */}
                <div className="grid grid-cols-3 gap-2 mt-auto">
                  {[
                    { title: "Active Patients", value: "2,547", trend: "+12.5%" },
                    { title: "Monthly Revenue", value: "$125.8K", trend: "+15.2%" },
                    { title: "Growth Rate", value: "+48.9%", trend: "+11.6%" }
                  ].map((box, index) => (
                    <motion.div
                      key={index}
                      variants={item}
                      className="bg-[#F8FAFC] rounded-xl p-2 md:p-3 flex flex-col justify-between hover:shadow-md transition-shadow duration-200"
                    >
                      <h3 className="text-[#103d68] text-xs md:text-sm font-medium mb-1">{box.title}</h3>
                      <div>
                        <p className="text-[#40C4FF] text-sm md:text-lg font-bold">{box.value}</p>
                        <p className="text-green-500 text-xs md:text-sm">{box.trend}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {activePage !== 'home' && (
          <div className="p-4">
            <h2 className="text-base md:text-lg mb-2 text-white capitalize">{activePage}</h2>
            <div className="bg-white rounded-xl p-4">
              <p className="text-[#103d68] text-sm md:text-base">
                Content for {activePage} goes here.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardContainer;
