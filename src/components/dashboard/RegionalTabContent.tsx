import React, { useState, useCallback, useEffect, useMemo, useRef, forwardRef, useImperativeHandle } from 'react';
import { DollarSign, Users, Stethoscope } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import AnalysisContent from './AnalysisContent';

interface ZipCode {
  id: ValidZipCode;
  name: string;
  center: { lat: number; lng: number };
}

interface Icon {
  id: 'financial' | 'patients' | 'procedures';
  icon: React.ElementType;
  label: string;
}

type ValidZipCode = keyof typeof analysisData;

const analysisData = {
  "60714": {
    financial: {
      monthlyProduction: {
        regional: {
          total: 52450,
          breakdown: {
            "Aligners": { amount: 18357, percentage: 35 },
            "Hygiene": { amount: 15735, percentage: 30 },
            "Root Canals": { amount: 10490, percentage: 20 },
            "Whitening": { amount: 4196, percentage: 8 },
            "Veneers": { amount: 3672, percentage: 7 }
          }
        },
        practice: {
          total: 55800,
          breakdown: {
            "Aligners": { amount: 20588, percentage: 37 },
            "Hygiene": { amount: 16740, percentage: 30 },
            "Root Canals": { amount: 8928, percentage: 16 },
            "Whitening": { amount: 5022, percentage: 9 },
            "Veneers": { amount: 4522, percentage: 8 }
          }
        }
      },
      insurance: {
        regional: { public: 42, private: 58 },
        practice: { public: 45, private: 55 }
      },
      growth: {
        regional: { percentage: 12.4, yoyChange: 2.1 },
        practice: { percentage: 14.2, yoyChange: 3.5 }
      }
    },
    patients: {
      activePatients: {
        regional: { percentage: 78, total: 2450 },
        practice: { percentage: 82, total: 2547 }
      }
    },
    procedures: {
      highestVolume: {
        regional: { name: "Hygiene", data: [245, 268, 255] },
        practice: { name: "Hygiene", data: [258, 272, 265] }
      },
      lowestVolume: {
        regional: { name: "Root Canals", data: [12, 15, 14] },
        practice: { name: "Root Canals", data: [11, 13, 12] }
      },
      largestProduction: {
        regional: { name: "Veneers", procedureAvg: 1250, totalAvg: 850 },
        practice: { name: "Veneers", procedureAvg: 1350, totalAvg: 890 }
      }
    }
  },
  "60631": {
    financial: {
      monthlyProduction: {
        regional: {
          total: 48750,
          breakdown: {
            "Aligners": { amount: 16575, percentage: 34 },
            "Hygiene": { amount: 14625, percentage: 30 },
            "Root Canals": { amount: 9750, percentage: 20 },
            "Whitening": { amount: 3900, percentage: 8 },
            "Veneers": { amount: 3900, percentage: 8 }
          }
        },
        practice: {
          total: 51200,
          breakdown: {
            "Aligners": { amount: 17920, percentage: 35 },
            "Hygiene": { amount: 15360, percentage: 30 },
            "Root Canals": { amount: 10240, percentage: 20 },
            "Whitening": { amount: 4096, percentage: 8 },
            "Veneers": { amount: 3584, percentage: 7 }
          }
        }
      },
      insurance: {
        regional: { public: 40, private: 60 },
        practice: { public: 43, private: 57 }
      },
      growth: {
        regional: { percentage: 11.8, yoyChange: 1.9 },
        practice: { percentage: 13.5, yoyChange: 3.2 }
      }
    },
    patients: {
      activePatients: {
        regional: { percentage: 76, total: 2380 },
        practice: { percentage: 80, total: 2475 }
      }
    },
    procedures: {
      highestVolume: {
        regional: { name: "Hygiene", data: [238, 255, 245] },
        practice: { name: "Hygiene", data: [248, 262, 255] }
      },
      lowestVolume: {
        regional: { name: "Root Canals", data: [11, 14, 13] },
        practice: { name: "Root Canals", data: [10, 12, 11] }
      },
      largestProduction: {
        regional: { name: "Veneers", procedureAvg: 1200, totalAvg: 820 },
        practice: { name: "Veneers", procedureAvg: 1300, totalAvg: 860 }
      }
    }
  },
  "60656": {
    financial: {
      monthlyProduction: {
        regional: {
          total: 50600,
          breakdown: {
            "Aligners": { amount: 17710, percentage: 35 },
            "Hygiene": { amount: 15180, percentage: 30 },
            "Root Canals": { amount: 10120, percentage: 20 },
            "Whitening": { amount: 4048, percentage: 8 },
            "Veneers": { amount: 3542, percentage: 7 }
          }
        },
        practice: {
          total: 53500,
          breakdown: {
            "Aligners": { amount: 19260, percentage: 36 },
            "Hygiene": { amount: 16050, percentage: 30 },
            "Root Canals": { amount: 10700, percentage: 20 },
            "Whitening": { amount: 4280, percentage: 8 },
            "Veneers": { amount: 3210, percentage: 6 }
          }
        }
      },
      insurance: {
        regional: { public: 41, private: 59 },
        practice: { public: 44, private: 56 }
      },
      growth: {
        regional: { percentage: 12.1, yoyChange: 2.0 },
        practice: { percentage: 13.8, yoyChange: 3.3 }
      }
    },
    patients: {
      activePatients: {
        regional: { percentage: 77, total: 2415 },
        practice: { percentage: 81, total: 2510 }
      }
    },
    procedures: {
      highestVolume: {
        regional: { name: "Hygiene", data: [242, 262, 250] },
        practice: { name: "Hygiene", data: [253, 267, 260] }
      },
      lowestVolume: {
        regional: { name: "Root Canals", data: [12, 15, 14] },
        practice: { name: "Root Canals", data: [11, 13, 12] }
      },
      largestProduction: {
        regional: { name: "Veneers", procedureAvg: 1225, totalAvg: 835 },
        practice: { name: "Veneers", procedureAvg: 1325, totalAvg: 875 }
      }
    }
  },
  "60068": {
    financial: {
      monthlyProduction: {
        regional: {
          total: 54300,
          breakdown: {
            "Aligners": { amount: 19005, percentage: 35 },
            "Hygiene": { amount: 16290, percentage: 30 },
            "Root Canals": { amount: 10860, percentage: 20 },
            "Whitening": { amount: 4344, percentage: 8 },
            "Veneers": { amount: 3801, percentage: 7 }
          }
        },
        practice: {
          total: 57100,
          breakdown: {
            "Aligners": { amount: 20556, percentage: 36 },
            "Hygiene": { amount: 17130, percentage: 30 },
            "Root Canals": { amount: 11420, percentage: 20 },
            "Whitening": { amount: 4568, percentage: 8 },
            "Veneers": { amount: 3426, percentage: 6 }
          }
        }
      },
      insurance: {
        regional: { public: 43, private: 57 },
        practice: { public: 46, private: 54 }
      },
      growth: {
        regional: { percentage: 12.7, yoyChange: 2.2 },
        practice: { percentage: 14.5, yoyChange: 3.6 }
      }
    },
    patients: {
      activePatients: {
        regional: { percentage: 79, total: 2485 },
        practice: { percentage: 83, total: 2584 }
      }
    },
    procedures: {
      highestVolume: {
        regional: { name: "Hygiene", data: [248, 270, 258] },
        practice: { name: "Hygiene", data: [262, 275, 268] }
      },
      lowestVolume: {
        regional: { name: "Root Canals", data: [12, 15, 14] },
        practice: { name: "Root Canals", data: [11, 13, 12] }
      },
      largestProduction: {
        regional: { name: "Veneers", procedureAvg: 1275, totalAvg: 865 },
        practice: { name: "Veneers", procedureAvg: 1375, totalAvg: 905 }
      }
    }
  }
} as const;

