import React, { useState, useCallback } from 'react';
import { Filter, X, Users, Activity, MapPin, Calendar, FileText, Heart, Languages } from 'lucide-react';
import { FilterState, FILTER_OPTIONS } from '../../types/patientData';

interface FilterCardProps {
  title: string;
  icon: React.ReactNode;
  category: keyof FilterState;
  options: string[];
  selectedFilters: string[];
  onFilterChange: (category: keyof FilterState, value: string) => void;
}

const FilterCard: React.FC<FilterCardProps> = ({ 
  title, 
  icon, 
  category, 
  options, 
  selectedFilters, 
  onFilterChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm p-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between"
      >
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-md bg-blue-50 flex items-center justify-center mr-2">
            {icon}
          </div>
          <div className="text-left">
            <div className="text-xs font-medium text-gray-900">{title}</div>
            {selectedFilters.length > 0 && (
              <div className="text-[10px] text-blue-600">{selectedFilters.length} selected</div>
            )}
          </div>
        </div>
        <Filter 
          size={14}
          className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="mt-2 grid grid-cols-2 gap-1">
          {options.map(option => (
            <button
              key={option}
              onClick={() => onFilterChange(category, option)}
              className={`px-2 py-1 text-[11px] rounded-md transition-colors ${
                selectedFilters.includes(option)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const StatPanel: React.FC<{ 
  totalPatients: number;
  filteredCount: number;
  filters: FilterState;
}> = ({ totalPatients, filteredCount, filters }) => {
  const percentage = Math.round((filteredCount / totalPatients) * 100);
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-3 mb-3">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium text-gray-900">Patient Overview</div>
        <div className="text-xs text-blue-600 font-medium">{percentage}% of total</div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-[11px]">
        <div className="bg-gray-50 rounded-md p-2">
          <div className="text-gray-500">Total Shown</div>
          <div className="font-medium text-gray-900">{filteredCount.toLocaleString()}</div>
        </div>
        <div className="bg-gray-50 rounded-md p-2">
          <div className="text-gray-500">Database Total</div>
          <div className="font-medium text-gray-900">{totalPatients.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};

const PatientMapFilters: React.FC<{
  totalPatients: number;
  filteredCount: number;
  onFiltersChange: (filters: FilterState) => void;
  onResetFilters: () => void;
}> = ({
  totalPatients,
  filteredCount,
  onFiltersChange,
  onResetFilters
}) => {
  const [filters, setFilters] = useState<FilterState>({
    age: [],
    gender: [],
    distance: [],
    insuranceType: [],
    privateInsurance: [],
    status: [],
    lastVisit: [],
    hygieneDue: [],
    isNewPatient: [],
    appointmentStatus: [],
    familyMembers: [],
    primaryLanguage: []
  });

  const handleFilterChange = useCallback((category: keyof FilterState, value: string) => {
    setFilters(prev => {
      const newFilters = { 
        ...prev,
        [category]: prev[category].includes(value)
          ? prev[category].filter(item => item !== value)
          : [...prev[category], value]
      };
      
      if (category === 'insuranceType' && !newFilters.insuranceType.includes('Private')) {
        newFilters.privateInsurance = [];
      }

      onFiltersChange(newFilters);
      return newFilters;
    });
  }, [onFiltersChange]);

  const resetFilters = useCallback(() => {
    setFilters({
      age: [],
      gender: [],
      distance: [],
      insuranceType: [],
      privateInsurance: [],
      status: [],
      lastVisit: [],
      hygieneDue: [],
      isNewPatient: [],
      appointmentStatus: [],
      familyMembers: [],
      primaryLanguage: []
    });
    onResetFilters();
  }, [onResetFilters]);

  const activeFiltersCount = Object.values(filters).flat().length;

  return (
    <div className="h-full flex flex-col bg-gray-50 p-3 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium text-gray-900">Filter Patients</div>
        {activeFiltersCount > 0 && (
          <button
            onClick={resetFilters}
            className="flex items-center text-xs text-blue-500 hover:text-blue-600"
          >
            <X size={14} className="mr-1" />
            Reset All
          </button>
        )}
      </div>

      <StatPanel 
        totalPatients={totalPatients}
        filteredCount={filteredCount}
        filters={filters}
      />

      <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
        <div className="grid grid-cols-2 gap-2">
          <FilterCard
            title="Patient Status"
            icon={<Activity size={16} className="text-blue-600" />}
            category="status"
            options={FILTER_OPTIONS.status}
            selectedFilters={filters.status}
            onFilterChange={handleFilterChange}
          />
          <FilterCard
            title="Insurance"
            icon={<FileText size={16} className="text-blue-600" />}
            category="insuranceType"
            options={FILTER_OPTIONS.insuranceType}
            selectedFilters={filters.insuranceType}
            onFilterChange={handleFilterChange}
          />
          <FilterCard
            title="Distance"
            icon={<MapPin size={16} className="text-blue-600" />}
            category="distance"
            options={FILTER_OPTIONS.distance}
            selectedFilters={filters.distance}
            onFilterChange={handleFilterChange}
          />
          <FilterCard
            title="Demographics"
            icon={<Users size={16} className="text-blue-600" />}
            category="age"
            options={FILTER_OPTIONS.age}
            selectedFilters={filters.age}
            onFilterChange={handleFilterChange}
          />
          <FilterCard
            title="Last Visit"
            icon={<Calendar size={16} className="text-blue-600" />}
            category="lastVisit"
            options={FILTER_OPTIONS.lastVisit}
            selectedFilters={filters.lastVisit}
            onFilterChange={handleFilterChange}
          />
          <FilterCard
            title="Hygiene"
            icon={<Heart size={16} className="text-blue-600" />}
            category="hygieneDue"
            options={FILTER_OPTIONS.hygieneDue}
            selectedFilters={filters.hygieneDue}
            onFilterChange={handleFilterChange}
          />
          <FilterCard
            title="Language"
            icon={<Languages size={16} className="text-blue-600" />}
            category="primaryLanguage"
            options={FILTER_OPTIONS.primaryLanguage}
            selectedFilters={filters.primaryLanguage}
            onFilterChange={handleFilterChange}
          />
          {filters.insuranceType.includes('Private') && (
            <FilterCard
              title="Insurance Plan"
              icon={<FileText size={16} className="text-blue-600" />}
              category="privateInsurance"
              options={FILTER_OPTIONS.privateInsurance}
              selectedFilters={filters.privateInsurance}
              onFilterChange={handleFilterChange}
            />
          )}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default PatientMapFilters;
