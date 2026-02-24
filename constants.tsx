
import { Service, RoadIssue, Notification, TransportHub, PaymentItem, PaymentCategory, TripRoute, ScheduleEntry, RoadAlert, WeatherCondition, FeedbackTicket, SafetyTip } from './types';

export const SERVICES: Service[] = [
  { id: '1', title: 'Driver\'s License Renewal', description: 'Apply for a renewal of your driving license card.', icon: 'fa-id-card', category: 'Driver', status: 'online', navigateTo: 'drivers_license_renewal' },
  { id: '2', title: 'Vehicle License Disc', description: 'Renew your motor vehicle license disc online.', icon: 'fa-car', category: 'Vehicle', status: 'online', navigateTo: 'vehicle_license_disc' },
  { id: '3', title: 'Operating License (OL)', description: 'Public transport operators can apply for or renew permits.', icon: 'fa-bus', category: 'Operator', status: 'online', navigateTo: 'ol_application' },
  { id: '4', title: 'Learner\'s License Test', description: 'Book your learner\'s license theoretical test.', icon: 'fa-book-open', category: 'Driver', status: 'online', navigateTo: 'learners_license_test' },
  { id: '5', title: 'Vukuzakhe Registration', description: 'Register for the Contractor Development Programme.', icon: 'fa-helmet-safety', category: 'Community', status: 'online', navigateTo: 'vukuzakhe_registration' },
  { id: '6', title: 'Scholar Transport', description: 'Apply for government-subsidized school transport.', icon: 'fa-graduation-cap', category: 'Community', status: 'online', navigateTo: 'scholar_transport' },
  { id: '7', title: 'Personalised Number Plate', description: 'Apply for a customised personalised number plate for your registered motor vehicle.', icon: 'fa-rectangle-list', category: 'Vehicle', status: 'online', navigateTo: 'personalised_number_plate' },
];

export const MOCK_ISSUES: RoadIssue[] = [
  { id: 'P001', type: 'Pothole', location: 'N3 near Pietermaritzburg', status: 'scheduled', date: '2026-02-14', lat: -29.6006, lng: 30.3794 },
  { id: 'F002', type: 'Flooding', location: 'R102 Verulam', status: 'investigating', date: '2026-02-15', lat: -29.6450, lng: 31.0500 },
  { id: 'S003', type: 'Missing Signage', location: 'M4 Durban North', status: 'reported', date: '2026-02-16', lat: -29.7900, lng: 31.0300 },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n1', title: 'Road Closure', message: 'N2 Southbound closed at Umgeni due to maintenance.', time: '2 hours ago', type: 'alert' },
  { id: 'n2', title: 'Application Update', message: 'Your Vehicle License Disc has been dispatched.', time: '1 day ago', type: 'update' },
  { id: 'n3', title: 'Weather Warning', message: 'Heavy rain expected in Zululand district tonight.', time: '4 hours ago', type: 'info' },
];

export const TRANSPORT_HUBS: TransportHub[] = [
  { id: 'h1', name: 'Warwick Avenue Interchange', type: 'Taxi', location: 'Durban Central', services: ['Short-distance Taxis', 'Inter-city Taxis'] },
  { id: 'h2', name: 'Durban Station', type: 'Rail', location: 'Masabalala Yengwa Ave', services: ['Metrorail', 'Shosholoza Meyl'] },
  { id: 'h3', name: 'Pine Street Bus Terminus', type: 'Bus', location: 'Pine St, Durban', services: ['Durban Transport', 'People Mover'] },
  { id: 'h4', name: 'Bridge City Mall', type: 'Taxi', location: 'KwaMashu', services: ['Local Taxis', 'GO!Durban Interface'] },
  { id: 'h5', name: 'Pietermaritzburg Station', type: 'Rail', location: 'PMB Central', services: ['Metrorail'] },
  { id: 'h6', name: 'King Shaka International Airport', type: 'Flight', location: 'La Mercy, Durban', services: ['Domestic Flights', 'International Flights', 'Airport Shuttle'] },
  { id: 'h7', name: 'Virginia Airport', type: 'Flight', location: 'Durban North', services: ['Charter Flights', 'Flight Training', 'General Aviation'] },
  { id: 'h8', name: 'Pietermaritzburg Airport', type: 'Flight', location: 'Oribi, PMB', services: ['Regional Flights', 'Charter Services'] },
  { id: 'h9', name: 'Richards Bay Airport', type: 'Flight', location: 'Richards Bay', services: ['Domestic Connections', 'Charter Services'] },
];

