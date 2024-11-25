import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { DollarSign, Users, Stethoscope } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer, GeoJSON, ZoomControl } from 'react-leaflet';
import { LatLngBoundsExpression, LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface ZipCode {
  id: string;
  name: string;
}

interface Icon {
  id: 'financial' | 'patients' | 'procedures';
  icon: React.ElementType;
  label: string;
}

const CHICAGO_CENTER: LatLngTuple = [42.0451, -87.8450];
const INITIAL_ZOOM = 11;

const CHICAGO_BOUNDS: LatLngBoundsExpression = [
  [41.8, -88.2] as LatLngTuple, // Southwest coordinates
  [42.2, -87.5] as LatLngTuple  // Northeast coordinates
];

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
  const [geoJsonData, setGeoJsonData] = useState<any>(null);

  const icons: Icon[] = useMemo(() => [
    { id: "financial", icon: DollarSign, label: "Financial" },
    { id: "patients", icon: Users, label: "Patients" },
    { id: "procedures", icon: Stethoscope, label: "Procedures" },
  ], []);

  useEffect(() => {
    fetch('/chicago-zipcodes.json')
      .then(response => response.json())
      .then(data => {
        // Filter to only include our specific ZIP codes
        data.features = data.features.filter((feature: any) => 
          zipCodes.some(zip => zip.id === feature.properties.zip)
        );
        setGeoJsonData(data);
      });
  }, []);

  const handleZipClick = useCallback((zipId: string) => {
    setSelectedZip(zipId);
    setSelectedIcon(null);
    setSelectedSubData(null);
  }, []);

  const handleIconClick = useCallback((iconId: Icon['id']) => {
    setSelectedIcon(iconId);
    setSelectedSubData(null);
  }, []);

  const handleSubDataClick = useCallback((subDataId: string) => {
    setSelectedSubData(subDataId);
  }, []);

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

  const onEachFeature = useCallback((feature: any, layer: L.Layer) => {
    const zip = feature.properties.zip;
    if (zipCodes.some(z => z.id === zip)) {
      layer.bindTooltip(zipCodes.find(z => z.id === zip)?.name || '', {
        permanent: false,
        direction: 'center',
        className: 'bg-white/90 px-2 py-1 rounded text-xs'
      });
      
      layer.on({
        click: () => handleZipClick(zip),
        mouseover: (e) => {
          const layer = e.target;
          layer.setStyle({
            fillOpacity: 0.7,
            fillColor: '#CBD5E1'
          });
          layer.openTooltip();
        },
        mouseout: (e) => {
          const layer = e.target;
          layer.setStyle(style(feature));
          layer.closeTooltip();
        }
      });
    }
  }, [handleZipClick]);

  const style = useCallback((feature: any) => {
    const zip = feature.properties.zip;
    const isClickable = zipCodes.some(z => z.id === zip);
    const isSelected = zip === selectedZip;

    return {
      fillColor: isSelected ? '#052b52' : isClickable ? '#E2E8F0' : '#F1F5F9',
      weight: isSelected ? 2 : 1,
      opacity: 1,
      color: isSelected ? '#052b52' : '#94A3B8',
      fillOpacity: isSelected ? 0.6 : 0.4,
      className: 'transition-all duration-200'
    };
  }, [selectedZip]);

  const mapOptions = useMemo(() => ({
    zoomSnap: 0.5,
    zoomDelta: 0.5,
    minZoom: 10,
    maxZoom: 13,
    maxBounds: CHICAGO_BOUNDS,
    maxBoundsViscosity: 1.0
  }), []);

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
              className="absolute top-4 left-4 right-4 z-[1000]"
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
          <MapContainer
            center={CHICAGO_CENTER}
            zoom={INITIAL_ZOOM}
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
            {...mapOptions}
          >
            <ZoomControl position="bottomright" />
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
              subdomains={['a', 'b', 'c', 'd']}
              maxZoom={19}
              attribution=""
              className="map-tiles"
            />
            {geoJsonData && (
              <GeoJSON
                key={selectedZip || 'default'}
                data={geoJsonData}
                style={style}
                onEachFeature={onEachFeature}
              />
            )}
          </MapContainer>
        </div>

        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-xs z-[1000]">
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
