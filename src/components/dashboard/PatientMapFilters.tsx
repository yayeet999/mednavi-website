import React, { useState, useCallback } from 'react';
import { Filter, X } from 'lucide-react';
import { FilterState, FILTER_OPTIONS } from '../../types/patientData';

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
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const handleFilterChange = useCallback((category: keyof FilterState, value: string) => {
    setFilters(prev => {
      const newFilters = { 
        ...prev,
        [category]: prev[category].includes(value)
          ? prev[category].filter(item => item !== value)
          : [...prev[category], value]
      };
      
      // Special handling for insurance type and private insurance
      if (category === 'insuranceType') {
        if (!newFilters.insuranceType.includes('Private')) {
          newFilters.privateInsurance = [];
        }
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

  const renderFilterSection = (title: string, category: keyof FilterState, options: string[]) => {
    const isPrivateInsurance = category === 'privateInsurance';
    const showSection = !isPrivateInsurance || (isPrivateInsurance && filters.insuranceType.includes('Private'));

    if (!showSection) return null;

    return (
      <div className="mb-3">
        <button
          onClick={() => setExpandedSection(expandedSection === title ? null : title)}
          className="w-full flex items-center justify-between p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
        >
          <span className="text-sm font-medium text-gray-700">{title}</span>
          <Filter 
            size={16} 
            className={`transform transition-transform ${
              expandedSection === title ? 'rotate-180' : ''
            }`} 
          />
        </button>
        
        {expandedSection === title && (
          <div className="mt-2 p-2 bg-white rounded-lg shadow-sm">
            <div className="grid grid-cols-2 gap-1.5">
              {options.map(option => (
                <button
                  key={option}
                  onClick={() => handleFilterChange(category, option)}
                  className={`px-2 py-1.5 text-xs rounded-md transition-colors ${
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
  };

  const activeFiltersCount = Object.values(filters).flat().length;

  return (
    <div className="h-full flex flex-col bg-gray-50 p-3 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-sm font-medium text-gray-700">
            Showing {filteredCount} of {totalPatients} patients
          </div>
          {activeFiltersCount > 0 && (
            <div className="text-xs text-gray-500 mt-1">
              {activeFiltersCount} active filter{activeFiltersCount !== 1 ? 's' : ''}
            </div>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <button
            onClick={resetFilters}
            className="flex items-center text-xs text-blue-500 hover:text-blue-600"
          >
            <X size={14} className="mr-1" />
            Reset Filters
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
        {/* Quick Filters */}
        {renderFilterSection('Status', 'status', FILTER_OPTIONS.status)}
        {renderFilterSection('Insurance', 'insuranceType', FILTER_OPTIONS.insuranceType)}
        {renderFilterSection('Private Insurance', 'privateInsurance', FILTER_OPTIONS.privateInsurance)}
        {renderFilterSection('Distance', 'distance', FILTER_OPTIONS.distance)}

        {/* Advanced Filters Button */}
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="w-full text-xs text-gray-500 hover:text-gray-700 py-2"
        >
          {showAdvancedFilters ? 'Hide' : 'Show'} Advanced Filters
        </button>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <>
            {renderFilterSection('Age', 'age', FILTER_OPTIONS.age)}
            {renderFilterSection('Gender', 'gender', FILTER_OPTIONS.gender)}
            {renderFilterSection('Last Visit', 'lastVisit', FILTER_OPTIONS.lastVisit)}
            {renderFilterSection('Hygiene Due', 'hygieneDue', FILTER_OPTIONS.hygieneDue)}
            {renderFilterSection('New Patient', 'isNewPatient', FILTER_OPTIONS.isNewPatient)}
            {renderFilterSection('Appointment', 'appointmentStatus', FILTER_OPTIONS.appointmentStatus)}
            {renderFilterSection('Family Size', 'familyMembers', FILTER_OPTIONS.familyMembers)}
            {renderFilterSection('Language', 'primaryLanguage', FILTER_OPTIONS.primaryLanguage)}
          </>
        )}
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
