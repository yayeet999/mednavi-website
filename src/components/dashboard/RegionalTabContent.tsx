import React, { useState, useCallback, useEffect, useMemo, useRef, forwardRef, useImperativeHandle } from 'react';
import { DollarSign, Users, Stethoscope } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

// Define the structure for zip codes
interface ZipCode {
  id: string;
  name: string;
  center: { lat: number; lng: number };
}

// Define the structure for icons
interface Icon {
  id: 'financial' | 'patients' | 'procedures';
  icon: React.ElementType;
  label: string;
}

// List of zip codes
const zipCodes: ZipCode[] = [
  { id: "60714", name: "Niles", center: { lat: 42.0294, lng: -87.7925 } },
  { id: "60631", name: "Edison Park", center: { lat: 42.0072, lng: -87.8139 } },
  { id: "60656", name: "Norwood Park", center: { lat: 41.9856, lng: -87.8087 } },
  { id: "60068", name: "Park Ridge", center: { lat: 42.0111, lng: -87.8406 } }
];

// List of surrounding cities
const surroundingCities = [
  { name: "Morton Grove", position: { lat: 42.0401, lng: -87.7829 } },
  { name: "Glenview", position: { lat: 42.0698, lng: -87.7873 } },
  { name: "Des Plaines", position: { lat: 42.0334, lng: -87.8834 } },
  { name: "Skokie", position: { lat: 42.0324, lng: -87.7416 } },
  { name: "Lincolnwood", position: { lat: 42.0064, lng: -87.7329 } },
  { name: "Harwood Heights", position: { lat: 41.9639, lng: -87.8069 } },
  { name: "Rosemont", position: { lat: 41.9865, lng: -87.8709 } }
];

// Center position for the map
const mapCenter = {
  lat: 42.0451,
  lng: -87.8450
};

// Define the structure for analysisData entries
interface AnalysisDataEntry {
  financial: {
    monthlyProduction: {
      regional: {
        total: number;
        breakdown: {
          [procedure: string]: {
            amount: number;
            percentage: number;
          };
        };
      };
      practice: {
        total: number;
        breakdown: {
          [procedure: string]: {
            amount: number;
            percentage: number;
          };
        };
      };
    };
    insurance: {
      regional: { public: number; private: number };
      practice: { public: number; private: number };
    };
    growth: {
      regional: { percentage: number; yoyChange: number };
      practice: { percentage: number; yoyChange: number };
    };
  };
  patients: {
    ageDistribution: {
      regional: {
        average: number;
        distribution: { [ageRange: string]: number };
      };
      practice: {
        average: number;
        distribution: { [ageRange: string]: number };
      };
    };
    activePatients: {
      regional: { percentage: number; total: number };
      practice: { percentage: number; total: number };
    };
    appointmentsByAge: {
      regional: {
        [ageRange: string]: { [procedure: string]: number };
      };
      practice: {
        [ageRange: string]: { [procedure: string]: number };
      };
    };
  };
  procedures: {
    highestVolume: {
      regional: { name: string; data: number[] };
      practice: { name: string; data: number[] };
    };
    largestProduction: {
      regional: { name: string; procedureAvg: number; totalAvg: number };
      practice: { name: string; procedureAvg: number; totalAvg: number };
    };
    lowestVolume: {
      regional: { name: string; data: number[] };
      practice: { name: string; data: number[] };
    };
  };
}

