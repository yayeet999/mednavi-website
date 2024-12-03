'use client';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Home, BarChart2, Map, MapPin, Bot } from 'lucide-react';
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

const ANIMATION_DURATION = 1000;

const SmoothJourney: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [windowSize, setWindowSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mobile-only scroll handling
  useEffect(() => {
    if (!isMobile || !mounted) return;

    const handleMobileScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setIsVisible(rect.top < window.innerHeight && rect.bottom >= 0);
    };

    handleMobileScroll();
    window.addEventListener('scroll', handleMobileScroll);
    return () => window.removeEventListener('scroll', handleMobileScroll);
  }, [isMobile, mounted]);

  // Mobile-only intersection observer
  useEffect(() => {
    if (!isMobile || !mounted) return;

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

  if (isMobile) {
    // Mobile version - unchanged
    return (
      <div 
        ref={sectionRef}
        className="relative w-full h-[70vh] bg-[#EBF4FF] overflow-hidden"
      >
        <div 
          className="relative w-full h-full transition-transform duration-1000 ease-out will-change-transform"
          style={{
            transform: `translate(${windowSize.width / 2 - currentPosition.x}px, ${windowSize.height / 2 - currentPosition.y + mobileOffset}px)`
          }}
        >
          {/* SVG Path and circles */}
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
                  className="transition-opacity duration-500"
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

          <div
            className={`absolute w-[360px] h-[340px] transition-all duration-1000 ease-out will-change-transform`}
            style={{
              left: currentPosition.x,
              top: currentPosition.y,
              transform: `translate(-50%, -50%)`,
            }}
          >
            <div className="pb-4">
              <div className="w-full h-full bg-white rounded-xl">
                {currentIndex === 0 ? (
                  <DashboardContainer onNavigate={navigateToContainer} />
                ) : currentIndex === 1 ? (
                  <DashboardContainer2 onNavigateToMap={() => navigate(2)} />
                ) : currentIndex === 2 ? (
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
                    w-10 h-10
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
                    size={20}
                    className={`transform transition-colors duration-300
                               ${i === currentIndex ? 'text-white' : 'text-white/90'}`}
                  />
                </button>
              );
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
  }

  // Desktop version - vertical layout
  return (
    <div 
      ref={sectionRef}
      className="relative w-full min-h-[400vh] bg-[#EBF4FF] overflow-hidden"
    >
      <div className="sticky top-0 w-full h-screen flex items-center justify-center">
        {stations.map((station, i) => (
          <div
            key={station.id}
            className={`absolute w-[840px] h-[480px] transition-all duration-700 ease-out
                       ${Math.abs(i - currentIndex) <= 1 ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="pb-6">
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

      {/* Scroll sections to trigger index changes */}
      {stations.map((_, i) => (
        <div
          key={i}
          className="h-screen w-full"
          onMouseEnter={() => {
            if (currentIndex !== i) {
              setCurrentIndex(i);
            }
          }}
        />
      ))}
    </div>
  );
};

export default SmoothJourney;
