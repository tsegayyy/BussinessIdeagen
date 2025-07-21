export interface BusinessIdea {
  id: string;
  title: string;
  description: string;
  category: string;
  minBudget: number;
  maxBudget: number;
  revenue: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeToStart: string;
  skills: string[];
  locationTypes: ('urban' | 'suburban' | 'rural' | 'online')[];
  steps: string[];
  pros: string[];
  cons: string[];
  marketSize: string;
}

export interface UserProfile {
  budget: number;
  interests: string[];
  skills: string[];
  location: 'urban' | 'suburban' | 'rural' | 'online';
  experience: 'beginner' | 'intermediate' | 'advanced';
  timeCommitment: 'part-time' | 'full-time';
}

export interface GeneratedIdea extends BusinessIdea {
  matchScore: number;
  personalizedNotes: string[];
}