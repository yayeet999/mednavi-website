'use client'
import React, { useState } from 'react';
import { Home, Grid, MapPin, Bot } from 'lucide-react';

export const DashboardContainer = () => {
  const [activePage, setActivePage] = useState('home');

  const showPage = (pageId: string) => {
    setActivePage(pageId);
  };

  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* Sidebar - Adjusted for better mobile display */}
      <div className="bg-white w-[50px] md:w-[60px] flex flex-col items-center py-3 md:py-5">
        <button
          onClick={() => showPage('home')}
          className={`w-8 h-8 md:w-10 md:h-10 mb-3 md:mb-4 rounded-full flex items-center justify-center cursor-pointer transition-colors
                     ${activePage === 'home' ? 'bg-[#80deea]' : 'bg-[#e0f7fa] hover:bg-[#80deea]'}`}
        >
          <Home size={20} className="text-[#103d68]" />
        </button>
        <button
          onClick={() => showPage('practice')}
          className={`w-8 h-8 md:w-10 md:h-10 mb-3 md:mb-4 rounded-full flex items-center justify-center cursor-pointer transition-colors
                     ${activePage === 'practice' ? 'bg-[#80deea]' : 'bg-[#e0f7fa] hover:bg-[#80deea]'}`}
        >
          <Grid size={20} className="text-[#103d68]" />
        </button>
        <button
          onClick={() => showPage('connect')}
          className={`w-8 h-8 md:w-10 md:h-10 mb-3 md:mb-4 rounded-full flex items-center justify-center cursor-pointer transition-colors
                     ${activePage === 'connect' ? 'bg-[#80deea]' : 'bg-[#e0f7fa] hover:bg-[#80deea]'}`}
        >
          <MapPin size={20} className="text-[#103d68]" />
        </button>
        <button
          onClick={() => showPage('reports')}
          className={`w-8 h-8 md:w-10 md:h-10 mb-3 md:mb-4 rounded-full flex items-center justify-center cursor-pointer transition-colors
                     ${activePage === 'reports' ? 'bg-[#80deea]' : 'bg-[#e0f7fa] hover:bg-[#80deea]'}`}
        >
          <Bot size={20} className="text-[#103d68]" />
        </button>
      </div>

      {/* Main Content - Improved responsiveness */}
      <div className="flex-1 bg-[#103d68] p-3 md:p-5 text-white rounded-r-xl overflow-y-auto">
        {/* Header */}
        <div className="text-right mb-3 md:mb-5">
          <h1 className="text-xl md:text-2xl">mednavi</h1>
        </div>

        {/* Content Pages */}
        {activePage === 'home' && (
          <div className="h-full flex flex-col">
            {/* Intro Box */}
            <div className="bg-white text-[#103d68] p-4 md:p-5 rounded-xl text-center mb-4 md:mb-5">
              <p className="text-xs md:text-sm mb-2">
                We don't do data as a feature, we do <strong>data as a complete service.</strong>
              </p>
              <p className="text-xs md:text-sm mb-3">
                Bringing the same high-level tools used by <strong>Fortune 500 companies.</strong>
              </p>
              <div className="flex justify-center gap-2 text-base md:text-lg">
                <span>✅</span>
                <span>✅</span>
              </div>
            </div>

            {/* Steps - Improved spacing and responsiveness */}
            <div className="flex justify-around items-center my-4 md:my-5">
              <div className="text-center">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-white text-[#103d68] rounded-full flex items-center justify-center font-bold text-sm md:text-base mb-2 mx-auto">
                  1
                </div>
                <div className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 bg-white rounded-full flex items-center justify-center">
                  <Grid size={16} className="text-[#103d68] md:w-6 md:h-6" />
                </div>
                <p className="text-xs md:text-sm">Your Practice</p>
              </div>

              <div className="text-center">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-white text-[#103d68] rounded-full flex items-center justify-center font-bold text-sm md:text-base mb-2 mx-auto">
                  2
                </div>
                <div className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 bg-white rounded-full flex items-center justify-center">
                  <MapPin size={16} className="text-[#103d68] md:w-6 md:h-6" />
                </div>
                <p className="text-xs md:text-sm">Connect your PMS</p>
              </div>

              <div className="text-center">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-white text-[#103d68] rounded-full flex items-center justify-center font-bold text-sm md:text-base mb-2 mx-auto">
                  3
                </div>
                <div className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 bg-white rounded-full flex items-center justify-center">
                  <Bot size={16} className="text-[#103d68] md:w-6 md:h-6" />
                </div>
                <p className="text-xs md:text-sm">Data Reports</p>
              </div>
            </div>

            {/* Info Boxes - Adjusted for better spacing */}
            <div className="flex gap-2 mt-auto">
              <div className="flex-1 h-16 md:h-24 bg-white rounded-xl"></div>
              <div className="flex-1 h-16 md:h-24 bg-white rounded-xl"></div>
              <div className="flex-1 h-16 md:h-24 bg-white rounded-xl"></div>
            </div>
          </div>
        )}

        {activePage === 'practice' && (
          <div className="p-4">
            <h2 className="text-lg md:text-xl mb-4">Your Practice</h2>
            <p className="text-sm md:text-base">Practice management content goes here.</p>
          </div>
        )}

        {activePage === 'connect' && (
          <div className="p-4">
            <h2 className="text-lg md:text-xl mb-4">Connect Your PMS</h2>
            <p className="text-sm md:text-base">PMS connection interface goes here.</p>
          </div>
        )}

        {activePage === 'reports' && (
          <div className="p-4">
            <h2 className="text-lg md:text-xl mb-4">Data Reports</h2>
            <p className="text-sm md:text-base">Reports and analytics content goes here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardContainer;
