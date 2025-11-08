import type { Studio, Seat, Booking, BookingResponse, AuthResponse, OfflineBookingRequest } from '../types';
import { useAuthStore } from './store';

// BASE URL
const API_BASE_URL = "http://localhost:3000/api";

// GET TOKEN
const getAuthHeaders = () => {
  const token = useAuthStore.getState().token;
  if (!token) {
    throw new Error("User is not authenticated.");
  }
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

// Response Handler
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(errorData.message || "An unknown error occurred");
  }
  return response.json();
};


export const api = {
  // POST /api/auth/register
  register: async (name: string, email: string, pass: string): Promise<{ message: string }> => {
    console.log("REAL API: register() called");
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, email: email, password: pass })
    });
    return handleResponse(response);
  },

  // POST /api/auth/login
  login: async (email: string, pass: string): Promise<AuthResponse> => {
    console.log("REAL API: login() called");
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: pass })
    });
    return handleResponse(response); 
  },

  // GET /api/cinema/studios
  getStudios: async (): Promise<Studio[]> => {
    console.log("REAL API: getStudios() called");
    const response = await fetch(`${API_BASE_URL}/cinema/studios`);
    return handleResponse(response);
  },

  // GET /api/cinema/studios/:id/seats
  getSeatsForStudio: async (studioId: string | number): Promise<Seat[]> => {
    console.log(`REAL API: getSeatsForStudio(${studioId}) called`);
    const response = await fetch(`${API_BASE_URL}/cinema/studios/${studioId}/seats`);
    return handleResponse(response);
  },

  // POST /api/booking/online
  createOnlineBooking: async (studioId: string | number, seatIds: (string | number)[]): Promise<BookingResponse> => {
    console.log(`REAL API: createOnlineBooking(Studio: ${studioId}) called`);
    const response = await fetch(`${API_BASE_URL}/booking/online`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ studioId: Number(studioId), seatIds: seatIds })
    });
    return handleResponse(response);
  },

  // POST /api/booking/offline
  createOfflineBooking: async (request: OfflineBookingRequest): Promise<BookingResponse> => {
    console.log(`REAL API (OFFLINE): createOfflineBooking(Studio: ${request.studioId}) called`);
    const response = await fetch(`${API_BASE_URL}/booking/offline`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studioId: Number(request.studioId),
        seatIds: request.seatIds,
        customerName: request.customerName,
        customerEmail: request.customerEmail
      })
    });
    return handleResponse(response);
  },
  
  // GET /api/booking/my-bookings
  getMyBookings: async (): Promise<Booking[]> => {
    console.log("REAL API: getMyBookings() called");
    const response = await fetch(`${API_BASE_URL}/booking/my-bookings`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  }
};