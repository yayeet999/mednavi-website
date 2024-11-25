import React, { useState } from 'react';
import { DollarSign, Users, Stethoscope } from 'lucide-react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
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

interface GeographyType {
  rsmKey: string;
  properties: {
    zip: string;
    [key: string]: any;
  };
  geometry: {
    coordinates: number[][];
    type: string;
  };
}

interface GeographiesProps {
  geographies: GeographyType[];
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
  const [position, setPosition] = useState({ coordinates: [-87.85, 42.05], zoom: 1 });

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

        <div className="h-full">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 60000,
              center: [-87.85, 42.05],
              rotate: [0, 0, 0]
            }}
            style={{
              width: "100%",
              height: "100%"
            }}
          >
            <ZoomableGroup
              zoom={position.zoom}
              center={position.coordinates as [number, number]}
              onMoveEnd={setPosition}
              minZoom={0.8}
              maxZoom={2}
            >
              <Geographies geography="/chicago-zipcodes.json">
                {({ geographies }: GeographiesProps) =>
                  geographies.map((geo) => {
                    const isClickable = zipCodes.some(zip => zip.id === geo.properties.zip);
                    const isSelected = geo.properties.zip === selectedZip;
                    
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={isSelected ? '#052b52' : isClickable ? '#E2E8F0' : '#F1F5F9'}
                        stroke={isSelected ? '#052b52' : isClickable ? '#94A3B8' : '#CBD5E1'}
                        strokeWidth={isSelected ? 2 : 0.5}
                        style={{
                          default: { 
                            outline: "none",
                            transition: 'all 0.3s'
                          },
                          hover: { 
                            outline: "none",
                            fill: isClickable ? (isSelected ? '#052b52' : '#CBD5E1') : '#F1F5F9',
                            cursor: isClickable ? 'pointer' : 'default'
                          },
                          pressed: { 
                            outline: "none",
                            fill: '#052b52'
                          }
                        }}
                        onClick={() => {
                          if (isClickable) {
                            handleZipClick(geo.properties.zip);
                          }
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </div>

        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-xs">
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
