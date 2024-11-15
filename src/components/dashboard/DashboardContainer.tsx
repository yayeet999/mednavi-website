'use client'
import React, { useState } from 'react';
import { Home, Grid, MapPin, Bot } from 'lucide-react';

export const DashboardContainer = () => {
  const [activePage, setActivePage] = useState('home');

  const showPage = (pageId: string) => {
    setActivePage(pageId);
  };

  return (
    <div className="flex h-full w-full">
      {/* Sidebar - Slimmer for both mobile and desktop */}
      <div className="bg-white w-[40px] md:w-[50px] flex flex-col items-center pt-2 md:pt-4">
        <button
          onClick={() => showPage('home')}
          className={`w-7 h-7 md:w-8 md:h-8 mb-3 rounded-full flex items-center justify-center cursor-pointer transition-colors
                     ${activePage === 'home' ? 'bg-[#80deea]' : 'bg-[#e0f7fa] hover:bg-[#80deea]'}`}
        >
          <Home size={16} className="text-[#103d68]" />
        </button>
        <button
          onClick={() => showPage('practice')}
          className={`w-7 h-7 md:w-8 md:h-8 mb-3 rounded-full flex items-center justify-center cursor-pointer transition-colors
                     ${activePage === 'practice' ? 'bg-[#80deea]' : 'bg-[#e0f7fa] hover:bg-[#80deea]'}`}
        >
          <Grid size={16} className="text-[#103d68]" />
        </button>
        <button
          onClick={() => showPage('connect')}
          className={`w-7 h-7 md:w-8 md:h-8 mb-3 rounded-full flex items-center justify-center cursor-pointer transition-colors
                     ${activePage === 'connect' ? 'bg-[#80deea]' : 'bg-[#e0f7fa] hover:bg-[#80deea]'}`}
        >
          <MapPin size={16} className="text-[#103d68]" />
        </button>
        <button
          onClick={() => showPage('reports')}
          className={`w-7 h-7 md:w-8 md:h-8 mb-3 rounded-full flex items-center justify-center cursor-pointer transition-colors
                     ${activePage === 'reports' ? 'bg-[#80deea]' : 'bg-[#e0f7fa] hover:bg-[#80deea]'}`}
        >
          <Bot size={16} className="text-[#103d68]" />
        </button>
      </div>

      {/* Main Content - Optimized spacing */}
      <div className="flex-1 bg-[#103d68] p-2 md:p-4 text-white rounded-r-xl">
        {/* Header - Reduced top margin */}
        <div className="text-right mb-2">
          <h1 className="text-lg md:text-xl">mednavi</h1>
        </div>

        {/* Content Pages */}
        {activePage === 'home' && (
          <div className="flex flex-col h-[calc(100%-40px)] justify-between">
            {/* Intro Box - More compact */}
            <div className="bg-white text-[#103d68] p-3 md:p-4 rounded-xl text-center mb-2">
              <p className="text-xs md:text-sm leading-tight mb-1">
                We don't do data as a feature, we do <strong>data as a complete service.</strong>
              </p>
              <p className="text-xs md:text-sm leading-tight mb-1">
                Bringing the same high-level tools used by <strong>Fortune 500 companies.</strong>
              </p>
              <div className="flex justify-center gap-1 text-sm">
                <span>✅</span>
                <span>✅</span>
              </div>
            </div>

            {/* Steps - More compact layout */}
            <div className="flex justify-around items-start my-2">
              {[
                { num: 1, icon: <Grid size={14} />, label: "Your Practice" },
                { num: 2, icon: <MapPin size={14} />, label: "Connect your PMS" },
                { num: 3, icon: <Bot size={14} />, label: "Data Reports" }
              ].map((step, index) => (
                <div key={index} className="text-center px-1">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-white text-[#103d68] rounded-full flex items-center justify-center font-bold text-xs mb-1 mx-auto">
                    {step.num}
                  </div>
                  <div className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-1 bg-white rounded-full flex items-center justify-center">
                    {step.icon}
                  </div>
                  <p className="text-[10px] md:text-xs">{step.label}</p>
                </div>
              ))}
            </div>

            {/* Info Boxes - Optimized height */}
            <div className="flex gap-1 mt-2">
              <div className="flex-1 h-12 md:h-16 bg-white rounded-lg"></div>
              <div className="flex-1 h-12 md:h-16 bg-white rounded-lg"></div>
              <div className="flex-1 h-12 md:h-16 bg-white rounded-lg"></div>
            </div>
          </div>
        )}

        {activePage === 'practice' && (
          <div className="p-2">
            <h2 className="text-base md:text-lg mb-2">Your Practice</h2>
            <p className="text-xs md:text-sm">Practice management content goes here.</p>
          </div>
        )}

        {activePage === 'connect' && (
          <div className="p-2">
            <h2 className="text-base md:text-lg mb-2">Connect Your PMS</h2>
            <p className="text-xs md:text-sm">PMS connection interface goes here.</p>
          </div>
        )}

        {activePage === 'reports' && (
          <div className="p-2">
            <h2 className="text-base md:text-lg mb-2">Data Reports</h2>
            <p className="text-xs md:text-sm">Reports and analytics content goes here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardContainer;
