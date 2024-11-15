'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';

const stations = [
  { 
    id: 1, 
    content: {
      revenue: { value: "67,792", change: "+15.1" },
      users: { value: "918", change: "+6.7" },
      conversion: { value: "63.8", change: "+1.2" },
      growth: { value: "48.9", change: "+11.6" }
    }
  },
  { 
    id: 2, 
    content: {
      revenue: { value: "82,451", change: "+12.3" },
      users: { value: "1,245", change: "+8.4" },
      conversion: { value: "58.2", change: "+2.1" },
      growth: { value: "52.7", change: "+9.8" }
    }
  },
  { 
    id: 3, 
    content: {
      revenue: { value: "94,327", change: "+18.7" },
      users: { value: "1,567", change: "+11.2" },
      conversion: { value: "71.5", change: "+3.8" },
      growth: { value: "61.3", change: "+13.4" }
    }
  },
  { 
    id: 4, 
    content: {
      revenue: { value: "108,965", change: "+16.9" },
      users: { value: "1,892", change: "+9.6" },
      conversion: { value: "68.9", change: "+2.9" },
      growth: { value: "57.8", change: "+10.2" }
    }
  },
  { 
    id: 5, 
    content: {
      revenue: { value: "123,784", change: "+19.2" },
      users: { value: "2,234", change: "+12.8" },
      conversion: { value: "74.3", change: "+4.2" },
      growth: { value: "65.6", change: "+14.7" }
    }
  }
];

const renderKPIBox = (kpis: typeof stations[0]['content']) => (
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
  const [autoScrollMuted, setAutoScrollMuted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollMuteTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize and update window size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setWindowSize({
        width: width,
        height: height
      });
      console.log(`Window resized: width=${width}, height=${height}`);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    console.log('Resize listener attached');

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Intersection Observer to detect when ~30% of SmoothJourney is visible
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const isVisibleNow = entry.isIntersecting;
        console.log('SmoothJourney Visibility:', isVisibleNow);

        if (isVisibleNow && !autoScrollMuted) {
          // Determine scroll direction based on previous scroll position
          const scrollDirection = window.scrollY > prevScrollY.current ? 'down' : 'up';
          console.log(`User is scrolling ${scrollDirection} into SmoothJourney`);

          // Auto-scroll to first or last container based on scroll direction
          if (scrollDirection === 'down') {
            // Scroll down into SmoothJourney
            scrollToContainer(0);
            console.log('Auto-scrolled to first container');
          } else {
            // Scroll up into SmoothJourney
            scrollToContainer(stations.length - 1);
            console.log('Auto-scrolled to last container');
          }

          // Mute automatic scroll for 5 seconds after auto-scroll
          setAutoScrollMuted(true);
          if (autoScrollMuteTimeoutRef.current) clearTimeout(autoScrollMuteTimeoutRef.current);
          autoScrollMuteTimeoutRef.current = setTimeout(() => {
            setAutoScrollMuted(false);
            console.log('Auto-scroll muted for 5 seconds');
          }, 5000);
        }

        setIsVisible(isVisibleNow);
      },
      { threshold: 0.3 } // Trigger when 30% is visible
    );

    observer.observe(sectionRef.current);
    console.log('Intersection Observer attached');

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
        console.log('Intersection Observer detached');
      }
      if (autoScrollMuteTimeoutRef.current) clearTimeout(autoScrollMuteTimeoutRef.current);
    };
  }, [autoScrollMuted]);

  // Track previous scroll position
  const prevScrollY = useRef<number>(window.scrollY);
  useEffect(() => {
    const handleScroll = () => {
      prevScrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to scroll to a specific container
  const scrollToContainer = (index: number) => {
    const container = scrollContainerRef.current?.children[index] as HTMLElement;
    if (container) {
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setCurrentIndex(index);
    }
  };

  // Handle user scrolling through containers
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;

    const scrollTop = scrollContainerRef.current.scrollTop;
    const containerHeight = scrollContainerRef.current.clientHeight;
    const newIndex = Math.round(scrollTop / containerHeight);

    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < stations.length) {
      setCurrentIndex(newIndex);
      console.log(`Scrolled to container ${newIndex + 1}`);
    }
  }, [currentIndex, stations.length]);

  // Attach scroll event to scrollContainer
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    scrollContainer.addEventListener('scroll', handleScroll);
    console.log('Scroll listener attached to scrollContainer');

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      console.log('Scroll listener detached from scrollContainer');
    };
  }, [handleScroll]);

  // Navigate to specific container via buttons
  const navigate = useCallback((index: number) => {
    if (isAnimating || index === currentIndex) return;
    console.log(`Button clicked to navigate to container ${index + 1}`);
    setIsAnimating(true);
    scrollToContainer(index);
    setTimeout(() => setIsAnimating(false), 1000);
  }, [currentIndex, isAnimating]);

  return (
    <div 
      ref={sectionRef}
      className="relative w-full h-screen bg-[#EBF4FF]"
    >
      <div 
        ref={scrollContainerRef}
        className="h-full w-full overflow-y-scroll scroll-smooth snap-y snap-mandatory"
        style={{ scrollBehavior: 'smooth' }}
      >
        {stations.map((station, index) => (
          <div
            key={station.id}
            className="h-screen w-full flex items-center justify-center snap-start"
            style={{
              backgroundColor: index % 2 === 0 ? '#EBF4FF' : '#CFE2FF'
            }}
          >
            <div className="w-4/5 h-4/5 bg-white rounded-xl shadow-lg flex items-center justify-center">
              {renderKPIBox(station.content)}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      {isVisible && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 z-50">
          {stations.map((_, i) => (
            <button
              key={i}
              onClick={() => navigate(i)}
              disabled={isAnimating}
              className={`
                w-4 h-4 rounded-full
                ${i === currentIndex 
                  ? 'bg-blue-800 scale-110 ring-4 ring-blue-300 animate-pulse-slow' 
                  : 'bg-blue-600 hover:bg-blue-700'}
                transition-all duration-300
              `}
              aria-label={`Navigate to container ${i + 1}`}
              aria-current={i === currentIndex ? 'true' : 'false'}
            />
          ))}
        </div>
      )}

      {/* Progress Bar for Desktop */}
      {!isMobile && isVisible && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 w-96 h-1 bg-blue-100 rounded-full overflow-hidden z-50">
          <div 
            className="h-full bg-blue-600 transition-all duration-1000 ease-out"
            style={{ width: `${(currentIndex / (stations.length - 1)) * 100}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default SmoothJourney;
