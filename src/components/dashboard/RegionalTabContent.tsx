import React, { useState } from 'react';
import { DollarSign, Users, Stethoscope } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

interface ZipCode {
  id: string;
  name: string;
}

interface Icon {
  id: 'financial' | 'patients' | 'procedures';
  icon: React.ElementType;
  label: string;
}

const zipCodes: ZipCode[] = [
  { id: "60714", name: "Niles" },
  { id: "60631", name: "Edison Park" },
  { id: "60656", name: "Norwood Park" },
  { id: "60068", name: "Park Ridge" },
];

const RegionalTabContent: React.FC = () => {
  const [selectedZip, setSelectedZip] = useState<string | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<Icon['id'] | null>(null);
  const [selectedSubData, setSelectedSubData] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const icons: Icon[] = [
    { id: "financial", icon: DollarSign, label: "Financial" },
    { id: "patients", icon: Users, label: "Patients" },
    { id: "procedures", icon: Stethoscope, label: "Procedures" },
  ];

  const handleZipClick = (zipId: string) => {
    setSelectedZip(zipId);
    setSelectedIcon(null);
    setSelectedSubData(null);
  };

  const handleIconClick = (iconId: Icon['id']) => {
    setSelectedIcon(iconId);
    setSelectedSubData(null);
  };

  const handleSubDataClick = (subDataId: string) => {
    setSelectedSubData(subDataId);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * -0.01;
    const newScale = Math.min(Math.max(scale + delta, 1), 2.5);
    setScale(newScale);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const mapContainerVariants = {
    full: { width: "100%" },
    reduced: { width: "68%" },
  };

  const sideContainerVariants = {
    hidden: { 
      opacity: 0, 
      x: 20,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row">
      <motion.div 
        className="relative bg-gray-50 rounded-xl shadow-sm overflow-hidden flex-1"
        variants={mapContainerVariants}
        animate={selectedIcon && window.innerWidth >= 768 ? 'reduced' : 'full'}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <AnimatePresence>
          {selectedZip && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-4 left-4 right-4 z-10"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2 shadow-sm">
                <div className="flex justify-center gap-2">
                  {icons.map((icon) => (
                    <button
                      key={icon.id}
                      onClick={() => handleIconClick(icon.id)}
                      className={`
                        px-3 py-2 rounded-lg flex items-center transition-all duration-200
                        ${selectedIcon === icon.id 
                          ? 'bg-[#052b52] text-white shadow-sm' 
                          : 'bg-white/80 text-gray-600 hover:bg-white'}
                      `}
                    >
                      <icon.icon className="w-4 h-4" />
                      <span className="ml-2 text-xs font-medium md:inline hidden">{icon.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div 
          className="h-full relative"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <svg
            viewBox="0 0 1000 1000"
            className="w-full h-full"
            style={{
              transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
              transition: isDragging ? 'none' : 'transform 0.1s ease-out',
              cursor: isDragging ? 'grabbing' : 'grab'
            }}
          >
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#f8fafc" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="#f8fafc" />
            
            {/* Major Roads */}
            <path
              d="M 400 250 L 800 250 M 400 600 L 800 600 M 425 200 L 425 650"
              stroke="#e2e8f0"
              strokeWidth="8"
              fill="none"
            />
            <path
              d="M 600 200 L 600 650"
              stroke="#e2e8f0"
              strokeWidth="8"
              fill="none"
            />

            {/* Niles (60714) */}
            <path
              d="M 450 300 C 475 290, 525 290, 550 300 L 560 375 C 535 385, 485 385, 460 375 Z"
              className={`transition-all duration-200 ${
                selectedZip === "60714"
                  ? 'fill-[#052b52] stroke-[#052b52]'
                  : 'fill-[#E2E8F0] stroke-[#94A3B8] hover:fill-[#CBD5E1]'
              }`}
              strokeWidth="1.5"
              onClick={() => handleZipClick("60714")}
              style={{ cursor: 'pointer' }}
            />

            {/* Edison Park (60631) */}
            <path
              d="M 575 300 C 600 290, 650 290, 675 300 L 685 375 C 660 385, 610 385, 585 375 Z"
              className={`transition-all duration-200 ${
                selectedZip === "60631"
                  ? 'fill-[#052b52] stroke-[#052b52]'
                  : 'fill-[#E2E8F0] stroke-[#94A3B8] hover:fill-[#CBD5E1]'
              }`}
              strokeWidth="1.5"
              onClick={() => handleZipClick("60631")}
              style={{ cursor: 'pointer' }}
            />

            {/* Norwood Park (60656) */}
            <path
              d="M 460 400 C 485 390, 535 390, 560 400 L 570 475 C 545 485, 495 485, 470 475 Z"
              className={`transition-all duration-200 ${
                selectedZip === "60656"
                  ? 'fill-[#052b52] stroke-[#052b52]'
                  : 'fill-[#E2E8F0] stroke-[#94A3B8] hover:fill-[#CBD5E1]'
              }`}
              strokeWidth="1.5"
              onClick={() => handleZipClick("60656")}
              style={{ cursor: 'pointer' }}
            />

            {/* Park Ridge (60068) */}
            <path
              d="M 585 400 C 610 390, 660 390, 685 400 L 695 475 C 670 485, 620 485, 595 475 Z"
              className={`transition-all duration-200 ${
                selectedZip === "60068"
                  ? 'fill-[#052b52] stroke-[#052b52]'
                  : 'fill-[#E2E8F0] stroke-[#94A3B8] hover:fill-[#CBD5E1]'
              }`}
              strokeWidth="1.5"
              onClick={() => handleZipClick("60068")}
              style={{ cursor: 'pointer' }}
            />

            {/* Labels */}
            {zipCodes.map((zip) => {
              const labelPositions = {
                "60714": { x: 505, y: 340 },
                "60631": { x: 630, y: 340 },
                "60656": { x: 515, y: 440 },
                "60068": { x: 640, y: 440 }
              };
              const pos = labelPositions[zip.id as keyof typeof labelPositions];
              return (
                <text
                  key={zip.id}
                  x={pos.x}
                  y={pos.y}
                  textAnchor="middle"
                  className={`text-[11px] font-medium ${
                    selectedZip === zip.id ? 'fill-white' : 'fill-gray-600'
                  } pointer-events-none`}
                >
                  {zip.name}
                </text>
              );
            })}
          </svg>
        </div>

        <div className="absolute bottom-4 left-4 space-y-2">
          <button
            onClick={() => setScale(Math.min(scale + 0.2, 2.5))}
            className="bg-white/90 backdrop-blur-sm rounded-lg w-8 h-8 shadow-sm text-sm flex items-center justify-center"
          >
            +
          </button>
          <button
            onClick={() => setScale(Math.max(scale - 0.2, 1))}
            className="bg-white/90 backdrop-blur-sm rounded-lg w-8 h-8 shadow-sm text-sm flex items-center justify-center"
          >
            -
          </button>
        </div>
      </motion.div>

      {selectedIcon && (
        <motion.div 
          className="w-full md:w-[30%] md:ml-4 bg-gray-50 rounded-xl shadow-sm mt-4 md:mt-0"
          variants={sideContainerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <div className="p-4">
            <h3 className="text-sm font-bold text-gray-800 mb-3">Analysis Options</h3>
            <div className="space-y-2">
              {['Monthly Trends', 'Demographics', 'Growth Rate'].map((option) => (
                <motion.button
                  key={option}
                  onClick={() => handleSubDataClick(option)}
                  className={`
                    w-full p-3 text-left rounded-lg transition-all duration-200
                    ${selectedSubData === option 
                      ? 'bg-[#052b52] text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-100'}
                    text-xs font-medium
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </div>

          {selectedSubData && (
            <motion.div 
              className="p-4 mt-2 border-t border-gray-100"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-bold text-gray-800">{selectedSubData}</h4>
                <span className="text-xs text-gray-500">
                  {zipCodes.find(zip => zip.id === selectedZip)?.name}
                </span>
              </div>
              <div className="text-xs text-gray-600 space-y-1">
                <p>Analysis data for {selectedSubData.toLowerCase()}</p>
                <p>Region: {zipCodes.find(zip => zip.id === selectedZip)?.name}</p>
                <p>Category: {icons.find(icon => icon.id === selectedIcon)?.label}</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default RegionalTabContent;
