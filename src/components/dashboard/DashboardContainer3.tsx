import React, { useState } from 'react';
import { Home, BarChart2, Map, Bot } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MapPin, Users } from 'lucide-react';
import HomeContent from './HomeContent';
import PracticeTabContent from './PracticeTabContent';

interface DashboardContainer3Props {
  onNavigateToBot?: () => void;
}

export const DashboardContainer3: React.FC<DashboardContainer3Props> = ({ onNavigateToBot }) => {
  const [activePage, setActivePage] = useState('home');

  return (
    <div className="h-full w-full">
      <div className="flex h-[340px] md:h-[480px] w-full">
        {/* Sidebar */}
        <div className="bg-white w-[50px] md:w-[80px] flex-shrink-0 flex flex-col items-center pt-2 md:pt-3 rounded-l-xl">
          {[
            { id: 'home', icon: <Home size={24} /> },
            { id: 'practice', icon: <BarChart2 size={24} /> },
            { id: 'map', icon: <Map size={24} /> },
            { id: 'bot', icon: <Bot size={24} /> }
          ].map((item) => (
            <div key={item.id} className="relative">
              <button
                onClick={() => item.id === 'bot' ? onNavigateToBot?.() : setActivePage(item.id)}
                className={`w-10 h-8 md:w-14 md:h-12 mb-1 md:mb-2 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 ease-in-out
                         ${activePage === item.id 
                           ? 'bg-[#052b52] text-white shadow-sm scale-105' 
                           : 'bg-transparent text-[#052b52] hover:bg-[#103d68] hover:bg-opacity-10'}`}
                aria-label={`Switch to ${item.id} view`}
              >
                {React.cloneElement(item.icon, {
                  size: typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 24,
                  className: 'transition-transform duration-200'
                })}
              </button>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-[#103d68] rounded-r-xl flex flex-col overflow-hidden">
          {/* Header Area */}
          <div className="flex-shrink-0 flex justify-between items-start px-3 pt-2 pb-0 md:px-5 md:pt-3 md:pb-0">
            <h1 className="text-xs md:text-lg text-white font-bold pl-1 md:pl-2 mt-auto mb-1 md:mb-1">Your Dental Practice</h1>
            <h2 className="text-sm md:text-[28px] text-white font-medium pr-3 md:pr-8 mt-1 md:mt-2">mednavi</h2>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-2 md:p-4">
            <div className="bg-gray-100 rounded-lg h-full p-2 md:p-3">
              {activePage === 'home' && (
                <div className="w-full h-full bg-white rounded-lg p-4">
                  <HomeContent />
                </div>
              )}

              {activePage === 'practice' && (
                <div className="w-full h-full bg-white rounded-lg">
                  <PracticeTabContent />
                </div>
              )}

              {activePage === 'map' && (
                <div className="w-full h-full bg-white rounded-lg overflow-hidden">
                  <Tabs defaultValue="regional" className="h-full flex flex-col [&>div]:bg-transparent">
                    <div className="flex justify-center bg-white px-4 pt-3">
                      <div className="bg-[#1E2433] rounded-[14px] w-full max-w-[320px] md:max-w-none md:min-w-[632px] h-[28px] md:h-[40px] flex items-center px-1.5 md:px-2">
                        <TabsList className="flex bg-transparent h-[24px] md:h-[36px] gap-1 md:gap-1.5 w-full">
                          <TabsTrigger 
                            value="regional" 
                            className="w-[calc(50%-2px)] rounded-lg h-[20px] md:h-[31px] text-[8px] md:text-xs font-normal flex items-center justify-center gap-1 md:gap-2 text-gray-300 data-[state=active]:bg-white data-[state=active]:text-[#1C2434] md:data-[state=active]:shadow-sm hover:bg-white/10 hover:text-white data-[state=active]:hover:bg-white data-[state=active]:hover:text-[#1C2434] transition-all duration-200"
                          >
                            <MapPin className="w-2 h-2 md:w-4 md:h-4" />
                            Regional
                          </TabsTrigger>
                          <TabsTrigger 
                            value="geoplot" 
                            className="w-[calc(50%-2px)] rounded-lg h-[20px] md:h-[31px] text-[8px] md:text-xs font-normal flex items-center justify-center gap-1 md:gap-2 text-gray-300 data-[state=active]:bg-white data-[state=active]:text-[#1C2434] md:data-[state=active]:shadow-sm hover:bg-white/10 hover:text-white data-[state=active]:hover:bg-white data-[state=active]:hover:text-[#1C2434] transition-all duration-200"
                          >
                            <Users className="w-2 h-2 md:w-4 md:h-4" />
                            GeoPlot
                          </TabsTrigger>
                        </TabsList>
                      </div>
                    </div>

                    <div className="flex-1 overflow-hidden bg-[#103d68] mt-1 md:mt-2 mx-4 rounded-lg">
                      <TabsContent value="regional" className="h-full m-0 p-4">
                        <div className="w-full h-full bg-white rounded-lg p-4">
                          {/* Regional content */}
                        </div>
                      </TabsContent>

                      <TabsContent value="geoplot" className="h-full m-0 p-4">
                        <div className="w-full h-full bg-white rounded-lg p-4">
                          {/* GeoPlot content */}
                        </div>
                      </TabsContent>
                    </div>
                  </Tabs>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContainer3;
