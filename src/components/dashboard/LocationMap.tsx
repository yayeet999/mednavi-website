import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { PRACTICE_LOCATION, Patient } from '../../types/patientData';

interface LocationMapProps {
  filteredPatients: Patient[];
}

// Define the zipcode regions with their properties
const ZIPCODE_REGIONS = [
  { 
    id: "60714", 
    name: "Niles", 
    color: "#1E40AF", // darkest blue
    center: { lat: 42.0294, lng: -87.7925 }
  },
  { 
    id: "60631", 
    name: "Edison Park", 
    color: "#2563EB", // slightly lighter blue
    center: { lat: 42.0072, lng: -87.8139 }
  },
  { 
    id: "60656", 
    name: "Norwood Park", 
    color: "#3B82F6", // medium blue
    center: { lat: 41.9856, lng: -87.8087 }
  },
  { 
    id: "60068", 
    name: "Park Ridge", 
    color: "#60A5FA", // lightest blue
    center: { lat: 42.0111, lng: -87.8406 }
  }
];

const LocationMap: React.FC<LocationMapProps> = ({ filteredPatients }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const practiceMarkerRef = useRef<google.maps.Marker | null>(null);
  const zipDataLayerRef = useRef<google.maps.Data | null>(null);

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

  const setupZipCodeRegions = useCallback(async (map: google.maps.Map) => {
    if (zipDataLayerRef.current) {
      zipDataLayerRef.current.setMap(null);
    }

    try {
      const response = await fetch('/chicago-zipcodes.json');
      if (!response.ok) throw new Error('Failed to fetch GeoJSON data');
      
      const geoJson = await response.json();
      
      const dataLayer = new google.maps.Data({ map });
      zipDataLayerRef.current = dataLayer;
      
      dataLayer.addGeoJson(geoJson);

      dataLayer.setStyle(feature => {
        const zipCode = feature.getProperty('ZCTA5CE20');
        const region = ZIPCODE_REGIONS.find(r => r.id === zipCode);
        
        return {
          fillColor: region ? region.color : 'transparent',
          fillOpacity: 0.2,
          strokeWeight: 0,
          strokeColor: 'transparent'
        };
      });

    } catch (error) {
      console.error('Error loading zipcode regions:', error);
    }
  }, []);

  const createLegend = useCallback((map: google.maps.Map) => {
    const legend = document.createElement('div');
    legend.className = 'bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm';
    legend.style.margin = '10px';
    legend.style.fontSize = '12px';

    ZIPCODE_REGIONS.forEach(region => {
      const item = document.createElement('div');
      item.className = 'flex items-center mb-2 last:mb-0';

      const color = document.createElement('div');
      color.className = 'w-4 h-4 rounded mr-2';
      color.style.backgroundColor = region.color;

      const text = document.createElement('span');
      text.className = 'text-gray-700';
      text.textContent = `${region.id} - ${region.name}`;

      item.appendChild(color);
      item.appendChild(text);
      legend.appendChild(item);
    });

    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legend);
  }, []);

  const onMapLoad = useCallback(async (map: google.maps.Map) => {
    setMap(map);
    createPracticeMarker(map);

    const bounds = new google.maps.LatLngBounds();
    bounds.extend(PRACTICE_LOCATION);
    filteredPatients.forEach(patient => bounds.extend(patient.location));
    map.fitBounds(bounds);

    await setupZipCodeRegions(map);
    createPatientMarkers(map);
    createLegend(map);
  }, [createPracticeMarker, createPatientMarkers, setupZipCodeRegions, createLegend, filteredPatients]);

  useEffect(() => {
    if (map) {
      createPatientMarkers(map);
    }
  }, [map, filteredPatients, createPatientMarkers]);

  useEffect(() => {
    return () => {
      clearMarkers();
      if (practiceMarkerRef.current) {
        practiceMarkerRef.current.setMap(null);
      }
      if (zipDataLayerRef.current) {
        zipDataLayerRef.current.setMap(null);
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
