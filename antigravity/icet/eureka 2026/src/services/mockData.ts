import type { ServiceProvider, EmergencyContact, IncidentHistoryItem, RescueRequest } from '../types';

export const DEFAULT_HYDERABAD_LOCATION = {
  lat: 17.4325,
  lng: 78.4070,
  address: 'Road No. 36, Jubilee Hills, near Metro Station',
  city: 'Hyderabad'
};

export const DEFAULT_DEMO_REQUEST: RescueRequest = {
  id: 'REQ-2026-8891',
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  vehicleType: 'Scooter',
  vehicleModel: 'Honda Activa 6G',
  problem: 'Battery/dead battery',
  description: "My scooter suddenly stopped near Jubilee Hills Metro and won't start. There is a faint clicking noise when pressing the ignition button, but the motor won't turn over.",
  photoUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80',
  location: DEFAULT_HYDERABAD_LOCATION,
  isEmergency: false
};

export const MOCK_SERVICE_PROVIDERS: ServiceProvider[] = [
  {
    id: 'SP-101',
    name: 'Raj Auto & Battery Rescue',
    rating: 4.9,
    reviewsCount: 342,
    distanceKm: 1.2,
    etaMinutes: 8,
    serviceTypes: ['Battery Jumpstart', 'Battery Replacement', 'Tyre Repair', 'Two-Wheeler Service'],
    priceRange: { min: 350, max: 550 },
    phone: '+91 98490 12345',
    address: 'Plot 42, Road No. 36, Jubilee Hills, Hyderabad',
    lat: 17.4360,
    lng: 78.4110,
    available: true,
    matchScore: 98,
    matchReason: 'Nearest available technician with specialized Honda battery diagnostic tools and 8-min ETA.',
    technicianName: 'Rajesh Kumar',
    vehicle: 'Honda Activa Service Van (TS 09 EQ 4412)'
  },
  {
    id: 'SP-102',
    name: 'Apollo Roadside Mechanics',
    rating: 4.7,
    reviewsCount: 189,
    distanceKm: 2.4,
    etaMinutes: 14,
    serviceTypes: ['Engine Repair', 'Fuel Delivery', 'Battery Assistance', 'Towing'],
    priceRange: { min: 400, max: 700 },
    phone: '+91 91000 88210',
    address: 'Near Checkpost, Banjara Hills, Hyderabad',
    lat: 17.4250,
    lng: 78.4200,
    available: true,
    matchScore: 92,
    matchReason: 'Full roadside repair kit, verified 4.7-star rating, covers two-wheelers and four-wheelers.',
    technicianName: 'Vikram Singh',
    vehicle: 'Express Mobile Unit (TS 07 FA 8819)'
  },
  {
    id: 'SP-103',
    name: 'Cyberabad QuickTow & Mechanics',
    rating: 4.8,
    reviewsCount: 512,
    distanceKm: 3.1,
    etaMinutes: 18,
    serviceTypes: ['Flat Tyre Patching', 'Flatbed Towing', 'Battery Jumpstart', 'Lockout Assistance'],
    priceRange: { min: 450, max: 850 },
    phone: '+91 94401 55321',
    address: 'Inorbit Mall Road, Hitech City, Hyderabad',
    lat: 17.4380,
    lng: 78.3880,
    available: true,
    matchScore: 86,
    matchReason: 'Equipped with heavy hydraulic tow bed and 24/7 rapid response team.',
    technicianName: 'Mohd. Imran',
    vehicle: 'Recovery Truck (TS 08 UB 9901)'
  },
  {
    id: 'SP-104',
    name: 'Speedy Tyre & Battery Care',
    rating: 4.6,
    reviewsCount: 94,
    distanceKm: 3.8,
    etaMinutes: 22,
    serviceTypes: ['Tyre Replacement', 'Battery Jumpstart', 'Oil Top-up'],
    priceRange: { min: 300, max: 500 },
    phone: '+91 97011 44332',
    address: 'Madhapur Main Road, Hyderabad',
    lat: 17.4480,
    lng: 78.3910,
    available: true,
    matchScore: 80,
    matchReason: 'Economical rate for simple battery jumpstart service.',
    technicianName: 'Srinivas Rao',
    vehicle: 'Service Scooter (TS 09 AB 1122)'
  }
];

export const MOCK_EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 'EM-01',
    name: 'Jubilee Hills Police Station',
    type: 'Police',
    phone: '040-27852400',
    distanceKm: 0.9,
    address: 'Road No. 36, Jubilee Hills, Hyderabad',
    lat: 17.4300,
    lng: 78.4020
  },
  {
    id: 'EM-02',
    name: 'Cyberabad Traffic Police Control',
    type: 'Police',
    phone: '100 / 112',
    distanceKm: 1.5,
    address: 'Gachibowli - Hitech City Main Rd',
    lat: 17.4410,
    lng: 78.3800
  },
  {
    id: 'EM-03',
    name: 'Apollo Emergency Trauma Care',
    type: 'Hospital',
    phone: '040-23607777',
    distanceKm: 1.8,
    address: 'Road No. 92, Jubilee Hills, Hyderabad',
    lat: 17.4220,
    lng: 78.4120
  },
  {
    id: 'EM-04',
    name: 'Care Hospital Emergency Response',
    type: 'Hospital',
    phone: '040-61656565',
    distanceKm: 2.3,
    address: 'Road No. 1, Banjara Hills, Hyderabad',
    lat: 17.4180,
    lng: 78.4310
  }
];

export const MOCK_HISTORY_ITEMS: IncidentHistoryItem[] = [
  {
    id: 'INC-9912',
    date: '28 Sep 2026',
    vehicle: 'Honda Activa 6G',
    problem: 'Battery/dead battery',
    location: 'Jubilee Hills Road No 36, Hyderabad',
    providerName: 'Raj Auto & Battery Rescue',
    cost: 450,
    status: 'Resolved',
    ratingGiven: 5
  },
  {
    id: 'INC-8421',
    date: '14 Aug 2026',
    vehicle: 'Hyundai i20 Car',
    problem: 'Flat tyre',
    location: 'Hitech City Flyover, Hyderabad',
    providerName: 'Cyberabad QuickTow & Mechanics',
    cost: 650,
    status: 'Resolved',
    ratingGiven: 5
  },
  {
    id: 'INC-7304',
    date: '02 Jun 2026',
    vehicle: 'Royal Enfield Classic 350',
    problem: 'Fuel shortage',
    location: 'Outer Ring Road Exit 11',
    providerName: 'Apollo Roadside Mechanics',
    cost: 400,
    status: 'Resolved',
    ratingGiven: 4
  }
];
