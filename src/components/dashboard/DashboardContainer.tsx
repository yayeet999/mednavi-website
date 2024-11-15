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
      {/* Sidebar */}
      <div className="bg-white w-[60px] flex flex-col items-center py-5">
        <button
          onClick={() => showPage('home')}
          className={`w-10 h-10 mb-4 rounded-full flex items-center justify-center cursor-pointer transition-colors
                     ${activePage === 'home' ? 'bg-[#80deea]' : 'bg-[#e0f7fa] hover:bg-[#80deea]'}`}
        >
          <Home size={24} className="text-[#103d68]" />
        </button>
        <button
          onClick={() => showPage('practice')}
          className={`w-10 h-10 mb-4 rounded-full flex items-center justify-center cursor-pointer transition-colors
                     ${activePage === 'practice' ? 'bg-[#80deea]' : 'bg-[#e0f7fa] hover:bg-[#80deea]'}`}
        >
          <Grid size={24} className="text-[#103d68]" />
        </button>
        <button
          onClick={() => showPage('connect')}
          className={`w-10 h-10 mb-4 rounded-full flex items-center justify-center cursor-pointer transition-colors
                     ${activePage === 'connect' ? 'bg-[#80deea]' : 'bg-[#e0f7fa] hover:bg-[#80deea]'}`}
        >
          <MapPin size={24} className="text-[#103d68]" />
        </button>
        <button
          onClick={() => showPage('reports')}
          className={`w-10 h-10 mb-4 rounded-full flex items-center justify-center cursor-pointer transition-colors
                     ${activePage === 'reports' ? 'bg-[#80deea]' : 'bg-[#e0f7fa] hover:bg-[#80deea]'}`}
        >
          <Bot size={24} className="text-[#103d68]" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-[#103d68] p-5 text-white rounded-r-xl">
        {/* Header */}
        <div className="text-right mb-5">
          <h1 className="text-2xl">mednavi</h1>
        </div>

        {/* Content Pages */}
        {activePage === 'home' && (
          <div>
            {/* Intro Box */}
            <div className="bg-white text-[#103d68] p-5 rounded-xl text-center mb-5 text-sm">
              <p className="mb-2">
                We don't do data as a feature, we do <strong>data as a complete service.</strong>
              </p>
              <p className="mb-3">
                Bringing the same high-level tools used by <strong>Fortune 500 companies.</strong>
              </p>
              <div className="flex justify-center gap-2 text-lg">
                <span>✅</span>
                <span>✅</span>
              </div>
            </div>

            {/* Steps */}
            <div className="flex justify-around items-center my-5">
              <div className="text-center">
                <div className="w-8 h-8 bg-white text-[#103d68] rounded-full flex items-center justify-center font-bold mb-2 mx-auto">
                  1
                </div>
                <div className="w-10 h-10 mx-auto mb-2 bg-white rounded-full flex items-center justify-center">
                  <Grid size={24} className="text-[#103d68]" />
                </div>
                <p className="text-sm">Your Practice</p>
              </div>

              <div className="text-center">
                <div className="w-8 h-8 bg-white text-[#103d68] rounded-full flex items-center justify-center font-bold mb-2 mx-auto">
                  2
                </div>
                <div className="w-10 h-10 mx-auto mb-2 bg-white rounded-full flex items-center justify-center">
                  <MapPin size={24} className="text-[#103d68]" />
                </div>
                <p className="text-sm">Connect your PMS</p>
              </div>

              <div className="text-center">
                <div className="w-8 h-8 bg-white text-[#103d68] rounded-full flex items-center justify-center font-bold mb-2 mx-auto">
                  3
                </div>
                <div className="w-10 h-10 mx-auto mb-2 bg-white rounded-full flex items-center justify-center">
                  <Bot size={24} className="text-[#103d68]" />
                </div>
                <p className="text-sm">Data Reports</p>
              </div>
            </div>

            {/* Info Boxes */}
            <div className="flex gap-2 mt-5">
              <div className="flex-1 h-24 bg-white rounded-xl"></div>
              <div className="flex-1 h-24 bg-white rounded-xl"></div>
              <div className="flex-1 h-24 bg-white rounded-xl"></div>
            </div>
          </div>
        )}

        {activePage === 'practice' && (
          <div>
            <h2 className="text-xl mb-4">Your Practice</h2>
            <p>Practice management content goes here.</p>
          </div>
        )}

        {activePage === 'connect' && (
          <div>
            <h2 className="text-xl mb-4">Connect Your PMS</h2>
            <p>PMS connection interface goes here.</p>
          </div>
        )}

        {activePage === 'reports' && (
          <div>
            <h2 className="text-xl mb-4">Data Reports</h2>
            <p>Reports and analytics content goes here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardContainer;
