'use client';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import DashboardContainer from '@/components/dashboard/DashboardContainer';
import DashboardContainer2 from '@/components/dashboard/DashboardContainer2';

// Scale factor calculation based on viewport width relative to desktop reference width
const calculateScaleFactor = () => {
  const referenceWidth = 1920; // Desktop reference width
  return `calc(100vw / ${referenceWidth})`;
};

const stations = [
  { 
    id: 1, 
    x: `calc(400 * ${calculateScaleFactor()})`, 
    y: `calc(300 * ${calculateScaleFactor()})`,
    kpis: {
      revenue: { value: "67,792", change: "+15.1" },
      users: { value: "918", change: "+6.7" },
      conversion: { value: "63.8", change: "+1.2" },
      growth: { value: "48.9", change: "+11.6" }
    }
  },
  { 
    id: 2, 
    x: `calc(1800 * ${calculateScaleFactor()})`, 
    y: `calc(600 * ${calculateScaleFactor()})`,
    kpis: {
      revenue: { value: "82,451", change: "+12.3" },
      users: { value: "1,245", change: "+8.4" },
      conversion: { value: "58.2", change: "+2.1" },
      growth: { value: "52.7", change: "+9.8" }
    }
  },
  { 
    id: 3, 
    x: `calc(600 * ${calculateScaleFactor()})`, 
    y: `calc(1200 * ${calculateScaleFactor()})`,
    kpis: {
      revenue: { value: "94,327", change: "+18.7" },
      users: { value: "1,567", change: "+11.2" },
      conversion: { value: "71.5", change: "+3.8" },
      growth: { value: "61.3", change: "+13.4" }
    }
  },
  { 
    id: 4, 
    x: `calc(2000 * ${calculateScaleFactor()})`, 
    y: `calc(1500 * ${calculateScaleFactor()})`,
    kpis: {
      revenue: { value: "108,965", change: "+16.9" },
      users: { value: "1,892", change: "+9.6" },
      conversion: { value: "68.9", change: "+2.9" },
      growth: { value: "57.8", change: "+10.2" }
    }
  },
  { 
    id: 5, 
    x: `calc(1000 * ${calculateScaleFactor()})`, 
    y: `calc(1800 * ${calculateScaleFactor()})`,
    kpis: {
      revenue: { value: "123,784", change: "+19.2" },
      users: { value: "2,234", change: "+12.8" },
      conversion: { value: "74.3", change: "+4.2" },
      growth: { value: "65.6", change: "+14.7" }
    }
  }
];