// --- New Initiative Mock Data ---

export const PAYMENT_CATEGORIES: PaymentCategory[] = [
  { id: 'pc1', title: 'Traffic Fines', description: 'Pay outstanding traffic fines issued in KZN.', icon: 'fa-gavel', amountRange: 'R250 - R5,000' },
  { id: 'pc2', title: 'License Renewal Fee', description: 'Driver\'s license card renewal processing fee.', icon: 'fa-id-card', amountRange: 'R250' },
  { id: 'pc3', title: 'Vehicle Disc Fee', description: 'Annual motor vehicle license disc renewal.', icon: 'fa-car', amountRange: 'R150 - R800' },
  { id: 'pc4', title: 'Operating Licence Fee', description: 'Public transport operating licence application.', icon: 'fa-bus', amountRange: 'R500 - R2,500' },
  { id: 'pc5', title: 'Vukuzakhe Registration', description: 'Contractor development programme registration.', icon: 'fa-helmet-safety', amountRange: 'R350' },
  { id: 'pc6', title: 'Scholar Transport', description: 'Subsidised school transport application fee.', icon: 'fa-graduation-cap', amountRange: 'R0 - R150' },
];

export const MOCK_PAYMENTS: PaymentItem[] = [
  { id: 'pay1', reference: 'KZN-FIN-20260187', service: 'Traffic Fine', amount: 1500, date: '2026-02-10', status: 'paid' },
  { id: 'pay2', reference: 'KZN-LIC-20260042', service: 'License Renewal', amount: 250, date: '2026-02-14', status: 'paid' },
  { id: 'pay3', reference: 'KZN-VEH-20260098', service: 'Vehicle Disc', amount: 450, date: '2026-02-18', status: 'pending' },
  { id: 'pay4', reference: 'KZN-OPL-20260015', service: 'Operating Licence', amount: 2500, date: '2026-02-20', status: 'failed' },
  { id: 'pay5', reference: 'KZN-FIN-20260203', service: 'Traffic Fine', amount: 750, date: '2026-02-21', status: 'pending' },
];

export const MOCK_TRIP_ROUTES: TripRoute[] = [
  {
    id: 'tr1', origin: 'Warwick Avenue', destination: 'Gateway Mall, Umhlanga', duration: '45 min', distance: '18 km', fare: 12,
    mode: 'Bus', departureTime: '08:15', arrivalTime: '09:00',
    steps: [
      { type: 'walk', description: 'Walk to Warwick Bus Stop', duration: '3 min' },
      { type: 'bus', description: 'GO!Durban C3 to Gateway', duration: '38 min' },
      { type: 'walk', description: 'Walk to Gateway Mall entrance', duration: '4 min' },
    ]
  },
  {
    id: 'tr2', origin: 'Warwick Avenue', destination: 'Gateway Mall, Umhlanga', duration: '35 min', distance: '19 km', fare: 25,
    mode: 'Taxi', departureTime: '08:10', arrivalTime: '08:45',
    steps: [
      { type: 'walk', description: 'Walk to Taxi Rank', duration: '2 min' },
      { type: 'taxi', description: 'Minibus Taxi to Umhlanga', duration: '30 min' },
      { type: 'walk', description: 'Walk to Gateway Mall', duration: '3 min' },
    ]
  },
  {
    id: 'tr3', origin: 'Warwick Avenue', destination: 'Gateway Mall, Umhlanga', duration: '55 min', distance: '20 km', fare: 8,
    mode: 'Mixed', departureTime: '08:05', arrivalTime: '09:00',
    steps: [
      { type: 'walk', description: 'Walk to Durban Station', duration: '8 min' },
      { type: 'rail', description: 'Metrorail to KwaMashu', duration: '22 min' },
      { type: 'taxi', description: 'Taxi to Gateway Mall', duration: '20 min' },
      { type: 'walk', description: 'Walk to entrance', duration: '5 min' },
    ]
  },
  {
    id: 'tr4', origin: 'Durban', destination: 'Johannesburg (O.R. Tambo)', duration: '1h 05min', distance: '570 km', fare: 1200,
    mode: 'Flight', departureTime: '09:30', arrivalTime: '10:35',
    steps: [
      { type: 'taxi', description: 'Taxi to King Shaka International', duration: '30 min' },
      { type: 'flight', description: 'FlySafair FA112 · Durban → Johannesburg', duration: '1h 05min' },
      { type: 'walk', description: 'Collect luggage and exit O.R. Tambo', duration: '20 min' },
    ]
  },
  {
    id: 'tr5', origin: 'Durban', destination: 'Cape Town (CPT)', duration: '2h 05min', distance: '1660 km', fare: 1850,
    mode: 'Flight', departureTime: '11:00', arrivalTime: '13:05',
    steps: [
      { type: 'bus', description: 'Airport shuttle to King Shaka International', duration: '35 min' },
      { type: 'flight', description: 'Airlink 4Z205 · Durban → Cape Town', duration: '2h 05min' },
      { type: 'walk', description: 'Collect luggage and exit Cape Town International', duration: '25 min' },
    ]
  },
];

