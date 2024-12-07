import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Filter, Activity, Users, MapPin, Calendar, FileText, Heart, Languages } from 'lucide-react';
import { FilterState, FILTER_OPTIONS } from '../../types/patientData';

interface FilterCardProps {
  title: React.ReactNode;
  icon: React.ReactNode;
  category: keyof FilterState;
  options: string[];
  selectedFilters: string[];
  onFilterChange: (category: keyof FilterState, value: string) => void;
  isReset: boolean;
}

const FilterCard: React.FC<FilterCardProps> = ({
  title,
  icon,
  category,
  options,
  selectedFilters,
  onFilterChange,
  isReset,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReset) {
      setIsOpen(false);
    }
  }, [isReset]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const iconColor = selectedFilters.length > 0 ? 'text-blue-700' : 'text-gray-400';
  const iconContainerStyle = selectedFilters.length > 0 
    ? 'w-4 h-4 md:w-6 md:h-6 rounded-md bg-blue-50 border border-blue-700 flex items-center justify-center mr-1.5 md:mr-2'
    : 'w-4 h-4 md:w-6 md:h-6 rounded-md bg-blue-50 flex items-center justify-center mr-1.5 md:mr-2';
  const shouldOpenUpward = category === 'lastVisit' || category === 'primaryLanguage';

  return (
    <div ref={containerRef} className="bg-white rounded-lg shadow-sm p-1 md:p-1.5 relative mx-auto w-[103%] md:w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between"
      >
        <div className="flex items-center">
          <div className={iconContainerStyle}>
            {React.cloneElement(icon as React.ReactElement, {
              size: typeof window !== 'undefined' && window.innerWidth < 768 ? 11 : 14,
              className: iconColor,
            })}
          </div>
          <div className="text-left">
            <div className="text-[8.5px] md:text-xs font-semibold text-gray-900">{title}</div>
          </div>
        </div>
        <Filter
          size={typeof window !== 'undefined' && window.innerWidth < 768 ? 9 : 12}
          className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute left-0 right-0 z-50 bg-white rounded-lg shadow-lg p-1.5 md:p-2 border border-gray-100 ${
            shouldOpenUpward ? 'bottom-full mb-1' : 'top-full mt-1'
          }`}
        >
          <div className="grid grid-cols-2 gap-0.5 md:gap-1">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onFilterChange(category, option);
                  setIsOpen(false);
                }}
                className={`px-1.5 md:px-2 py-0.5 md:py-1 text-[7.5px] md:text-[11px] font-semibold rounded-md transition-colors ${
                  selectedFilters.includes(option)
                    ? 'bg-blue-600 text-white'
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

const StatsHeader: React.FC<{
  totalPatients: number;
  filteredCount: number;
  onResetFilters: () => void;
}> = ({ totalPatients, filteredCount, onResetFilters }) => {
  const percentage = Math.round((filteredCount / totalPatients) * 100);

  return (
    <div className="bg-white rounded-lg shadow-sm p-1.5 md:p-2 mb-2 md:mb-3 mx-auto w-[103%] md:w-full">
      <div className="flex items-center justify-between mb-0.5 md:mb-1 w-full">
        <div className="flex items-center">
          <div className="text-[7px] md:text-[10px] font-semibold text-gray-700">Filter Patients</div>
          <button
            onClick={onResetFilters}
            className="text-[6px] md:text-[9px] font-semibold text-blue-500 hover:text-blue-600 ml-2 md:ml-3"
          >
            Reset All
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between text-[7px] md:text-[11px]">
        <span className="text-gray-600 font-medium">
          Total:{' '}
          <span className="font-bold text-gray-900 text-[9px] md:text-[13px]">
            {totalPatients.toLocaleString()}
          </span>
        </span>
        <span className="text-gray-600 font-medium">
          Filtered:{' '}
          <span className="font-bold text-gray-900 text-[9px] md:text-[13px]">
            {filteredCount.toLocaleString()}
          </span>
        </span>
        <span className="text-gray-600 font-medium">
          Showing:{' '}
          <span className="font-bold text-blue-600 text-[9px] md:text-[13px]">{percentage}%</span>
        </span>
      </div>
    </div>
  );
};

const PatientMapFilters: React.FC<{
  totalPatients: number;
  filteredCount: number;
  onFiltersChange: (filters: FilterState) => void;
  onResetFilters: () => void;
}> = ({ totalPatients, filteredCount, onFiltersChange, onResetFilters }) => {
  const [filters, setFilters] = useState<FilterState>({
    age: [],
    gender: [],
    distance: [],
    insuranceType: [],
    status: [],
    lastVisit: [],
    hygieneDue: [],
    isNewPatient: [],
    primaryLanguage: [],
  });

  const [isReset, setIsReset] = useState(false);

  const handleFilterChange = useCallback(
    (category: keyof FilterState, value: string) => {
      setIsReset(false);
      setFilters((prev) => {
        const newFilters = {
          ...prev,
          [category]: prev[category].includes(value)
            ? prev[category].filter((item) => item !== value)
            : [...prev[category], value],
        };
        onFiltersChange(newFilters);
        return newFilters;
      });
    },
    [onFiltersChange]
  );

  const handleResetFilters = useCallback(() => {
    setIsReset(true);
    setFilters({
      age: [],
      gender: [],
      distance: [],
      insuranceType: [],
      status: [],
      lastVisit: [],
      hygieneDue: [],
      isNewPatient: [],
      primaryLanguage: [],
    });
    onResetFilters();
  }, [onResetFilters]);

  return (
    <div className="h-full flex flex-col bg-gray-50 p-1 md:p-3 rounded-lg">
      <StatsHeader
        totalPatients={totalPatients}
        filteredCount={filteredCount}
        onResetFilters={handleResetFilters}
      />

      <div className="flex-1 overflow-hidden">
        <div className="flex flex-col space-y-1.5">
          {[
            {
              title: <><span className="hidden md:inline">Patient </span>Status</>,
              icon: <Activity />,
              category: 'status' as keyof FilterState,
            },
            {
              title: 'Insurance',
              icon: <FileText />,
              category: 'insuranceType' as keyof FilterState,
            },
            {
              title: 'Distance',
              icon: <MapPin />,
              category: 'distance' as keyof FilterState,
            },
            {
              title: <>Age <span className="hidden md:inline">Groups</span></>,
              icon: <Users />,
              category: 'age' as keyof FilterState,
            },
            {
              title: 'Last Visit',
              icon: <Calendar />,
              category: 'lastVisit' as keyof FilterState,
            },
            {
              title: <>Hygiene <span className="hidden md:inline">Scheduled</span></>,
              icon: <Heart />,
              category: 'hygieneDue' as keyof FilterState,
            },
            {
              title: 'Language',
              icon: <Languages />,
              category: 'primaryLanguage' as keyof FilterState,
            },
          ].map((filter) => (
            <FilterCard
              key={filter.category}
              title={filter.title}
              icon={filter.icon}
              category={filter.category}
              options={FILTER_OPTIONS[filter.category]}
              selectedFilters={filters[filter.category]}
              onFilterChange={handleFilterChange}
              isReset={isReset}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientMapFilters;
