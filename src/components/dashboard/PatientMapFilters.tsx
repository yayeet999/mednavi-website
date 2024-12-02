import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Filter, Activity, Users, MapPin, Calendar, FileText, Heart, Languages } from 'lucide-react';
import { FilterState, FILTER_OPTIONS } from '../../types/patientData';

interface PopoverProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  anchorEl: HTMLElement | null;
}

const Popover: React.FC<PopoverProps> = ({ isOpen, onClose, children, anchorEl }) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node) && 
          anchorEl && !anchorEl.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose, anchorEl]);

  useEffect(() => {
    if (!isOpen || !popoverRef.current || !anchorEl) return;

    const updatePosition = () => {
      if (!popoverRef.current || !anchorEl) return;

      const anchorRect = anchorEl.getBoundingClientRect();
      const popoverRect = popoverRef.current.getBoundingClientRect();
      const containerRect = anchorEl.closest('.filter-container')?.getBoundingClientRect();

      if (!containerRect) return;

      let top = anchorRect.bottom - containerRect.top;
      let left = anchorRect.left - containerRect.left;

      if (left + popoverRect.width > containerRect.width - 10) {
        left = containerRect.width - popoverRect.width - 10;
      }

      if (top + popoverRect.height > containerRect.height - 10) {
        top = anchorRect.top - containerRect.top - popoverRect.height;
      }

      popoverRef.current.style.top = `${top}px`;
      popoverRef.current.style.left = `${left}px`;
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [isOpen, anchorEl]);

  if (!isOpen) return null;

  return (
    <div 
      ref={popoverRef}
      className="absolute z-[999] bg-white rounded-lg shadow-lg p-2 min-w-[240px]"
      style={{ maxHeight: '300px', overflowY: 'auto' }}
    >
      {children}
    </div>
  );
};

interface FilterCardProps {
  title: string;
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
  isReset
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isReset) {
      setIsOpen(false);
    }
  }, [isReset]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-1.5 relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between"
      >
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-md bg-blue-50 flex items-center justify-center mr-2">
            {React.cloneElement(icon as React.ReactElement, { size: 14 })}
          </div>
          <div className="text-left">
            <div className="text-xs font-medium text-gray-900">{title}</div>
            {selectedFilters.length > 0 && !isReset && (
              <div className="text-[10px] text-blue-600">{selectedFilters.length} selected</div>
            )}
          </div>
        </div>
        <Filter 
          size={12}
          className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <Popover
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        anchorEl={buttonRef.current}
      >
        <div className="grid grid-cols-2 gap-1">
          {options.map(option => (
            <button
              key={option}
              onClick={() => {
                onFilterChange(category, option);
                setIsOpen(false);
              }}
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
      </Popover>
    </div>
  );
};

const StatsHeader: React.FC<{
  totalPatients: number;
  filteredCount: number;
  onResetFilters: () => void;
  activeFiltersCount: number;
}> = ({ 
  totalPatients, 
  filteredCount, 
  onResetFilters,
  activeFiltersCount 
}) => {
  const percentage = Math.round((filteredCount / totalPatients) * 100);

  return (
    <div className="bg-white rounded-lg shadow-sm p-2 mb-3">
      <div className="flex items-center justify-between mb-1">
        <div className="text-[10px] font-medium text-gray-700 flex items-center justify-between w-full">
          <span>Filter Patients</span>
          {activeFiltersCount > 0 && (
            <button
              onClick={onResetFilters}
              className="text-[9px] text-blue-500 hover:text-blue-600"
            >
              Reset All
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-gray-600">Total: <span className="font-medium text-gray-900 text-[13px]">{totalPatients.toLocaleString()}</span></span>
        <span className="text-gray-600">Filtered: <span className="font-medium text-gray-900 text-[13px]">{filteredCount.toLocaleString()}</span></span>
        <span className="text-gray-600">Showing: <span className="font-medium text-blue-600 text-[13px]">{percentage}%</span></span>
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

  const [isReset, setIsReset] = useState(false);

  const handleFilterChange = useCallback((category: keyof FilterState, value: string) => {
    setIsReset(false);
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

  const handleResetFilters = useCallback(() => {
    setIsReset(true);
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
    <div className="h-full flex flex-col bg-gray-50 p-3 rounded-lg filter-container relative">
      <StatsHeader
        totalPatients={totalPatients}
        filteredCount={filteredCount}
        onResetFilters={handleResetFilters}
        activeFiltersCount={activeFiltersCount}
      />

      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col space-y-1.5">
          {[
            {
              title: "Patient Status",
              icon: <Activity className="text-blue-600" />,
              category: "status" as keyof FilterState
            },
            {
              title: "Insurance",
              icon: <FileText className="text-blue-600" />,
              category: "insuranceType" as keyof FilterState
            },
            {
              title: "Distance",
              icon: <MapPin className="text-blue-600" />,
              category: "distance" as keyof FilterState
            },
            {
              title: "Demographics",
              icon: <Users className="text-blue-600" />,
              category: "age" as keyof FilterState
            },
            {
              title: "Last Visit",
              icon: <Calendar className="text-blue-600" />,
              category: "lastVisit" as keyof FilterState
            },
            {
              title: "Hygiene",
              icon: <Heart className="text-blue-600" />,
              category: "hygieneDue" as keyof FilterState
            },
            {
              title: "Language",
              icon: <Languages className="text-blue-600" />,
              category: "primaryLanguage" as keyof FilterState
            }
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
          {filters.insuranceType.includes('Private') && (
            <FilterCard
              title="Insurance Plan"
              icon={<FileText className="text-blue-600" />}
              category="privateInsurance"
              options={FILTER_OPTIONS.privateInsurance}
              selectedFilters={filters.privateInsurance}
              onFilterChange={handleFilterChange}
              isReset={isReset}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientMapFilters;
