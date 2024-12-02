import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

interface LocationMapProps {
  // Add any props if needed later
}

const LocationMap: React.FC<LocationMapProps> = () => {
  const mapCenter = {
    lat: 42.0451,
    lng: -87.8450
  };

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
    preserveDrawingBuffer: false,
    maxZoom: 18,
    minZoom: 8
  };

  const zipCodeColors = {
    "60714": "#E3F2FD", // Lightest blue
    "60631": "#BBDEFB",
    "60656": "#90CAF9",
    "60068": "#64B5F6"  // Darkest blue
  };

  const zipCodeNames = {
    "60714": "Niles",
    "60631": "Edison Park",
    "60656": "Norwood Park",
    "60068": "Park Ridge"
  };

  const onMapLoad = async (map: google.maps.Map) => {
    try {
      const dataLayer = new google.maps.Data({ map });

      const response = await fetch('/chicago-zipcodes.json');
      if (!response.ok) throw new Error('Failed to fetch GeoJSON data');
      
      const geoJson = await response.json();
      dataLayer.addGeoJson(geoJson);

      // Style the zipcodes
      dataLayer.setStyle((feature) => {
        const zipCode = feature.getProperty('ZCTA5CE20') as keyof typeof zipCodeColors;
        return {
          fillColor: zipCodeColors[zipCode] || '#E3F2FD',
          fillOpacity: 0.8,
          strokeWeight: 0,
          clickable: false
        };
      });

      // Add city labels
      const surroundingCities = [
        { name: "Morton Grove", position: { lat: 42.0401, lng: -87.7829 } },
        { name: "Glenview", position: { lat: 42.0698, lng: -87.7873 } },
        { name: "Des Plaines", position: { lat: 42.0334, lng: -87.8834 } },
        { name: "Skokie", position: { lat: 42.0324, lng: -87.7416 } },
        { name: "Lincolnwood", position: { lat: 42.0064, lng: -87.7329 } },
        { name: "Harwood Heights", position: { lat: 41.9639, lng: -87.8069 } },
        { name: "Rosemont", position: { lat: 41.9865, lng: -87.8709 } }
      ];

      surroundingCities.forEach(city => {
        new google.maps.Marker({
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
      });

      // Set initial bounds and center
      const bounds = new google.maps.LatLngBounds();
      dataLayer.forEach((feature: google.maps.Data.Feature) => {
        const geometry = feature.getGeometry();
        if (geometry) {
          geometry.forEachLatLng((latLng: google.maps.LatLng) => {
            if (latLng) bounds.extend(latLng);
          });
        }
      });
      map.fitBounds(bounds);

    } catch (error) {
      console.error('Error loading map data:', error);
      map.setCenter(mapCenter);
      map.setZoom(12);
    }
  };

  return (
    <div className="relative w-full h-full">
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY || ''}>
        <GoogleMap
          mapContainerClassName="w-full h-full"
          center={mapCenter}
          zoom={12}
          options={mapOptions}
          onLoad={onMapLoad}
        />
      </LoadScript>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm p-2 md:p-3">
        <div className="text-[10px] md:text-xs font-medium text-gray-700 mb-1 md:mb-2">Zip Codes</div>
        {Object.entries(zipCodeColors).map(([zipCode, color]) => (
          <div key={zipCode} className="flex items-center space-x-2 mb-1">
            <div 
              className="w-3 h-3 md:w-4 md:h-4 rounded"
              style={{ backgroundColor: color }}
            />
            <span className="text-[8px] md:text-xs text-gray-600">
              {zipCodeNames[zipCode as keyof typeof zipCodeNames]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationMap;
