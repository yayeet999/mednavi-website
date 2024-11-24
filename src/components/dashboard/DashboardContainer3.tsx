import React, { useState } from 'react';
import { Home, BarChart2, Map, Braces, Users, ArrowUpRight } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts';

// Types
interface DataPoint {
  name: string;
  regional: number;
  practice: number;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    color: string;
  }>;
  label?: string;
}

// Progress bar component
const ProgressBar: React.FC<{
  value: number;
  max: number;
  color: string;
  showTooltip?: boolean;
}> = ({ value, max, color, showTooltip }) => {
  const percentage = (value / max) * 100;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-full h-4 bg-gray-100 rounded-sm overflow-hidden transition-all duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="h-full transition-all duration-500 ease-out rounded-sm"
        style={{ 
          width: `${percentage}%`,
          backgroundColor: color
        }}
      />
      {showTooltip && isHovered && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-lg shadow-lg text-xs">
          <div className="font-medium">{value.toLocaleString()}</div>
          <div className="text-gray-500">{((value / max) * 100).toFixed(1)}% of max</div>
        </div>
      )}
    </div>
  );
};

// Custom tooltip for trend chart
const CustomTooltip: React.FC<TooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 shadow-sm rounded-md">
        <p className="text-[10px] font-medium">
          {payload[0].dataKey === 'practice' ? 'Your Practice' : 'Regional'}
        </p>
        <p className="text-[10px] font-semibold">
          ${payload[0].value.toLocaleString()}k
        </p>
      </div>
    );
  }
  return null;
};

