
import React from 'react';
import type { Booking } from '../types';

interface Props {
  booking: Booking;
  onClose: () => void;
}

export default function TicketModal({ booking, onClose }: Props) {
  const statusClass = booking.status === 'active'
    ? 'bg-green-700 text-green-200'
    : 'bg-gray-600 text-gray-300';
  const statusText = booking.status.charAt(0).toUpperCase() + booking.status.slice(1);

  return (

    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm rounded-lg bg-gray-800 shadow-xl overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white text-3xl font-bold z-10"
        >
          &times;
        </button>

        <div className="p-6 text-white">
          <h2 className="text-2xl font-bold mb-6 text-center">Detail Tiket</h2>

          <div className="flex justify-center mb-6">
            <img
              src={booking.qr_code}
              alt="Booking QR Code"
              className="w-64 h-64 bg-white p-2 rounded-lg"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Studio:</span>
              <span className="font-medium">&nbsp;</span>
              <span className="font-medium">Studio {booking.studio_id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Kursi (IDs):</span>
              <span className="font-medium">&nbsp;</span>
              <span className="font-mono text-lg font-bold">{booking.seat_ids.join(', ')}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-400 whitespace-nowrap">Kode Booking:</span>
              <span className="font-mono text-sm break-all">{booking.booking_code}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Status:</span>
              <span className="font-medium">&nbsp;</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusClass}`}>
                {statusText}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}