export const MOCK_SCHEDULES: ScheduleEntry[] = [
  { id: 'sc1', route: 'C3 - Durban to Umhlanga', departure: '08:15', status: 'on_time', platform: 'Bay 4' },
  { id: 'sc2', route: 'C1 - Durban to KwaMashu', departure: '08:22', status: 'on_time', platform: 'Bay 1' },
  { id: 'sc3', route: 'C5 - Durban to Pinetown', departure: '08:30', status: 'delayed', platform: 'Bay 7' },
  { id: 'sc4', route: 'Metrorail - Durban to PMB', departure: '08:45', status: 'on_time', platform: 'Platform 3' },
  { id: 'sc5', route: 'C2 - Durban to Umlazi', departure: '08:50', status: 'on_time', platform: 'Bay 2' },
  { id: 'sc6', route: 'C7 - Durban to Chatsworth', departure: '09:00', status: 'cancelled', platform: 'Bay 5' },
  { id: 'sc7', route: 'C3 - Durban to Umhlanga', departure: '09:15', status: 'on_time', platform: 'Bay 4' },
  { id: 'sc8', route: 'Metrorail - Durban to Stanger', departure: '09:30', status: 'delayed', platform: 'Platform 1' },
];

export const MOCK_ROAD_ALERTS: RoadAlert[] = [
  { id: 'ra1', title: 'Major Accident on N2', description: 'Multi-vehicle collision near Umgeni interchange. Emergency services on scene. Expect 2-hour delay.', severity: 'critical', category: 'emergency', affectedRoad: 'N2 Southbound, Durban', timestamp: '2026-02-22T06:30:00', relativeTime: '30 min ago' },
  { id: 'ra2', title: 'Heavy Rain Warning - eThekwini', description: 'South African Weather Service issued a yellow level 4 warning for heavy rain in the eThekwini Metro. Flooding possible on low-lying roads.', severity: 'warning', category: 'weather', affectedRoad: 'All roads in eThekwini', timestamp: '2026-02-22T05:00:00', relativeTime: '2 hours ago' },
  { id: 'ra3', title: 'Road Resurfacing - M4', description: 'Lane closures on M4 between Durban North and La Lucia from 09:00-16:00 weekdays until March 15.', severity: 'info', category: 'roadworks', affectedRoad: 'M4, Durban North', timestamp: '2026-02-21T14:00:00', relativeTime: '17 hours ago' },
  { id: 'ra4', title: 'Speed Camera Alert - N3', description: 'Mobile speed camera operating on N3 between Hammarsdale and Camperdown. Speed limit 120km/h.', severity: 'info', category: 'speed', affectedRoad: 'N3, Hammarsdale', timestamp: '2026-02-22T07:00:00', relativeTime: '15 min ago' },
  { id: 'ra5', title: 'Congestion - M13 Pinetown', description: 'Heavy traffic build-up on M13 inbound at Pinetown due to broken-down truck. Use alternative routes via N3.', severity: 'warning', category: 'congestion', affectedRoad: 'M13, Pinetown', timestamp: '2026-02-22T06:45:00', relativeTime: '20 min ago' },
  { id: 'ra6', title: 'Bridge Repair - R102', description: 'Single lane traffic over Tongaat River bridge on R102. Flagmen on duty. Delays of 15-20 minutes expected.', severity: 'info', category: 'roadworks', affectedRoad: 'R102, Tongaat', timestamp: '2026-02-20T08:00:00', relativeTime: '2 days ago' },
  { id: 'ra7', title: 'Fog Warning - Midlands', description: 'Dense fog reported on N3 between Mooi River and Estcourt. Visibility below 100m. Reduce speed.', severity: 'warning', category: 'weather', affectedRoad: 'N3, KZN Midlands', timestamp: '2026-02-22T05:30:00', relativeTime: '1.5 hours ago' },
  { id: 'ra8', title: 'Road Closure - South Coast', description: 'R61 closed between Port Shepstone and Margate due to landslide. Diversions via N2 in place.', severity: 'critical', category: 'emergency', affectedRoad: 'R61, South Coast', timestamp: '2026-02-21T22:00:00', relativeTime: '9 hours ago' },
];