// Main component
const DashboardContainer3: React.FC = () => {
  const [activePage] = useState('regional');
  const [selectedZipcode, setSelectedZipcode] = useState<string | null>(null);

  // Sample data for the trend chart
  const trendData = [
    { month: 'Jan', practice: 75.2, regional: 68.4 },
    { month: 'Feb', practice: 82.1, regional: 71.2 },
    { month: 'Mar', practice: 79.8, regional: 73.5 },
    { month: 'Apr', practice: 88.4, regional: 75.8 },
    { month: 'May', practice: 94.4, regional: 79.4 }
  ];

  // Zipcode data
  const zipcodeData = {
    '60601': {
      avgRevenue: '$892.5k',
      patientValue: '$534',
      insuranceMix: '65% PPO, 25% FFS, 10% Other',
      growth: '+8.2%'
    },
    '60602': {
      avgRevenue: '$945.2k',
      patientValue: '$567',
      insuranceMix: '70% PPO, 20% FFS, 10% Other',
      growth: '+11.5%'
    },
    '60603': {
      avgRevenue: '$878.9k',
      patientValue: '$512',
      insuranceMix: '60% PPO, 30% FFS, 10% Other',
      growth: '+6.8%'
    }
  };

  return (
    <div className="flex h-[340px] md:h-[480px] w-full">
      {/* Sidebar */}
      <div className="bg-white w-[50px] md:w-[80px] flex-shrink-0 flex flex-col items-center pt-2 md:pt-3 rounded-l-xl">
        {[
          { id: 'home', icon: <Home size={24} /> },
          { id: 'regional', icon: <Map size={24} /> }
        ].map((item) => (
          <button
            key={item.id}
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
        {/* Header */}
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
          <Tabs defaultValue="regional" className="h-full flex flex-col">
            <div className="flex justify-center mb-2 md:mb-3">
              <div className="bg-[#1E2433] rounded-[14px] w-full max-w-[320px] md:max-w-none md:min-w-[632px] h-[28px] md:h-[40px] flex items-center px-1.5 md:px-2">
                <TabsList className="flex bg-transparent h-[24px] md:h-[36px] gap-1 md:gap-1.5 w-full">
                  <TabsTrigger 
                    value="regional" 
                    className="w-[calc(50%-2px)] rounded-lg h-[20px] md:h-[31px] text-[8px] md:text-xs font-normal flex items-center justify-center gap-1 md:gap-2 text-gray-300 data-[state=active]:bg-white data-[state=active]:text-[#1C2434]"
                  >
                    <BarChart2 className="w-2 h-2 md:w-4 md:h-4" />
                    Regional
                  </TabsTrigger>
                  <TabsTrigger 
                    value="geoplot" 
                    className="w-[calc(50%-2px)] rounded-lg h-[20px] md:h-[31px] text-[8px] md:text-xs font-normal flex items-center justify-center gap-1 md:gap-2 text-gray-300 data-[state=active]:bg-white data-[state=active]:text-[#1C2434]"
                  >
                    <Map className="w-2 h-2 md:w-4 md:h-4" />
                    GeoPlot
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            {/* Regional Tab Content */}
            <TabsContent value="regional" className="flex-1 bg-gray-100 rounded-lg p-2 md:p-3 min-h-0">
              {/* KPI Containers Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3 mb-2 md:mb-3">
                {/* Average Annual Revenue */}
                <div className="bg-white rounded-lg p-2 md:p-3 shadow-sm">
                  <h3 className="text-[10px] md:text-sm text-gray-700 font-medium mb-1">
                    Average Annual Revenue
                  </h3>
                  <div className="h-px bg-gray-200 mb-2" />
                  <div className="space-y-3">
                    <div>
                      <div className="text-[9px] md:text-xs text-gray-600 mb-1">Regional Benchmark</div>
                      <div className="flex items-center gap-2">
                        <ProgressBar value={877.2} max={1000} color="#FF9F1C" showTooltip />
                        <div className="flex items-center gap-1">
                          <span className="text-[9px] md:text-xs font-medium">877.2</span>
                          <span className="text-[8px] md:text-xs text-green-500">+3.8%</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-[9px] md:text-xs text-gray-600 mb-1">Your Practice</div>
                      <div className="flex items-center gap-2">
                        <ProgressBar value={923.3} max={1000} color="#103d68" showTooltip />
                        <div className="flex items-center gap-1">
                          <span className="text-[9px] md:text-xs font-medium">923.3</span>
                          <span className="text-[8px] md:text-xs text-green-500">+7.2%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Average Value Per Patient */}
                <div className="bg-white rounded-lg p-2 md:p-3 shadow-sm">
                  <h3 className="text-[10px] md:text-sm text-gray-700 font-medium mb-1">
                    Average Value Per Patient
                  </h3>
                  <div className="h-px bg-gray-200 mb-2" />
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] md:text-xs text-gray-600">Regional Benchmark</span>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-green-500 fill-current" />
                        <span className="text-[9px] md:text-xs font-medium">$477</span>
                        <span className="text-[8px] md:text-xs text-green-500">+4.2%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] md:text-xs text-gray-600">Your Practice</span>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#103d68] fill-current" />
                        <span className="text-[9px] md:text-xs font-medium">$623</span>
                        <span className="text-[8px] md:text-xs text-green-500">+8.5%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top Procedure Types */}
                <div className="bg-white rounded-lg p-2 md:p-3 shadow-sm">
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
                          <Tooltip content={<CustomTooltip />} />
                          <Line 
                            type="monotone" 
                            dataKey="practice" 
                            stroke="#4CAF50" 
                            strokeWidth={2} 
                            dot={false} 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="regional" 
                            stroke="#103d68" 
                            strokeWidth={2} 
                            dot={false} 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1">
                        <span className="text-[9px] md:text-xs font-medium text-green-500">$94.4k</span>
                      </div>
                      <div className="h-px w-full bg-gray-200 my-1" />
                      <div className="flex items-center gap-1">
                        <span className="text-[9px] md:text-xs font-medium text-[#103d68]">$79.4k</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map and Analysis Section */}
                          <div className="flex flex-col md:flex-row gap-2 md:gap-3 flex-1 min-h-0">
                            {/* Regional Analysis Map */}
                            <div className="bg-white rounded-lg p-2 md:p-3 shadow-sm w-full md:w-3/4 h-[200px] md:h-full relative">
                              <h3 className="text-[10px] md:text-sm text-gray-700 font-medium mb-2">
                                Regional Analysis
                              </h3>
                              <div className="relative h-[calc(100%-24px)] w-full bg-gray-50 rounded overflow-hidden">
                                {/* Simple Chicago map with interactive zipcodes */}
                                <div className="absolute inset-0 p-4">
                                  {Object.entries(zipcodeData).map(([zipcode, data], index) => (
                                    <div
                                      key={zipcode}
                                      className={`absolute cursor-pointer transition-all duration-300
                                        ${index === 0 ? 'top-[20%] left-[30%]' : 
                                          index === 1 ? 'top-[35%] left-[45%]' : 
                                          'top-[50%] left-[35%]'}`}
                                    >
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger>
                                            <div 
                                              className={`border-2 ${
                                                selectedZipcode === zipcode 
                                                  ? 'border-blue-500 bg-blue-50' 
                                                  : 'border-gray-400 hover:border-blue-400 hover:bg-blue-50/50'
                                              } rounded-md p-1 md:p-2 transition-all duration-300`}
                                              onClick={() => setSelectedZipcode(zipcode)}
                                            >
                                              <span className="text-[8px] md:text-xs font-medium text-gray-700">
                                                {zipcode}
                                              </span>
                                            </div>
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <div className="p-2 max-w-[200px]">
                                              <div className="text-xs font-semibold mb-1">
                                                ZIP Code {zipcode}
                                              </div>
                                              <div className="space-y-1">
                                                <div className="flex justify-between text-[10px]">
                                                  <span className="text-gray-500">Avg Revenue:</span>
                                                  <span className="font-medium">{data.avgRevenue}</span>
                                                </div>
                                                <div className="flex justify-between text-[10px]">
                                                  <span className="text-gray-500">Patient Value:</span>
                                                  <span className="font-medium">{data.patientValue}</span>
                                                </div>
                                                <div className="flex justify-between text-[10px]">
                                                  <span className="text-gray-500">Insurance Mix:</span>
                                                  <span className="font-medium">{data.insuranceMix}</span>
                                                </div>
                                                <div className="flex justify-between text-[10px]">
                                                  <span className="text-gray-500">YoY Growth:</span>
                                                  <span className="font-medium text-green-500">{data.growth}</span>
                                                </div>
                                              </div>
                                            </div>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    </div>
                                  ))}
                                  {/* Map Background Pattern */}
                                  <div className="absolute inset-0 pointer-events-none">
                                    <div className="w-full h-full opacity-10">
                                      <div className="w-full h-full bg-gray-500" 
                                           style={{
                                             backgroundImage: `radial-gradient(circle at 1px 1px, gray 1px, transparent 0)`,
                                             backgroundSize: '20px 20px'
                                           }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Right Side Analysis Container */}
                            <div className="bg-white rounded-lg p-2 md:p-3 shadow-sm w-full md:w-1/4 h-[150px] md:h-full">
                              <h3 className="text-[10px] md:text-sm text-gray-700 font-medium mb-2">
                                Regional Insights
                              </h3>
                              {selectedZipcode ? (
                                <div className="space-y-3">
                                  <div className="p-2 bg-blue-50 rounded-lg">
                                    <div className="text-[10px] md:text-xs text-blue-800 font-medium mb-1">
                                      ZIP {selectedZipcode} Analysis
                                    </div>
                                    <div className="space-y-2">
                                      <div className="flex justify-between items-center">
                                        <span className="text-[9px] md:text-[11px] text-gray-600">Revenue Trend</span>
                                        <span className="text-[9px] md:text-[11px] font-medium text-green-500">
                                          {zipcodeData[selectedZipcode].growth}
                                        </span>
                                      </div>
                                      <div className="flex justify-between items-center">
                                        <span className="text-[9px] md:text-[11px] text-gray-600">Patient Value</span>
                                        <span className="text-[9px] md:text-[11px] font-medium">
                                          {zipcodeData[selectedZipcode].patientValue}
                                        </span>
                                      </div>
                                      <div className="text-[8px] md:text-[10px] text-gray-500 mt-2">
                                        Insurance Distribution:
                                        <div className="text-[8px] md:text-[10px] text-gray-600 mt-1">
                                          {zipcodeData[selectedZipcode].insuranceMix}
                                        </div>
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

                        </TabsContent>

                        <TabsContent value="geoplot" className="flex-1 m-0">
                          <GeoPlotContent />
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <style jsx>{`
              @keyframes pulse {
                0%, 100% { opacity: 0.8; }
                50% { opacity: 0.4; }
              }
            `}</style>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContainer3;