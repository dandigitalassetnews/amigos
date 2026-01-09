export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: string;
  gender: 'Male' | 'Female';
  size: 'Small' | 'Medium' | 'Large';
  description: string;
  image: string;
  imagePosition?: string; // Optional CSS class for object-position (e.g., 'object-top')
  tags: string[];
  location: string;
  isAdopted: boolean;
  // New fields for quick gauge
  energyLevel: 'Low' | 'Medium' | 'High' | 'Very High';
  trainingLevel: 'None' | 'Basic' | 'Intermediate' | 'Advanced';
  idealFor: string;
  isHouseTrained: 'Yes' | 'No' | 'Working on it';
}

export interface MatchmakerResult {
  recommendedPetId: string;
  reasoning: string;
  compatibilityScore: number;
}

export interface AdoptionStats {
  month: string;
  adoptions: number;
  rescues: number;
}
