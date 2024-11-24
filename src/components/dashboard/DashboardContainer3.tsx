'use client';

import React, { useState } from 'react';
import { Home, Map, BarChart2, Braces, Users } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (window.innerWidth >= 768) {  // Desktop only
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      setPosition({
        x: rect.left + rect.width / 2,
        y: rect.top - 10
      });
      setShow(true);
    }
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div
          className="absolute z-50 transform -translate-x-1/2 -translate-y-full bg-white 
                     rounded-lg shadow-lg border border-gray-100 p-2 min-w-[120px] whitespace-nowrap"
          style={{
            left: position.x,
            top: position.y - 5,
            opacity: show ? 1 : 0,
            transition: 'opacity 0.2s ease-in-out'
          }}
        >
          {content}
          <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 transform 
                        w-3 h-3 bg-white rotate-45 border-r border-b border-gray-100" />
        </div>
      )}
    </div>
  );
};

const ProgressBar: React.FC<{
  value: number;
  max: number;
  color?: string;
  showTooltip?: boolean;
}> = ({ value, max, color = '#3B82F6', showTooltip = false }) => {
  const percentage = (value / max) * 100;
  const tooltipContent = (
    <div className="text-xs">
      <div className="font-medium">{value.toLocaleString()}</div>
      <div className="text-gray-500">{percentage.toFixed(1)}%</div>
    </div>
  );

  const bar = (
    <div className="w-full h-2 md:h-3 bg-gray-100 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{
          width: `${percentage}%`,
          backgroundColor: color
        }}
      />
    </div>
  );

  return showTooltip ? (
    <Tooltip content={tooltipContent}>{bar}</Tooltip>
  ) : bar;
};

const ChartTooltip: React.FC<{
  value: number;
  label: string;
  color: string;
}> = ({ value, label, color }) => (
  <div className="bg-white p-1.5 rounded shadow-lg border border-gray-100 text-xs">
    <div className="font-medium" style={{ color }}>{label}</div>
    <div className="text-gray-600">${value.toLocaleString()}</div>
  </div>
);

// Sample data
const trendData = [
  { month: 'Jan', practice: 75.2, regional: 68.4 },
  { month: 'Feb', practice: 82.1, regional: 71.2 },
  { month: 'Mar', practice: 79.8, regional: 73.5 },
  { month: 'Apr', practice: 88.4, regional: 75.8 },
  { month: 'May', practice: 94.4, regional: 79.4 }
];

const zipcodeData = {
  '60601': {
    avgRevenue: '$892.5k',
    patientValue: '$534',
    insuranceMix: '65% PPO, 25% FFS, 10% Other',
    growth: '+8.2%',
    position: { top: '20%', left: '30%' }
  },
  '60602': {
    avgRevenue: '$945.2k',
    patientValue: '$567',
    insuranceMix: '70% PPO, 20% FFS, 10% Other',
    growth: '+11.5%',
    position: { top: '35%', left: '45%' }
  },
  '60603': {
    avgRevenue: '$878.9k',
    patientValue: '$512',
    insuranceMix: '60% PPO, 30% FFS, 10% Other',
    growth: '+6.8%',
    position: { top: '50%', left: '35%' }
  }
};

