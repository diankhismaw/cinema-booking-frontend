// src/components/NavbarAuth.tsx
import React from 'react';
import { useAuthStore } from '../lib/store';

export default function NavbarAuth() {
  // Gunakan 'useAuthStore' untuk berlangganan perubahan
  const token = useAuthStore(state => state.token);
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);

  const handleLogout = () => {
    logout(); // Hapus token dari store & localStorage
    alert("Anda telah logout.");
    window.location.href = '/login'; // Redirect ke halaman login
  };

  return (
    <div className="flex items-center space-x-4">
      {token && user ? (
        // --- SUDAH LOGIN ---
        <>
          <span className="text-gray-300 text-sm hidden sm:block">
            Hi, {user.name}
          </span>
          <button onClick={handleLogout} className="text-gray-300 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
            Logout
          </button>
        </>
      ) : (
        // --- BELUM LOGIN ---
        <a href="/login" className="text-gray-300 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Login</a>
      )}
    </div>
  );
}