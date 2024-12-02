import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { PRACTICE_LOCATION, Patient } from '../../types/patientData';

interface LocationMapProps {
  filteredPatients: Patient[];
}

const LocationMap: React.FC<LocationMapProps> = ({ filteredPatients }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
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
    clearMarkers();

    const markers = filteredPatients.map(patient => {
      const marker = new google.maps.Marker({
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

      return marker;
    });

    markersRef.current = markers;
  }, [filteredPatients, clearMarkers]);

  useEffect(() => {
    if (map) {
      createPatientMarkers(map);
    }
  }, [map, filteredPatients, createPatientMarkers]);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    createPracticeMarker(map);

    const bounds = new google.maps.LatLngBounds();
    bounds.extend(PRACTICE_LOCATION);
    filteredPatients.forEach(patient => bounds.extend(patient.location));
    map.fitBounds(bounds);

    createPatientMarkers(map);
  }, [createPracticeMarker, createPatientMarkers, filteredPatients]);

  useEffect(() => {
    return () => {
      clearMarkers();
      if (practiceMarkerRef.current) {
        practiceMarkerRef.current.setMap(null);
      }
    };
  }, [clearMarkers]);

  return (
    <div className="w-full h-full">
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY || ''}>
        <GoogleMap
          mapContainerClassName="w-full h-full"
          center={PRACTICE_LOCATION}
          zoom={12}
          options={mapOptions}
          onLoad={onMapLoad}
        />
      </LoadScript>
    </div>
  );
};

export default LocationMap;
