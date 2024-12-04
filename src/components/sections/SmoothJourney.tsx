'use client';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Home, BarChart2, Map, MapPin } from 'lucide-react';
import DashboardContainer from '@/components/dashboard/DashboardContainer';
import DashboardContainer2 from '@/components/dashboard/DashboardContainer2';
import DashboardContainer3 from '@/components/dashboard/DashboardContainer3';
import DashboardContainer4 from '@/components/dashboard/DashboardContainer4';

const stations = [
  { id: 1, x: 400, y: 300 },
  { id: 2, x: 1800, y: 600 },
  { id: 3, x: 600, y: 1200 },
  { id: 4, x: 2000, y: 1500 }
];

const navigationIcons = [
  { id: 'home', Icon: Home },
  { id: 'practice', Icon: BarChart2 },
  { id: 'map', Icon: Map },
  { id: 'location', Icon: MapPin }
];

const SCROLL_COOLDOWN = 500; // ms between scroll actions
const ANIMATION_DURATION = 1000; // ms for transitions

const SmoothJourney: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [windowSize, setWindowSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef<number>(0);

  const handleScroll = useCallback((e: WheelEvent) => {
    if (!isVisible || isAnimating || isMobile) return;

    const now = Date.now();
    if (now - lastScrollTime.current < SCROLL_COOLDOWN) return;
    lastScrollTime.current = now;

    const direction = e.deltaY > 0 ? 'down' : 'up';
    e.preventDefault();

    const nextIndex = Math.max(0, Math.min(stations.length - 1, currentIndex + (direction === 'down' ? 1 : -1)));
    if (nextIndex !== currentIndex) {
      setIsAnimating(true);
      setCurrentIndex(nextIndex);
      setTimeout(() => setIsAnimating(false), ANIMATION_DURATION);
    }
  }, [currentIndex, isAnimating, isVisible, isMobile]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
      setIsMobile(window.innerWidth < 768);
    };

    setMounted(true);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      setMounted(false); // Ensure mounted state is reset
    };
  }, []);

  useEffect(() => {
    if (!isMobile || !mounted) return;

    const handleScrollEvent = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setIsVisible(rect.top < window.innerHeight && rect.bottom >= 0);
    };

    handleScrollEvent();
    window.addEventListener('scroll', handleScrollEvent);
    return () => window.removeEventListener('scroll', handleScrollEvent);
  }, [isMobile, mounted]);

  useEffect(() => {
    if (isMobile || !mounted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);

        if (entry.isIntersecting && sectionRef.current) {
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
    };
  }, [isMobile, mounted]);

  useEffect(() => {
  if (isMobile || !mounted) return;

  const section = sectionRef.current;
  if (!section) return;

  section.addEventListener('wheel', handleScroll, { passive: false });
  return () => {
    section.removeEventListener('wheel', handleScroll);
    setMounted(false); // Ensure mounted state is reset
  };
}, [handleScroll, isMobile, mounted]);

  const navigate = useCallback((index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), ANIMATION_DURATION);
  }, [currentIndex, isAnimating]);

  const navigateToContainer = useCallback(() => navigate(1), [navigate]);
  const navigateToHome = useCallback(() => navigate(0), [navigate]);
  const navigateToPractice = useCallback(() => navigate(1), [navigate]);
  const navigateToLocation = useCallback(() => navigate(3), [navigate]);

  if (!mounted) return null;

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
              <div className="w-full h-full bg-white rounded-xl">
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
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-6 z-50
                      transition-opacity ease-in-out duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {navigationIcons.map((nav, i) => {
            const { Icon } = nav;
            return (
              <button
                key={i}
                onClick={() => navigate(i)}
                disabled={isAnimating}
                className={`
                  flex items-center justify-center
                  ${isMobile ? 'w-10 h-10' : 'w-6 h-6'}
                  rounded-full transform transition-all duration-300 will-change-transform
                  ${i === currentIndex 
                    ? 'bg-blue-800 scale-110 ring-4 ring-blue-300 animate-[pulse_3s_ease-in-out_infinite]' 
                    : 'bg-blue-600 hover:bg-blue-700 hover:scale-105'}
                  disabled:opacity-50
                `}
                style={{
                  WebkitTapHighlightColor: 'transparent'
                }}
                aria-label={`Navigate to ${nav.id}`}
                aria-current={i === currentIndex ? 'true' : 'false'}
              >
                <Icon 
                  size={isMobile ? 20 : 14} 
                  className={`transform transition-colors duration-300
                             ${i === currentIndex ? 'text-white' : 'text-white/90'}`}
                />
              </button>
            )
          })}
        </div>
      )}

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1.1);
            opacity: 1;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};

export default SmoothJourney;
