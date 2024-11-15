'use client'
import React from 'react';

export const DashboardContainer = () => {
  const [activePage, setActivePage] = React.useState('home');

  return (
    <div className="dashboard w-full h-full bg-white rounded-xl">
      {/* Convert your HTML/CSS to React/Tailwind here */}
      <div className="flex h-full">
        <div className="sidebar bg-white w-[60px] flex flex-col items-center py-5">
          {/* Icons */}
        </div>
        <div className="main-content flex-1 bg-[#103d68] p-5 text-white">
          {/* Content */}
        </div>
      </div>
    </div>
  );
};
