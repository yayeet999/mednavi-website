'use client'
import React, { useState } from 'react';
import { Home, Grid, MapPin, BarChart2 } from 'lucide-react';

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="w-14 h-14 md:w-16 md:h-16 bg-[#E5F9FD] rounded-xl flex items-center justify-center">
    {children}
  </div>
);

export const DashboardContainer = () => {
  const [activePage, setActivePage] = useState('home');

  const showPage = (pageId: string) => {
    setActivePage(pageId);
  };

  return (
    <div className="flex h-full w-full">
      {/* Sidebar - Now with light mint background */}
      <div className="bg-[#E5F9FD] w-[45px] md:w-[50px] flex flex-col items-center pt-3 md:pt-4">
        {[
          { id: 'home', icon: <Home className="text-[#103d68]" size={20} /> },
          { id: 'practice', icon: <Grid className="text-[#103d68]" size={20} /> },
          { id: 'connect', icon: <MapPin className="text-[#103d68]" size={20} /> },
          { id: 'reports', icon: <BarChart2 className="text-[#103d68]" size={20} /> }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => showPage(item.id)}
            className={`w-8 h-8 md:w-9 md:h-9 mb-3 rounded-xl flex items-center justify-center cursor-pointer transition-colors
                       ${activePage === item.id ? 'bg-white shadow-md' : 'bg-transparent hover:bg-white/50'}`}
          >
            {item.icon}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-[#103d68] rounded-r-xl flex flex-col">
        {/* Header */}
        <div className="text-right p-3 md:p-4">
          <h1 className="text-lg md:text-xl text-white">mednavi</h1>
        </div>

        {/* Content Pages */}
        {activePage === 'home' && (
          <div className="flex flex-col h-[calc(100%-48px)] px-3 md:px-4 pb-3 md:pb-4">
            {/* White Card */}
            <div className="bg-white rounded-xl p-4 mb-4 flex flex-col items-center">
              <p className="text-[#103d68] text-sm md:text-base text-center mb-2">
                We don't do data as a feature, we do <strong>data as a complete service.</strong>
              </p>
              <p className="text-[#103d68] text-sm md:text-base text-center mb-2">
                Bringing the same high-level tools used by <strong>Fortune 500 companies.</strong>
              </p>
              <p className="text-[#103d68] text-sm md:text-base text-center mb-2">Easy as...</p>
              
              {/* Steps Row */}
              <div className="flex justify-between w-full mt-2">
                {[
                  { num: 1, icon: <Home size={24} className="text-[#40C4FF]" />, label: "Your Practice" },
                  { num: 2, icon: <MapPin size={24} className="text-[#40C4FF]" />, label: "Connect your PMS" },
                  { num: 3, icon: <BarChart2 size={24} className="text-[#40C4FF]" />, label: "Data Reports" }
                ].map((step, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 rounded-full bg-[#103d68] text-white flex items-center justify-center text-sm font-medium">
                        {step.num}
                      </div>
                    </div>
                    <IconBox>{step.icon}</IconBox>
                    <p className="text-[#103d68] text-xs md:text-sm mt-2 font-medium">{step.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Info Boxes */}
            <div className="grid grid-cols-3 gap-2 mt-auto">
              <div className="bg-white rounded-xl h-16 md:h-20"></div>
              <div className="bg-white rounded-xl h-16 md:h-20"></div>
              <div className="bg-white rounded-xl h-16 md:h-20"></div>
            </div>
          </div>
        )}

        {activePage === 'practice' && (
          <div className="p-4">
            <h2 className="text-base md:text-lg mb-2 text-white">Your Practice</h2>
            <p className="text-xs md:text-sm text-white">Practice management content goes here.</p>
          </div>
        )}

        {activePage === 'connect' && (
          <div className="p-4">
            <h2 className="text-base md:text-lg mb-2 text-white">Connect Your PMS</h2>
            <p className="text-xs md:text-sm text-white">PMS connection interface goes here.</p>
          </div>
        )}

        {activePage === 'reports' && (
          <div className="p-4">
            <h2 className="text-base md:text-lg mb-2 text-white">Data Reports</h2>
            <p className="text-xs md:text-sm text-white">Reports and analytics content goes here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardContainer;