// Complete analysisData with all zip codes
const analysisData: Record<string, AnalysisDataEntry> = {
  "60714": {
    financial: {
      monthlyProduction: {
        regional: {
          total: 52450,
          breakdown: {
            "Aligners": { amount: 18357, percentage: 35 },
            "Hygiene": { amount: 15735, percentage: 30 },
            "Root Canals": { amount: 10490, percentage: 20 },
            "Whitening": { amount: 4196, percentage: 8 },
            "Veneers": { amount: 3672, percentage: 7 }
          }
        },
        practice: {
          total: 55800,
          breakdown: {
            "Aligners": { amount: 20588, percentage: 37 },
            "Hygiene": { amount: 16740, percentage: 30 },
            "Root Canals": { amount: 8928, percentage: 16 },
            "Whitening": { amount: 5022, percentage: 9 },
            "Veneers": { amount: 4522, percentage: 8 }
          }
        }
      },
      insurance: {
        regional: { public: 42, private: 58 },
        practice: { public: 45, private: 55 }
      },
      growth: {
        regional: { percentage: 12.4, yoyChange: 2.1 },
        practice: { percentage: 14.2, yoyChange: 3.5 }
      }
    },
    patients: {
      ageDistribution: {
        regional: {
          average: 34.5,
          distribution: { "0-18": 22, "19-35": 45, "36-50": 33 }
        },
        practice: {
          average: 32.8,
          distribution: { "0-18": 25, "19-35": 42, "36-50": 33 }
        }
      },
      activePatients: {
        regional: { percentage: 78, total: 2450 },
        practice: { percentage: 82, total: 2547 }
      },
      appointmentsByAge: {
        regional: {
          "0-18": { "Hygiene": 45, "Aligners": 35, "Veneers": 20 },
          "19-35": { "Hygiene": 40, "Aligners": 40, "Veneers": 20 },
          "36-50": { "Hygiene": 50, "Aligners": 25, "Veneers": 25 }
        },
        practice: {
          "0-18": { "Hygiene": 47, "Aligners": 33, "Veneers": 20 },
          "19-35": { "Hygiene": 42, "Aligners": 38, "Veneers": 20 },
          "36-50": { "Hygiene": 48, "Aligners": 27, "Veneers": 25 }
        }
      }
    },
    procedures: {
      highestVolume: {
        regional: { name: "Hygiene", data: [245, 268, 255] },
        practice: { name: "Hygiene", data: [258, 272, 265] }
      },
      largestProduction: {
        regional: { name: "Veneers", procedureAvg: 1250, totalAvg: 850 },
        practice: { name: "Veneers", procedureAvg: 1350, totalAvg: 890 }
      },
      lowestVolume: {
        regional: { name: "Root Canals", data: [12, 15, 14] },
        practice: { name: "Root Canals", data: [11, 13, 12] }
      }
    }
  },
  "60631": {
    financial: {
      monthlyProduction: {
        regional: {
          total: 48750,
          breakdown: {
            "Aligners": { amount: 16575, percentage: 34 },
            "Hygiene": { amount: 14625, percentage: 30 },
            "Root Canals": { amount: 9750, percentage: 20 },
            "Whitening": { amount: 3900, percentage: 8 },
            "Veneers": { amount: 3900, percentage: 8 }
          }
        },
        practice: {
          total: 51200,
          breakdown: {
            "Aligners": { amount: 17920, percentage: 35 },
            "Hygiene": { amount: 15360, percentage: 30 },
            "Root Canals": { amount: 10240, percentage: 20 },
            "Whitening": { amount: 4096, percentage: 8 },
            "Veneers": { amount: 3584, percentage: 7 }
          }
        }
      },
      insurance: {
        regional: { public: 40, private: 60 },
        practice: { public: 43, private: 57 }
      },
      growth: {
        regional: { percentage: 11.8, yoyChange: 1.9 },
        practice: { percentage: 13.5, yoyChange: 3.2 }
      }
    },
    patients: {
      ageDistribution: {
        regional: {
          average: 33.8,
          distribution: { "0-18": 24, "19-35": 43, "36-50": 33 }
        },
        practice: {
          average: 32.2,
          distribution: { "0-18": 26, "19-35": 41, "36-50": 33 }
        }
      },
      activePatients: {
        regional: { percentage: 76, total: 2380 },
        practice: { percentage: 80, total: 2475 }
      },
      appointmentsByAge: {
        regional: {
          "0-18": { "Hygiene": 44, "Aligners": 36, "Veneers": 20 },
          "19-35": { "Hygiene": 41, "Aligners": 39, "Veneers": 20 },
          "36-50": { "Hygiene": 49, "Aligners": 26, "Veneers": 25 }
        },
        practice: {
          "0-18": { "Hygiene": 46, "Aligners": 34, "Veneers": 20 },
          "19-35": { "Hygiene": 43, "Aligners": 37, "Veneers": 20 },
          "36-50": { "Hygiene": 47, "Aligners": 28, "Veneers": 25 }
        }
      }
    },
    procedures: {
      highestVolume: {
        regional: { name: "Hygiene", data: [238, 255, 245] },
        practice: { name: "Hygiene", data: [248, 262, 255] }
      },
      largestProduction: {
        regional: { name: "Veneers", procedureAvg: 1200, totalAvg: 820 },
        practice: { name: "Veneers", procedureAvg: 1300, totalAvg: 860 }
      },
      lowestVolume: {
        regional: { name: "Root Canals", data: [11, 14, 13] },
        practice: { name: "Root Canals", data: [10, 12, 11] }
      }
    }
  },
  "60656": {
    financial: {
      monthlyProduction: {
        regional: {
          total: 50600,
          breakdown: {
            "Aligners": { amount: 17710, percentage: 35 },
            "Hygiene": { amount: 15180, percentage: 30 },
            "Root Canals": { amount: 10120, percentage: 20 },
            "Whitening": { amount: 4048, percentage: 8 },
            "Veneers": { amount: 3542, percentage: 7 }
          }
        },
        practice: {
          total: 53500,
          breakdown: {
            "Aligners": { amount: 19260, percentage: 36 },
            "Hygiene": { amount: 16050, percentage: 30 },
            "Root Canals": { amount: 10700, percentage: 20 },
            "Whitening": { amount: 4280, percentage: 8 },
            "Veneers": { amount: 3210, percentage: 6 }
          }
        }
      },
      insurance: {
        regional: { public: 41, private: 59 },
        practice: { public: 44, private: 56 }
      },
      growth: {
        regional: { percentage: 12.1, yoyChange: 2.0 },
        practice: { percentage: 13.8, yoyChange: 3.3 }
      }
    },
    patients: {
      ageDistribution: {
        regional: {
          average: 34.2,
          distribution: { "0-18": 23, "19-35": 44, "36-50": 33 }
        },
        practice: {
          average: 32.5,
          distribution: { "0-18": 25, "19-35": 42, "36-50": 33 }
        }
      },
      activePatients: {
        regional: { percentage: 77, total: 2415 },
        practice: { percentage: 81, total: 2510 }
      },
      appointmentsByAge: {
        regional: {
          "0-18": { "Hygiene": 45, "Aligners": 35, "Veneers": 20 },
          "19-35": { "Hygiene": 40, "Aligners": 40, "Veneers": 20 },
          "36-50": { "Hygiene": 50, "Aligners": 25, "Veneers": 25 }
        },
        practice: {
          "0-18": { "Hygiene": 47, "Aligners": 33, "Veneers": 20 },
          "19-35": { "Hygiene": 42, "Aligners": 38, "Veneers": 20 },
          "36-50": { "Hygiene": 48, "Aligners": 27, "Veneers": 25 }
        }
      }
    },
    procedures: {
      highestVolume: {
        regional: { name: "Hygiene", data: [242, 262, 250] },
        practice: { name: "Hygiene", data: [253, 267, 260] }
      },
      largestProduction: {
        regional: { name: "Veneers", procedureAvg: 1225, totalAvg: 835 },
        practice: { name: "Veneers", procedureAvg: 1325, totalAvg: 875 }
      },
      lowestVolume: {
        regional: { name: "Root Canals", data: [12, 15, 14] },
        practice: { name: "Root Canals", data: [11, 13, 12] }
      }
    }
  },
  "60068": {
    financial: {
      monthlyProduction: {
        regional: {
          total: 54300,
          breakdown: {
            "Aligners": { amount: 19005, percentage: 35 },
            "Hygiene": { amount: 16290, percentage: 30 },
            "Root Canals": { amount: 10860, percentage: 20 },
            "Whitening": { amount: 4344, percentage: 8 },
            "Veneers": { amount: 3801, percentage: 7 }
          }
        },
        practice: {
          total: 57100,
          breakdown: {
            "Aligners": { amount: 20556, percentage: 36 },
            "Hygiene": { amount: 17130, percentage: 30 },
            "Root Canals": { amount: 11420, percentage: 20 },
            "Whitening": { amount: 4568, percentage: 8 },
            "Veneers": { amount: 3426, percentage: 6 }
          }
        }
      },
      insurance: {
        regional: { public: 43, private: 57 },
        practice: { public: 46, private: 54 }
      },
      growth: {
        regional: { percentage: 12.7, yoyChange: 2.2 },
        practice: { percentage: 14.5, yoyChange: 3.6 }
      }
    },
    patients: {
      ageDistribution: {
        regional: {
          average: 34.8,
          distribution: { "0-18": 22, "19-35": 45, "36-50": 33 }
        },
        practice: {
          average: 33.1,
          distribution: { "0-18": 24, "19-35": 43, "36-50": 33 }
        }
      },
      activePatients: {
        regional: { percentage: 79, total: 2485 },
        practice: { percentage: 83, total: 2584 }
      },
      appointmentsByAge: {
        regional: {
          "0-18": { "Hygiene": 46, "Aligners": 34, "Veneers": 20 },
          "19-35": { "Hygiene": 41, "Aligners": 39, "Veneers": 20 },
          "36-50": { "Hygiene": 51, "Aligners": 24, "Veneers": 25 }
        },
        practice: {
          "0-18": { "Hygiene": 48, "Aligners": 32, "Veneers": 20 },
          "19-35": { "Hygiene": 43, "Aligners": 37, "Veneers": 20 },
          "36-50": { "Hygiene": 49, "Aligners": 26, "Veneers": 25 }
        }
      }
    },
    procedures: {
      highestVolume: {
        regional: { name: "Hygiene", data: [248, 270, 258] },
        practice: { name: "Hygiene", data: [262, 275, 268] }
      },
      largestProduction: {
        regional: { name: "Veneers", procedureAvg: 1275, totalAvg: 865 },
        practice: { name: "Veneers", procedureAvg: 1375, totalAvg: 905 }
      },
      lowestVolume: {
        regional: { name: "Root Canals", data: [12, 15, 14] },
        practice: { name: "Root Canals", data: [11, 13, 12] }
      }
    }
  }
};

