import React, { useState } from 'react';
import { Home, BarChart2, Map, MapPin, Bot } from 'lucide-react';
import LocationMap from './LocationMap';
import PatientMapFilters from './PatientMapFilters';
import { STATIC_PATIENT_DATA, Patient, PRACTICE_LOCATION } from '../../types/patientData';

// Haversine formula to calculate distance between two points in miles
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Helper function to check if a distance falls within a filter range
function isInDistanceRange(distance: number, range: string): boolean {
  switch (range) {
    case '0-2 miles':
      return distance <= 2;
    case '2-5 miles':
      return distance > 2 && distance <= 5;
    case '5-10 miles':
      return distance > 5 && distance <= 10;
    case '10+ miles':
      return distance > 10;
    default:
      return false;
  }
}

interface DashboardContainer4Props {
  onNavigateToHome?: () => void;
  onNavigateToPractice?: () => void;
  onNavigateToMap?: () => void;
}

export const DashboardContainer4: React.FC<DashboardContainer4Props> = ({
  onNavigateToHome,
  onNavigateToPractice,
  onNavigateToMap
}) => {
  const [activePage, setActivePage] = useState('location');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>(STATIC_PATIENT_DATA);

  const handlePageChange = (pageId: string) => {
  if (pageId === 'home') {
    onNavigateToHome?.();
    return;
  }
  if (pageId === 'practice') {
    onNavigateToPractice?.();
    return;
  }
  if (pageId === 'map') {
    onNavigateToMap?.();
    return;
  }

  setIsTransitioning(true);
  setActivePage(pageId);
  const timer = setTimeout(() => {
    setIsTransitioning(false);
  }, 100);
  return () => clearTimeout(timer); // Cleanup timeout
};

  const handleFiltersChange = (filters: any) => {
    const filtered = STATIC_PATIENT_DATA.filter(patient => {
      // Distance filter
      if (filters.distance.length > 0) {
        const distance = calculateDistance(
          PRACTICE_LOCATION.lat,
          PRACTICE_LOCATION.lng,
          patient.location.lat,
          patient.location.lng
        );
        if (!filters.distance.some((range: string) => isInDistanceRange(distance, range))) {
          return false;
        }
      }

      // Status filter
      if (filters.status.length && !filters.status.includes(patient.status)) return false;
      
      // Insurance type filter
      if (filters.insuranceType.length && !filters.insuranceType.includes(patient.insuranceType)) return false;
      
      // Primary language filter
      if (filters.primaryLanguage.length && !filters.primaryLanguage.includes(patient.primaryLanguage)) return false;
      
      // Age filter
      if (filters.age.length) {
        const age = patient.age;
        let matchesAge = false;
        filters.age.forEach((range: string) => {
          if (range === '0-17' && age >= 0 && age <= 17) matchesAge = true;
          if (range === '18-35' && age >= 18 && age <= 35) matchesAge = true;
          if (range === '36-50' && age >= 36 && age <= 50) matchesAge = true;
          if (range === '51-65' && age >= 51 && age <= 65) matchesAge = true;
          if (range === '65+' && age >= 65) matchesAge = true;
        });
        if (!matchesAge) return false;
      }

      // Last visit filter
      if (filters.lastVisit.length) {
        const visitDate = new Date(patient.lastVisit);
        const now = new Date();
        let matchesVisit = false;
        filters.lastVisit.forEach((range: string) => {
          const days = (now.getTime() - visitDate.getTime()) / (1000 * 3600 * 24);
          if (range === 'Last 30 days' && days <= 30) matchesVisit = true;
          if (range === 'Last 6 months' && days <= 180) matchesVisit = true;
          if (range === 'Last 12 months' && days <= 365) matchesVisit = true;
          if (range === 'Over 12 months' && days > 365) matchesVisit = true;
        });
        if (!matchesVisit) return false;
      }

      // Hygiene filter
      if (filters.hygieneDue.length) {
        const isDue = filters.hygieneDue.includes('Yes');
        if (patient.hygieneDue !== isDue) return false;
      }

      return true;
    });
    setFilteredPatients(filtered);
  };

  const handleResetFilters = () => {
    setFilteredPatients(STATIC_PATIENT_DATA);
  };

  return (
    <div className="h-full w-full">
      <div className="flex h-[340px] md:h-[480px] w-full">
        <div className="bg-white w-[50px] md:w-[80px] flex-shrink-0 flex flex-col items-center pt-2 md:pt-3 rounded-l-xl">
          {[
            { id: 'home', icon: <Home size={24} />, onClick: onNavigateToHome },
            { id: 'practice', icon: <BarChart2 size={24} />, onClick: onNavigateToPractice },
            { id: 'map', icon: <Map size={24} />, onClick: onNavigateToMap },
            { id: 'location', icon: <MapPin size={24} /> },
            { id: 'bot', icon: <Bot size={24} />, disabled: true }
          ].map((item) => (
            <div key={item.id} className="relative">
              <button
                onClick={() => item.onClick ? item.onClick() : !item.disabled && handlePageChange(item.id)}
                disabled={isTransitioning || item.disabled}
                className={`w-10 h-8 md:w-14 md:h-12 mb-1 md:mb-2 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 ease-in-out
                         ${activePage === item.id && !item.onClick
                           ? 'bg-[#052b52] text-white shadow-sm scale-105' 
                           : 'bg-transparent text-[#052b52] hover:bg-[#103d68] hover:bg-opacity-10'}
                         ${isTransitioning || item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                aria-label={`${item.onClick ? `Navigate to ${item.id}` : `Switch to ${item.id} view`}`}
              >
                {React.cloneElement(item.icon, {
                  size: typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 24,
                  className: `transition-transform duration-200 ${item.disabled ? 'text-gray-400' : ''}`
                })}
              </button>
            </div>
          ))}
        </div>

        <div className="flex-1 bg-[#103d68] rounded-r-xl flex flex-col overflow-hidden">
          <div className="flex-shrink-0 flex justify-between items-start px-3 pt-2 pb-0 md:px-5 md:pt-3 md:pb-0">
            <h1 className="text-xs md:text-lg text-white font-bold pl-1 md:pl-2 mt-auto mb-1 md:mb-1">Your Dental Practice</h1>
            <h2 className="text-sm md:text-[28px] text-white font-medium pr-3 md:pr-8 mt-1 md:mt-2">mednavi</h2>
          </div>

          <div className="flex-1 p-2 md:p-4">
            <div className="flex h-full gap-2">
              <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden">
                <LocationMap filteredPatients={filteredPatients} />
              </div>
              <div className="w-[30%] bg-gray-100 rounded-lg overflow-hidden">
                <PatientMapFilters
                  totalPatients={STATIC_PATIENT_DATA.length}
                  filteredCount={filteredPatients.length}
                  onFiltersChange={handleFiltersChange}
                  onResetFilters={handleResetFilters}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContainer4;
