import React, { useState, useCallback, useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import { PRACTICE_LOCATION, Patient } from '../../types/patientData';

const ZIPCODE_REGIONS = [
  { 
    id: "60714", 
    name: "Niles", 
    color: "#1E40AF",
  },
  { 
    id: "60631", 
    name: "Edison Park", 
    color: "#2563EB",
  },
  { 
    id: "60656", 
    name: "Norwood Park", 
    color: "#60A5FA",
  },
  { 
    id: "60068", 
    name: "Park Ridge", 
    color: "#93C5FD",
  }
];

interface LocationMapProps {
  filteredPatients: Patient[];
}

interface ZipcodeFeature {
  type: "Feature";
  properties: {
    ZCTA5CE20: string;
    [key: string]: any;
  };
  geometry: any;
}

const CustomLegend = L.Control.extend({
  options: {
    position: 'bottomleft'
  },

  onAdd: function (map: L.Map) {
    const div = L.DomUtil.create('div', 'bg-white/90 backdrop-blur-sm rounded-lg shadow-sm p-2');
    
    ZIPCODE_REGIONS.forEach(region => {
      const row = `
        <div class="flex items-center mb-1 last:mb-0">
          <div class="w-3 h-3 rounded mr-2" style="background-color: ${region.color}"></div>
          <span class="text-gray-700 text-[11px]">
            ${region.id} - ${region.name}
          </span>
        </div>
      `;
      div.innerHTML += row;
    });

    return div;
  }
});

const MapComponent = ({ filteredPatients }: { filteredPatients: Patient[] }) => {
  const map = useMap();
  const [geoJsonData, setGeoJsonData] = useState<any>(null);

  useEffect(() => {
    const loadGeoJson = async () => {
      try {
        const response = await fetch('/chicago-zipcodes.json');
        if (!response.ok) throw new Error('Failed to fetch GeoJSON data');
        const data = await response.json();
        setGeoJsonData(data);
      } catch (error) {
        console.error('Error loading zipcode regions:', error);
      }
    };

    loadGeoJson();
  }, []);

  useEffect(() => {
    if (!map || !geoJsonData) return;

    // Clear existing layers
    map.eachLayer((layer) => {
      if (layer instanceof L.GeoJSON || layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Add base tile layer
    const tileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19
    }).addTo(map);

    // Add GeoJSON layer for zipcodes
    const geoJsonLayer = L.geoJSON(geoJsonData, {
      style: (feature: GeoJSON.Feature | undefined) => {
        if (!feature) return {};
        
        const zipCode = (feature as ZipcodeFeature).properties?.ZCTA5CE20;
        const region = ZIPCODE_REGIONS.find(r => r.id === zipCode);
        
        return {
          fillColor: region ? region.color : 'transparent',
          fillOpacity: 0.3,
          weight: 0,
          opacity: 1,
          color: 'transparent'
        };
      }
    }).addTo(map);

    // Create practice location marker
    const practiceIcon = L.divIcon({
      className: 'practice-marker',
      html: `<div class="w-6 h-6 rounded-full bg-blue-700 border-2 border-white shadow-lg"></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    const practiceMarker = L.marker(
      [PRACTICE_LOCATION.lat, PRACTICE_LOCATION.lng],
      { icon: practiceIcon, zIndexOffset: 1000 }
    ).bindPopup(`
      <div class="p-2">
        <div class="font-semibold text-gray-900">Your Dental Practice Location</div>
        <div class="text-sm text-gray-600">${PRACTICE_LOCATION.address}</div>
      </div>
    `).addTo(map);

    // Create patient markers with animation
    const patientMarkers = filteredPatients.map((patient, index) => {
      const patientIcon = L.divIcon({
        className: 'patient-marker',
        html: `<div class="w-3 h-3 rounded-full ${
          patient.status === 'Active' 
            ? 'bg-orange-400' 
            : 'bg-orange-300'
        } border border-white opacity-70 shadow-sm animate-fade-in"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6]
      });

      const marker = L.marker(
        [patient.location.lat, patient.location.lng],
        { 
          icon: patientIcon,
          zIndexOffset: index
        }
      );

      setTimeout(() => {
        marker.addTo(map);
      }, index * 10);

      return marker;
    });

    // Add custom legend
    const legend = new CustomLegend();
    legend.addTo(map);

    // Fit bounds to include all markers
    const bounds = L.latLngBounds([
      [PRACTICE_LOCATION.lat, PRACTICE_LOCATION.lng]
    ]);
    filteredPatients.forEach(patient => {
      bounds.extend([patient.location.lat, patient.location.lng]);
    });
    map.fitBounds(bounds, { 
      padding: [50, 50],
      animate: true,
      duration: 1
    });

    return () => {
      map.eachLayer((layer) => {
        if (layer instanceof L.GeoJSON || layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });
      legend.remove();
    };
  }, [map, geoJsonData, filteredPatients]);

  return null;
};

const LocationMap: React.FC<LocationMapProps> = ({ filteredPatients }) => {
  return (
    <div className="w-full h-full">
      <MapContainer
        center={[PRACTICE_LOCATION.lat, PRACTICE_LOCATION.lng]}
        zoom={12}
        className="w-full h-full"
        zoomControl={false}
        attributionControl={false}
        minZoom={11}
        maxZoom={14}
        maxBounds={[
          [41.85, -88.0],
          [42.15, -87.5]
        ]}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          maxZoom={19}
        />
        <MapComponent filteredPatients={filteredPatients} />
      </MapContainer>

      <style jsx global>{`
        .leaflet-container {
          background: #F8FAFC;
          font-family: inherit;
        }
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1) !important;
        }
        .leaflet-control-zoom-in,
        .leaflet-control-zoom-out {
          background: white !important;
          border: none !important;
          color: #1e40af !important;
          width: 32px !important;
          height: 32px !important;
          line-height: 32px !important;
          font-size: 16px !important;
        }
        .leaflet-control-zoom-in:hover,
        .leaflet-control-zoom-out:hover {
          background: #f8fafc !important;
          color: #1e40af !important;
        }
        .leaflet-marker-icon {
          background: none !important;
          border: none !important;
          box-shadow: none !important;
        }
        .practice-marker,
        .patient-marker {
          background: none;
          border: none;
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 0.7;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default LocationMap;
