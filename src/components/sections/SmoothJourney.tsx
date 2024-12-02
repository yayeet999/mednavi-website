'use client';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import DashboardContainer from '@/components/dashboard/DashboardContainer';
import DashboardContainer2 from '@/components/dashboard/DashboardContainer2';
import DashboardContainer3 from '@/components/dashboard/DashboardContainer3';
import DashboardContainer4 from '@/components/dashboard/DashboardContainer4';

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
  const [windowSize, setWindowSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [scrollLockTop, setScrollLockTop] = useState(false);
  const [scrollLockBottom, setScrollLockBottom] = useState(false);
  const scrollLockTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setWindowSize({
        width: width,
        height: height
      });
      setIsMobile(width < 768);
      console.log(`Window resized: width=${width}, height=${height}, isMobile=${width < 768}`);
    };

    setMounted(true);
    console.log('Component mounted');

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile || !mounted) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const isVisibleNow = rect.top < window.innerHeight && rect.bottom >= 0;

      setIsVisible(isVisibleNow);
      console.log(`Mobile Scroll: isVisibleNow=${isVisibleNow}`);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, mounted]);

  useEffect(() => {
    if (isMobile || !mounted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const isVisibleNow = entry.isIntersecting;
        console.log('Desktop Visibility:', isVisibleNow);
        setIsVisible(isVisibleNow);

        if (isVisibleNow) {
          if (sectionRef.current) {
            sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            console.log('Auto-scrolled to center SmoothJourney');
          }
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
      console.log('Intersection Observer attached');
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
        console.log('Intersection Observer detached');
      }
      document.body.style.overflow = '';
      console.log('Scroll unlocked on cleanup');
    };
  }, [isMobile, mounted]);

  const handleScroll = useCallback((e: WheelEvent) => {
    if (!isVisible || isAnimating || isMobile) return;

    const direction = e.deltaY > 0 ? 'down' : 'up';
    console.log(`Wheel scrolling ${direction}`);

    if (direction === 'up' && scrollLockTop) {
      e.preventDefault();
      console.log('Scroll up is temporarily locked');
      return;
    }

    if (direction === 'down' && scrollLockBottom) {
      e.preventDefault();
      console.log('Scroll down is temporarily locked');
      return;
    }

    e.preventDefault();
    const nextIndex = Math.max(0, Math.min(stations.length - 1, currentIndex + (direction === 'down' ? 1 : -1)));

    if (nextIndex !== currentIndex) {
      console.log(`Navigating from index ${currentIndex} to ${nextIndex}`);
      setIsAnimating(true);
      setCurrentIndex(nextIndex);
      setTimeout(() => setIsAnimating(false), 1000);
    }

    if (nextIndex === 0 && direction === 'up') {
      setScrollLockTop(true);
      console.log('Scroll up locked for 2.5 seconds');
      if (scrollLockTimeoutRef.current) clearTimeout(scrollLockTimeoutRef.current);
      scrollLockTimeoutRef.current = setTimeout(() => {
        setScrollLockTop(false);
        console.log('Scroll up lock released');
      }, 2500);
    }

    if (nextIndex === stations.length - 1 && direction === 'down') {
      setScrollLockBottom(true);
      console.log('Scroll down locked for 2.5 seconds');
      if (scrollLockTimeoutRef.current) clearTimeout(scrollLockTimeoutRef.current);
      scrollLockTimeoutRef.current = setTimeout(() => {
        setScrollLockBottom(false);
        console.log('Scroll down lock released');
      }, 2500);
    }
  }, [currentIndex, isAnimating, isVisible, isMobile, scrollLockTop, scrollLockBottom]);

  useEffect(() => {
    if (isMobile || !mounted) return;

    const section = sectionRef.current;
    if (!section) return;

    const handleWheelEvent = (e: WheelEvent) => {
      console.log('Wheel event detected');
      handleScroll(e);
    };

    section.addEventListener('wheel', handleWheelEvent, { passive: false });
    console.log('Wheel event listener attached');

    return () => {
      section.removeEventListener('wheel', handleWheelEvent);
      console.log('Wheel event listener detached');
    };
  }, [handleScroll, isMobile, mounted]);

  const navigate = useCallback((index: number) => {
    if (isAnimating || index === currentIndex) return;
    console.log(`Button clicked to navigate to station ${index + 1}`);
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 1000);
  }, [currentIndex, isAnimating]);

  const navigateToContainer = useCallback(() => {
    navigate(1);
  }, [navigate]);

  const navigateToHome = useCallback(() => {
    navigate(0);
  }, [navigate]);

  const navigateToPractice = useCallback(() => {
    navigate(1);
  }, [navigate]);

  const navigateToLocation = useCallback(() => {
    navigate(3);
  }, [navigate]);

  useEffect(() => {
    return () => {
      if (scrollLockTimeoutRef.current) {
        clearTimeout(scrollLockTimeoutRef.current);
      }
      document.body.style.overflow = '';
      console.log('Full page scroll unlocked on cleanup');
    };
  }, []);

  useEffect(() => {
    const isVeryWideScreen = windowSize.width >= 1200;
    if (!isMobile && isVeryWideScreen) {
      if (currentIndex >= 1 && currentIndex <= 3) {
        document.body.style.overflow = 'hidden';
        console.log('Full page scroll locked');
      } else if (currentIndex === 0 || currentIndex === 3) {
        document.body.style.overflow = 'hidden';
        console.log('Full page scroll temporarily locked for 1 second');

        const timeout = setTimeout(() => {
          document.body.style.overflow = '';
          console.log('Full page scroll unlocked after 1 second');
        }, 1000);

        return () => clearTimeout(timeout);
      } else {
        document.body.style.overflow = '';
        console.log('Full page scroll unlocked');
      }
    } else {
      document.body.style.overflow = '';
      console.log('Full page scroll unlocked for non-desktop or not very wide screens');
    }

    return () => {
      document.body.style.overflow = '';
      console.log('Full page scroll unlocked on cleanup');
    };
  }, [currentIndex, isMobile, windowSize.width]);

  if (!mounted) {
    console.log('Component not mounted yet');
    return null;
  }

  const currentPosition = stations[currentIndex];
  const mobileOffset = isMobile ? -150 : 0;

  return (
    <div 
      ref={sectionRef}
      className="relative w-full h-[70vh] md:h-screen bg-[#EBF4FF] overflow-hidden"
    >
      <div 
        className="relative w-full h-full transition-transform duration-1000 ease-out will-change-transform"
        style={{
          transform: `translate(${windowSize.width / 2 - currentPosition.x}px, ${windowSize.height / 2 - currentPosition.y + mobileOffset}px)`
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
    className={`absolute w-[360px] md:w-[840px] h-[340px] md:h-[480px] transition-transform duration-1000 ease-out will-change-transform
                ${i === currentIndex ? 'z-20' : 'z-10'}`}
    style={{
      left: station.x,
      top: station.y,
      transform: `translate(-50%, -50%) scale(${i === currentIndex ? 1 : 0.9})`,
      opacity: Math.abs(currentIndex - i) <= 1 ? 
              1 - Math.abs(currentIndex - i) * 0.3 : 0,
    }}
  >
    <div className="pb-4 md:pb-6">
      <div className={`w-full h-full bg-white rounded-xl transition-shadow...`}>
        {i === 0 ? (
          <DashboardContainer onNavigate={navigateToContainer} />
        ) : i === 1 ? (
          <DashboardContainer2 onNavigateToMap={() => navigate(2)} />
        ) : i === 2 ? (
          <DashboardContainer3 
            onNavigateToHome={navigateToHome}
            onNavigateToPractice={navigateToPractice}
            onNavigateToLocation={navigateToLocation}
          />
        ) : (
          <DashboardContainer4 
            onNavigateToHome={navigateToHome}
            onNavigateToPractice={navigateToPractice}
            onNavigateToMap={() => navigate(2)}
          />
        )}
      </div>
    </div>
  </div>
))}
</div>

{isVisible && (
  <>
    <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-6 z-50
                    transition-opacity ease-in-out duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {stations.map((_, i) => (
        <button
          key={i}
          onClick={() => navigate(i)}
          disabled={isAnimating}
          className={`
            ${isMobile ? 'w-10 h-10' : 'w-4 h-4'}
            rounded-full transform transition-all duration-300 will-change-transform
            ${i === currentIndex 
              ? 'bg-blue-800 scale-110 ring-4 ring-blue-300 animate-pulse-slow' 
              : 'bg-blue-600 hover:bg-blue-700'}
            ${isMobile ? 'touch-manipulation' : ''}
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

    {!isMobile && (
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-96 h-1 
                       bg-blue-100 rounded-full overflow-hidden z-50">
        <div 
          className="h-full bg-blue-600 transition-all duration-1000 ease-out will-change-transform"
          style={{ width: `${(currentIndex / (stations.length - 1)) * 100}%` }}
        />
      </div>
    )}
  </>
)}
</div>
);
};

export default SmoothJourney;
