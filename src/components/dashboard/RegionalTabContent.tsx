import React, { useState, useCallback, useEffect } from 'react';
import { DollarSign, Users, Stethoscope } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { GoogleMap, LoadScript } from '@react-google-maps/api';

interface ZipCode {
  id: string;
  name: string;
}

interface Icon {
  id: 'financial' | 'patients' | 'procedures';
  icon: React.ElementType;
  label: string;
}

interface ZipBoundary {
  northeast: google.maps.LatLng;
  southwest: google.maps.LatLng;
}

interface GeoJsonFeature {
  type: "Feature";
  properties: { zip: string };
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
}

interface GeoJsonCollection {
  type: "FeatureCollection";
  features: GeoJsonFeature[];
}

const zipCodes: ZipCode[] = [
  { id: "60714", name: "Niles" },
  { id: "60631", name: "Edison Park" },
  { id: "60656", name: "Norwood Park" },
  { id: "60068", name: "Park Ridge" },
];

const mapCenter = {
  lat: 42.0451,
  lng: -87.8450
};

const mapOptions = {
  styles: [
    {
      featureType: "all",
      elementType: "labels",
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
      stylers: [{ color: "#E2E8F0" }]
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#BFDBFE" }]
    }
  ],
  disableDefaultUI: true,
  clickableIcons: false,
  zoomControl: true,
  gestureHandling: 'greedy',
  zoomControlOptions: {
    position: typeof google !== 'undefined' ? google.maps.ControlPosition.LEFT_BOTTOM : null
  }
};

const RegionalTabContent: React.FC = () => {
  const [selectedZip, setSelectedZip] = useState<string | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<Icon['id'] | null>(null);
  const [selectedSubData, setSelectedSubData] = useState<string | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [zipDataLayer, setZipDataLayer] = useState<google.maps.Data | null>(null);
  const [zipBoundaries, setZipBoundaries] = useState<Map<string, ZipBoundary>>(new Map());
  const [isLoading, setIsLoading] = useState(true);

  const icons: Icon[] = [
    { id: "financial", icon: DollarSign, label: "Financial" },
    { id: "patients", icon: Users, label: "Patients" },
    { id: "procedures", icon: Stethoscope, label: "Procedures" },
  ];

  const fetchZipBoundaries = useCallback(async (): Promise<GeoJsonCollection> => {
    const geocoder = new google.maps.Geocoder();
    const boundaries: GeoJsonCollection = {
      type: "FeatureCollection",
      features: []
    };
    const boundariesMap = new Map<string, ZipBoundary>();

    for (const zipCode of zipCodes) {
      try {
        const results = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
          geocoder.geocode(
            { 
              address: `${zipCode.id} IL`,
              componentRestrictions: {
                country: 'US',
                postalCode: zipCode.id
              }
            },
            (results, status) => {
              if (status === 'OK' && results) {
                resolve(results);
              } else {
                reject(status);
              }
            }
          );
        });

        if (results[0]?.geometry?.viewport) {
          const bounds = results[0].geometry.viewport;
          const ne = bounds.getNorthEast();
          const sw = bounds.getSouthWest();
          
          boundariesMap.set(zipCode.id, {
            northeast: ne,
            southwest: sw
          });

          const feature: GeoJsonFeature = {
            type: "Feature",
            properties: { zip: zipCode.id },
            geometry: {
              type: "Polygon",
              coordinates: [[
                [sw.lng(), sw.lat()],
                [ne.lng(), sw.lat()],
                [ne.lng(), ne.lat()],
                [sw.lng(), ne.lat()],
                [sw.lng(), sw.lat()]
              ]]
            }
          };
          
          boundaries.features.push(feature);
        }
      } catch (error) {
        console.error(`Error fetching boundary for ${zipCode.id}:`, error);
      }
    }

    setZipBoundaries(boundariesMap);
    return boundaries;
  }, []);

  const handleZipClick = useCallback((zipId: string) => {
    setSelectedZip(zipId);
    setSelectedIcon(null);
    setSelectedSubData(null);

    if (map && zipBoundaries.has(zipId)) {
      const bounds = zipBoundaries.get(zipId);
      if (bounds) {
        const newBounds = new google.maps.LatLngBounds(
          bounds.southwest,
          bounds.northeast
        );
        map.fitBounds(newBounds, {
          padding: { top: 50, right: 50, bottom: 50, left: 50 }
        });
      }
    }
  }, [map, zipBoundaries]);

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
    
    const dataLayer = new google.maps.Data({ map });
    setZipDataLayer(dataLayer);

    try {
      const boundaryData = await fetchZipBoundaries();
      dataLayer.addGeoJson(boundaryData);

      dataLayer.setStyle((feature: google.maps.Data.Feature) => {
        const zipCode = feature.getProperty('zip');
        const isSelected = zipCode === selectedZip;
        
        return {
          fillColor: isSelected ? '#052b52' : '#E2E8F0',
          fillOpacity: 0.6,
          strokeColor: isSelected ? '#052b52' : '#94A3B8',
          strokeWeight: isSelected ? 2 : 1
        };
      });

      dataLayer.addListener('click', (event: google.maps.Data.MouseEvent) => {
        const zipCode = event.feature.getProperty('zip');
        if (typeof zipCode === 'string' && zipCodes.some(zip => zip.id === zipCode)) {
          handleZipClick(zipCode);
        }
      });

      dataLayer.addListener('mouseover', (event: google.maps.Data.MouseEvent) => {
        const zipCode = event.feature.getProperty('zip');
        if (zipCodes.some(zip => zip.id === zipCode) && zipCode !== selectedZip) {
          dataLayer.overrideStyle(event.feature, {
            fillColor: '#CBD5E1'
          });
        }
      });

      dataLayer.addListener('mouseout', (event: google.maps.Data.MouseEvent) => {
        const zipCode = event.feature.getProperty('zip');
        if (zipCode !== selectedZip) {
          dataLayer.revertStyle(event.feature);
        }
      });
    } catch (error) {
      console.error('Error loading map data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [handleZipClick, selectedZip, fetchZipBoundaries]);

  useEffect(() => {
    if (zipDataLayer) {
      zipDataLayer.setStyle((feature: google.maps.Data.Feature) => {
        const zipCode = feature.getProperty('zip');
        const isSelected = zipCode === selectedZip;
        
        return {
          fillColor: isSelected ? '#052b52' : '#E2E8F0',
          fillOpacity: 0.6,
          strokeColor: isSelected ? '#052b52' : '#94A3B8',
          strokeWeight: isSelected ? 2 : 1
        };
      });
    }
  }, [selectedZip, zipDataLayer]);

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
      </AnimatePresence>
    </div>
  );
};

export default RegionalTabContent;
