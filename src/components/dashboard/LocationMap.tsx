import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, LoadScript, MarkerClusterer } from '@react-google-maps/api';
import { SAMPLE_PATIENT_DATA, PRACTICE_LOCATION, Patient } from '../../types/patientData';

interface LocationMapProps {
  filteredPatients: Patient[];
}

const LocationMap: React.FC<LocationMapProps> = ({ filteredPatients }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [zipDataLayer, setZipDataLayer] = useState<google.maps.Data | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const practiceMarkerRef = useRef<google.maps.Marker | null>(null);

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

  const clearMarkers = useCallback(() => {
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];
  }, []);

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

  const createPatientMarkers = useCallback((map: google.maps.Map) => {
    return filteredPatients.map(patient => {
      return new google.maps.Marker({
        position: patient.location,
        map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 6,
          fillColor: patient.status === 'Active' ? '#3B82F6' : '#94A3B8',
          fillOpacity: 0.7,
          strokeColor: '#FFFFFF',
          strokeWeight: 1,
        }
      });
    });
  }, [filteredPatients]);

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

      dataLayer.setStyle(feature => ({
        fillColor: '#2563EB',
        fillOpacity: 0.1,
        strokeColor: '#1E40AF',
        strokeWeight: 1.5,
        visible: true,
        zIndex: 1
      }));

      dataLayer.addListener('mouseover', (event: google.maps.Data.MouseEvent) => {
        dataLayer.overrideStyle(event.feature, {
          fillOpacity: 0.3,
          strokeWeight: 2
        });
      });

      dataLayer.addListener('mouseout', (event: google.maps.Data.MouseEvent) => {
        dataLayer.revertStyle(event.feature);
      });

      createPracticeMarker(map);

      // Set initial bounds
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(PRACTICE_LOCATION);
      filteredPatients.forEach(patient => bounds.extend(patient.location));
      map.fitBounds(bounds);

      // Create patient markers with clustering
      const markers = createPatientMarkers(map);
      markersRef.current = markers;

      new MarkerClusterer({
        map,
        markers,
        algorithm: new google.maps.MarkerClustererAlgorithm({
          maxZoom: 15,
          gridSize: 50
        }),
        renderer: {
          render: ({ count, position }) => {
            return new google.maps.Marker({
              position,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 20,
                fillColor: '#2563EB',
                fillOpacity: 0.9,
                strokeColor: '#FFFFFF',
                strokeWeight: 2,
              },
              label: {
                text: String(count),
                color: '#FFFFFF',
                fontSize: '12px',
                fontWeight: 'bold'
              },
              zIndex: 999
            });
          }
        }
      });

    } catch (error) {
      console.error('Error loading map data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [createPracticeMarker, createPatientMarkers, filteredPatients]);

  useEffect(() => {
    return () => {
      clearMarkers();
      if (practiceMarkerRef.current) {
        practiceMarkerRef.current.setMap(null);
      }
      if (zipDataLayer) {
        zipDataLayer.setMap(null);
      }
    };
  }, [clearMarkers, zipDataLayer]);

  return (
    <div className="relative w-full h-full">
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY || ''}>
        <GoogleMap
          mapContainerClassName="w-full h-full"
          center={PRACTICE_LOCATION}
          zoom={12}
          options={mapOptions}
          onLoad={onMapLoad}
        />
      </LoadScript>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md text-xs md:text-sm">
        <h4 className="font-semibold mb-2">Map Legend</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#3B82F6]"></div>
            <span>Active Patients</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#94A3B8]"></div>
            <span>Inactive Patients</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#1E40AF]"></div>
            <span>Practice Location</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 rounded border border-[#1E40AF] bg-[#2563EB]/10"></div>
            <span>Service Area</span>
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