const renderKPIBox = (kpis: typeof stations[0]['kpis']) => (
  <div className="grid grid-cols-2 gap-[calc(32*var(--scale-factor))] p-[calc(48*var(--scale-factor))] h-full">
    <div className="space-y-[calc(16*var(--scale-factor))]">
      <div className="text-[calc(18*var(--scale-factor))] text-gray-500">Revenue</div>
      <div className="text-[calc(30*var(--scale-factor))] font-semibold text-gray-800">${kpis.revenue.value}k</div>
      <div className="text-[calc(14*var(--scale-factor))] text-green-500">{kpis.revenue.change}%</div>
    </div>
    <div className="space-y-[calc(16*var(--scale-factor))]">
      <div className="text-[calc(18*var(--scale-factor))] text-gray-500">Users</div>
      <div className="text-[calc(30*var(--scale-factor))] font-semibold text-gray-800">{kpis.users.value}k</div>
      <div className="text-[calc(14*var(--scale-factor))] text-blue-500">{kpis.users.change}%</div>
    </div>
    <div className="space-y-[calc(16*var(--scale-factor))]">
      <div className="text-[calc(18*var(--scale-factor))] text-gray-500">Conversion</div>
      <div className="text-[calc(30*var(--scale-factor))] font-semibold text-gray-800">{kpis.conversion.value}%</div>
      <div className="text-[calc(14*var(--scale-factor))] text-green-500">{kpis.conversion.change}%</div>
    </div>
    <div className="space-y-[calc(16*var(--scale-factor))]">
      <div className="text-[calc(18*var(--scale-factor))] text-gray-500">Growth</div>
      <div className="text-[calc(30*var(--scale-factor))] font-semibold text-gray-800">{kpis.growth.value}%</div>
      <div className="text-[calc(14*var(--scale-factor))] text-blue-500">{kpis.growth.change}%</div>
    </div>
  </div>
);
const SmoothJourney: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [windowSize, setWindowSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Scroll Lock States
  const [scrollLockTop, setScrollLockTop] = useState(false);
  const [scrollLockBottom, setScrollLockBottom] = useState(false);
  const scrollLockTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize and update window size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setWindowSize({
        width: width,
        height: height
      });
      
      // Update CSS variable for scale factor
      document.documentElement.style.setProperty(
        '--scale-factor',
        calculateScaleFactor()
      );
    };

    setMounted(true);
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Visibility detection using Intersection Observer
  useEffect(() => {
    if (!mounted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const isVisibleNow = entry.isIntersecting;
        setIsVisible(isVisibleNow);

        if (isVisibleNow && sectionRef.current) {
          sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      document.body.style.overflow = '';
    };
  }, [mounted]);

  // Handle scroll to navigate between stations
  const handleScroll = useCallback((e: WheelEvent) => {
    if (!isVisible || isAnimating) return;

    const direction = e.deltaY > 0 ? 'down' : 'up';

    if (direction === 'up' && scrollLockTop) {
      e.preventDefault();
      return;
    }

    if (direction === 'down' && scrollLockBottom) {
      e.preventDefault();
      return;
    }

    e.preventDefault();
    const nextIndex = Math.max(0, Math.min(stations.length - 1, currentIndex + (direction === 'down' ? 1 : -1)));

    if (nextIndex !== currentIndex) {
      setIsAnimating(true);
      setCurrentIndex(nextIndex);
      setTimeout(() => setIsAnimating(false), 1000);
    }

    // Set scroll locks at boundaries
    if (nextIndex === 0 && direction === 'up') {
      setScrollLockTop(true);
      if (scrollLockTimeoutRef.current) clearTimeout(scrollLockTimeoutRef.current);
      scrollLockTimeoutRef.current = setTimeout(() => {
        setScrollLockTop(false);
      }, 2500);
    }

    if (nextIndex === stations.length - 1 && direction === 'down') {
      setScrollLockBottom(true);
      if (scrollLockTimeoutRef.current) clearTimeout(scrollLockTimeoutRef.current);
      scrollLockTimeoutRef.current = setTimeout(() => {
        setScrollLockBottom(false);
      }, 2500);
    }
  }, [currentIndex, isAnimating, isVisible, scrollLockTop, scrollLockBottom]);

  // Attach wheel event listener
  useEffect(() => {
    if (!mounted) return;

    const section = sectionRef.current;
    if (!section) return;

    section.addEventListener('wheel', handleScroll, { passive: false });
    return () => {
      section.removeEventListener('wheel', handleScroll);
    };
  }, [handleScroll, mounted]);

  // Navigate to specific station
  const navigate = useCallback((index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 1000);
  }, [currentIndex, isAnimating]);

  // Navigate to container function
  const navigateToContainer = useCallback(() => {
    navigate(1);
  }, [navigate]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scrollLockTimeoutRef.current) {
        clearTimeout(scrollLockTimeoutRef.current);
      }
      document.body.style.overflow = '';
    };
  }, []);
  // Continue inside the SmoothJourney component...

  if (!mounted) {
    return null;
  }

  const currentPosition = stations[currentIndex];

  return (
    <div 
      ref={sectionRef}
      className="relative w-full h-screen bg-[#EBF4FF] overflow-hidden"
    >
      <div 
        className="relative w-full h-full transition-transform duration-1000 ease-out will-change-transform"
        style={{
          transform: `translate(
            calc(${windowSize.width / 2}px - ${currentPosition.x}), 
            calc(${windowSize.height / 2}px - ${currentPosition.y})
          )`
        }}
      >
        <svg 
          className="absolute inset-0" 
          style={{ 
            width: `calc(3000 * ${calculateScaleFactor()})`, 
            height: `calc(2400 * ${calculateScaleFactor()})` 
          }}
        >
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {stations.map((station, i) => {
            if (i === stations.length - 1) return null;
            const next = stations[i + 1];
            const midX = `calc((${station.x} + ${next.x}) / 2)`;
            
            return (
              <path
                key={i}
                d={`M ${station.x} ${station.y} 
                    Q ${midX} ${station.y},
                      ${midX} ${`calc((${station.y} + ${next.y}) / 2)`}
                    T ${next.x} ${next.y}`}
                stroke="url(#lineGradient)"
                strokeWidth={`calc(5 * ${calculateScaleFactor()})`}
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
                r={`calc(12 * ${calculateScaleFactor()})`}
                fill="#3B82F6"
                className="opacity-30"
              />
              <circle
                cx={station.x}
                cy={station.y}
                r={`calc(6 * ${calculateScaleFactor()})`}
                fill="#3B82F6"
                className="opacity-70"
              />
            </g>
          ))}
        </svg>

        {stations.map((station, i) => (
          <div
            key={station.id}
            className="absolute transition-transform duration-1000 ease-out will-change-transform"
            style={{
              left: station.x,
              top: station.y,
              width: `calc(840 * ${calculateScaleFactor()})`,
              height: `calc(480 * ${calculateScaleFactor()})`,
              transform: `translate(-50%, -50%) scale(${i === currentIndex ? 1 : 0.9})`,
              opacity: Math.abs(currentIndex - i) <= 1 ? 
                      1 - Math.abs(currentIndex - i) * 0.3 : 0,
              zIndex: i === currentIndex ? 20 : 10
            }}
          >
            <div className={`pb-[calc(24 * ${calculateScaleFactor()})]`}>
              <div className={`w-full h-full bg-white rounded-xl transition-shadow duration-500
                              ${i === currentIndex 
                                ? 'shadow-[0_8px_30px_rgba(59,130,246,0.15)]' 
                                : 'shadow-lg'}`} 
              >
                {i === 0 ? (
                  <DashboardContainer onNavigate={navigateToContainer} />
                ) : i === 1 ? (
                  <DashboardContainer2 />
                ) : (
                  renderKPIBox(station.kpis)
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {isVisible && (
        <>
          {/* Navigation Dots */}
          <div className="absolute bottom-[calc(32 * var(--scale-factor))] left-1/2 transform -translate-x-1/2 flex gap-[calc(24 * var(--scale-factor))] z-50 transition-opacity ease-in-out duration-300">
            {stations.map((_, i) => (
              <button
                key={i}
                onClick={() => navigate(i)}
                disabled={isAnimating}
                className={`
                  w-[calc(16 * var(--scale-factor))] 
                  h-[calc(16 * var(--scale-factor))]
                  rounded-full transform transition-all duration-300 will-change-transform
                  ${i === currentIndex 
                    ? 'bg-blue-800 scale-110 ring-[calc(4 * var(--scale-factor))] ring-blue-300 animate-pulse-slow' 
                    : 'bg-blue-600 hover:bg-blue-700'}
                  disabled:opacity-50
                `}
                style={{
                  WebkitTapHighlightColor: 'transparent'
                }}
                aria-label={`Navigate to station ${i + 1}`}
                aria-current={i === currentIndex ? 'true' : 'false'}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="absolute top-[calc(32 * var(--scale-factor))] left-1/2 transform -translate-x-1/2 w-[calc(384 * var(--scale-factor))] h-[calc(4 * var(--scale-factor))] 
                         bg-blue-100 rounded-full overflow-hidden z-50">
            <div 
              className="h-full bg-blue-600 transition-all duration-1000 ease-out will-change-transform"
              style={{ width: `${(currentIndex / (stations.length - 1)) * 100}%` }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SmoothJourney;
