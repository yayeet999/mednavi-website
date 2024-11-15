'use client'
import React, { useState, useCallback, useEffect, useRef } from 'react';

const stations = [
  { 
    id: 1, 
    x: 400, 
    y: 300,
    kpis: {
      revenue: { value: "67,792", change: "+15.1" },
      users: { value: "918", change: "+6.7" },
      conversion: { value: "63.8", change: "+1.2" },
      growth: { value: "48.9", change: "+11.6" }
    }
  },
  { 
    id: 2, 
    x: 1800, 
    y: 600,
    kpis: {
      revenue: { value: "82,451", change: "+12.3" },
      users: { value: "1,245", change: "+8.4" },
      conversion: { value: "58.2", change: "+2.1" },
      growth: { value: "52.7", change: "+9.8" }
    }
  },
  { 
    id: 3, 
    x: 600, 
    y: 1200,
    kpis: {
      revenue: { value: "94,327", change: "+18.7" },
      users: { value: "1,567", change: "+11.2" },
      conversion: { value: "71.5", change: "+3.8" },
      growth: { value: "61.3", change: "+13.4" }
    }
  },
  { 
    id: 4, 
    x: 2000, 
    y: 1500,
    kpis: {
      revenue: { value: "108,965", change: "+16.9" },
      users: { value: "1,892", change: "+9.6" },
      conversion: { value: "68.9", change: "+2.9" },
      growth: { value: "57.8", change: "+10.2" }
    }
  },
  { 
    id: 5, 
    x: 1000, 
    y: 1800,
    kpis: {
      revenue: { value: "123,784", change: "+19.2" },
      users: { value: "2,234", change: "+12.8" },
      conversion: { value: "74.3", change: "+4.2" },
      growth: { value: "65.6", change: "+14.7" }
    }
  }
];

const renderKPIBox = (kpis: typeof stations[0]['kpis']) => (
  <div className="grid grid-cols-2 gap-4 md:gap-8 p-6 md:p-12 h-full">
    <div className="space-y-2 md:space-y-4">
      <div className="text-base md:text-lg text-gray-500">Revenue</div>
      <div className="text-xl md:text-3xl font-semibold text-gray-800">${kpis.revenue.value}k</div>
      <div className="text-xs md:text-sm text-green-500">{kpis.revenue.change}%</div>
    </div>
    <div className="space-y-2 md:space-y-4">
      <div className="text-base md:text-lg text-gray-500">Users</div>
      <div className="text-xl md:text-3xl font-semibold text-gray-800">{kpis.users.value}k</div>
      <div className="text-xs md:text-sm text-blue-500">{kpis.users.change}%</div>
    </div>
    <div className="space-y-2 md:space-y-4">
      <div className="text-base md:text-lg text-gray-500">Conversion</div>
      <div className="text-xl md:text-3xl font-semibold text-gray-800">{kpis.conversion.value}%</div>
      <div className="text-xs md:text-sm text-green-500">{kpis.conversion.change}%</div>
    </div>
    <div className="space-y-2 md:space-y-4">
      <div className="text-base md:text-lg text-gray-500">Growth</div>
      <div className="text-xl md:text-3xl font-semibold text-gray-800">{kpis.growth.value}%</div>
      <div className="text-xs md:text-sm text-blue-500">{kpis.growth.change}%</div>
    </div>
  </div>
);

const SmoothJourney: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const releaseTimeout = useRef<NodeJS.Timeout>();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const visibleRatio = entry.intersectionRatio;
        setIsVisible(entry.isIntersecting);
        
        if (!isMobile && visibleRatio >= 0.75) {
          setIsScrollLocked(true);
        } else if (!isTransitioning) {
          setIsScrollLocked(false);
        }
      },
      {
        threshold: [0, 0.1, 0.75, 1]
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isMobile, isTransitioning]);

  const handleScroll = useCallback((e: WheelEvent) => {
    if (!isVisible || isAnimating || isMobile || !isScrollLocked || isTransitioning) return;

    e.preventDefault();
    const direction = e.deltaY > 0 ? 1 : -1;
    const nextIndex = Math.max(0, Math.min(stations.length - 1, currentIndex + direction));

    if (nextIndex !== currentIndex) {
      if (
        (nextIndex === stations.length - 1 && direction > 0) ||
        (nextIndex === 0 && direction < 0)
      ) {
        setIsTransitioning(true);
        releaseTimeout.current = setTimeout(() => {
          setIsScrollLocked(false);
          setIsTransitioning(false);
        }, 2500);
      }

      setIsAnimating(true);
      setCurrentIndex(nextIndex);
      setTimeout(() => setIsAnimating(false), 1000);
    }
  }, [currentIndex, isAnimating, isMobile, isVisible, isScrollLocked, isTransitioning]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || isMobile) return;

    const preventScroll = (e: WheelEvent) => {
      if (isScrollLocked) {
        e.preventDefault();
        handleScroll(e);
      }
    };

    section.addEventListener('wheel', preventScroll, { passive: false });
    return () => section.removeEventListener('wheel', preventScroll);
  }, [handleScroll, isScrollLocked, isMobile]);

  useEffect(() => {
    return () => {
      if (releaseTimeout.current) {
        clearTimeout(releaseTimeout.current);
      }
    };
  }, []);

  const navigate = useCallback((index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 1000);
  }, [currentIndex, isAnimating]);

  if (!windowSize.width || !windowSize.height) return null;

  const currentPosition = stations[currentIndex];
  const mobileOffset = isMobile ? -150 : 0;

  return (
    <div 
      ref={sectionRef}
      className="relative w-full h-[70vh] md:h-screen bg-[#EBF4FF] overflow-hidden"
    >
      <div 
        className="relative w-full h-full transition-transform duration-1000 ease-out"
        style={{
          transform: `translate(${windowSize.width/2 - currentPosition.x}px, ${windowSize.height/2 - currentPosition.y + mobileOffset}px)`
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
            className={`absolute w-[300px] md:w-[700px] h-[400px] transition-all duration-1000 ease-out
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
              {renderKPIBox(station.kpis)}
            </div>
          </div>
        ))}
      </div>

      <div 
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-6 z-50
                    transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        {stations.map((_, i) => (
          <button
            key={i}
            onClick={() => navigate(i)}
            disabled={isAnimating}
            className={`w-8 h-8 md:w-4 md:h-4 rounded-full transition-all duration-300
                       ${i === currentIndex 
                         ? 'bg-blue-800 scale-125 shadow-lg shadow-blue-400' 
                         : 'bg-blue-600 hover:bg-blue-700'}
                       ${isMobile ? 'animate-pulse shadow-md shadow-blue-300' : ''}
                       disabled:opacity-50`}
            aria-label={`Navigate to station ${i + 1}`}
          />
        ))}
      </div>

      <div 
        className={`absolute top-[5%] left-1/2 transform -translate-x-1/2 w-96 h-1 
                    bg-blue-100 rounded-full overflow-hidden z-50 
                    transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div 
          className="h-full bg-blue-600 transition-all duration-1000 ease-out"
          style={{ width: `${(currentIndex / (stations.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default SmoothJourney;