// Mengimpor library 'express', yang merupakan kerangka kerja web untuk Node.js
const express = require("express");
// Mengimpor library 'cors', yang merupakan middleware untuk mengaktifkan Cross-Origin Resource Sharing
const cors = require("cors");
// Mengimpor library 'dotenv', yang memuat variabel lingkungan dari berkas .env
const dotenv = require("dotenv");
// Mengimpor rute-rute terkait makanan dari berkas './routes/food'
const routeFood = require("./routes/food");

// Memeriksa apakah lingkungan bukan 'production'
if (process.env.NODE_ENV !== "production") {
  // Jika bukan di produksi, muat variabel lingkungan dari berkas .env
  dotenv.config();
}

// Membuat instance dari aplikasi Express
const app = express();
// Mendefinisikan port yang akan didengarkan oleh server. Menggunakan variabel lingkungan PORT jika diatur, jika tidak maka defaultnya 3000
const PORT = process.env.PORT || 3000;

// Mengaktifkan CORS untuk semua rute, mengizinkan permintaan dari origin yang berbeda
app.use(cors());
// Menggunakan middleware untuk mem-parsing permintaan masuk dengan payload JSON
app.use(express.json());
// Menggunakan middleware untuk mem-parsing permintaan masuk dengan payload URL-encoded. 'extended: false' berarti menggunakan library querystring.
app.use(express.urlencoded({ extended: false }));

// Memasang rute-rute terkait makanan. Setiap permintaan yang cocok dengan path yang didefinisikan di routeFood akan ditangani olehnya.
app.use(routeFood);

// Memulai server dan membuatnya mendengarkan pada PORT yang ditentukan
app.listen(PORT, () => { // Mendengarkan pada port yang telah ditentukan
  // Mencatat pesan ke konsol yang menunjukkan server sedang berjalan dan pada port berapa
  console.log(`Server berjalan di port ${PORT}`);
});

// Mengekspor instance aplikasi Express, membuatnya tersedia untuk diimpor di berkas lain (misalnya, untuk pengujian)
module.exports = app;