import React, { useState, useEffect } from 'react';
import type { Seat, Booking, OfflineBookingRequest, BookingResponse } from '../types'; // Kita akan gunakan Tipe 'Booking'
import { api } from '../lib/api';
import { useAuthStore } from '../lib/store'; 

interface Props {
  studioId: string | number;
  mode?: 'online' | 'cashier';
}

function CashierForm({ onSubmit, isLoading }: { 
  onSubmit: (details: { name: string, email: string }) => void, 
  isLoading: boolean 
}) {
  const [name, setName] = useState('Pelanggan Offline');
  const [email, setEmail] = useState('customer@offline.com');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Nama dan Email pelanggan harus diisi.");
      return;
    }
    onSubmit({ name, email });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mt-8 p-6 bg-gray-700 rounded-lg space-y-4">
      <h3 className="text-lg font-medium text-yellow-300">Data Pelanggan (Kasir)</h3>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300">Nama Pelanggan</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-0 bg-gray-600 py-1.5 text-white"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Pelanggan</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border-0 bg-gray-600 py-1.5 text-white"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-8 py-3 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-500 disabled:bg-gray-500"
      >
        {isLoading ? "Memproses..." : "Konfirmasi & Cetak Tiket"}
      </button>
    </form>
  );
}

export default function SeatSelector({ studioId, mode = 'online' }: Props) {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<(string | number)[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completedBooking, setCompletedBooking] = useState<Booking | null>(null); 
  const { token } = useAuthStore();

  useEffect(() => {
    setIsLoading(true);
    api.getSeatsForStudio(studioId)
      .then(data => {
        const sortedData = data.sort((a, b) => {
          const numA = parseInt(a.seat_number.substring(1), 10);
          const numB = parseInt(b.seat_number.substring(1), 10);
          return numA - numB;
        });
        
        setSeats(sortedData);
        setIsLoading(false);
      })
      .catch(err => {
        setError("Gagal memuat data kursi.");
        setIsLoading(false);
      });
  }, [studioId]);

  const handleSeatClick = (seat: Seat) => {
    if (!seat.is_available) return;
    const isSelected = selectedSeats.includes(seat.id);
    if (isSelected) {
      setSelectedSeats(prevSelected => prevSelected.filter(id => id !== seat.id));
    } else {
      setSelectedSeats(prevSelected => [...prevSelected, seat.id]);
    }
  };

  const submitBooking = async () => {
    if (!token) {
      alert("Anda harus login untuk memesan tiket.");
      window.location.href = '/login';
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const result = await api.createOnlineBooking(studioId, selectedSeats);
      setCompletedBooking(result.booking);

    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat booking.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOfflineBooking = async (customerDetails: { name: string, email: string }) => {
    setIsLoading(true);
    setError(null);
    const request: OfflineBookingRequest = {
      studioId: studioId,
      seatIds: selectedSeats,
      customerName: customerDetails.name,
      customerEmail: customerDetails.email
    };
    try {
      const result = await api.createOfflineBooking(request);
      setCompletedBooking(result.booking);

    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat booking offline.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !completedBooking) {
    return <div className="text-center text-lg">Loading seats...</div>;
  }
  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }
  if (completedBooking) {
    return (
      <div className="flex flex-col items-center p-8 bg-gray-800 rounded-lg">
        <h2 className="text-3xl font-bold text-green-400 mb-4">Booking Berhasil!</h2>
        <p className="text-lg mb-2">Kode Booking: <span className="font-mono">{completedBooking.booking_code}</span></p>
        <p className="text-gray-300 mb-6">Tipe Booking: <span className="font-bold uppercase">{completedBooking.booking_type}</span></p>
        <img 
          src={completedBooking.qr_code}
          alt="Booking QR Code" 
          className="w-64 h-64 bg-white p-2 rounded-lg"
        />
        
        {mode === 'online' ? (
          <a href="/profile/tickets" className="mt-8 px-6 py-3 bg-indigo-600 rounded-lg font-medium hover:bg-indigo-500">
            Lihat Semua Tiket Saya
          </a>
        ) : (
          <a href="/offlineBooking/cashier" className="mt-8 px-6 py-3 bg-yellow-600 text-black font-medium rounded-lg hover:bg-yellow-500">
            Kembali ke Menu Kasir
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Pilih Kursi - Studio {studioId}</h1>
      {mode === 'cashier' && (
        <span className="mb-4 px-4 py-1 bg-yellow-400 text-black font-bold rounded-full text-sm">MODE KASIR</span>
      )}
      
      <div className="w-full max-w-md h-4 bg-gray-700 rounded-t-lg mb-6 text-center text-sm text-gray-400">
        LAYAR BIOSKOP
      </div>

      <div className="grid grid-cols-5 gap-3 max-w-md">
        {seats.map(seat => {
          const isSelected = selectedSeats.includes(seat.id);
          const isAvailable = seat.is_available;
          let seatClass = "w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xs ";
          if (!isAvailable) {
            seatClass += "bg-gray-700 text-gray-500 cursor-not-allowed";
          } else if (isSelected) {
            seatClass += "bg-indigo-500 text-white cursor-pointer ring-2 ring-indigo-300";
          } else {
            seatClass += "bg-gray-600 text-gray-300 cursor-pointer hover:bg-indigo-400";
          }
          return (
            <button
              key={seat.id}
              onClick={() => handleSeatClick(seat)}
              disabled={!isAvailable}
              className={seatClass}
              title={`Kursi ${seat.seat_number}`}
            >
              {seat.seat_number}
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center items-center space-x-6">
        <div className="flex items-center">
          <div className="w-5 h-5 rounded bg-indigo-500 ring-2 ring-indigo-300"></div>
          <span className="ml-2 text-sm text-gray-300">Selected</span>
        </div>
        <div className="flex items-center">
          <div className="w-5 h-5 rounded bg-gray-600"></div>
          <span className="ml-2 text-sm text-gray-300">Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-5 h-5 rounded bg-gray-700 text-gray-500"></div>
          <span className="ml-2 text-sm text-gray-300">Taken</span>
        </div>
      </div>

      <div className="mt-8 w-full max-w-md">
        {selectedSeats.length > 0 && (
          <>
            {mode === 'online' ? (
              <button
                onClick={submitBooking}
                disabled={isLoading}
                className="w-full px-8 py-3 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-500 disabled:bg-gray-500"
              >
                {isLoading ? "Memproses..." : `Book ${selectedSeats.length} Kursi Sekarang`}
              </button>
            ) : (
              <CashierForm
                isLoading={isLoading}
                onSubmit={handleOfflineBooking}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}