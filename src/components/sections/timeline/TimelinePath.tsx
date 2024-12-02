import React from 'react';

interface Station {
  x: number;
  y: number;
  id: number;
}

interface TimelinePathProps {
  stations: Station[];
  currentIndex: number;
}

export const TimelinePath: React.FC<TimelinePathProps> = ({ stations, currentIndex }) => (
  <svg className="absolute inset-0" style={{ width: '1500px', height: '1200px' }}>
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
          strokeWidth="3"
          fill="none"
          className={`transition-opacity duration-500
                     ${Math.abs(currentIndex - i) <= 1 ? 'opacity-100' : 'opacity-30'}`}
        />
      );
    })}

    {stations.map((station, i) => (
      <g key={i}>
        <circle cx={station.x} cy={station.y} r="6" fill="#3B82F6" className="opacity-30" />
        <circle cx={station.x} cy={station.y} r="3" fill="#3B82F6" className="opacity-70" />
      </g>
    ))}
  </svg>
);
