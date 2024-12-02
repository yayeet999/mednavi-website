import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, LoadScript, MarkerClusterer, Marker } from '@react-google-maps/api';
import PatientMapFilters from './PatientMapFilters';
import { SAMPLE_PATIENT_DATA, PRACTICE_LOCATION, Patient } from '../../types/patientData';

interface LocationMapProps {
  // Add any props if needed later
}

const LocationMap: React.FC<LocationMapProps> = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>(SAMPLE_PATIENT_DATA);
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

  const handleFiltersChange = useCallback((filters: any) => {
    // Implement filter logic here
    const filtered = SAMPLE_PATIENT_DATA.filter(patient => {
      // Add your filter conditions here
      if (filters.status.length && !filters.status.includes(patient.status)) return false;
      if (filters.insuranceType.length && !filters.insuranceType.includes(patient.insuranceType)) return false;
      return true;
    });

    setFilteredPatients(filtered);
  }, []);

  const resetFilters = useCallback(() => {
    setFilteredPatients(SAMPLE_PATIENT_DATA);
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

  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    createPracticeMarker(map);

    // Set initial bounds
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(PRACTICE_LOCATION);
    filteredPatients.forEach(patient => bounds.extend(patient.location));
    map.fitBounds(bounds);
  }, [createPracticeMarker, filteredPatients]);

  useEffect(() => {
    return () => {
      clearMarkers();
      if (practiceMarkerRef.current) {
        practiceMarkerRef.current.setMap(null);
      }
    };
  }, [clearMarkers]);

  const handleClusterClick = (cluster: any) => {
    if (map) {
      map.panTo(cluster.getCenter());
      map.setZoom(map.getZoom()! + 1);
    }
  };

  return (
    <div className="relative w-full h-full flex">
      <div className="flex-1">
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY || ''}>
          <GoogleMap
            mapContainerClassName="w-full h-full"
            center={PRACTICE_LOCATION}
            zoom={12}
            options={mapOptions}
            onLoad={onMapLoad}
          >
            <MarkerClusterer
              options={{
                imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
                gridSize: 50,
                maxZoom: 15,
                minimumClusterSize: 2,
                styles: [
                  {
                    textColor: '#FFFFFF',
                    textSize: 12,
                    height: 40,
                    width: 40,
                    backgroundPosition: 'center',
                    backgroundColor: '#2563EB'
                  }
                ]
              }}
              onClick={handleClusterClick}
            >
              {(clusterer) => 
                filteredPatients.map((patient, index) => (
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
                ))
              }
            </MarkerClusterer>
          </GoogleMap>
        </LoadScript>
      </div>
      
      <div className="w-[30%] ml-2 md:ml-4">
        <PatientMapFilters
          totalPatients={SAMPLE_PATIENT_DATA.length}
          filteredCount={filteredPatients.length}
          onFiltersChange={handleFiltersChange}
          onResetFilters={resetFilters}
        />
      </div>
    </div>
  );
};

export default LocationMap;
