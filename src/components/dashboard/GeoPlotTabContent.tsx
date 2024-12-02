import React, { useState, useEffect } from 'react';

const GeoPlotTabContent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Short delay to ensure RegionalTabContent cleanup has initiated
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => {
      setIsVisible(false);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="w-full h-full bg-white rounded-lg overflow-hidden">
      <div
        className={`w-full h-full flex items-center justify-center text-gray-500
          transition-opacity duration-300 ease-in-out
          ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        GeoPlot visualization coming soon
      </div>
    </div>
  );
};

export default React.memo(GeoPlotTabContent);
