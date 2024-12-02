import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, useLoadScript, MarkerF, MarkerClustererF } from '@react-google-maps/api';
import { SAMPLE_PATIENT_DATA, PRACTICE_LOCATION, Patient } from '../../types/patientData';

interface LocationMapProps {
  filteredPatients?: Patient[];
}

const LocationMap: React.FC<LocationMapProps> = ({ 
  filteredPatients = SAMPLE_PATIENT_DATA 
}) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const practiceMarkerRef = useRef<google.maps.Marker | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

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
    gestureHandling: 'cooperative',
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
    if (markersRef.current) {
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
    }
  }, []);

  const fitMapToBounds = useCallback((map: google.maps.Map) => {
    const bounds = new google.maps.LatLngBounds();
    bounds.extend({ lat: PRACTICE_LOCATION.lat, lng: PRACTICE_LOCATION.lng });
    
    filteredPatients.forEach(patient => {
      bounds.extend(patient.location);
    });

    map.fitBounds(bounds);
  }, [filteredPatients]);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    fitMapToBounds(map);
  }, [fitMapToBounds]);

  // Clean up markers on unmount
  useEffect(() => {
    return () => {
      clearMarkers();
      if (practiceMarkerRef.current) {
        practiceMarkerRef.current.setMap(null);
      }
    };
  }, [clearMarkers]);

  if (loadError) {
    return <div className="w-full h-full flex items-center justify-center text-red-500">Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div className="w-full h-full flex items-center justify-center">Loading maps...</div>;
  }

  return (
    <div className="w-full h-full">
      <GoogleMap
        mapContainerClassName="w-full h-full"
        center={{ lat: PRACTICE_LOCATION.lat, lng: PRACTICE_LOCATION.lng }}
        zoom={12}
        options={mapOptions}
        onLoad={onMapLoad}
      >
        {/* Practice Location Marker */}
        <MarkerF
          position={{ lat: PRACTICE_LOCATION.lat, lng: PRACTICE_LOCATION.lng }}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 12,
            fillColor: '#1E40AF',
            fillOpacity: 1,
            strokeColor: '#FFFFFF',
            strokeWeight: 2,
          }}
          title={PRACTICE_LOCATION.name}
        />

        {/* Patient Markers with Clustering */}
        <MarkerClustererF
          averageCenter
          enableRetinaIcons
          gridSize={50}
          maxZoom={15}
        >
          {(clusterer) => (
            <>
              {filteredPatients.map((patient) => (
                <MarkerF
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
        </MarkerClustererF>
      </GoogleMap>
    </div>
  );
};

export default LocationMap;
