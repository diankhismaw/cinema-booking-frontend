
import React, { useState } from 'react';
import { api } from '../lib/api';

export default function RegisterForm() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {

      const response = await api.register(name, email, password);


      setSuccess("Registrasi berhasil! Silakan login.");

      setName('');
      setEmail('');
      setPassword('');


      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);

    } catch (err: any) {

      setError(err.message || "Registrasi gagal.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-8 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-center text-white">Buat Akun Baru</h2>
      {error && (
        <div className="p-3 bg-red-800 border border-red-600 rounded-md text-red-200">
          {error}
        </div>
      )}
      {success && (
        <div className="p-3 bg-green-800 border border-green-600 rounded-md text-green-200">
          {success}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-300">
          Nama Lengkap
        </label>
        <div className="mt-2">
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full rounded-md border-0 bg-gray-700 p-3 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-300">
          Email
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full rounded-md border-0 bg-gray-700 p-3 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-300">
          Password
        </label>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full rounded-md border-0 bg-gray-700 p-3 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-500"
        >
          {isLoading ? 'Mendaftarkan...' : 'Daftar'}
        </button>
      </div>

      <p className="mt-4 text-center text-sm text-gray-400">
        Sudah punya akun?{' '}
        <a href="/login" className="font-semibold text-indigo-400 hover:text-indigo-300">
          Login di sini
        </a>
      </p>
    </form>
  );
}