// Custom tooltip component for charts
const CustomTooltip: React.FC<{
  active?: boolean;
  payload?: any[];
  label?: string;
}> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 shadow-sm rounded-lg border border-gray-200">
        <p className="text-[10px] font-medium text-gray-600">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-[10px]" style={{ color: entry.color }}>
            {`${entry.name}: ${typeof entry.value === 'number' ? 
              entry.payload?.amount ? 
                `$${entry.payload.amount.toLocaleString()}` : 
                `${entry.value.toLocaleString()}${entry.unit || '%'}`
              : entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Monthly Production Chart Component
const MonthlyProductionChart: React.FC<{
  data: any;
  title: string;
  total: number;
  isDesktop: boolean;
}> = ({ data, title, total, isDesktop }) => {
  const COLORS = ['#1E40AF', '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'];
  const formattedData = Object.entries(data).map(([name, values]: [string, any]) => ({
    name,
    ...values,
  }));

  return (
    <div className={`flex ${isDesktop ? 'flex-row' : 'flex-col'} items-center w-full h-full`}>
      <div className={`${isDesktop ? 'w-1/3' : 'w-full'} text-center`}>
        <p className="text-[10px] text-gray-600 font-medium">{title}</p>
        <p className="text-[14px] font-semibold text-gray-800">
          ${total.toLocaleString()}
        </p>
      </div>
      <div className={`${isDesktop ? 'w-2/3' : 'w-full h-32'}`}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={formattedData}
              innerRadius={isDesktop ? 30 : 25}
              outerRadius={isDesktop ? 45 : 40}
              paddingAngle={2}
              dataKey="amount"
            >
              {formattedData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                  className="transition-opacity duration-200 hover:opacity-80"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Insurance Distribution Chart Component
const InsuranceDistributionChart: React.FC<{
  data: any;
  title: string;
  isDesktop: boolean;
}> = ({ data, title, isDesktop }) => {
  const formattedData = [
    { name: 'Public', value: data.public, color: '#1E40AF' },
    { name: 'Private', value: data.private, color: '#60A5FA' }
  ];

  return (
    <div className={`flex ${isDesktop ? 'flex-row' : 'flex-col'} items-center w-full h-full`}>
      <div className={`${isDesktop ? 'w-1/3' : 'w-full'} text-center`}>
        <p className="text-[10px] text-gray-600 font-medium">{title}</p>
        <div className="flex flex-col gap-1 mt-1">
          {formattedData.map((item) => (
            <div key={item.name} className="flex items-center justify-center gap-1">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <p className="text-[10px] text-gray-600">
                {item.name}: {item.value}%
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className={`${isDesktop ? 'w-2/3' : 'w-full h-32'}`}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={formattedData}
              innerRadius={isDesktop ? 40 : 35}
              outerRadius={isDesktop ? 50 : 45}
              startAngle={180}
              endAngle={0}
              paddingAngle={2}
              dataKey="value"
            >
              {formattedData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  className="transition-opacity duration-200 hover:opacity-80"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Growth Indicator Component
const GrowthIndicator: React.FC<{
  data: any;
  title: string;
  isDesktop: boolean;
}> = ({ data, title, isDesktop }) => {
  return (
    <div className={`flex ${isDesktop ? 'flex-row' : 'flex-col'} items-center w-full h-full`}>
      <div className={`${isDesktop ? 'w-1/2' : 'w-full'} text-center`}>
        <p className="text-[10px] text-gray-600 font-medium">{title}</p>
        <p className="text-[14px] font-semibold text-gray-800">
          {data.percentage}%
        </p>
        <p className={`text-[10px] ${data.yoyChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {data.yoyChange >= 0 ? '+' : ''}{data.yoyChange}% YoY
        </p>
      </div>
    </div>
  );
};