const zipCodes: ZipCode[] = [
  { id: "60714", name: "Niles", center: { lat: 42.0294, lng: -87.7925 } },
  { id: "60631", name: "Edison Park", center: { lat: 42.0072, lng: -87.8139 } },
  { id: "60656", name: "Norwood Park", center: { lat: 41.9856, lng: -87.8087 } },
  { id: "60068", name: "Park Ridge", center: { lat: 42.0111, lng: -87.8406 } }
];

const surroundingCities = [
  { name: "Morton Grove", position: { lat: 42.0401, lng: -87.7829 } },
  { name: "Glenview", position: { lat: 42.0698, lng: -87.7873 } },
  { name: "Des Plaines", position: { lat: 42.0334, lng: -87.8834 } },
  { name: "Skokie", position: { lat: 42.0324, lng: -87.7416 } },
  { name: "Lincolnwood", position: { lat: 42.0064, lng: -87.7329 } },
  { name: "Harwood Heights", position: { lat: 41.9639, lng: -87.8069 } },
  { name: "Rosemont", position: { lat: 41.9865, lng: -87.8709 } }
];

const mapCenter = {
  lat: 42.0451,
  lng: -87.8450
};

const mapContainerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

const sideContainerVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
};

function isValidZipCode(zip: string): zip is ValidZipCode {
  return zip in analysisData;
}

