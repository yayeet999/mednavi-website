import React, { useState, useCallback, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { DollarSign, Users, Stethoscope } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import AnalysisContent from './AnalysisContent';

interface ZipCode {
  id: ValidZipCode;
  name: string;
  center: { lat: number; lng: number };
  color: string;
}

interface ZipcodeFeature {
  type: "Feature";
  properties: {
    ZCTA5CE20: string;
    [key: string]: any;
  };
  geometry: any;
}

interface Icon {
  id: 'financial' | 'patients' | 'procedures';
  icon: React.ElementType;
  label: string;
}

type ValidZipCode = keyof typeof analysisData;

const zipCodes: ZipCode[] = [
  { id: "60714", name: "Niles", center: { lat: 42.0294, lng: -87.7925 }, color: "#1E40AF" },
  { id: "60631", name: "Edison Park", center: { lat: 42.0072, lng: -87.8139 }, color: "#2563EB" },
  { id: "60656", name: "Norwood Park", center: { lat: 41.9856, lng: -87.8087 }, color: "#3B82F6" },
  { id: "60068", name: "Park Ridge", center: { lat: 42.0111, lng: -87.8406 }, color: "#60A5FA" }
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

const getZipOffset = (zipId: ValidZipCode) => {
  const offsets: Record<ValidZipCode, { lat: number; lng: number }> = {
    '60656': { lat: -0.008, lng: -0.002 },
    '60714': { lat: -0.0005, lng: -0.014 },
    '60631': { lat: -0.006, lng: -0.001 },
    '60068': { lat: 0.002, lng: 0 }
  };
  return offsets[zipId];
};

const MapComponent = ({
  selectedZip,
  handleZipClick,
  geoJsonData
}: {
  selectedZip: ValidZipCode | null;
  handleZipClick: (zipId: ValidZipCode) => void;
  geoJsonData: any;
}) => {
  const map = useMap();
  const geoJsonLayerRef = useRef<L.GeoJSON | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const labelsRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!map || !geoJsonData) return;

    // Cleanup previous layers
    if (geoJsonLayerRef.current) {
      map.removeLayer(geoJsonLayerRef.current);
    }
    markersRef.current.forEach(marker => marker.remove());
    labelsRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
    labelsRef.current = [];

    // Add tile layer with improved performance settings
    const tileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      keepBuffer: 2,
      updateWhenIdle: true,
      updateWhenZooming: false
    }).addTo(map);

    // Create and add GeoJSON layer with enhanced styling
    const geoJsonLayer = L.geoJSON(geoJsonData, {
      style: (feature: GeoJSON.Feature | undefined) => {
        if (!feature) return {};
        
        const zipCode = (feature as ZipcodeFeature).properties?.ZCTA5CE20;
        const zipData = zipCodes.find(z => z.id === zipCode);
        
        return {
          fillColor: zipData ? (zipCode === selectedZip ? zipData.color : '#E2E8F0') : 'transparent',
          fillOpacity: zipCode === selectedZip ? 0.5 : 0.35,
          weight: zipCode === selectedZip ? 2 : 1,
          opacity: 1,
          color: zipCode === selectedZip ? '#1E40AF' : '#94A3B8'
        };
      },
      onEachFeature: (feature: GeoJSON.Feature, layer: L.Layer) => {
        const zipCode = (feature as ZipcodeFeature).properties?.ZCTA5CE20;
        if (zipCodes.some(z => z.id === zipCode)) {
          if (layer instanceof L.Path) {
            layer.on({
              click: () => {
                if (isValidZipCode(zipCode)) {
                  handleZipClick(zipCode);
                }
              },
              mouseover: () => {
                if (zipCode !== selectedZip) {
                  layer.setStyle({ 
                    fillOpacity: 0.45,
                    weight: 1.5,
                    color: '#64748B'
                  });
                }
              },
              mouseout: () => {
                if (zipCode !== selectedZip) {
                  layer.setStyle({ 
                    fillOpacity: 0.35,
                    weight: 1,
                    color: '#94A3B8'
                  });
                }
              }
            });
          }
        }
      }
    }).addTo(map);

    geoJsonLayerRef.current = geoJsonLayer;

    // Add enhanced zipcode labels
    zipCodes.forEach(zipCode => {
      const offset = getZipOffset(zipCode.id);
      const label = L.marker(
        [zipCode.center.lat + offset.lat, zipCode.center.lng + offset.lng],
        {
          icon: L.divIcon({
            className: 'custom-div-icon',
            html: `
              <div style="
                background-color: ${selectedZip === zipCode.id ? zipCode.color : '#475569'};
                color: white;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: ${window.innerWidth < 768 ? '10px' : '12px'};
                font-weight: 600;
                box-shadow: 0 1px 2px rgba(0,0,0,0.1);
                transition: all 0.2s ease;
              ">${zipCode.id}</div>
            `,
            iconSize: [60, 20],
            iconAnchor: [30, 10]
          })
        }
      ).addTo(map);
      labelsRef.current.push(label);
    });

    // Add surrounding city labels
    surroundingCities.forEach(city => {
      const label = L.marker(
        [city.position.lat, city.position.lng],
        {
          icon: L.divIcon({
            className: 'custom-div-icon',
            html: `
              <div style="
                color: #64748B;
                font-size: ${window.innerWidth < 768 ? '9px' : '11px'};
                font-weight: 500;
                text-align: center;
              ">${city.name}</div>
            `,
            iconSize: [80, 20],
            iconAnchor: [40, 10]
          })
        }
      ).addTo(map);
      labelsRef.current.push(label);
    });

    // Set appropriate bounds
    if (selectedZip) {
      const selectedFeature = geoJsonData.features.find(
        (f: any) => f.properties.ZCTA5CE20 === selectedZip
      );
      if (selectedFeature) {
        const bounds = L.geoJSON(selectedFeature).getBounds();
        const paddedBounds = bounds.pad(0.2);
        map.fitBounds(paddedBounds, {
          duration: 0.5,
          animate: true,
          maxZoom: 14
        });
      }
    } else {
      map.setView([mapCenter.lat, mapCenter.lng], 12, {
        duration: 0.5,
        animate: true
      });
    }

    return () => {
      if (geoJsonLayerRef.current) {
        map.removeLayer(geoJsonLayerRef.current);
      }
      markersRef.current.forEach(marker => marker.remove());
      labelsRef.current.forEach(marker => marker.remove());
    };
  }, [map, geoJsonData, selectedZip, handleZipClick]);

  return null;
};

