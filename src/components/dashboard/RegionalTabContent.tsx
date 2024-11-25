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

interface GeographyStyleProps {
  outline: string;
  transition?: string;
  fill?: string;
  cursor?: string;
}

const zipCodes: ZipCode[] = [
  { id: "60714", name: "Niles" },
  { id: "60631", name: "Edison Park" },
  { id: "60656", name: "Norwood Park" },
  { id: "60068", name: "Park Ridge" },
];

const icons: Icon[] = [
  { id: "financial", icon: DollarSign, label: "Financial" },
  { id: "patients", icon: Users, label: "Patients" },
  { id: "procedures", icon: Stethoscope, label: "Procedures" },
];

const RegionalTabContent: React.FC = () => {
  const [selectedZip, setSelectedZip] = useState<string | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<Icon['id'] | null>(null);
  const [selectedSubData, setSelectedSubData] = useState<string | null>(null);

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
      x: 50,
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
    },
    exit: {
      opacity: 0,
      x: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  const dataContainerVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      height: 0
    },
    visible: { 
      opacity: 1, 
      y: 0,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="w-full h-full bg-white rounded-lg p-4 flex flex-col">
      <div className="flex flex-1 min-h-0">
        <motion.div 
          className="bg-gray-50 rounded-xl shadow-sm"
          variants={mapContainerVariants}
          animate={selectedIcon ? 'reduced' : 'full'}
          transition={{
            duration: 0.3,
            ease: "easeInOut"
          }}
        >
          <div className="p-4 h-full flex flex-col">
            <div className="flex-1 relative min-h-0">
              <ComposableMap 
                projection="geoAlbers" 
                projectionConfig={{ scale: 20000 }}
                className="w-full h-full"
              >
                <ZoomableGroup 
                  center={[-87.8, 42.0]} 
                  zoom={1}
                  minZoom={0.8}
                  maxZoom={2}
                >
                  <Geographies geography="/chicago-zipcodes.json">
                    {({ geographies }: GeographiesProps) =>
                      geographies.map((geo: GeographyType) => {
                        const isClickable = zipCodes.some(zip => zip.id === geo.properties.zip);
                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill={isClickable ? '#E2E8F0' : '#F1F5F9'}
                            stroke={isClickable ? '#94A3B8' : '#CBD5E1'}
                            strokeWidth={0.5}
                            style={{
                              default: { 
                                outline: "none",
                                transition: 'all 0.3s'
                              } as GeographyStyleProps,
                              hover: { 
                                outline: "none",
                                fill: isClickable ? '#CBD5E1' : '#F1F5F9',
                                cursor: isClickable ? 'pointer' : 'default'
                              } as GeographyStyleProps,
                              pressed: { 
                                outline: "none",
                                fill: '#94A3B8'
                              } as GeographyStyleProps,
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

            <AnimatePresence>
              {selectedZip && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="flex justify-center mt-4 space-x-3 md:space-x-4"
                >
                  {icons.map((icon) => (
                    <button
                      key={icon.id}
                      onClick={() => handleIconClick(icon.id)}
                      className={`
                        p-2 md:p-3 rounded-xl flex items-center transition-all duration-200
                        ${selectedIcon === icon.id 
                          ? 'bg-[#052b52] text-white shadow-md scale-105' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }
                      `}
                    >
                      <icon.icon className="w-4 h-4 md:w-5 md:h-5" />
                      <span className="hidden md:inline ml-2 text-sm font-medium">{icon.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {selectedIcon && (
            <motion.div 
              className="w-[30%] ml-4 bg-gray-50 rounded-xl p-4 shadow-sm"
              variants={sideContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h3 className="text-sm md:text-base font-bold text-gray-800 mb-3">Analysis Options</h3>
              <div className="space-y-2">
                {['Monthly Trends', 'Demographics', 'Growth Rate'].map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSubDataClick(option)}
                    className={`
                      w-full p-2 md:p-3 text-left rounded-lg transition-all duration-200
                      ${selectedSubData === option 
                        ? 'bg-[#052b52] text-white' 
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                      }
                      text-xs md:text-sm font-medium
                    `}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedSubData && (
          <motion.div 
            className="mt-4 bg-gray-50 rounded-xl p-4 shadow-sm"
            variants={dataContainerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm md:text-base font-bold text-gray-800">
                {selectedSubData} Analysis
              </h3>
              <span className="text-xs md:text-sm text-gray-500">
                {zipCodes.find(zip => zip.id === selectedZip)?.name || selectedZip}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              <p>Analysis data for {selectedSubData.toLowerCase()} in {zipCodes.find(zip => zip.id === selectedZip)?.name}.</p>
              <p className="mt-2">ZIP Code: {selectedZip}</p>
              <p>Category: {icons.find(icon => icon.id === selectedIcon)?.label}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RegionalTabContent;
