import React from 'react';

interface TimelineStationProps {
  station: { x: number; y: number; id: number };
  index: number;
  currentIndex: number;
  renderKPIBox: (index: number) => React.ReactNode;
}

export const TimelineStation: React.FC<TimelineStationProps> = ({ 
  station, 
  index: i, 
  currentIndex, 
  renderKPIBox 
}) => (
  <div
    className={`absolute w-80 h-64 transition-all duration-1000 ease-out
                ${i === currentIndex ? 'z-20' : 'z-10'}`}
    style={{
      left: station.x,
      top: station.y,
      transform: `translate(-50%, -50%) scale(${i === currentIndex ? 1 : 0.9})`,
      opacity: Math.abs(currentIndex - i) <= 1 ? 1 - Math.abs(currentIndex - i) * 0.3 : 0,
    }}
  >
    <div 
      className={`w-full h-full bg-white rounded-xl transition-all duration-500
                  ${i === currentIndex ? 'shadow-[0_8px_30px_rgb(59,130,246,0.15)]' : 'shadow-lg'}`}
    >
      {renderKPIBox(i)}
    </div>
  </div>
);