const RegionalTabContent = forwardRef((props, ref) => {
  const [selectedZip, setSelectedZip] = useState<ValidZipCode | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<Icon['id'] | null>(null);
  const [selectedSubData, setSelectedSubData] = useState<string | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [zipDataLayer, setZipDataLayer] = useState<google.maps.Data | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalysisExpanded, setIsAnalysisExpanded] = useState(true);
  const markersRef = useRef<google.maps.Marker[]>([]);

  const icons: Icon[] = [
    { id: "financial", icon: DollarSign, label: "Financial" },
    { id: "patients", icon: Users, label: "Patients" },
    { id: "procedures", icon: Stethoscope, label: "Procedures" },
  ];

  useImperativeHandle(ref, () => ({
    cleanup: () => {
      if (map) {
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];
        
        if (zipDataLayer) {
          zipDataLayer.setMap(null);
        }
        
        setMap(null);
      }
    }
  }));

  const mapOptions = useMemo(() => ({
    styles: [
      {
        featureType: "all",
        elementType: "labels.text",
        stylers: [{ visibility: "off" }]
      },
      {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [{ color: "#94A3B8" }]
      },
      {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [{ color: "#F8FAFC" }]
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ visibility: "off" }]
      },
      {
        featureType: "road.highway",
        elementType: "all",
        stylers: [{ visibility: "off" }]
      },
      {
        featureType: "transit",
        elementType: "all",
        stylers: [{ visibility: "off" }]
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#BFDBFE" }]
      }
    ],
    disableDefaultUI: true,
    zoomControl: true,
    clickableIcons: false,
    gestureHandling: window.innerWidth >= 768 ? 'cooperative' : 'greedy',
    scrollwheel: true,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    scaleControl: false,
    rotateControl: false,
    draggableCursor: 'default',
    draggingCursor: 'grab',
    preserveDrawingBuffer: false,
    maxZoom: 18,
    minZoom: 8
  }), []);

  const getZipOffset = (zipId: ValidZipCode) => {
    const offsets: Record<ValidZipCode, { lat: number; lng: number }> = {
      '60656': { lat: -0.008, lng: -0.002 },
      '60714': { lat: -0.0005, lng: -0.014 },
      '60631': { lat: -0.006, lng: -0.001 },
      '60068': { lat: 0.002, lng: 0 }
    };
    return offsets[zipId];
  };

  const createLabels = useCallback(() => {
    if (!map) return;
    
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    zipCodes.forEach(zipCode => {
      const offset = getZipOffset(zipCode.id);
      const marker = new google.maps.Marker({
        position: {
          lat: zipCode.center.lat + offset.lat,
          lng: zipCode.center.lng + offset.lng
        },
        map,
        label: {
          text: zipCode.id,
          fontSize: window.innerWidth < 768 ? "8px" : "16px",
          color: selectedZip === zipCode.id ? "#FFFFFF" : "#666666",
          fontWeight: "500"
        },
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 0
        }
      });
      markersRef.current.push(marker);
    });

    surroundingCities.forEach(city => {
      const marker = new google.maps.Marker({
        position: city.position,
        map,
        label: {
          text: city.name,
          fontSize: window.innerWidth < 768 ? "9px" : "14px",
          color: "#999999",
          fontWeight: "400"
        },
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 0
        }
      });
      markersRef.current.push(marker);
    });
  }, [map, selectedZip]);

  const handleZipClick = useCallback((zipId: ValidZipCode) => {
    setSelectedZip(zipId);
    setSelectedIcon(null);
    setSelectedSubData(null);
    setIsAnalysisExpanded(true);

    if (map && zipDataLayer) {
      zipDataLayer.forEach((feature: google.maps.Data.Feature) => {
        const featureZip = feature.getProperty('ZCTA5CE20') || feature.getProperty('zip');
        if (featureZip === zipId) {
          const bounds = new google.maps.LatLngBounds();
          const geometry = feature.getGeometry();
          
          if (geometry) {
            try {
              geometry.forEachLatLng((latLng: google.maps.LatLng) => {
                if (latLng) bounds.extend(latLng);
              });
              
              if (!bounds.isEmpty()) {
                map.fitBounds(bounds);
              }
            } catch (error) {
              console.error('Error processing geometry:', error);
            }
          }
        }
      });
      createLabels();
    }
  }, [map, zipDataLayer, createLabels]);

  const handleIconClick = useCallback((iconId: Icon['id']) => {
    setSelectedIcon(iconId);
    setSelectedSubData(null);
    setIsAnalysisExpanded(true);
  }, []);

  const handleSubDataClick = useCallback((subDataId: string) => {
    if (selectedSubData === subDataId) {
      setSelectedSubData(null);
      setIsAnalysisExpanded(true);
    } else {
      setSelectedSubData(subDataId);
      setIsAnalysisExpanded(false);
    }
  }, [selectedSubData]);

  const getAnalysisOptions = (iconId: Icon['id']) => {
    switch (iconId) {
      case 'financial':
        return ['Avg Monthly Production', 'Insurance Public/Private', 'Avg Annual Growth %'];
      case 'patients':
        return ['Avg Patient Age', 'Avg Active Patient %', 'Most Apts/Age Group'];
      case 'procedures':
        return ['Highest Vol Procedure', 'Largest Avg Production', 'Lowest Vol Procedure'];
      default:
        return [];
    }
  };

  const onMapLoad = useCallback(async (map: google.maps.Map) => {
    setMap(map);
    setIsLoading(true);
    
    try {
      const dataLayer = new google.maps.Data({ map });
      setZipDataLayer(dataLayer);

      const response = await fetch('/chicago-zipcodes.json');
      if (!response.ok) throw new Error('Failed to fetch GeoJSON data');
      
      const geoJson = await response.json();
      dataLayer.addGeoJson(geoJson);

      dataLayer.addListener('click', (event: google.maps.Data.MouseEvent) => {
        const zipCode = event.feature.getProperty('ZCTA5CE20') || event.feature.getProperty('zip');
        if (typeof zipCode === 'string' && isValidZipCode(zipCode)) {
          handleZipClick(zipCode);
        }
      });

      dataLayer.addListener('mouseover', (event: google.maps.Data.MouseEvent) => {
        const zipCode = event.feature.getProperty('ZCTA5CE20') || event.feature.getProperty('zip');
        if (zipCodes.some(zip => zip.id === zipCode) && zipCode !== selectedZip) {
          dataLayer.overrideStyle(event.feature, {
            fillColor: '#CBD5E1'
          });
        }
      });

      dataLayer.addListener('mouseout', (event: google.maps.Data.MouseEvent) => {
        const zipCode = event.feature.getProperty('ZCTA5CE20') || event.feature.getProperty('zip');
        if (zipCode !== selectedZip) {
          dataLayer.revertStyle(event.feature);
        }
      });

      const bounds = new google.maps.LatLngBounds();
      let hasValidGeometry = false;

      dataLayer.forEach((feature: google.maps.Data.Feature) => {
        const geometry = feature.getGeometry();
        if (geometry) {
          try {
            geometry.forEachLatLng((latLng: google.maps.LatLng) => {
              if (latLng) {
                bounds.extend(latLng);
                hasValidGeometry = true;
              }
            });
          } catch (error) {
            console.error('Error processing feature geometry:', error);
          }
        }
      });

      if (hasValidGeometry) {
        map.fitBounds(bounds);
      } else {
        map.setCenter(mapCenter);
        map.setZoom(12);
      }

      createLabels();

    } catch (error) {
      console.error('Error loading map data:', error);
      map.setCenter(mapCenter);
      map.setZoom(12);
    } finally {
      setIsLoading(false);
    }
  }, [handleZipClick, selectedZip, createLabels]);

  useEffect(() => {
    if (map) {
      createLabels();
    }
  }, [map, selectedZip, createLabels]);

  useEffect(() => {
    return () => {
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
    };
  }, []);

  const AnalysisContentDisplay = useCallback(() => {
  return null; // Temporary modification to disable white containers
}, [selectedIcon, selectedSubData, selectedZip]);

  return (
    <div className="w-full h-full flex flex-col md:flex-row relative">
      <motion.div 
        className={`relative bg-gray-50 rounded-xl shadow-sm overflow-hidden
        ${window.innerWidth >= 768 
          ? 'w-[30%] ml-3 relative' 
          : 'w-[35%] absolute right-0 top-0 h-full'}`}
        variants={mapContainerVariants}
        animate={selectedIcon ? {
          width: window.innerWidth >= 768 ? "68%" : "62%",
          marginLeft: "0px",
          marginRight: window.innerWidth >= 768 ? "0" : "35%"
        } : {
          width: "100%",
          marginLeft: "0px",
          marginRight: "0"
        }}
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
                      className={
                        `px-3 py-2 rounded-lg flex items-center transition-all duration-200 
                        ${selectedIcon === icon.id 
                          ? 'bg-[#052b52] text-white shadow-sm' 
                          : 'bg-white/80 text-gray-600 hover:bg-white'}`
                      }
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

        <div className="h-full w-full">
          <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY || ''}>
            <GoogleMap
              mapContainerClassName="w-full h-full"
              center={mapCenter}
              zoom={12}
              options={mapOptions}
              onLoad={onMapLoad}
            />
          </LoadScript>
        </div>

        {isLoading && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-blue-600 rounded-full border-t-transparent animate-spin" />
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {selectedIcon && (
          <motion.div 
            className={
              `bg-gray-50 rounded-xl shadow-sm 
              ${window.innerWidth >= 768 
                ? 'w-[30%] ml-3 relative' 
                : 'w-[35%] absolute right-0 top-0 h-full'}`
            }
            variants={sideContainerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div 
              className={`${window.innerWidth >= 768 ? 'p-4' : 'p-1.5'} h-full`}
              animate={{ 
                height: 'auto'
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <motion.div 
                className="relative"
                layout="position"
                animate={{
                  height: selectedSubData ? '42px' : 'auto'
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <AnimatePresence mode="sync">
                  {getAnalysisOptions(selectedIcon).map((option, index) => (
                    <motion.button
                      key={option}
                      onClick={() => handleSubDataClick(option)}
                      className={
                        `w-[99.5%] md:w-full ml-[0.25%] mr-[0.25%] md:mx-0 p-2 md:p-3 
                        text-left rounded-lg transition-colors duration-200 
                        ${selectedSubData === option 
                          ? 'bg-[#052b52] text-white' 
                          : 'bg-white text-gray-600 hover:bg-gray-100'} 
                        ${window.innerWidth >= 768 ? 'text-xs' : 'text-[8.5px]'}
                        font-medium`
                      }
                      layout="position"
                      initial={false}
                      animate={{ 
                        y: selectedSubData === option ? -(index * 42) : 0,
                        opacity: !selectedSubData || selectedSubData === option ? 1 : 0,
                        scaleY: !selectedSubData || selectedSubData === option ? 1 : 0,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut"
                      }}
                    >
                      {option}
                    </motion.button>
                  ))}
                </AnimatePresence>
              </motion.div>

              <AnimatePresence mode="wait">
                {selectedSubData && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <AnalysisContentDisplay />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{
        `.gm-style-cc,
        .gmnoprint.gm-style-cc,
        .gm-style-iw-a,
        .gm-style-iw-t,
        .gm-style > div:last-child {
          display: none !important;
        }
        .gm-style a[href^="https://maps.google.com/maps"],
        .gm-style-pbc {
          display: none !important;
        }
        .gmnoprint:not(.gm-bundled-control) {
          display: none !important;
        }
        .gm-bundled-control .gmnoprint {
          display: block !important;
        }`
      }</style>
    </div>
  );
});

RegionalTabContent.displayName = 'RegionalTabContent';

export default RegionalTabContent;
