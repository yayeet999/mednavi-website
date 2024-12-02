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
  privateInsurance?: 'Humana' | 'Delta' | 'UHC' | 'MetLife' | 'Cigna';
  status: 'Active' | 'Inactive';
  lastVisit: Date;
  hygieneDue: boolean;
  isNewPatient: boolean;
  appointmentStatus: 'Scheduled' | 'Not Scheduled';
  familyGroupId: string | null;
  primaryLanguage: 'English' | 'Spanish' | 'Polish' | 'Arabic';
}

// Practice location
export const PRACTICE_LOCATION = {
  lat: 42.0111,
  lng: -87.8406,
  name: "Example Dental Practice",
  address: "123 Main Street, Park Ridge, IL 60068"
};

// Helper function to generate random patient data
function generatePatients(count: number = 300): Patient[] {
  const patients: Patient[] = [];
  const familyIds = new Set<string>();
  
  // Create 50 family groups
  for (let i = 0; i < 50; i++) {
    familyIds.add(`family_${i}`);
  }

  // Convert to array for random selection
  const familyIdsArray = Array.from(familyIds);

  // Generate center points for realistic clustering
  const clusters = [
    { lat: 42.0111, lng: -87.8406, weight: 0.4 }, // Park Ridge
    { lat: 42.0294, lng: -87.7925, weight: 0.2 }, // Niles
    { lat: 42.0072, lng: -87.8139, weight: 0.2 }, // Edison Park
    { lat: 41.9856, lng: -87.8087, weight: 0.2 }  // Norwood Park
  ];

  for (let i = 0; i < count; i++) {
    // Select a cluster based on weights
    const cluster = clusters[Math.floor(Math.random() * clusters.length)];
    
    // Generate location with random offset from cluster center
    const location = {
      lat: cluster.lat + (Math.random() - 0.5) * 0.02,
      lng: cluster.lng + (Math.random() - 0.5) * 0.02,
      address: `${Math.floor(Math.random() * 9999)} Street`,
      zipCode: ["60068", "60714", "60631", "60656"][Math.floor(Math.random() * 4)]
    };

    // Generate other random data
    const patient: Patient = {
      id: `p_${i}`,
      location,
      age: Math.floor(Math.random() * 80),
      gender: ['Male', 'Female', 'Other'][Math.floor(Math.random() * 3)] as Patient['gender'],
      insuranceType: ['Public', 'Private', 'Cash'][Math.floor(Math.random() * 3)] as Patient['insuranceType'],
      status: Math.random() > 0.2 ? 'Active' : 'Inactive',
      lastVisit: new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)),
      hygieneDue: Math.random() > 0.5,
      isNewPatient: Math.random() > 0.8,
      appointmentStatus: Math.random() > 0.5 ? 'Scheduled' : 'Not Scheduled',
      familyGroupId: Math.random() > 0.6 ? familyIdsArray[Math.floor(Math.random() * familyIdsArray.length)] : null,
      primaryLanguage: ['English', 'Spanish', 'Polish', 'Arabic'][Math.floor(Math.random() * 4)] as Patient['primaryLanguage']
    };

    // Add private insurance if applicable
    if (patient.insuranceType === 'Private') {
      patient.privateInsurance = ['Humana', 'Delta', 'UHC', 'MetLife', 'Cigna'][Math.floor(Math.random() * 5)] as Patient['privateInsurance'];
    }

    patients.push(patient);
  }

  return patients;
}

// Generate and export the sample dataset
export const SAMPLE_PATIENT_DATA = generatePatients();
