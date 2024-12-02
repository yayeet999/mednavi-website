import React, { useState, useEffect } from 'react';
import { Home, BarChart2, Map, Bot, MapPin, Users } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import RegionalTabContent from './RegionalTabContent';
import GeoPlotTabContent from './GeoPlotTabContent';

interface DashboardContainer3Props {
  onNavigateToBot?: () => void;
  onNavigateToHome?: () => void;
  onNavigateToPractice?: () => void;
}

export const DashboardContainer3: React.FC<DashboardContainer3Props> = ({ 
  onNavigateToBot,
  onNavigateToHome,
  onNavigateToPractice
}) => {
  const [activePage, setActivePage] = useState('map');
  const [shouldRenderMap, setShouldRenderMap] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeTab, setActiveTab] = useState('regional');

  const handleTabChange = (value: string) => {
    if (value === activeTab) return;
    setActiveTab(value);
  };

  const handlePageChange = (pageId: string) => {
    if (pageId === 'bot') {
      onNavigateToBot?.();
      return;
    }
    if (pageId === 'home') {
      onNavigateToHome?.();
      return;
    }
    if (pageId === 'practice') {
      onNavigateToPractice?.();
      return;
    }

    setIsTransitioning(true);
    setActivePage(pageId);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 100);
  };

  useEffect(() => {
    if (activePage === 'map' && !shouldRenderMap) {
      const timer = setTimeout(() => {
        setShouldRenderMap(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activePage, shouldRenderMap]);

  useEffect(() => {
    return () => {
      setShouldRenderMap(false);
      setIsTransitioning(false);
    };
  }, []);

  return (
    <div className="h-full w-full">
      <div className="flex h-[340px] md:h-[480px] w-full">
        <div className="bg-white w-[50px] md:w-[80px] flex-shrink-0 flex flex-col items-center pt-2 md:pt-3 rounded-l-xl">
          {[
            { id: 'home', icon: <Home size={24} />, onClick: onNavigateToHome },
            { id: 'practice', icon: <BarChart2 size={24} />, onClick: onNavigateToPractice },
            { id: 'map', icon: <Map size={24} /> },
            { id: 'bot', icon: <Bot size={24} />, onClick: onNavigateToBot }
          ].map((item) => (
            <div key={item.id} className="relative">
              <button
                onClick={() => item.onClick ? item.onClick() : handlePageChange(item.id)}
                disabled={isTransitioning}
                className={`w-10 h-8 md:w-14 md:h-12 mb-1 md:mb-2 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 ease-in-out
                         ${activePage === item.id && !item.onClick
                           ? 'bg-[#052b52] text-white shadow-sm scale-105' 
                           : 'bg-transparent text-[#052b52] hover:bg-[#103d68] hover:bg-opacity-10'}
                         ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
                aria-label={`${item.onClick ? `Navigate to ${item.id}` : `Switch to ${item.id} view`}`}
              >
                {React.cloneElement(item.icon, {
                  size: typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 24,
                  className: 'transition-transform duration-200'
                })}
              </button>
            </div>
          ))}
        </div>

        <div className="flex-1 bg-[#103d68] rounded-r-xl flex flex-col overflow-hidden">
          <div className="flex-shrink-0 flex justify-between items-start px-3 pt-2 pb-0 md:px-5 md:pt-3 md:pb-0">
            <h1 className="text-xs md:text-lg text-white font-bold pl-1 md:pl-2 mt-auto mb-1 md:mb-1">Your Dental Practice</h1>
            <h2 className="text-sm md:text-[28px] text-white font-medium pr-3 md:pr-8 mt-1 md:mt-2">mednavi</h2>
          </div>

          <div className="flex-1 p-2 md:p-4">
            <div className="bg-gray-100 rounded-lg h-full">
              {isTransitioning ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <>
                  {activePage === 'map' && shouldRenderMap && (
                    <div className="w-full h-full bg-white rounded-lg overflow-hidden">
                      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={handleTabChange} className="h-full flex flex-col [&>div]:bg-transparent">
                        <div className="flex justify-center bg-white px-4 pt-3">
                          <div className="bg-[#1E2433] rounded-[14px] w-full max-w-[320px] md:max-w-none md:min-w-[632px] h-[28px] md:h-[40px] flex items-center px-1.5 md:px-2">
                            <TabsList className="flex bg-transparent h-[24px] md:h-[36px] gap-1 md:gap-1.5 w-full">
                              <TabsTrigger 
                                value="regional" 
                                className="w-[calc(50%-2px)] rounded-lg h-[20px] md:h-[31px] text-[8px] md:text-xs font-bold flex items-center justify-center gap-1 md:gap-2 text-gray-300 data-[state=active]:bg-white data-[state=active]:text-[#1C2434] md:data-[state=active]:shadow-sm hover:bg-white/10 hover:text-white data-[state=active]:hover:bg-white data-[state=active]:hover:text-[#1C2434] transition-all duration-200"
                              >
                                <MapPin className="w-2 h-2 md:w-4 md:h-4 stroke-[3]" />
                                Regional
                              </TabsTrigger>
                              <TabsTrigger 
                                value="geoplot" 
                                className="w-[calc(50%-2px)] rounded-lg h-[20px] md:h-[31px] text-[8px] md:text-xs font-bold flex items-center justify-center gap-1 md:gap-2 text-gray-300 data-[state=active]:bg-white data-[state=active]:text-[#1C2434] md:data-[state=active]:shadow-sm hover:bg-white/10 hover:text-white data-[state=active]:hover:bg-white data-[state=active]:hover:text-[#1C2434] transition-all duration-200"
                              >
                                <Users className="w-2 h-2 md:w-4 md:h-4 stroke-[3]" />
                                GeoPlot
                              </TabsTrigger>
                            </TabsList>
                          </div>
                        </div>

                        <div className="flex-1 overflow-hidden bg-[#103d68] mt-1 md:mt-2 mx-4 rounded-lg">
                          <TabsContent value="regional" className="h-full m-0 md:p-4 p-1">
                            {activeTab === 'regional' && <RegionalTabContent />}
                          </TabsContent>
                          <TabsContent value="geoplot" className="h-full m-0 p-4">
                            {activeTab === 'geoplot' && <GeoPlotTabContent />}
                          </TabsContent>
                        </div>
                      </Tabs>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes outerGlow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.2;
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes smoothFloat {
          0% {
            transform: translate(-50%, 0px);
          }
          50% {
            transform: translate(-50%, -4px);
          }
          100% {
            transform: translate(-50%, 0px);
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardContainer3;
