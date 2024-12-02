import React, { useState, useCallback } from 'react';
import { Filter, X } from 'lucide-react';

interface FilterState {
  age: string[];
  gender: string[];
  distance: string[];
  insuranceType: string[];
  privateInsurance: string[];
  status: string[];
  lastVisit: string[];
  hygieneDue: string[];
  isNewPatient: string[];
  appointmentStatus: string[];
  familyMembers: string[];
  primaryLanguage: string[];
}

interface FilterProps {
  totalPatients: number;
  filteredCount: number;
  onFiltersChange: (filters: FilterState) => void;
  onResetFilters: () => void;
}

const PatientMapFilters: React.FC<FilterProps> = ({
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

  const [expandedSection, setExpandedSection] = useState<string | null>('quickFilters');

  const filterOptions = {
    age: ['0-17', '18-35', '36-50', '51-65', '65+'],
    gender: ['Male', 'Female', 'Other'],
    distance: ['0-2 miles', '2-5 miles', '5-10 miles', '10+ miles'],
    insuranceType: ['Public', 'Private', 'Cash'],
    privateInsurance: ['Humana', 'Delta', 'UHC', 'MetLife', 'Cigna'],
    status: ['Active', 'Inactive'],
    lastVisit: ['Last 30 days', 'Last 6 months', 'Last 12 months'],
    hygieneDue: ['Yes', 'No'],
    isNewPatient: ['Yes', 'No'],
    appointmentStatus: ['Scheduled', 'Not Scheduled'],
    familyMembers: ['Single', '2-3 members', '4+ members'],
    primaryLanguage: ['English', 'Spanish', 'Polish', 'Arabic']
  };

  const handleFilterChange = useCallback((category: keyof FilterState, value: string) => {
    setFilters(prev => {
      const newFilters = { 
        ...prev,
        [category]: prev[category].includes(value)
          ? prev[category].filter(item => item !== value)
          : [...prev[category], value]
      };
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

  const renderFilterSection = (title: string, category: keyof FilterState, options: string[]) => (
    <div className="mb-4">
      <button
        onClick={() => setExpandedSection(expandedSection === title ? null : title)}
        className="w-full flex items-center justify-between p-2 bg-white rounded-lg shadow-sm"
      >
        <span className="text-sm font-medium text-gray-700">{title}</span>
        <Filter size={16} className={`transform transition-transform ${
          expandedSection === title ? 'rotate-180' : ''
        }`} />
      </button>
      
      {expandedSection === title && (
        <div className="mt-2 p-2 bg-white rounded-lg">
          <div className="grid grid-cols-2 gap-2">
            {options.map(option => (
              <button
                key={option}
                onClick={() => handleFilterChange(category, option)}
                className={`px-2 py-1 text-xs rounded-md transition-colors ${
                  filters[category].includes(option)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-gray-50 p-3 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-medium text-gray-700">
          Showing {filteredCount} of {totalPatients} patients
        </div>
        <button
          onClick={resetFilters}
          className="flex items-center text-xs text-blue-500 hover:text-blue-600"
        >
          <X size={14} className="mr-1" />
          Reset Filters
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2">
        {Object.entries(filterOptions).map(([key, options]) => (
          renderFilterSection(
            key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
            key as keyof FilterState,
            options
          )
        ))}
      </div>
    </div>
  );
};

export default PatientMapFilters;
