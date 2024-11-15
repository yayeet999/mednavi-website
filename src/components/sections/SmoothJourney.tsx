'use client';
import React, { useState, useCallback, useEffect, useRef } from 'react';

const stations = [
  { id: 1, x: 400, y: 300 },
  { id: 2, x: 1800, y: 600 },
  { id: 3, x: 600, y: 1200 },
  { id: 4, x: 2000, y: 1500 },
  { id: 5, x: 1000, y: 1800 },
];

// KPI Box remains unchanged with dynamic values
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
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Update window size
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize(); // Initialize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Intersection Observer with 75% threshold
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.intersectionRatio >= 0.75);
      },
      { threshold: 0.75 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle scroll to navigate between stations
  const handleScroll = useCallback(
    (e: WheelEvent) => { // Added type annotation here
      if (!isVisible || isAnimating || isMobile) return;

      e.preventDefault();
      const direction = e.deltaY > 0 ? 1 : -1;
      const nextIndex = Math.max(0, Math.min(stations.length - 1, currentIndex + direction));

      if (nextIndex !== currentIndex) {
        setIsAnimating(true);
        setCurrentIndex(nextIndex);
        setTimeout(() => setIsAnimating(false), 1000);
      }
    },
    [currentIndex, isAnimating, isMobile, isVisible, stations.length]
  );

  // Attach wheel event listener
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleWheel = (e: WheelEvent) => { // Ensure the event is typed correctly
      if (isVisible) {
        handleScroll(e);
      }
    };

    section.addEventListener('wheel', handleWheel, { passive: false });
    return () => section.removeEventListener('wheel', handleWheel);
  }, [handleScroll, isVisible]);

  // Navigate to specific station
  const navigate = useCallback(
    (index: number) => {
      if (isAnimating || index === currentIndex) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 1000);
    },
    [currentIndex, isAnimating]
  );

  // Prevent page scroll when interacting with SmoothJourney
  useEffect(() => {
    if (isVisible) {
      // Lock the body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Unlock the body scroll
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisible]);

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
          transform: `translate(${windowSize.width / 2 - currentPosition.x}px, ${
            windowSize.height / 2 - currentPosition.y + mobileOffset
          }px)`,
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
                className={`transition-opacity duration-500 ${
                  Math.abs(currentIndex - i) <= 1 ? 'opacity-100' : 'opacity-30'
                }`}
              />
            );
          })}

          {stations.map((station, i) => (
            <g key={i}>
              <circle cx={station.x} cy={station.y} r="12" fill="#3B82F6" className="opacity-30" />
              <circle cx={station.x} cy={station.y} r="6" fill="#3B82F6" className="opacity-70" />
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
              transform: `translate(-50%, -50%) scale(${i === currentIndex ? 1 : 0.9})`,
              opacity:
                Math.abs(currentIndex - i) <= 1
                  ? 1 - Math.abs(currentIndex - i) * 0.3
                  : 0,
            }}
          >
            <div
              className={`w-full h-full bg-white rounded-xl transition-all duration-500
                          ${i === currentIndex ? 'shadow-[0_8px_30px_rgba(59,130,246,0.15)]' : 'shadow-lg'}`}
            >
              {renderKPIBox()}
            </div>
          </div>
        ))}
      </div>

      {isVisible && (
        <>
          {/* Navigation Dots */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 z-50">
            {stations.map((_, i) => (
              <button
                key={i}
                onClick={() => navigate(i)}
                disabled={isAnimating}
                className={`w-6 h-6 md:w-4 md:h-4 rounded-full transition-all duration-300
                           ${
                             i === currentIndex
                               ? 'bg-blue-800 scale-125'
                               : 'bg-blue-600 hover:bg-blue-700'
                           }
                           animate-pulse-on-visible`}
                aria-label={`Navigate to station ${i + 1}`}
                aria-current={i === currentIndex ? 'true' : 'false'}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-96 h-1 bg-blue-100 rounded-full overflow-hidden z-50">
            <div
              className="h-full bg-blue-600 transition-all duration-1000 ease-out"
              style={{ width: `${(currentIndex / (stations.length - 1)) * 100}%` }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SmoothJourney;
