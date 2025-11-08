
import React, { useState } from "react";
import { api } from "../lib/api";
import { useAuthStore } from "../lib/store";

export default function LoginForm() {

  const { login } = useAuthStore();


  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.login(email, password);
      login(response.token, response.user);
      alert("Login Berhasil!");

      if (response.user.role === "cashier") {
        window.location.href = "/offlineBooking/cashier";
      } else {
        window.location.href = "/profile/tickets";
      }
    } catch (err: any) {
      setError("Login gagal. Cek email atau password.");
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-gray-800 p-8 rounded-lg shadow-xl"
    >
      <h2 className="text-2xl font-bold text-center text-white">Login</h2>

      {error && (
        <div className="p-3 bg-red-800 border border-red-600 rounded-md text-red-200">
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-300"
        >
          Email address
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
            className="block w-full rounded-md border-0 bg-gray-700 p-3 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-300"
          >
            Password
          </label>
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full rounded-md border-0 bg-gray-700 p-3 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-500"
        >
          {isLoading ? "Logging in..." : "Sign in"}
        </button>
      </div>

      <p className="mt-4 text-center text-sm text-gray-400">
        Belum memiliki akun?{" "}
        <a
          href="/register"
          className="font-semibold text-indigo-400 hover:text-indigo-300"
        >
          Daftar sekarang
        </a>
      </p>
    </form>
  );
}
