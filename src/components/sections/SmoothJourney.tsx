'use client'
import React, { useState, useCallback, useEffect } from 'react';

interface Station {
  id: number;
  x: number;
  y: number;
}

const stations: Station[] = [
  { id: 1, x: 200, y: 150 },
  { id: 2, x: 900, y: 300 },
  { id: 3, x: 300, y: 600 },
  { id: 4, x: 1000, y: 750 },
  { id: 5, x: 500, y: 900 }
];

const renderKPIBox = (index: number) => (
  <div className="grid grid-cols-2 gap-4 p-6 h-full">
    <div className="space-y-2">
      <div className="text-sm text-gray-500">Revenue</div>
      <div className="text-xl font-semibold text-gray-800">${(Math.random() * 100000).toFixed(0)}k</div>
      <div className="text-xs text-green-500">+{(Math.random() * 20).toFixed(1)}%</div>
    </div>
    <div className="space-y-2">
      <div className="text-sm text-gray-500">Users</div>
      <div className="text-xl font-semibold text-gray-800">{(Math.random() * 1000).toFixed(0)}k</div>
      <div className="text-xs text-blue-500">+{(Math.random() * 15).toFixed(1)}%</div>
    </div>
    <div className="space-y-2">
      <div className="text-sm text-gray-500">Conversion</div>
      <div className="text-xl font-semibold text-gray-800">{(Math.random() * 100).toFixed(1)}%</div>
      <div className="text-xs text-green-500">+{(Math.random() * 10).toFixed(1)}%</div>
    </div>
    <div className="space-y-2">
      <div className="text-sm text-gray-500">Growth</div>
      <div className="text-xl font-semibold text-gray-800">{(Math.random() * 50).toFixed(1)}%</div>
      <div className="text-xs text-blue-500">+{(Math.random() * 12).toFixed(1)}%</div>
    </div>
  </div>
);

export default function SmoothJourney() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Set initial window size
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });

    // Handle resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (isAnimating) return;
    
    const direction = e.deltaY > 0 ? 1 : -1;
    const nextIndex = Math.max(0, Math.min(stations.length - 1, currentIndex + direction));
    
    if (nextIndex !== currentIndex) {
      navigate(nextIndex);
    }
  }, [currentIndex, isAnimating]);

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  const navigate = useCallback((index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 1000);
  }, [currentIndex, isAnimating]);

  const currentPosition = stations[currentIndex];

  if (!windowSize.width || !windowSize.height) {
    return null; // Return nothing until we have window dimensions
  }

  return (
    <div className="w-full h-screen bg-[#EBF4FF] overflow-hidden">
      <div 
        className="relative w-full h-full transition-transform duration-1000 ease-out"
        style={{
          transform: `translate(${windowSize.width/2 - currentPosition.x}px, ${windowSize.height/2 - currentPosition.y}px)`
        }}
      >
        <svg className="absolute inset-0" style={{ width: '1500px', height: '1200px' }}>
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
                strokeWidth="3"
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
                r="6"
                fill="#3B82F6"
                className="opacity-30"
              />
              <circle
                cx={station.x}
                cy={station.y}
                r="3"
                fill="#3B82F6"
                className="opacity-70"
              />
            </g>
          ))}
        </svg>

        {stations.map((station, i) => (
          <div
            key={station.id}
            className={`absolute w-80 h-64 transition-all duration-1000 ease-out
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
              {renderKPIBox(i)}
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
        {stations.map((_, i) => (
          <button
            key={i}
            onClick={() => navigate(i)}
            disabled={isAnimating}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300
                       ${i === currentIndex 
                         ? 'bg-blue-500 scale-125' 
                         : 'bg-blue-200 hover:bg-blue-300'}`}
            aria-label={`Navigate to station ${i + 1}`}
          />
        ))}
      </div>

      <div className="fixed top-8 left-1/2 transform -translate-x-1/2 w-96 h-1 bg-blue-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-500 transition-all duration-1000 ease-out"
          style={{ width: `${(currentIndex / (stations.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
}