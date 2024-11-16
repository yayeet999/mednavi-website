'use client';
import React, { useState, useEffect } from 'react';
import { Grid } from 'lucide-react';
import { motion } from 'framer-motion';
import Number1Icon from 'src/components/dashboard/number1 icon.svg';
import Number2Icon from 'src/components/dashboard/number2 icon.svg';
import Number3Icon from 'src/components/dashboard/number3 icon.svg';

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
    <circle cx="10" cy="10" r="10" fill="#4CAF50" />
    <path d="M8 12.4L5.6 10L4.4 11.2L8 14.8L16 6.8L14.8 5.6L8 12.4Z" fill="white" />
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
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex h-full w-full">
      {/* Sidebar */}
      <div className="bg-[#E5F9FD] w-[40px] md:w-[50px] flex flex-col items-center pt-2 md:pt-4">
        {[
          { id: 'home', icon: <Number1Icon className="w-7 h-7 md:w-9 md:h-9" /> },
          { id: 'practice', icon: <Grid className="text-[#103d68]" size={18} /> },
          { id: 'connect', icon: <Number2Icon className="w-7 h-7 md:w-9 md:h-9" /> },
          { id: 'reports', icon: <Number3Icon className="w-7 h-7 md:w-9 md:h-9" /> },
        ].map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActivePage(item.id)}
            className={`w-7 h-7 md:w-9 md:h-9 mb-2 md:mb-3 rounded-xl flex items-center justify-center cursor-pointer transition-colors ${
              activePage === item.id ? 'bg-white shadow-md' : 'bg-transparent hover:bg-white/50'
            }`}
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
              <motion.div
                variants={container}
                initial="hidden"
                animate={isVisible ? 'show' : 'hidden'}
                className="flex flex-col h-full"
              >
                {/* Text Section */}
                <div className="text-center mb-2 md:mb-4">
                  <motion.div variants={item} className="flex items-center justify-center mb-2 md:mb-2">
                    <span className="text-xs md:text-base text-[#103d68]">
                      We don't do data as a feature, we do <strong>data as a complete service.</strong>
                    </span>
                    <Checkmark />
                  </motion.div>
                  <motion.div variants={item} className="flex items-center justify-center mb-2 md:mb-2">
                    <span className="text-xs md:text-base text-[#103d68]">
                      Bringing the same high-level tools used by <strong>Fortune 500 companies.</strong>
                    </span>
                    <Checkmark />
                  </motion.div>
                  <motion.p
                    variants={item}
                    className="text-xs md:text-base text-[#103d68] opacity-80 my-2 md:my-0"
                  >
                    Easy as...
                  </motion.p>
                </div>

                {/* Steps Section */}
                <motion.div
                  variants={container}
                  className="flex justify-between items-center px-1 md:px-4 mb-2 md:mb-6 mt-3 md:mt-0"
                >
                  {[
                    { num: 1, icon: <Number1Icon className="w-10 h-10 md:w-16 md:h-16" />, label: 'Your Practice' },
                    { num: 2, icon: <Number2Icon className="w-10 h-10 md:w-16 md:h-16" />, label: 'Connect your PMS' },
                    { num: 3, icon: <Number3Icon className="w-10 h-10 md:w-16 md:h-16" />, label: 'Data Reports' },
                  ].map((step, index) => (
                    <motion.div key={index} variants={item} className="flex flex-col items-center">
                      <motion.div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-[#103d68] text-white flex items-center justify-center text-[10px] md:text-sm font-medium mb-1.5 md:mb-2">
                        {step.num}
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} className="transition-transform duration-200">
                        {step.icon}
                      </motion.div>
                      <p className="text-[10px] md:text-sm mt-1.5 md:mt-1 font-medium text-[#103d68]">{step.label}</p>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Info Boxes */}
                <div className="grid grid-cols-3 gap-1 md:gap-2 mt-auto">
                  {[
                    { title: 'Active Patients', value: '2,547', trend: '+12.5%' },
                    { title: 'Monthly Revenue', value: '$125.8K', trend: '+15.2%' },
                    { title: 'Growth Rate', value: '+48.9%', trend: '+11.6%' },
                  ].map((box, index) => (
                    <motion.div
                      key={index}
                      variants={item}
                      className="bg-[#F8FAFC] rounded-xl p-2.5 md:p-3 flex flex-col justify-between hover:shadow-md transition-shadow duration-200"
                    >
                      <h3 className="text-[10px] md:text-sm font-medium text-[#103d68]">{box.title}</h3>
                      <div>
                        <p className="text-xs md:text-lg font-bold text-[#40C4FF]">{box.value}</p>
                        <p className="text-[10px] md:text-sm text-green-500">{box.trend}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* Other Active Pages */}
        {activePage === 'practice' && (
          <div className="p-2 md:p-4">
            <h2 className="text-sm md:text-lg mb-2 text-white">Your Practice</h2>
            {/* Content here */}
          </div>
        )}
        {activePage === 'connect' && (
          <div className="p-2 md:p-4">
            <h2 className="text-sm md:text-lg mb-2 text-white">Connect Your PMS</h2>
            {/* Content here */}
          </div>
        )}
        {activePage === 'reports' && (
          <div className="p-2 md:p-4">
            <h2 className="text-sm md:text-lg mb-2 text-white">Data Reports</h2>
            {/* Content here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardContainer;
