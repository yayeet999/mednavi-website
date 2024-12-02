import React, { useState } from 'react';
import { Home, BarChart2, Map, MapPin, Bot } from 'lucide-react';
import LocationMap from './LocationMap';

interface DashboardContainer4Props {
  onNavigateToHome?: () => void;
  onNavigateToPractice?: () => void;
  onNavigateToMap?: () => void;
}

export const DashboardContainer4: React.FC<DashboardContainer4Props> = ({
  onNavigateToHome,
  onNavigateToPractice,
  onNavigateToMap
}) => {
  const [activePage, setActivePage] = useState('location');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handlePageChange = (pageId: string) => {
    if (pageId === 'home') {
      onNavigateToHome?.();
      return;
    }
    if (pageId === 'practice') {
      onNavigateToPractice?.();
      return;
    }
    if (pageId === 'map') {
      onNavigateToMap?.();
      return;
    }

    setIsTransitioning(true);
    setActivePage(pageId);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 100);
  };

  return (
    <div className="h-full w-full">
      <div className="flex h-[340px] md:h-[480px] w-full">
        <div className="bg-white w-[50px] md:w-[80px] flex-shrink-0 flex flex-col items-center pt-2 md:pt-3 rounded-l-xl">
          {[
            { id: 'home', icon: <Home size={24} />, onClick: onNavigateToHome },
            { id: 'practice', icon: <BarChart2 size={24} />, onClick: onNavigateToPractice },
            { id: 'map', icon: <Map size={24} />, onClick: onNavigateToMap },
            { id: 'location', icon: <MapPin size={24} /> },
            { id: 'bot', icon: <Bot size={24} />, disabled: true }
          ].map((item) => (
            <div key={item.id} className="relative">
              <button
                onClick={() => item.onClick ? item.onClick() : !item.disabled && handlePageChange(item.id)}
                disabled={isTransitioning || item.disabled}
                className={`w-10 h-8 md:w-14 md:h-12 mb-1 md:mb-2 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 ease-in-out
                         ${activePage === item.id && !item.onClick
                           ? 'bg-[#052b52] text-white shadow-sm scale-105' 
                           : 'bg-transparent text-[#052b52] hover:bg-[#103d68] hover:bg-opacity-10'}
                         ${isTransitioning || item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                aria-label={`${item.onClick ? `Navigate to ${item.id}` : `Switch to ${item.id} view`}`}
              >
                {React.cloneElement(item.icon, {
                  size: typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 24,
                  className: `transition-transform duration-200 ${item.disabled ? 'text-gray-400' : ''}`
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
            <div className="flex h-full gap-4">
              <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden">
                <LocationMap />
              </div>
              <div className="w-[30%] bg-gray-100 rounded-lg overflow-hidden">
                {/* Empty container for future filter system */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContainer4;
