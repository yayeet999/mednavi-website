'use client'
import React, { useState, useCallback, useEffect, useRef } from 'react';

const stations = [
  { id: 1, x: 400, y: 300 },
  { id: 2, x: 1800, y: 600 },
  { id: 3, x: 600, y: 1200 },
  { id: 4, x: 2000, y: 1500 },
  { id: 5, x: 1000, y: 1800 }
];

const renderKPIBox = () => (
  <div className="grid grid-cols-2 gap-4 md:gap-8 p-6 md:p-12 h-full">
    <div className="space-y-2 md:space-y-4">
      <div className="text-base md:text-lg text-gray-500">Revenue</div>
      <div className="text-xl md:text-3xl font-semibold text-gray-800">${(Math.random() * 100000).toFixed(0)}k</div>
      <div className="text-xs md:text-sm text-green-500">+{(Math.random() * 20).toFixed(1)}%</div>
    </div>
    <div className="space-y-2 md:space-y-4">
      <div className="text-base md:text-lg text-gray-500">Users</div>
      <div className="text-xl md:text-3xl font-semibold text-gray-800">{(Math.random() * 1000).toFixed(0)}k</div>
      <div className="text-xs md:text-sm text-blue-500">+{(Math.random() * 15).toFixed(1)}%</div>
    </div>
    <div className="space-y-2 md:space-y-4">
      <div className="text-base md:text-lg text-gray-500">Conversion</div>
      <div className="text-xl md:text-3xl font-semibold text-gray-800">{(Math.random() * 100).toFixed(1)}%</div>
      <div className="text-xs md:text-sm text-green-500">+{(Math.random() * 10).toFixed(1)}%</div>
    </div>
    <div className="space-y-2 md:space-y-4">
      <div className="text-base md:text-lg text-gray-500">Growth</div>
      <div className="text-xl md:text-3xl font-semibold text-gray-800">{(Math.random() * 50).toFixed(1)}%</div>
      <div className="text-xs md:text-sm text-blue-500">+{(Math.random() * 12).toFixed(1)}%</div>
    </div>
  </div>
);

const SmoothJourney: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    
    if (isAnimating) return;
    
    const direction = e.deltaY > 0 ? 1 : -1;
    const nextIndex = Math.max(0, Math.min(stations.length - 1, currentIndex + direction));
    
    if (nextIndex !== currentIndex) {
      setIsAnimating(true);
      setCurrentIndex(nextIndex);
      setTimeout(() => setIsAnimating(false), 1000);
    }
  }, [currentIndex, isAnimating]);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const preventDefaultScroll = (e: WheelEvent) => {
      e.preventDefault();
    };

    element.addEventListener('wheel', preventDefaultScroll, { passive: false });
    element.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      element.removeEventListener('wheel', preventDefaultScroll);
      element.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel]);

  const navigate = useCallback((index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 1000);
  }, [currentIndex, isAnimating]);

  if (!windowSize.width || !windowSize.height) {
    return null;
  }

  const currentPosition = stations[currentIndex];

  return (
    <div 
      ref={sectionRef}
      className="relative w-full h-screen bg-[#EBF4FF] overflow-hidden"
    >
      <div 
        className="relative w-full h-full transition-transform duration-1000 ease-out"
        style={{
          transform: `translate(${windowSize.width/2 - currentPosition.x}px, ${windowSize.height/2 - currentPosition.y}px)`
        }}
      >
        <svg className="absolute inset-0" style={{ width: '3000px', height: '2400px' }}>
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {stations.map((station, i) => {
            if (i === stations.length - 1) return null;
            const next = stations[i + 1];
            const midX = (station.x + next.x) / 2;
            
            return (
              <path
                key={i}
                d={`M ${station.x} ${station.y} 
                    Q ${midX} ${station.y},
                      ${midX} ${(station.y + next.y) / 2}
                    T ${next.x} ${next.y}`}
                stroke="url(#lineGradient)"
                strokeWidth="5"
                fill="none"
                className={`transition-opacity duration-500
                           ${Math.abs(currentIndex - i) <= 1 ? 'opacity-100' : 'opacity-30'}`}
              />
            );
          })}

          {stations.map((station, i) => (
            <g key={i}>
              <circle
                cx={station.x}
                cy={station.y}
                r="12"
                fill="#3B82F6"
                className="opacity-30"
              />
              <circle
                cx={station.x}
                cy={station.y}
                r="6"
                fill="#3B82F6"
                className="opacity-70"
              />
            </g>
          ))}
        </svg>

        {stations.map((station, i) => (
          <div
            key={station.id}
            className={`absolute w-[300px] md:w-[600px] h-[250px] md:h-[400px] transition-all duration-1000 ease-out
                       ${i === currentIndex ? 'z-20' : 'z-10'}`}
            style={{
              left: station.x,
              top: station.y,
              transform: `translate(-50%, -50%) scale(${
                i === currentIndex ? 1 : 0.9
              })`,
              opacity: Math.abs(currentIndex - i) <= 1 ? 
                      1 - Math.abs(currentIndex - i) * 0.3 : 0,
            }}
          >
            <div className={`w-full h-full bg-white rounded-xl transition-all duration-500
                            ${i === currentIndex 
                              ? 'shadow-[0_8px_30px_rgb(59,130,246,0.15)]' 
                              : 'shadow-lg'}`} 
            >
              {renderKPIBox()}
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-50">
        {stations.map((_, i) => (
          <button
            key={i}
            onClick={() => navigate(i)}
            disabled={isAnimating}
            className={`w-3 h-3 rounded-full transition-all duration-300
                       ${i === currentIndex 
                         ? 'bg-blue-500 scale-125' 
                         : 'bg-blue-200 hover:bg-blue-300'}`}
            aria-label={`Navigate to station ${i + 1}`}
          />
        ))}
      </div>

      <div className="fixed top-8 left-1/2 transform -translate-x-1/2 w-96 h-1 bg-blue-100 rounded-full overflow-hidden z-50">
        <div 
          className="h-full bg-blue-500 transition-all duration-1000 ease-out"
          style={{ width: `${(currentIndex / (stations.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default SmoothJourney;
