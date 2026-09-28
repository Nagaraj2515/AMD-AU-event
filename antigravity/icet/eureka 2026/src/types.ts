export type VehicleType = 'Car' | 'Bike' | 'Scooter' | 'Other';

export type ProblemCategory = 
  | 'Flat tyre'
  | 'Battery/dead battery'
  | 'Fuel shortage'
  | 'Engine problem'
  | 'Accident'
  | 'Overheating'
  | 'Lockout'
  | 'Other';

export interface UserLocation {
  lat: number;
  lng: number;
  address: string;
  city: string;
}

export interface RescueRequest {
  id: string;
  timestamp: string;
  vehicleType: VehicleType;
  vehicleModel: string;
  problem: ProblemCategory;
  description: string;
  photoUrl?: string;
  location: UserLocation;
  isEmergency: boolean;
}

export type AgentName = 
  | 'COORDINATOR AGENT'
  | 'TRIAGE AGENT'
  | 'DIAGNOSTIC AGENT'
  | 'LOCATION AGENT'
  | 'PRICE AGENT'
  | 'RESCUE MATCHING AGENT'
  | 'SAFETY AGENT'
  | 'COMMUNICATION AGENT';

export type AgentStatus = 'waiting' | 'working' | 'completed' | 'skipped' | 'error';

export interface AgentState {
  name: AgentName;
  status: AgentStatus;
  summary: string;
  result?: any;
  durationMs?: number;
}

export interface AgentLog {
  id: string;
  agent: AgentName;
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'warn' | 'error';
}

export interface ServiceProvider {
  id: string;
  name: string;
  rating: number;
  reviewsCount: number;
  distanceKm: number;
  etaMinutes: number;
  serviceTypes: string[];
  priceRange: { min: number; max: number };
  phone: string;
  address: string;
  lat: number;
  lng: number;
  available: boolean;
  matchScore: number;
  matchReason: string;
  technicianName: string;
  vehicle: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  type: 'Police' | 'Hospital' | 'Fire' | 'Nearby Helper';
  phone: string;
  distanceKm: number;
  address: string;
  lat: number;
  lng: number;
}

export interface PriceBreakdown {
  baseFee: number;
  laborEstimate: number;
  distanceSurcharge: number;
  emergencyFee: number;
  estimatedTotalMin: number;
  estimatedTotalMax: number;
  breakdownItems: { label: string; amount: number }[];
}

export interface TriageResult {
  category: ProblemCategory;
  severityScore: number; // 1 to 5
  urgency: 'Low' | 'Medium' | 'High' | 'CRITICAL EMERGENCY';
  requiredService: string;
  immediateSafetyInstruction: string;
}

export interface DiagnosticResult {
  likelyCauses: string[];
  confidence: number;
  recommendedTechnicianType: string;
  isSafeToDrive: boolean;
  inspectionTips: string[];
}

export interface RescuePipelineOutput {
  triage: TriageResult;
  diagnostic: DiagnosticResult;
  nearbyProviders: ServiceProvider[];
  emergencyContacts: EmergencyContact[];
  priceBreakdown: PriceBreakdown;
  matchedProviders: ServiceProvider[];
  safetyInstructions: string[];
  dispatchMessage: string;
}

export type RescueStatus = 
  | 'REQUESTED'
  | 'ACCEPTED'
  | 'TECHNICIAN ASSIGNED'
  | 'ON THE WAY'
  | 'ARRIVED'
  | 'RESOLVED';

export interface ActiveRescueTracking {
  requestId: string;
  provider: ServiceProvider;
  status: RescueStatus;
  currentTechLocation: { lat: number; lng: number };
  etaMinutes: number;
  otp: string;
  startTime: string;
}

export interface IncidentHistoryItem {
  id: string;
  date: string;
  vehicle: string;
  problem: ProblemCategory;
  location: string;
  providerName: string;
  cost: number;
  status: 'Resolved' | 'Cancelled';
  ratingGiven?: number;
}
