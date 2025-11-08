
import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../lib/store';

export default function RequireCashierAuth({ children }: { children: React.ReactNode }) {
  const user = useAuthStore(state => state.user);
  const token = useAuthStore(state => state.token);


  const [isHydrating, setIsHydrating] = useState(true);

  useEffect(() => {

    useAuthStore.persist.rehydrate();
    setIsHydrating(false);
  }, []);


  if (isHydrating) {
    return <div className="text-center text-lg">Memverifikasi otorisasi...</div>;
  }


  if (!token || user?.role !== 'cashier') {

    return (
      <div className="p-6 bg-gray-800 rounded-lg text-center">
        <p className="text-lg text-gray-300">Anda harus login sebagai kasir untuk mengakses halaman ini.</p>
        <a
          href="/login"
          className="mt-4 inline-block px-6 py-2 bg-indigo-600 rounded-lg font-medium hover:bg-indigo-500"
        >
          Login Sekarang
        </a>
      </div>
    );
  }


  return <>{children}</>;
}