export const MOCK_WEATHER: WeatherCondition[] = [
  { region: 'Durban', temp: 28, condition: 'Partly Cloudy', icon: 'fa-cloud-sun', wind: '18 km/h NE', rain: '60%' },
  { region: 'Pietermaritzburg', temp: 24, condition: 'Thunderstorms', icon: 'fa-cloud-bolt', wind: '12 km/h SE', rain: '85%' },
  { region: 'Richards Bay', temp: 30, condition: 'Sunny', icon: 'fa-sun', wind: '22 km/h E', rain: '10%' },
];

export const MOCK_FEEDBACK_TICKETS: FeedbackTicket[] = [
  {
    id: 'fb1', reference: 'KZN-FB-20260045', type: 'complaint', department: 'Road Infrastructure', subject: 'Pothole not repaired after 3 months',
    description: 'Reported a large pothole on R102 in Verulam in November. Ref P-2025-112. Still not repaired and causing vehicle damage.',
    status: 'in_progress', dateSubmitted: '2026-01-15', lastUpdated: '2026-02-18', priority: 'high',
    responses: [
      { date: '2026-01-16', message: 'Your complaint has been received and logged.', from: 'System' },
      { date: '2026-02-01', message: 'Assigned to Verulam district maintenance team. Scheduled for repair in batch VRM-026.', from: 'Road Maintenance Unit' },
      { date: '2026-02-18', message: 'Materials procured. Repair scheduled for week of 24 February 2026.', from: 'Road Maintenance Unit' },
    ]
  },
  {
    id: 'fb2', reference: 'KZN-FB-20260078', type: 'compliment', department: 'Public Transport', subject: 'Excellent GO!Durban service',
    description: 'The new C3 route to Umhlanga is fantastic. Clean buses, on time, and friendly drivers.',
    status: 'resolved', dateSubmitted: '2026-02-05', lastUpdated: '2026-02-06', priority: 'low',
    responses: [
      { date: '2026-02-06', message: 'Thank you for your kind words! We have shared your compliment with the GO!Durban team.', from: 'Customer Relations' },
    ]
  },
  {
    id: 'fb3', reference: 'KZN-FB-20260091', type: 'suggestion', department: 'Licensing', subject: 'Online queue booking for DLTCs',
    description: 'It would be very helpful if we could book a time slot online for the DLTC. The queues are extremely long.',
    status: 'acknowledged', dateSubmitted: '2026-02-12', lastUpdated: '2026-02-14', priority: 'medium',
    responses: [
      { date: '2026-02-14', message: 'Thank you for your suggestion. This has been forwarded to our Digital Services team for consideration.', from: 'Customer Relations' },
    ]
  },
];

export const SAFETY_TIPS: SafetyTip[] = [
  { id: 'st1', title: 'Check Tyres Before Travel', description: 'Ensure tyre pressure and tread depth are within safe limits before long trips.', icon: 'fa-tire' },
  { id: 'st2', title: 'Reduce Speed in Rain', description: 'Wet roads increase stopping distance by 50%. Drive at least 20km/h below the limit in heavy rain.', icon: 'fa-cloud-rain' },
  { id: 'st3', title: 'Keep Headlights On', description: 'Always use headlights in poor visibility conditions, including fog and dusk.', icon: 'fa-lightbulb' },
  { id: 'st4', title: 'Rest Every 2 Hours', description: 'On long-distance trips, take a 15-minute break every 2 hours to stay alert.', icon: 'fa-mug-hot' },
];
