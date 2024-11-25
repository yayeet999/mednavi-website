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
    <div className="w-full h-full flex">
      <motion.div 
        className="relative bg-gray-50 rounded-xl shadow-sm overflow-hidden"
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
            {/* Background grid pattern */}
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#f0f0f0" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Niles (60714) */}
            <path
              d="M 450 300 L 550 300 L 550 400 L 450 400 Z"
              className={`transition-all duration-200 ${
                selectedZip === "60714"
                  ? 'fill-[#052b52] stroke-[#052b52]'
                  : 'fill-[#E2E8F0] stroke-[#94A3B8] hover:fill-[#CBD5E1]'
              }`}
              strokeWidth="1"
              onClick={() => handleZipClick("60714")}
              style={{ cursor: 'pointer' }}
            />
            <text x="500" y="350" textAnchor="middle" className="text-[8px] pointer-events-none">
              Niles
            </text>

            {/* Edison Park (60631) */}
            <path
              d="M 550 300 L 650 300 L 650 400 L 550 400 Z"
              className={`transition-all duration-200 ${
                selectedZip === "60631"
                  ? 'fill-[#052b52] stroke-[#052b52]'
                  : 'fill-[#E2E8F0] stroke-[#94A3B8] hover:fill-[#CBD5E1]'
              }`}
              strokeWidth="1"
              onClick={() => handleZipClick("60631")}
              style={{ cursor: 'pointer' }}
            />
            <text x="600" y="350" textAnchor="middle" className="text-[8px] pointer-events-none">
              Edison Park
            </text>

            {/* Norwood Park (60656) */}
            <path
              d="M 450 400 L 550 400 L 550 500 L 450 500 Z"
              className={`transition-all duration-200 ${
                selectedZip === "60656"
                  ? 'fill-[#052b52] stroke-[#052b52]'
                  : 'fill-[#E2E8F0] stroke-[#94A3B8] hover:fill-[#CBD5E1]'
              }`}
              strokeWidth="1"
              onClick={() => handleZipClick("60656")}
              style={{ cursor: 'pointer' }}
            />
            <text x="500" y="450" textAnchor="middle" className="text-[8px] pointer-events-none">
              Norwood Park
            </text>

            {/* Park Ridge (60068) */}
            <path
              d="M 550 400 L 650 400 L 650 500 L 550 500 Z"
              className={`transition-all duration-200 ${
                selectedZip === "60068"
                  ? 'fill-[#052b52] stroke-[#052b52]'
                  : 'fill-[#E2E8F0] stroke-[#94A3B8] hover:fill-[#CBD5E1]'
              }`}
              strokeWidth="1"
              onClick={() => handleZipClick("60068")}
              style={{ cursor: 'pointer' }}
            />
            <text x="600" y="450" textAnchor="middle" className="text-[8px] pointer-events-none">
              Park Ridge
            </text>
          </svg>
        </div>

        {/* Controls */}
        <div className="absolute bottom-4 left-4 space-y-2">
          <button
            onClick={() => setScale(Math.min(scale + 0.2, 2.5))}
            className="bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-sm text-xs"
          >
            Zoom In
          </button>
          <button
            onClick={() => setScale(Math.max(scale - 0.2, 1))}
            className="bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-sm text-xs"
          >
            Zoom Out
          </button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#E2E8F0] border border-[#94A3B8]" />
            <span className="text-gray-600">Available Regions</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-3 h-3 bg-[#052b52]" />
            <span className="text-gray-600">Selected Region</span>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedIcon && window.innerWidth >= 768 && (
          <motion.div 
            className="w-[30%] ml-4 bg-gray-50 rounded-xl shadow-sm"
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
      </AnimatePresence>
    </div>
  );
};

export default RegionalTabContent;
