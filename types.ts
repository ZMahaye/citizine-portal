
export enum Language {
  ENGLISH = 'en',
  ZULU = 'zu',
  XHOSA = 'xh',
  AFRIKAANS = 'af'
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'Driver' | 'Vehicle' | 'Operator' | 'Community' | 'Enatis';
  status: 'online' | 'in-person';
  navigateTo?: string;
}

export interface RoadIssue {
  id: string;
  type: string;
  location: string;
  status: 'reported' | 'investigating' | 'scheduled' | 'resolved';
  date: string;
  lat: number;
  lng: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'alert' | 'update' | 'info';
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface TransportHub {
  id: string;
  name: string;
  type: 'Bus' | 'Taxi' | 'Rail' | 'Flight';
  location: string;
  services: string[];
}

// --- Pillar Initiative Types ---

export interface PaymentItem {
  id: string;
  reference: string;
  service: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending' | 'failed';
}

export interface PaymentCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  amountRange: string;
}

export interface TripRoute {
  id: string;
  origin: string;
  destination: string;
  duration: string;
  distance: string;
  fare: number;
  mode: 'Bus' | 'Taxi' | 'Rail' | 'Mixed';
  steps: TripStep[];
  departureTime: string;
  arrivalTime: string;
}

export interface TripStep {
  type: 'walk' | 'bus' | 'taxi' | 'rail';
  description: string;
  duration: string;
}

export interface ScheduleEntry {
  id: string;
  route: string;
  departure: string;
  status: 'on_time' | 'delayed' | 'cancelled';
  platform: string;
}

export interface RoadAlert {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'warning' | 'info';
  category: 'weather' | 'roadworks' | 'congestion' | 'speed' | 'emergency';
  affectedRoad: string;
  timestamp: string;
  relativeTime: string;
}

export interface WeatherCondition {
  region: string;
  temp: number;
  condition: string;
  icon: string;
  wind: string;
  rain: string;
}

export interface OLApplicationData {
  applicantName: string;
  idNumber: string;
  contactNumber: string;
  email: string;
  address: string;
  postalCode: string;
  vehicleReg: string;
  vehicleMake: string;
  vehicleYear: string;
  vin: string;
  seatingCapacity: string;
  vehicleType: string;
  routeOrigin: string;
  routeDestination: string;
  operatingHours: string;
  frequency: string;
  existingPermit: string;
  documents: { [key: string]: File | null };
  declaration: boolean;
}

export interface FeedbackTicket {
  id: string;
  reference: string;
  type: 'complaint' | 'compliment' | 'suggestion' | 'inquiry';
  department: string;
  subject: string;
  description: string;
  status: 'submitted' | 'acknowledged' | 'in_progress' | 'resolved';
  dateSubmitted: string;
  lastUpdated: string;
  priority: 'low' | 'medium' | 'high';
  responses: { date: string; message: string; from: string }[];
}

export interface SafetyTip {
  id: string;
  title: string;
  description: string;
  icon: string;
}
