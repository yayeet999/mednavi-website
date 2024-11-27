import React, { useState, useCallback, useEffect, useMemo, useRef, forwardRef, useImperativeHandle } from 'react';
import { DollarSign, Users, Stethoscope } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { GoogleMap, LoadScript } from '@react-google-maps/api';

interface ZipCode {
  id: string;
  name: string;
  center: { lat: number; lng: number };
}

interface Icon {
  id: 'financial' | 'patients' | 'procedures';
  icon: React.ElementType;
  label: string;
}

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

const RegionalTabContent = forwardRef((props, ref) => {
  const [selectedZip, setSelectedZip] = useState<string | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<Icon['id'] | null>(null);
  const [selectedSubData, setSelectedSubData] = useState<string | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [zipDataLayer, setZipDataLayer] = useState<google.maps.Data | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const markersRef = useRef<google.maps.Marker[]>([]);

  const icons: Icon[] = [
    { id: "financial", icon: DollarSign, label: "Financial" },
    { id: "patients", icon: Users, label: "Patients" },
    { id: "procedures", icon: Stethoscope, label: "Procedures" },
  ];

  const getAnalysisOptions = (iconId: Icon['id']) => {
    switch (iconId) {
      case 'financial':
        return ['Avg Monthly Production', 'Insurance Split', 'Avg Annual Growth %'];
      case 'patients':
        return ['Avg Patient Age', 'Avg Active Patient %', 'Most Apts/Age Group'];
      case 'procedures':
        return ['Highest Vol Procedure', 'Largest Avg Production', 'Lowest Vol Procedure'];
      default:
        return [];
    }
  };

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

  const getZipOffset = (zipId: string) => {
    const offsets = {
      '60656': { lat: -0.001, lng: -0.001 },
      '60714': { lat: -0.0005, lng: -0.004 },
      '60631': { lat: -0.001, lng: -0.0005 },
      '60068': { lat: 0.002, lng: 0 }
    };
    return offsets[zipId as keyof typeof offsets] || { lat: 0.002, lng: 0 };
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

  const setDataLayerStyle = useCallback(() => {
    if (zipDataLayer) {
      zipDataLayer.setStyle((feature: google.maps.Data.Feature) => {
        const zipCode = feature.getProperty('ZCTA5CE20') || feature.getProperty('zip');
        const isSelected = zipCode === selectedZip;
        
        return {
          fillColor: isSelected ? '#2E7D32' : '#E2E8F0',
          fillOpacity: isSelected ? 0.85 : 0.6,
          strokeColor: isSelected ? '#1B5E20' : '#94A3B8',
          strokeWeight: isSelected ? 2 : 1
        };
      });
    }
  }, [zipDataLayer, selectedZip]);

  useEffect(() => {
    setDataLayerStyle();
  }, [setDataLayerStyle, selectedZip]);

  const handleZipClick = useCallback((zipId: string) => {
    setSelectedZip(zipId);
    setSelectedIcon(null);
    setSelectedSubData(null);

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
  }, []);

  const handleSubDataClick = useCallback((subDataId: string) => {
    setSelectedSubData(subDataId);
  }, []);

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
        if (typeof zipCode === 'string' && zipCodes.some(zip => zip.id === zipCode)) {
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
      setDataLayerStyle();

    } catch (error) {
      console.error('Error loading map data:', error);
      map.setCenter(mapCenter);
      map.setZoom(12);
    } finally {
      setIsLoading(false);
    }
  }, [handleZipClick, selectedZip, createLabels, setDataLayerStyle]);

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

  const mapContainerVariants = {
    full: { width: "100%" },
    reduced: { 
      width: window.innerWidth >= 768 ? "68%" : "62%",
      marginRight: window.innerWidth >= 768 ? "0" : "35%"
    }
  };

  const sideContainerVariants = {
    hidden: { 
      opacity: 0, 
      x: window.innerWidth >= 768 ? 20 : "100%",
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
    <div className="w-full h-full flex flex-col md:flex-row relative">
      <motion.div 
        className="relative bg-gray-50 rounded-xl shadow-sm overflow-hidden flex-1"
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
            className={`
              bg-gray-50 rounded-xl shadow-sm 
              ${window.innerWidth >= 768 
                ? 'w-[30%] ml-4 relative' 
                : 'w-[35%] absolute right-0 top-0 h-full'}
            `}
            variants={sideContainerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="p-2 md:p-4">
              <h3 className={`font-bold text-gray-800 mb-3 ${window.innerWidth >= 768 ? 'text-sm' : 'text-[11px]'}`}>
                {window.innerWidth >= 768 ? 'Analysis Options:' : 'Analysis:'}
              </h3>
              <div className="space-y-2">
                {getAnalysisOptions(selectedIcon).map((option) => (
                  <motion.button
                    key={option}
                    onClick={() => handleSubDataClick(option)}
                    className={`
                      w-[98%] md:w-full ml-[1%] mr-[1%] md:mx-0 p-2 md:p-3 text-left rounded-lg transition-all duration-200 
                      ${selectedSubData === option 
                        ? 'bg-[#052b52] text-white' 
                        : 'bg-white text-gray-600 hover:bg-gray-100'} 
                      ${window.innerWidth >= 768 ? 'text-xs' : 'text-[8.5px]'} 
                      font-medium
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
                  <h4 className={`font-bold text-gray-800 ${window.innerWidth >= 768 ? 'text-sm' : 'text-[11px]'}`}>
                    {selectedSubData}
                  </h4>
                  <span className={`text-gray-500 ${window.innerWidth >= 768 ? 'text-xs' : 'text-[10px]'}`}>
                    {zipCodes.find(zip => zip.id === selectedZip)?.name}
                  </span>
                </div>
                <div className={`text-gray-600 space-y-1 ${window.innerWidth >= 768 ? 'text-xs' : 'text-[10px]'}`}>
                  <p>Analysis data for {selectedSubData.toLowerCase()}</p>
                  <p>Region: {zipCodes.find(zip => zip.id === selectedZip)?.name}</p>
                  <p>Category: {icons.find(icon => icon.id === selectedIcon)?.label}</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .gm-style-cc,
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
        }
      `}</style>
    </div>
  );
});

RegionalTabContent.displayName = 'RegionalTabContent';

export default RegionalTabContent;