// Progress Circle Component
const ProgressCircle: React.FC<{
  percentage: number;
  total: number;
  title: string;
  isDesktop: boolean;
}> = ({ percentage, total, title, isDesktop }) => {
  const radius = isDesktop ? 40 : 35;
  const strokeWidth = isDesktop ? 8 : 6;
  const circumference = 2 * Math.PI * radius;
  const progress = (percentage / 100) * circumference;

  return (
    <div className={`flex ${isDesktop ? 'flex-row' : 'flex-col'} items-center w-full h-full`}>
      <div className={`${isDesktop ? 'w-1/2' : 'w-full'} text-center`}>
        <p className="text-[10px] text-gray-600 font-medium">{title}</p>
        <p className="text-[10px] text-gray-500">Total: {total.toLocaleString()}</p>
      </div>
      <div className={`${isDesktop ? 'w-1/2' : 'w-full'} relative`}>
        <svg
          className="transform -rotate-90 w-24 h-24"
          viewBox="0 0 100 100"
        >
          <circle
            className="text-gray-200"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="none"
            r={radius}
            cx="50"
            cy="50"
          />
          <circle
            className="text-blue-600 transition-all duration-1000 ease-out"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            stroke="currentColor"
            fill="none"
            r={radius}
            cx="50"
            cy="50"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: circumference - progress,
            }}
          />
          <text
            x="50"
            y="50"
            className="text-[12px] font-medium"
            dominantBaseline="middle"
            textAnchor="middle"
            fill="#1E40AF"
            transform="rotate(90 50 50)"
          >
            {percentage}%
          </text>
        </svg>
      </div>
    </div>
  );
};

