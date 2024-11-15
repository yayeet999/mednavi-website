'use client'
import React, { useState } from 'react';
import { Home, Grid, MapPin, BarChart2 } from 'lucide-react';

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="w-14 h-14 md:w-16 md:h-16 bg-[#E5F9FD] rounded-xl flex items-center justify-center">
    {children}
  </div>
);

const Checkmark = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="10" fill="#4CAF50"/>
    <path d="M8 12.4L5.6 10L4.4 11.2L8 14.8L16 6.8L14.8 5.6L8 12.4Z" fill="white"/>
  </svg>
);

export const DashboardContainer = () => {
  const [activePage, setActivePage] = useState('home');

  const showPage = (pageId: string) => {
    setActivePage(pageId);
  };

  return (
    <div className="flex h-full w-full">
      {/* Sidebar with light mint background */}
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
            aria-label={item.id}
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
              <div className="mb-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-[#103d68] text-sm md:text-base">
                    We don't do data as a feature, we do <strong>data as a complete service.</strong>
                  </span>
                  <Checkmark />
                </div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-[#103d68] text-sm md:text-base">
                    Bringing the same high-level tools used by <strong>Fortune 500 companies.</strong>
                  </span>
                  <Checkmark />
                </div>
                <p className="text-[#103d68] text-sm md:text-base">Easy as...</p>
              </div>
              
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
              <div className="bg-white rounded-xl h-16 md:h-20 p-4">
                <h3 className="text-[#103d68] text-sm md:text-base font-medium">Active Patients</h3>
                <p className="text-[#40C4FF] text-lg md:text-xl font-bold">2,547</p>
              </div>
              <div className="bg-white rounded-xl h-16 md:h-20 p-4">
                <h3 className="text-[#103d68] text-sm md:text-base font-medium">Monthly Revenue</h3>
                <p className="text-[#40C4FF] text-lg md:text-xl font-bold">$125.8K</p>
              </div>
              <div className="bg-white rounded-xl h-16 md:h-20 p-4">
                <h3 className="text-[#103d68] text-sm md:text-base font-medium">Growth Rate</h3>
                <p className="text-[#40C4FF] text-lg md:text-xl font-bold">+15.2%</p>
              </div>
            </div>
          </div>
        )}

        {activePage === 'practice' && (
          <div className="p-4">
            <h2 className="text-base md:text-lg mb-2 text-white">Your Practice</h2>
            <div className="bg-white rounded-xl p-4">
              <h3 className="text-[#103d68] text-base md:text-lg font-medium mb-3">Practice Overview</h3>
              <div className="grid gap-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-[#103d68]">Practice Name</span>
                  <span className="text-[#40C4FF] font-medium">MedCenter Plus</span>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-[#103d68]">Location</span>
                  <span className="text-[#40C4FF] font-medium">San Francisco, CA</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#103d68]">Practitioners</span>
                  <span className="text-[#40C4FF] font-medium">12</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activePage === 'connect' && (
          <div className="p-4">
            <h2 className="text-base md:text-lg mb-2 text-white">Connect Your PMS</h2>
            <div className="bg-white rounded-xl p-4">
              <h3 className="text-[#103d68] text-base md:text-lg font-medium mb-3">Available Integrations</h3>
              <div className="grid gap-3">
                <button className="flex items-center justify-between p-3 border rounded-lg hover:bg-[#E5F9FD] transition-colors">
                  <span className="text-[#103d68] font-medium">Practice Fusion</span>
                  <span className="text-xs text-green-500">Connected</span>
                </button>
                <button className="flex items-center justify-between p-3 border rounded-lg hover:bg-[#E5F9FD] transition-colors">
                  <span className="text-[#103d68] font-medium">Epic Systems</span>
                  <span className="text-xs text-[#40C4FF]">Connect</span>
                </button>
                <button className="flex items-center justify-between p-3 border rounded-lg hover:bg-[#E5F9FD] transition-colors">
                  <span className="text-[#103d68] font-medium">Athenahealth</span>
                  <span className="text-xs text-[#40C4FF]">Connect</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activePage === 'reports' && (
          <div className="p-4">
            <h2 className="text-base md:text-lg mb-2 text-white">Data Reports</h2>
            <div className="bg-white rounded-xl p-4">
              <h3 className="text-[#103d68] text-base md:text-lg font-medium mb-3">Analytics Dashboard</h3>
              <div className="grid gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="text-[#103d68] font-medium mb-2">Patient Demographics</h4>
                  <div className="h-32 bg-[#E5F9FD] rounded-lg flex items-center justify-center">
                    <span className="text-[#40C4FF]">Demographics Chart</span>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="text-[#103d68] font-medium mb-2">Revenue Trends</h4>
                  <div className="h-32 bg-[#E5F9FD] rounded-lg flex items-center justify-center">
                    <span className="text-[#40C4FF]">Revenue Chart</span>
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
