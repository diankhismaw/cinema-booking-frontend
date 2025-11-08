
import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../lib/store.ts';
import { api } from '../lib/api.ts';
import type { Booking } from '../types.ts';
import TicketModal from './TicketModal.tsx';

export default function MyTickets() {
  const { token } = useAuthStore();
  const [selectedTicket, setSelectedTicket] = useState<Booking | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      setIsLoading(true);
      api.getMyBookings()
        .then(data => {
          setBookings(data);
          setIsLoading(false);
        })
        .catch(err => {
          console.error("Gagal fetch bookings:", err);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [token]);

  const formatTanggal = (isoDate: string) => {
    return new Date(isoDate).toLocaleString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return <div className="text-lg text-gray-300">Loading tickets...</div>;
  }

  if (!token) {
    return (
      <div className="p-6 bg-gray-800 rounded-lg text-center">
        <p className="text-lg text-gray-300">Anda harus login untuk melihat tiket Anda.</p>
        <a
          href="/login"
          className="mt-4 inline-block px-6 py-2 bg-indigo-600 rounded-lg font-medium hover:bg-indigo-500"
        >
          Login Sekarang
        </a>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="p-6 bg-gray-800 rounded-lg text-center">
        <p className="text-lg text-gray-300">Anda belum memiliki tiket.</p>
        <a
          href="/"
          className="mt-4 inline-block px-6 py-2 bg-indigo-600 rounded-lg font-medium hover:bg-indigo-500"
        >
          Pesan Tiket Sekarang
        </a>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {bookings.map(booking => (
          <div key={booking.id} className="bg-gray-800 rounded-lg shadow-xl overflow-hidden p-6">

            <div className="flex justify-between items-start">

              <div>
                <h3 className="text-2xl font-bold text-white">Studio {booking.studio_id}</h3>
                <p className="text-gray-400 text-sm font-mono mt-1 break-all">
                  {booking.booking_code}
                </p>


                <p className="text-sm text-gray-300 mt-3">
                  <span className="font-semibold">Tgl. Beli:</span> {formatTanggal(booking.created_at)}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold">Kursi (IDs):</span> {booking.seat_ids.join(', ')}
                </p>
              </div>


              <div className="shrink-0 ml-4">
                <button
                  onClick={() => setSelectedTicket(booking)}
                  className="px-5 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-500"
                >
                  Lihat Detail
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {selectedTicket && (
        <TicketModal
          booking={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}
    </>
  );
}