const RegionalTabContent = forwardRef((props, ref) => {
  const [selectedZip, setSelectedZip] = useState<ValidZipCode | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<Icon['id'] | null>(null);
  const [selectedSubData, setSelectedSubData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalysisExpanded, setIsAnalysisExpanded] = useState(true);
  const [geoJsonData, setGeoJsonData] = useState<any>(null);

  const icons: Icon[] = [
    { id: "financial", icon: DollarSign, label: "Financial" },
    { id: "patients", icon: Users, label: "Patients" },
    { id: "procedures", icon: Stethoscope, label: "Procedures" },
  ];

  useImperativeHandle(ref, () => ({
    cleanup: () => {
      // No cleanup needed here
    }
  }));

  const handleZipClick = useCallback((zipId: ValidZipCode) => {
    setSelectedZip(zipId);
    setSelectedIcon(null);
    setSelectedSubData(null);
    setIsAnalysisExpanded(true);
  }, []);

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

  const AnalysisContentDisplay = useCallback(() => {
    if (!selectedSubData || !selectedZip) return null;
    const data = analysisData[selectedZip];
    if (!data) return null;

    return (
      <AnalysisContent
        selectedIcon={selectedIcon}
        selectedSubData={selectedSubData}
        selectedZip={selectedZip}
        data={data}
      />
    );
  }, [selectedIcon, selectedSubData, selectedZip]);

  useEffect(() => {
    const loadGeoJson = async () => {
      try {
        const response = await fetch('/chicago-zipcodes.json');
        if (!response.ok) throw new Error('Failed to fetch GeoJSON data');
        const data = await response.json();
        setGeoJsonData(data);
      } catch (error) {
        console.error('Error loading map data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadGeoJson();
  }, []);

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
                      className={`
                        px-3 py-2 rounded-lg flex items-center transition-all duration-200 
                        ${selectedIcon === icon.id 
                          ? 'bg-[#052b52] text-white shadow-sm' 
                          : 'bg-white/80 text-gray-600 hover:bg-white'}`}
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
          <MapContainer
            center={[mapCenter.lat, mapCenter.lng]}
            zoom={12}
            className="w-full h-full"
            zoomControl={false}
            attributionControl={false}
          >
            {geoJsonData && (
              <MapComponent
                selectedZip={selectedZip}
                handleZipClick={handleZipClick}
                geoJsonData={geoJsonData}
              />
            )}
          </MapContainer>
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
            className={`
              bg-gray-50 rounded-xl shadow-sm 
              ${window.innerWidth >= 768 
                ? 'w-[30%] ml-3 relative' 
                : 'w-[35%] absolute right-0 top-0 h-full'}`}
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
                      className={`
                        w-[99.5%] md:w-full ml-[0.25%] mr-[0.25%] md:mx-0 p-2 md:p-3 
                        text-left rounded-lg transition-colors duration-200 
                        ${selectedSubData === option 
                          ? 'bg-[#052b52] text-white' 
                          : 'bg-white text-gray-600 hover:bg-gray-100'} 
                        ${window.innerWidth >= 768 ? 'text-xs' : 'text-[8.5px]'}
                        font-medium`}
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

      <style jsx global>{`
        .leaflet-container {
          background: #F8FAFC;
          font-family: inherit;
        }
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1) !important;
        }
        .leaflet-control-zoom-in,
        .leaflet-control-zoom-out {
          background: white !important;
          border: none !important;
          color: #1e40af !important;
          width: 32px !important;
          height: 32px !important;
          line-height: 32px !important;
          font-size: 16px !important;
        }
        .leaflet-control-zoom-in:hover,
        .leaflet-control-zoom-out:hover {
          background: #f8fafc !important;
          color: #1e40af !important;
        }
        .custom-div-icon {
          background: none;
          border: none;
        }
        .leaflet-marker-icon {
          background: none !important;
          border: none !important;
          box-shadow: none !important;
        }
      `}</style>
    </div>
  );
});

RegionalTabContent.displayName = 'RegionalTabContent';

export default RegionalTabContent;