// Volume Line Chart Component
const VolumeLineChart: React.FC<{
  data: number[];
  title: string;
  procedureName: string;
  isDesktop: boolean;
}> = ({ data, title, procedureName, isDesktop }) => {
  const chartData = data.map((value, index) => ({
    month: `Month ${index + 1}`,
    value
  }));

  return (
    <div className={`flex ${isDesktop ? 'flex-row' : 'flex-col'} items-center w-full h-full`}>
      <div className={`${isDesktop ? 'w-1/3' : 'w-full'} text-center`}>
        <p className="text-[10px] text-gray-600 font-medium">{title}</p>
        <p className="text-[12px] font-semibold text-gray-800">{procedureName}</p>
      </div>
      <div className={`${isDesktop ? 'w-2/3' : 'w-full h-32'}`}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 10 }}
              stroke="#9CA3AF"
            />
            <YAxis 
              tick={{ fontSize: 10 }}
              stroke="#9CA3AF"
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#1E40AF"
              strokeWidth={2}
              dot={{ fill: '#1E40AF', r: 4 }}
              activeDot={{ r: 6, fill: '#3B82F6' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Animation Variants
const mapContainerVariants = {
  initial: { width: '100%' },
  animate: { width: '68%' }
};

const sideContainerVariants = {
  hidden: { opacity: 0, x: '100%' },
  visible: { opacity: 1, x: 0 }
};

// Google Maps Options
const mapOptions: google.maps.MapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
};

// Function to get analysis options based on selected icon
const getAnalysisOptions = (iconId: Icon['id']): string[] => {
  switch (iconId) {
    case 'financial':
      return ['Avg Monthly Production', 'Insurance Public/Private', 'Avg Annual Growth %'];
    case 'patients':
      return ['Avg Active Patient %'];
    case 'procedures':
      return ['Highest Vol Procedure', 'Lowest Vol Procedure'];
    default:
      return [];
  }
};

// Main RegionalTabContent Component
const RegionalTabContent = forwardRef((props, ref) => {
  // State declarations
  const [selectedZip, setSelectedZip] = useState<keyof typeof analysisData | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<Icon['id'] | null>(null);
  const [selectedSubData, setSelectedSubData] = useState<string | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [zipDataLayer, setZipDataLayer] = useState<google.maps.Data | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalysisExpanded, setIsAnalysisExpanded] = useState(true);
  const markersRef = useRef<google.maps.Marker[]>([]);

  const icons: Icon[] = [
    { id: "financial", icon: DollarSign, label: "Financial" },
    { id: "patients", icon: Users, label: "Patients" },
    { id: "procedures", icon: Stethoscope, label: "Procedures" },
  ];

  // Analysis Content Display Component
  const AnalysisContentDisplay = useCallback(() => {
    if (!selectedSubData || !selectedZip) return null;
    const data = analysisData[selectedZip];
    if (!data) return null;

    const isDesktop = window.innerWidth >= 768;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`${isDesktop ? 'px-4 pb-4' : 'px-2 pb-2'} space-y-4`}
      >
        {selectedIcon === 'patients' && selectedSubData === 'Avg Active Patient %' && (
          <div className="grid grid-rows-2 gap-4 h-full">
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <ProgressCircle
                percentage={data.patients.activePatients.regional.percentage}
                total={data.patients.activePatients.regional.total}
                title="Regional Average"
                isDesktop={isDesktop}
              />
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <ProgressCircle
                percentage={data.patients.activePatients.practice.percentage}
                total={data.patients.activePatients.practice.total}
                title="Your Practice"
                isDesktop={isDesktop}
              />
            </div>
          </div>
        )}

        {selectedIcon === 'procedures' && selectedSubData === 'Highest Vol Procedure' && (
          <div className="grid grid-rows-2 gap-4 h-full">
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <VolumeLineChart
                data={data.procedures.highestVolume.regional.data}
                title="Regional Average"
                procedureName={data.procedures.highestVolume.regional.name}
                isDesktop={isDesktop}
              />
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <VolumeLineChart
                data={data.procedures.highestVolume.practice.data}
                title="Your Practice"
                procedureName={data.procedures.highestVolume.practice.name}
                isDesktop={isDesktop}
              />
            </div>
          </div>
        )}

        {selectedIcon === 'procedures' && selectedSubData === 'Lowest Vol Procedure' && (
          <div className="grid grid-rows-2 gap-4 h-full">
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <VolumeLineChart
                data={data.procedures.lowestVolume.regional.data}
                title="Regional Average"
                procedureName={data.procedures.lowestVolume.regional.name}
                isDesktop={isDesktop}
              />
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <VolumeLineChart
                data={data.procedures.lowestVolume.practice.data}
                title="Your Practice"
                procedureName={data.procedures.lowestVolume.practice.name}
                isDesktop={isDesktop}
              />
            </div>
          </div>
        )}

        {selectedIcon === 'financial' && selectedSubData === 'Avg Monthly Production' && (
          <div className="grid grid-rows-2 gap-4 h-full">
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <MonthlyProductionChart
                data={data.financial.monthlyProduction.regional.breakdown}
                title="Regional Average"
                total={data.financial.monthlyProduction.regional.total}
                isDesktop={isDesktop}
              />
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <MonthlyProductionChart
                data={data.financial.monthlyProduction.practice.breakdown}
                title="Your Practice"
                total={data.financial.monthlyProduction.practice.total}
                isDesktop={isDesktop}
              />
            </div>
          </div>
        )}

        {selectedIcon === 'financial' && selectedSubData === 'Insurance Public/Private' && (
          <div className="grid grid-rows-2 gap-4 h-full">
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <InsuranceDistributionChart
                data={data.financial.insurance.regional}
                title="Regional Average"
                isDesktop={isDesktop}
              />
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <InsuranceDistributionChart
                data={data.financial.insurance.practice}
                title="Your Practice"
                isDesktop={isDesktop}
              />
            </div>
          </div>
        )}

        {selectedIcon === 'financial' && selectedSubData === 'Avg Annual Growth %' && (
          <div className="grid grid-rows-2 gap-4 h-full">
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <GrowthIndicator
                data={data.financial.growth.regional}
                title="Regional Average"
                isDesktop={isDesktop}
              />
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <GrowthIndicator
                data={data.financial.growth.practice}
                title="Your Practice"
                isDesktop={isDesktop}
              />
            </div>
          </div>
        )}
      </motion.div>
    );
  }, [selectedIcon, selectedSubData, selectedZip]);

  // Expose cleanup method to parent components if needed
  useImperativeHandle(ref, () => ({
    cleanup: () => {
      if (map) {
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];

        if (zipDataLayer) {
          zipDataLayer.setMap(null);
        }

        setMap(null);
      }
    }
  }));

  // Function to create labels/markers on the map
  const createLabels = useCallback(() => {
    if (map) {
      // Remove existing markers
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];

      // Add markers for surrounding cities
      surroundingCities.forEach(city => {
        const marker = new google.maps.Marker({
          position: city.position,
          map: map,
          label: {
            text: city.name,
            className: 'text-xs font-semibold text-gray-700 bg-white px-1 rounded-sm',
          },
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 0,
          },
        });
        markersRef.current.push(marker);
      });

      // Add markers for zip codes
      zipCodes.forEach(zip => {
        const marker = new google.maps.Marker({
          position: zip.center,
          map: map,
          label: {
            text: zip.name,
            className: 'text-sm font-bold text-blue-700 bg-white px-2 py-1 rounded-md shadow-md',
          },
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 0,
          },
        });
        markersRef.current.push(marker);
      });
    }
  }, [map]);

  // Handler when the map is loaded
  const onMapLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
    setIsLoading(false);

    const dataLayer = new google.maps.Data({ map: mapInstance });
    setZipDataLayer(dataLayer);

    // Load GeoJSON data for zip codes
    dataLayer.loadGeoJson('/path/to/your/geojson/file.json'); // **Update the path to your actual GeoJSON file**

    dataLayer.setStyle((feature) => {
      const zip = feature.getProperty('ZCTA5CE20') || feature.getProperty('zip');
      return {
        fillColor: zip === selectedZip ? '#1E40AF' : '#3B82F6',
        strokeColor: '#FFFFFF',
        strokeWeight: 1,
        fillOpacity: zip === selectedZip ? 0.6 : 0.3,
        clickable: true,
      };
    });

    // Add click listener to dataLayer
    dataLayer.addListener('click', (event: google.maps.Data.MouseEvent) => {
      const zip = event.feature.getProperty('ZCTA5CE20') || event.feature.getProperty('zip');
      handleZipClick(zip);
    });

    createLabels();
  }, [createLabels, handleZipClick, selectedZip]);

  // Handler for zip code click
  const handleZipClick = useCallback((zipId: string) => {
    setSelectedZip(zipId as keyof typeof analysisData);
    setSelectedIcon(null);
    setSelectedSubData(null);
    setIsAnalysisExpanded(true);

    if (map && zipDataLayer) {
      zipDataLayer.forEach((feature: google.maps.Data.Feature) => {
        const featureZip = feature.getProperty('ZCTA5CE20') || feature.getProperty('zip');
        if (featureZip === zipId) {
          const bounds = new google.maps.LatLngBounds();
          const geometry = feature.getGeometry();

          if (geometry) {
            geometry.forEachLatLng((latLng: google.maps.LatLng) => {
              if (latLng) bounds.extend(latLng);
            });

            if (!bounds.isEmpty()) {
              map.fitBounds(bounds);
            }
          }
        }
      });

      zipDataLayer.setStyle((feature) => {
        const zip = feature.getProperty('ZCTA5CE20') || feature.getProperty('zip');
        return {
          fillColor: zip === zipId ? '#1E40AF' : '#3B82F6',
          strokeColor: '#FFFFFF',
          strokeWeight: 1,
          fillOpacity: zip === zipId ? 0.6 : 0.3,
          clickable: true,
        };
      });

      createLabels();
    }
  }, [map, zipDataLayer, createLabels]);

  // Handler for icon click
  const handleIconClick = useCallback((iconId: Icon['id']) => {
    setSelectedIcon(iconId);
    setSelectedSubData(null);
    setIsAnalysisExpanded(true);
  }, []);

  // Handler for sub-data click
  const handleSubDataClick = useCallback((subDataId: string) => {
    if (selectedSubData === subDataId) {
      setSelectedSubData(null);
      setIsAnalysisExpanded(true);
    } else {
      setSelectedSubData(subDataId);
      setIsAnalysisExpanded(false);
    }
  }, [selectedSubData]);

  // Analysis Content Display Component (Properly closed)
  // Note: Ensure that there are no extra or missing braces

  // Main render
  return (
    <div className="w-full h-full flex flex-col md:flex-row relative">
      {/* Map Container */}
      <motion.div
        className="relative bg-gray-50 rounded-xl shadow-sm overflow-hidden flex-1"
        variants={mapContainerVariants}
        animate={selectedIcon ? {
          width: window.innerWidth >= 768 ? "68%" : "62%",
          marginLeft: "0px",
          marginRight: window.innerWidth >= 768 ? "0" : "35%"
        } : {
          width: "100%",
          marginLeft: "0px",
          marginRight: "0"
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <AnimatePresence>
          {selectedZip && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-4 left-4 right-4 z-10"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2 shadow-sm">
                <div className="flex justify-center gap-2">
                  {icons.map((icon) => (
                    <button
                      key={icon.id}
                      onClick={() => handleIconClick(icon.id)}
                      className={
                        `px-3 py-2 rounded-lg flex items-center transition-all duration-200 
                        ${selectedIcon === icon.id 
                          ? 'bg-[#052b52] text-white shadow-sm' 
                          : 'bg-white/80 text-gray-600 hover:bg-white'}`
                      }
                    >
                      <icon.icon className="w-4 h-4" />
                      <span className="ml-2 text-xs font-medium md:inline hidden">{icon.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="h-full w-full">
          <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY || ''}>
            <GoogleMap
              mapContainerClassName="w-full h-full"
              center={mapCenter}
              zoom={12}
              options={mapOptions}
              onLoad={onMapLoad}
            />
          </LoadScript>
        </div>

        {isLoading && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-blue-600 rounded-full border-t-transparent animate-spin" />
          </div>
        )}
      </motion.div>

      {/* Side Panel for Analysis */}
      <AnimatePresence>
        {selectedIcon && (
          <motion.div
            className={`
              bg-gray-50 rounded-xl shadow-sm 
              ${window.innerWidth >= 768 
                ? 'w-[30%] ml-4 relative' 
                : 'w-[35%] absolute right-0 top-0 h-full'}
            `}
            variants={sideContainerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div
              className={`${window.innerWidth >= 768 ? 'p-4' : 'p-1.5'} h-full`}
              animate={{
                height: selectedSubData ? '100%' : 'auto'
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <motion.div
                className="relative"
                layout
                animate={{
                  height: selectedSubData ? '42px' : 'auto'
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <AnimatePresence mode="sync">
                  {getAnalysisOptions(selectedIcon).map((option, index) => (
                    <motion.button
                      key={option}
                      onClick={() => handleSubDataClick(option)}
                      className={`
                        w-[99.5%] md:w-full ml-[0.25%] mr-[0.25%] md:mx-0 p-2 md:p-3 
                        text-left rounded-lg transition-colors duration-200 
                        ${selectedSubData === option 
                          ? 'bg-[#052b52] text-white' 
                          : 'bg-white text-gray-600 hover:bg-gray-100'} 
                        ${window.innerWidth >= 768 ? 'text-xs' : 'text-[8.5px]'}
                        font-medium
                      `}
                      layout="position"
                      initial={false}
                      animate={{
                        y: selectedSubData === option ? -(index * 42) : 0,
                        opacity: !selectedSubData || selectedSubData === option ? 1 : 0,
                        scaleY: !selectedSubData || selectedSubData === option ? 1 : 0,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut"
                      }}
                    >
                      {option}
                    </motion.button>
                  ))}
                </AnimatePresence>
              </motion.div>

              <AnimatePresence mode="wait">
                {selectedSubData && <AnalysisContentDisplay />}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Styles for Google Maps */}
      <style jsx global>{`
        .gm-style-cc,
        .gmnoprint.gm-style-cc,
        .gm-style-iw-a,
        .gm-style-iw-t,
        .gm-style > div:last-child {
          display: none !important;
        }
        .gm-style a[href^="https://maps.google.com/maps"],
        .gm-style-pbc {
          display: none !important;
        }
        .gmnoprint:not(.gm-bundled-control) {
          display: none !important;
        }
        .gm-bundled-control .gmnoprint {
          display: block !important;
        }
      `}</style>
    </div>
  );
});

RegionalTabContent.displayName = 'RegionalTabContent';

export default RegionalTabContent;
