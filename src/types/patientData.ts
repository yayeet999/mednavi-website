// src/types/patientData.ts

export interface PatientLocation {
  lat: number;
  lng: number;
  address: string;
  zipCode: string;
}

export interface Patient {
  id: string;
  location: PatientLocation;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  insuranceType: 'Public' | 'Private' | 'Cash';
  status: 'Active' | 'Inactive';
  lastVisit: Date;
  hygieneDue: boolean;
  isNewPatient: boolean;
  primaryLanguage: 'English' | 'Spanish' | 'Polish' | 'Arabic';
}

export interface FilterState {
  age: string[];
  gender: string[];
  distance: string[];
  insuranceType: string[];
  status: string[];
  lastVisit: string[];
  hygieneDue: string[];
  isNewPatient: string[];
  primaryLanguage: string[];
}

export const PRACTICE_LOCATION = {
  lat: 42.0111,
  lng: -87.8406,
  name: "Example Dental Practice",
  address: "123 Main Street, Park Ridge, IL 60068"
};

export const FILTER_OPTIONS = {
  age: ['0-17', '18-35', '36-50', '51-65', '65+'],
  gender: ['Male', 'Female', 'Other'],
  distance: ['0-2 miles', '2-5 miles', '5-10 miles', '10+ miles'],
  insuranceType: ['Public', 'Private', 'Cash'],
  status: ['Active', 'Inactive'],
  lastVisit: ['Last 30 days', 'Last 6 months', 'Last 12 months', 'Over 12 months'],
  hygieneDue: ['Yes', 'No'],
  isNewPatient: ['Yes', 'No'],
  primaryLanguage: ['English', 'Spanish', 'Polish', 'Arabic']
};

// Helper function to generate dates
function getLastVisitDate(category: string): Date {
  const now = new Date();
  switch (category) {
    case 'Last 30 days':
      return new Date(now.setDate(now.getDate() - Math.floor(Math.random() * 30)));
    case 'Last 6 months':
      return new Date(now.setDate(now.getDate() - (30 + Math.floor(Math.random() * 150))));
    case 'Last 12 months':
      return new Date(now.setDate(now.getDate() - (180 + Math.floor(Math.random() * 185))));
    default: // Over 12 months
      return new Date(now.setDate(now.getDate() - (365 + Math.floor(Math.random() * 180))));
  }
}

// Create clusters based on the original distribution but with static data
const clusters = [
  { 
    center: { lat: 42.0111, lng: -87.8406 }, // Park Ridge Main
    radius: 0.01,
    count: 75
  },
  { 
    center: { lat: 42.0150, lng: -87.8350 }, // Park Ridge North
    radius: 0.01,
    count: 45
  },
  { 
    center: { lat: 42.0294, lng: -87.7925 }, // Niles Main
    radius: 0.01,
    count: 45
  },
  { 
    center: { lat: 42.0250, lng: -87.7980 }, // Niles South
    radius: 0.01,
    count: 30
  },
  { 
    center: { lat: 42.0072, lng: -87.8139 }, // Edison Park Main
    radius: 0.01,
    count: 45
  },
  { 
    center: { lat: 42.0030, lng: -87.8180 }, // Edison Park South
    radius: 0.01,
    count: 30
  },
  { 
    center: { lat: 41.9856, lng: -87.8087 }, // Norwood Park
    radius: 0.01,
    count: 30
  }
];

// Generate static patient data
export const STATIC_PATIENT_DATA: Patient[] = (() => {
  const patients: Patient[] = [];
  let patientId = 1;
  let visitDistributionCount = { last30: 0, last6: 0, last12: 0, over12: 0 };
  
  clusters.forEach(cluster => {
    for (let i = 0; i < cluster.count; i++) {
      // Calculate location with slight random offset
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * cluster.radius;
      const lat = cluster.center.lat + r * Math.cos(angle);
      const lng = cluster.center.lng + r * Math.sin(angle);

      // Determine last visit category based on distribution
      let lastVisitCategory;
      const visitRand = Math.random() * 100;
      if (visitDistributionCount.last30 < 15) { // 5%
        lastVisitCategory = 'Last 30 days';
        visitDistributionCount.last30++;
      } else if (visitDistributionCount.last6 < 174) { // 58%
        lastVisitCategory = 'Last 6 months';
        visitDistributionCount.last6++;
      } else if (visitDistributionCount.last12 < 237) { // 79%
        lastVisitCategory = 'Last 12 months';
        visitDistributionCount.last12++;
      } else {
        lastVisitCategory = 'Over 12 months';
        visitDistributionCount.over12++;
      }

      const patient: Patient = {
        id: `P${patientId.toString().padStart(4, '0')}`,
        location: {
          lat,
          lng,
          address: `${Math.floor(Math.random() * 9999)} Street`,
          zipCode: ["60068", "60714", "60631", "60656"][Math.floor(Math.random() * 4)]
        },
        age: (() => {
          const ageRand = Math.random() * 100;
          if (ageRand < 17) return Math.floor(Math.random() * 17) + 1; // 0-17
          if (ageRand < 45) return Math.floor(Math.random() * 17) + 18; // 18-35
          if (ageRand < 67) return Math.floor(Math.random() * 14) + 36; // 36-50
          if (ageRand < 91) return Math.floor(Math.random() * 14) + 51; // 51-65
          return Math.floor(Math.random() * 20) + 65; // 65+
        })(),
        gender: (() => {
          const rand = Math.random() * 100;
          if (rand < 41) return 'Male';
          if (rand < 98) return 'Female';
          return 'Other';
        })(),
        insuranceType: (() => {
          const rand = Math.random() * 100;
          if (rand < 63) return 'Public';
          if (rand < 91) return 'Private';
          return 'Cash';
        })(),
        status: Math.random() < 0.74 ? 'Active' : 'Inactive',
        lastVisit: getLastVisitDate(lastVisitCategory),
        hygieneDue: Math.random() < 0.66,
        isNewPatient: Math.random() < 0.08,
        primaryLanguage: (() => {
          const rand = Math.random() * 100;
          if (rand < 68) return 'English';
          if (rand < 90) return 'Spanish';
          if (rand < 94) return 'Polish';
          return 'Arabic';
        })()
      };

      patients.push(patient);
      patientId++;
    }
  });

  return patients;
})();
