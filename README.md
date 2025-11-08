# Frontend Booking Bioskop

Ini adalah aplikasi frontend untuk sistem booking tiket bioskop. Aplikasi ini dibangun menggunakan **Astro** dengan **React** sebagai *UI framework*.
Aplikasi ini dirancang untuk terhubung dengan backend Go microservice yang berjalan secara terpisah.

---
## Fitur Utama

* **Otentikasi JWT:** Alur pendaftaran (`/register`) dan login (`/login`) penuh.
* **Alur Booking Online:** *Customer* dapat melihat studio, memilih kursi yang tersedia (dengan *real-time locking*), dan memesan tiket.
* **Alur Kasir (Offline):** Alur terpisah di `/offlineBooking/cashier` yang dilindungi oleh *role*.
* **Kontrol Akses Berbasis Peran (RBAC):** Hanya pengguna dengan *role* "cashier" yang dapat mengakses alur kasir. *Customer* biasa akan otomatis diarahkan ke halaman tiket.
* **Manajemen Tiket:** Halaman "/profile/tickets" yang terproteksi bagi pengguna untuk melihat semua tiket mereka yang sudah di-booking.
* **Tampilan Detail Tiket:** Modal *pop-up* yang menampilkan detail booking, status, dan QR code untuk validasi.
* **Ketersediaan Kursi:** Halaman utama secara dinamis menampilkan jumlah kursi yang tersisa untuk setiap studio.
* **Manajemen State:** Menggunakan **Zustand** untuk manajemen *state* otentikasi global.
* **Desain Responsif:** Dibuat *mobile-first* menggunakan **Tailwind CSS**.

---

## Tech Stack

* **Framework:** Astro
* **UI:** React (Astro Islands)
* **Styling:** Tailwind CSS
* **Manajemen State:** Zustand
* **Bahasa:** TypeScript

---

## 🚀 Cara Menjalankan Proyek

Proyek ini **HANYA** frontend. Proyek ini **tidak akan berfungsi** tanpa backend yang berjalan.
1.  Pastikan Anda telah meng-kloning dan menjalankan *backend* dari: `https://github.com/gcode/cinema-booking`
2.  Pastikan *backend* (API Gateway) berjalan di `http://localhost:3000`.

### Menjalankan Frontend

1.  **Clone repositori ini:**
    ```bash
    using ssh
    git clone [git@github.com:diankhismaw/cinema-booking-frontend.git](git@github.com:diankhismaw/cinema-booking-frontend.git)
    using https
    git clone [https://github.com/diankhismaw/cinema-booking-frontend.git](https://github.com/diankhismaw/cinema-booking-frontend.git) 
    cd REPO-NAME
    ```

2.  **Instal dependensi:**
    ```bash
    npm install
    ```

3.  **Jalankan server pengembangan:**
    ```bash
    npm run dev
    ```

4.  Buka [http://localhost:4321](http://localhost:4321) di browser Anda.

### Akun Tes

* **Customer:** Daftar akun baru melalui halaman `/register`.
* **Kasir:** Daftar akun baru (misal: `cashier@example.com`), lalu ubah *role* akun tersebut secara manual di database PostgreSQL menjadi `"cashier"`.

---

## ⚠️ Keterbatasan / Isu yang Diketahui

* **Seat ID vs Seat Number:** Halaman "My Tickets" dan modal detail tiket saat ini menampilkan **Seat ID** (misal: `[63, 80]`), bukan **Seat Number** yang sebenarnya. Ini adalah keterbatasan desain dari response API (`/api/booking/my-bookings`) yang tidak mengembalikan data label **Seat Number** (misal: `["A1", "A5"]`) yang sesuai.