const DashboardContainer3: React.FC = () => {
  const [activePage, setActivePage] = useState('regional');
  const [selectedZipcode, setSelectedZipcode] = useState<string | null>(null);

  const RegionalContent = () => (
    <div className="flex flex-col h-full space-y-2 md:space-y-3">
      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
        {/* Revenue Container */}
        <div className="bg-white rounded-lg p-2 md:p-4 shadow-sm">
          <h3 className="text-[10px] md:text-sm text-gray-700 font-medium mb-1">
            Average Annual Revenue
          </h3>
          <div className="h-px bg-gray-200 mb-2" />
          <div className="space-y-4">
            <div>
              <div className="text-[9px] md:text-xs text-gray-600 mb-1">Regional Benchmark</div>
              <div className="flex items-center gap-2">
                <ProgressBar value={877.2} max={1000} color="#FF9F1C" showTooltip />
                <div className="flex items-center gap-1 text-[9px] md:text-xs">
                  <span className="font-medium">877.2</span>
                  <span className="text-green-500">+3.8%</span>
                </div>
              </div>
            </div>
            <div>
              <div className="text-[9px] md:text-xs text-gray-600 mb-1">Your Practice</div>
              <div className="flex items-center gap-2">
                <ProgressBar value={923.3} max={1000} color="#3B82F6" showTooltip />
                <div className="flex items-center gap-1 text-[9px] md:text-xs">
                  <span className="font-medium">923.3</span>
                  <span className="text-green-500">+7.2%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Patient Value Container */}
        <div className="bg-white rounded-lg p-2 md:p-4 shadow-sm">
          <h3 className="text-[10px] md:text-sm text-gray-700 font-medium mb-1">
            Average Value Per Patient
          </h3>
          <div className="h-px bg-gray-200 mb-2" />
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[9px] md:text-xs text-gray-600">Regional Benchmark</span>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-green-500" />
                <div className="flex items-center gap-1 text-[9px] md:text-xs">
                  <span className="font-medium">$477</span>
                  <span className="text-green-500">+4.2%</span>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[9px] md:text-xs text-gray-600">Your Practice</span>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                <div className="flex items-center gap-1 text-[9px] md:text-xs">
                  <span className="font-medium">$623</span>
                  <span className="text-green-500">+8.5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Procedures Container */}
        <div className="bg-white rounded-lg p-2 md:p-4 shadow-sm">
          <h3 className="text-[10px] md:text-sm text-gray-700 font-medium mb-1">
            Top Procedure Types
          </h3>
          <div className="h-px bg-gray-200 mb-2" />
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Braces className="w-4 h-4 text-gray-600 mr-1" />
              <span className="text-[9px] md:text-xs text-gray-600">Aligners:</span>
            </div>
            <div className="flex-1 h-[30px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <Line 
                    type="monotone" 
                    dataKey="practice" 
                    stroke="#22C55E" 
                    strokeWidth={2} 
                    dot={false} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="regional" 
                    stroke="#3B82F6" 
                    strokeWidth={2} 
                    dot={false} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[9px] md:text-xs text-green-500 font-medium">$94.4k</span>
              <div className="h-px w-8 bg-gray-200 my-1" />
              <span className="text-[9px] md:text-xs text-blue-600 font-medium">$79.4k</span>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="flex flex-col md:flex-row gap-2 md:gap-4 flex-1">
        {/* Map Container */}
        <div className="bg-white rounded-lg p-2 md:p-4 shadow-sm w-full md:w-3/4 h-[200px] md:h-auto">
          <h3 className="text-[10px] md:text-sm text-gray-700 font-medium mb-2">
            Regional Analysis
          </h3>
          <div className="relative h-[calc(100%-24px)] w-full bg-gray-50 rounded overflow-hidden">
            {/* Map Background Pattern */}
            <div className="absolute inset-0">
              <div 
                className="w-full h-full opacity-10"
                style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, gray 1px, transparent 0)',
                  backgroundSize: '20px 20px'
                }}
              />
            </div>
            
            {/* Interactive Zipcodes */}
            {Object.entries(zipcodeData).map(([zipcode, data]) => (
              <Tooltip
                key={zipcode}
                content={
                  <div className="p-1">
                    <div className="font-medium mb-1">ZIP {zipcode}</div>
                    <div className="space-y-1 text-[10px]">
                      <div className="flex justify-between gap-4">
                        <span className="text-gray-500">Revenue:</span>
                        <span>{data.avgRevenue}</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-gray-500">Patient Value:</span>
                        <span>{data.patientValue}</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-gray-500">Growth:</span>
                        <span className="text-green-500">{data.growth}</span>
                      </div>
                    </div>
                  </div>
                }
              >
                <div
                  className={`absolute cursor-pointer transition-all duration-300 ${
                    selectedZipcode === zipcode
                      ? 'border-2 border-blue-500 bg-blue-50'
                      : 'border border-gray-400 hover:border-blue-400 hover:bg-blue-50/50'
                  } rounded p-1 md:p-2`}
                  style={data.position}
                  onClick={() => setSelectedZipcode(zipcode)}
                >
                  <span className="text-[8px] md:text-xs font-medium text-gray-700">
                    {zipcode}
                  </span>
                </div>
              </Tooltip>
            ))}
          </div>
        </div>

        {/* Analysis Panel */}
        <div className="bg-white rounded-lg p-2 md:p-4 shadow-sm w-full md:w-1/4 h-[150px] md:h-auto">
          <h3 className="text-[10px] md:text-sm text-gray-700 font-medium mb-2">
            Regional Insights
          </h3>
          {selectedZipcode ? (
            <div className="space-y-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <div className="text-[10px] md:text-xs text-blue-800 font-medium mb-2">
                  ZIP {selectedZipcode} Analysis
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] md:text-xs text-gray-600">Revenue</span>
                    <span className="text-[9px] md:text-xs font-medium">
                      {zipcodeData[selectedZipcode].avgRevenue}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] md:text-xs text-gray-600">Growth</span>
                    <span className="text-[9px] md:text-xs font-medium text-green-500">
                      {zipcodeData[selectedZipcode].growth}
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className="text-[8px] md:text-[10px] text-gray-500 block mb-1">
                      Insurance Distribution:
                    </span>
                    <span className="text-[8px] md:text-[10px] text-gray-600">
                      {zipcodeData[selectedZipcode].insuranceMix}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400 text-[10px] md:text-xs">
              Select a ZIP code to view insights
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const GeoPlotContent = () => (
    <div className="flex flex-col h-full space-y-2 md:space-y-4 p-2 md:p-4">
      <div className="bg-white rounded-lg p-4 shadow-sm flex-1 flex items-center justify-center">
        <span className="text-gray-500 text-sm">GeoPlot Content Coming Soon</span>
      </div>
    </div>
  );

  return (
    <div className="flex h-[340px] md:h-[480px] w-full">
      {/* Sidebar */}
      <div className="bg-white w-[50px] md:w-[80px] flex-shrink-0 flex flex-col items-center pt-2 md:pt-3 rounded-l-xl">
        {[
          { id: 'home', icon: <Home size={24} /> },
          { id: 'practice', icon: <BarChart2 size={24} /> },
          { id: 'map', icon: <Map size={24} /> }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`w-10 h-8 md:w-14 md:h-12 mb-1 md:mb-2 rounded-lg flex items-center justify-center cursor-pointer transition-colors
                       ${activePage === item.id 
                         ? 'bg-[#052b52] text-white shadow-sm' 
                         : 'bg-transparent text-[#052b52] hover:bg-[#103d68] hover:bg-opacity-10'}`}
          >
            {item.icon}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-[#103d68] rounded-r-xl flex flex-col overflow-hidden">
        {/* Header Area */}
        <div className="flex-shrink-0 flex justify-between items-start px-3 pt-2 pb-0 md:px-5 md:pt-3 md:pb-0">
          <h1 className="text-xs md:text-lg text-white font-bold pl-1 md:pl-2 mt-auto mb-1 md:mb-1">
            Regional Analytics
          </h1>
          <h2 className="text-sm md:text-[28px] text-white font-medium pr-3 md:pr-8 mt-1 md:mt-2">
            mednavi
          </h2>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-2 md:p-4">
          <div className="bg-gray-100 rounded-lg h-full">
            <Tabs defaultValue="regional" className="h-full">
              <div className="flex justify-center p-2 md:p-3">
                <div className="bg-[#1E2433] rounded-[14px] w-full max-w-[320px] md:max-w-none md:min-w-[632px] h-[28px] md:h-[40px] flex items-center px-1.5 md:px-2">
                  <TabsList className="flex bg-transparent h-[24px] md:h-[36px] gap-1 md:gap-1.5 w-full">
                    <TabsTrigger 
                      value="regional" 
                      className="w-[calc(50%-2px)] rounded-lg h-[20px] md:h-[31px] text-[8px] md:text-xs font-normal 
                                flex items-center justify-center gap-1 md:gap-2 text-gray-300 
                                data-[state=active]:bg-white data-[state=active]:text-[#1C2434]"
                    >
                      <BarChart2 className="w-2 h-2 md:w-4 md:h-4" />
                      Regional
                    </TabsTrigger>
                    <TabsTrigger 
                      value="geoplot" 
                      className="w-[calc(50%-2px)] rounded-lg h-[20px] md:h-[31px] text-[8px] md:text-xs font-normal 
                                flex items-center justify-center gap-1 md:gap-2 text-gray-300 
                                data-[state=active]:bg-white data-[state=active]:text-[#1C2434]"
                    >
                      <Map className="w-2 h-2 md:w-4 md:h-4" />
                      GeoPlot
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>

              <TabsContent value="regional" className="m-0 p-2 md:p-4">
                <RegionalContent />
              </TabsContent>

              <TabsContent value="geoplot" className="m-0">
                <GeoPlotContent />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContainer3;