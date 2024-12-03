'use client';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Home, BarChart2, Map, MapPin, Bot } from 'lucide-react';
import DashboardContainer from '@/components/dashboard/DashboardContainer';
import DashboardContainer2 from '@/components/dashboard/DashboardContainer2';
import DashboardContainer3 from '@/components/dashboard/DashboardContainer3';
import DashboardContainer4 from '@/components/dashboard/DashboardContainer4';

// Desktop optimized station positions that define the path
const desktopStations = [
  { id: 1, x: 600, y: 300 },
  { id: 2, x: 1600, y: 600 },
  { id: 3, x: 800, y: 900 },
  { id: 4, x: 1800, y: 1200 }
];

// Mobile optimized station positions with reduced distances
const mobileStations = [
  { id: 1, x: 400, y: 200 },
  { id: 2, x: 1400, y: 400 },
  { id: 3, x: 600, y: 600 },
  { id: 4, x: 1400, y: 800 }
];

const navigationIcons = [
  { id: 'home', Icon: Home },
  { id: 'practice', Icon: BarChart2 },
  { id: 'map', Icon: Map },
  { id: 'location', Icon: MapPin }
];

// Helper function to calculate position along Bezier curve
const getBezierPoint = (t: number, p0: number, p1: number, p2: number): number => {
  const oneMinusT = 1 - t;
  return Math.pow(oneMinusT, 2) * p0 + 2 * oneMinusT * t * p1 + Math.pow(t, 2) * p2;
};

// Helper function to calculate position along the path
const getPathPosition = (progress: number, stations: typeof desktopStations): { x: number; y: number } => {
  const numSegments = stations.length - 1;
  const segmentProgress = progress * numSegments;
  const currentSegment = Math.min(Math.floor(segmentProgress), numSegments - 1);
  const segmentT = segmentProgress - currentSegment;

  const start = stations[currentSegment];
  const end = stations[currentSegment + 1];
  const midX = (start.x + end.x) / 2;
  const midY = (start.y + end.y) / 2;

  // Use quadratic Bezier curve for smooth path following
  const x = getBezierPoint(segmentT, start.x, midX, end.x);
  const y = getBezierPoint(segmentT, start.y, midY, end.y);

  return { x, y };
};

const SmoothJourney: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [windowSize, setWindowSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [transformValue, setTransformValue] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Enhanced desktop scroll handling
  useEffect(() => {
    if (isMobile || !mounted || !containerRef.current) return;

    const handleDesktopScroll = () => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      
      // Calculate scroll progress (0 to 1)
      const totalScrollHeight = container.offsetHeight - window.innerHeight;
      const currentScroll = -rect.top;
      const scrollProgress = Math.max(0, Math.min(1, currentScroll / totalScrollHeight));

      // Get position along the path
      const position = getPathPosition(scrollProgress, desktopStations);
      
      // Calculate the target index based on scroll progress
      const targetIndex = Math.min(
        desktopStations.length - 1,
        Math.floor(scrollProgress * (desktopStations.length - 1))
      );

      if (targetIndex !== currentIndex) {
        setCurrentIndex(targetIndex);
      }

      // Center the current position in the viewport
      setTransformValue({
        x: windowSize.width / 2 - position.x,
        y: windowSize.height / 2 - position.y
      });
    };

    const throttledScroll = () => {
      requestAnimationFrame(handleDesktopScroll);
    };

    window.addEventListener('scroll', throttledScroll);
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [isMobile, mounted, currentIndex, windowSize]);

  // Mobile visibility and other handlers remain the same...
  // ... (rest of the hooks and handlers remain unchanged)

  if (!mounted) return null;

  // Mobile rendering
  if (isMobile) {
    const currentPosition = mobileStations[currentIndex];
    const mobileOffset = -150;
    
    return (
      // Mobile JSX stays the same but uses mobileStations instead of stations
      // ... (rest of mobile JSX remains unchanged but using mobileStations)
    );
  }

  // Desktop rendering
  return (
    <div ref={containerRef} className="h-[400vh] relative">
      <div className="sticky top-0 h-screen w-full bg-[#EBF4FF] overflow-hidden">
        <div 
          className="relative w-full h-full will-change-transform"
          style={{
            transform: `translate(${transformValue.x}px, ${transformValue.y}px)`,
            transition: 'transform 0.1s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {/* SVG Path */}
          <svg className="absolute inset-0" style={{ width: '3000px', height: '2400px' }}>
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {desktopStations.map((station, i) => {
              if (i === desktopStations.length - 1) return null;
              const next = desktopStations[i + 1];
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

            {desktopStations.map((station, i) => (
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

          {/* Dashboard Containers */}
          {desktopStations.map((station, i) => (
            <div
              key={station.id}
              className={`absolute w-[840px] h-[480px] transition-all duration-700 ease-out will-change-transform
                        ${i === currentIndex ? 'z-20' : 'z-10'}`}
              style={{
                left: station.x,
                top: station.y,
                transform: `translate(-50%, -50%) scale(${i === currentIndex ? 1 : 0.9})`,
                opacity: Math.abs(currentIndex - i) <= 1 ? 
                        1 - Math.abs(currentIndex - i) * 0.3 : 0,
              }}
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
      </div>
    </div>
  );
};

export default SmoothJourney;
