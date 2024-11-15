'use client'
import React, { useState, useCallback, useEffect } from 'react';
import { TimelineStation } from './timeline/TimelineStation';
import { TimelinePath } from './timeline/TimelinePath';
import { renderKPIBox } from './timeline/KPIBox';

const stations = [
  { id: 1, x: 200, y: 150 },
  { id: 2, x: 900, y: 300 },
  { id: 3, x: 300, y: 600 },
  { id: 4, x: 1000, y: 750 },
  { id: 5, x: 500, y: 900 }
];

export default function SmoothJourney() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

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

  return (
    <div className="w-full h-screen bg-[#EBF4FF] overflow-hidden">
      <div 
        className="relative w-full h-full transition-transform duration-1000 ease-out"
        style={{
          transform: `translate(${window.innerWidth/2 - currentPosition.x}px, ${window.innerHeight/2 - currentPosition.y}px)`
        }}
      >
        <TimelinePath stations={stations} currentIndex={currentIndex} />

        {stations.map((station, i) => (
          <TimelineStation
            key={station.id}
            station={station}
            index={i}
            currentIndex={currentIndex}
            renderKPIBox={renderKPIBox}
          />
        ))}
      </div>

      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
        {stations.map((_, i) => (
          <button
            key={i}
            onClick={() => navigate(i)}
            disabled={isAnimating}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300
                       ${i === currentIndex ? 'bg-blue-500 scale-125' : 'bg-blue-200 hover:bg-blue-300'}`}
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
