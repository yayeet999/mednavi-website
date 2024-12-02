import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, LoadScript, MarkerClusterer, Marker } from '@react-google-maps/api';
import { PRACTICE_LOCATION, Patient } from '../../types/patientData';

interface LocationMapProps {
  filteredPatients: Patient[];
}

const LocationMap: React.FC<LocationMapProps> = ({ filteredPatients }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [zipDataLayer, setZipDataLayer] = useState<google.maps.Data | null>(null);
  const practiceMarkerRef = useRef<google.maps.Marker | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedZip, setSelectedZip] = useState<string | null>(null);

  const mapOptions = {
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
    maxZoom: 18,
    minZoom: 8
  };

  const createPracticeMarker = useCallback((map: google.maps.Map) => {
    if (practiceMarkerRef.current) {
      practiceMarkerRef.current.setMap(null);
    }

    practiceMarkerRef.current = new google.maps.Marker({
      position: PRACTICE_LOCATION,
      map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 12,
        fillColor: '#1E40AF',
        fillOpacity: 1,
        strokeColor: '#FFFFFF',
        strokeWeight: 2,
      },
      title: PRACTICE_LOCATION.name,
      zIndex: 1000
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div class="p-2">
          <div class="font-semibold text-gray-900">${PRACTICE_LOCATION.name}</div>
          <div class="text-sm text-gray-600">${PRACTICE_LOCATION.address}</div>
        </div>
      `
    });

    practiceMarkerRef.current.addListener('click', () => {
      infoWindow.open(map, practiceMarkerRef.current);
    });
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

      // Set default styling for all zip codes
      dataLayer.setStyle({
        fillColor: '#2563EB',
        fillOpacity: 0.1,
        strokeColor: '#1E40AF',
        strokeWeight: 1.5
      });

      dataLayer.addListener('mouseover', (event: google.maps.Data.MouseEvent) => {
        const zipCode = event.feature.getProperty('ZCTA5CE20');
        if (zipCode !== selectedZip) {
          dataLayer.overrideStyle(event.feature, {
            fillColor: '#3B82F6',
            fillOpacity: 0.3,
            strokeColor: '#1E40AF',
            strokeWeight: 2
          });
        }
      });

      dataLayer.addListener('mouseout', (event: google.maps.Data.MouseEvent) => {
        const zipCode = event.feature.getProperty('ZCTA5CE20');
        if (zipCode !== selectedZip) {
          dataLayer.revertStyle(event.feature);
        }
      });

      dataLayer.addListener('click', (event: google.maps.Data.MouseEvent) => {
        const zipCode = event.feature.getProperty('ZCTA5CE20');
        setSelectedZip(zipCode);
        
        // Style the selected zip code
        dataLayer.revertStyle();
        dataLayer.overrideStyle(event.feature, {
          fillColor: '#1E40AF',
          fillOpacity: 0.3,
          strokeColor: '#1E40AF',
          strokeWeight: 2.5
        });
      });

      createPracticeMarker(map);

      // Set initial bounds
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(PRACTICE_LOCATION);
      filteredPatients.forEach(patient => bounds.extend(patient.location));
      map.fitBounds(bounds);

    } catch (error) {
      console.error('Error loading map data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [createPracticeMarker, filteredPatients, selectedZip]);

  useEffect(() => {
    if (map) {
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(PRACTICE_LOCATION);
      filteredPatients.forEach(patient => bounds.extend(patient.location));
      map.fitBounds(bounds);
    }
  }, [map, filteredPatients]);

  useEffect(() => {
    return () => {
      if (practiceMarkerRef.current) {
        practiceMarkerRef.current.setMap(null);
      }
      if (zipDataLayer) {
        zipDataLayer.setMap(null);
      }
    };
  }, [zipDataLayer]);

  return (
    <div className="w-full h-full relative">
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY || ''}>
        <GoogleMap
          mapContainerClassName="w-full h-full"
          center={PRACTICE_LOCATION}
          zoom={12}
          options={mapOptions}
          onLoad={onMapLoad}
        >
          <MarkerClusterer
            averageCenter
            enableRetinaIcons
            gridSize={50}
            maxZoom={15}
            minimumClusterSize={2}
          >
            {(clusterer) => (
              <>
                {filteredPatients.map((patient) => (
                  <Marker
                    key={patient.id}
                    position={patient.location}
                    clusterer={clusterer}
                    icon={{
                      path: google.maps.SymbolPath.CIRCLE,
                      scale: 6,
                      fillColor: patient.status === 'Active' ? '#3B82F6' : '#94A3B8',
                      fillOpacity: 0.7,
                      strokeColor: '#FFFFFF',
                      strokeWeight: 1,
                    }}
                  />
                ))}
              </>
            )}
          </MarkerClusterer>
        </GoogleMap>
      </LoadScript>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-md text-sm">
        <h4 className="font-semibold mb-2">Map Legend</h4>
        <div className="space-y-2">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-[#3B82F6] mr-2"></div>
            <span>Active Patients</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-[#94A3B8] mr-2"></div>
            <span>Inactive Patients</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-[#1E40AF] mr-2"></div>
            <span>Practice Location</span>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-blue-600 rounded-full border-t-transparent animate-spin" />
        </div>
      )}
    </div>
  );
};

export default LocationMap;
