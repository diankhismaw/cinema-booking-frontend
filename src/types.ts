export interface User {
  id: string | number;
  email: string;
  name: string;
  role: 'customer' | 'cashier';
}

export interface Studio {
  id: string | number;
  name: string;
  total_seats: number;
}

export interface Seat {
  id: string | number;
  studio_id: string | number;
  seat_number: string;
  is_available: boolean;
}

export interface Booking {
  id: string | number;
  booking_code: string;
  user_name: string;
  user_email: string;
  studio_id: string | number;
  seat_ids: (string | number)[]; 
  qr_code: string;
  status: 'active' | 'used';
  booking_type: 'online' | 'offline';
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface BookingResponse {
  booking: Booking;
  qrCode: string;
}

export interface OfflineBookingRequest {
  studioId: string | number;
  seatIds: (string | number)[];
  customerName: string;
  customerEmail: string;
}