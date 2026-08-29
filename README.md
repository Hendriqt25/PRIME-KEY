# PRIME-KEY

## Task 1 Setup ORM & Skema Database

Setup ORM & Skema Database untuk sistem ini pada dasarnya adalah **membuat fondasi/cetakan tabel** agar sistem bisa otomatis mengatur tugas berulang dan menghitung nilai kepatuhan pegawai.


### 1. Skema Database
1. User
Tabel ini berfungsi sebagai data seluruh identitas anggota/pegawai berkominukasi dengan system

   - id (primary key) (Bigint) - ID unik sebagai kunci utama pengguna.
   - name (Varchar) - Nama Lengkap Pengguna
   - email (Varchar, optional) - Alamat email pengguna
   - password (varchar) - Kata sandi penggua
   - role (Enum: admin, manager atau pegawai) - Peran pengguna dalam sistem
   - department_id (Bigint, Foreign Key): Menghubungkan pegawai ke departemen tempat ia bekerja (mengacu pada id_depart).
   - created_at TIMESTAMP - Waktu saat akun pengguna dibuat.
   - updated_at TIMESTAMP - Waktu saat data pengguna terakhir diubah.

3. task_schedules 
Tabel ini berfungsi sebagai data tugas tugas dengan format yang di tentukan supaya bisa mengatur tugas tugas secara otomatis, rutin atau berkala.

   - id (primary key) (Bigint) - ID unik untuk setiap jadwal tugas.
   - task_name (Varchar) - Judul atau nama tugas yang harus dikerjakan.
   - created_by (Bigint, Foreign Key): ID pengguna yang memegang tanggung jawab atas tugas tersebut (mengacu pada id_user).
   - category (Enum) - Kategori tugas (administrasi, laporan, meeting, operasional, lainnya).
   - description (Text, Optional): Penjelasan detail mengenai petunjuk pengerjaan tugas.
   - priority (Enum) - Tingkat urgensi tugas (contoh: Urgent, High, Medium, Low).
   - frekuency (Enum) - Frekuensi pengulangan tugas (contoh: Once, Daily, Weekly, Monthly).
   - target (Int) - Target hari yang harus dicapai dalam tugas.
   - due_time (Time) - Deadline tugas
   - is_active (Boolean) - Status aktifnya jadwal tugas
   - created_at TIMESTAMP - Waktu jadwal tugas dibuat.
   - updated_at TIMESTAMP - Waktu jadwal tugas terakhir diperbarui.

5. task_logs
Tabel berfungsi sebagai rekam jejak (checklist) eksekusi dan bukti pengerjaan tugas secara real-time. Setiap kali tugas dikerjakan, catatan barunya masuk ke sini.

   - id (primary key) (Bigint) - ID unik untuk setiap jadwal tugas.
   - task_schedule_id (Bigint, Foreign Key) - Mengacu pada ID jadwal tugas utama yang sedang dilaporkan.
   - user_id (Bigint, Foreign Key) - Mengacu pada ID pegawai yang mengisi laporan pengerjaan.
   - scheduled_date (Date) - Tanggal tugas tersebut seharusnya dikerjakan.
   - status (Enum) - Status hasil pengerjaan (contoh: Pending, Submitted, Approved, Rejected).
   - submitted_at TIMESTAMP - Waktu presisi saat pegawai mengunggah/mengirimkan laporan.
   - file (Varchar) - Bukti pengerjaan tugas
   - notes (Text, Optional) - Catatan tambahan atau kendala dari pegawai saat mengerjakan tugas.
   - created_at TIMESTAMP - Waktu catatan log ini dibuat oleh sistem.
   - updated_at TIMESTAMP - Waktu catatan log ini terakhir diubah.

6. departemnt
Tabel ini digunakan untuk menyimpan data divisi atau departemen tempat pegawai bekerja.

  - id (primary key) (Bigint) - ID unik sebagai kunci utama departemen.
  - code_depart (char, unique) - Kode singkat departemen.
  - name (varchar) - Nama lengkap departemen.
  - deskription (text) - Penjelasan deskripsi fungsi departemen.
  - created_at TIMESTAMP - Waktu saat data departemen dibuat.
  - updated_at TIMESTAMP - Waktu saat data departemen terakhir diubah.

relasi nya 

1. user - task_schedules (one to many)
  - setiap user dapat mempunyai satu atau banyaknya task_schedules
  - setiap task_schedules harus dipunyai satu hanya satu user

2. user - dapartement ( one to many )
  - setiap departement harus memiliki satu atau banyaknya user
  - setiap user harus dimiliki satu dan hanya satu department

3. task_schedules - task_log 
  - setiap teks_schedule harus menghasilkan satu atau banyaknya task_log
  - setiap task_log harus dihasilkan satu dan hanya satu task_schedule

4. task_log - user
  - setiap user harus mencatat satu atau banyaknya task_log
  - setiap task_log harus dicatat satu dan hanya satu user

Perancangan ERD nya sebagai berikut 

<img width="1391" height="653" alt="Logical" src="https://github.com/user-attachments/assets/03ee9ae3-d0a7-45f1-b0a4-4ea4d0cfe75f" />

### 2. Buat database baru di laragon MySQL

Ketika sudah merancang skema database dengan erd maka kita bikin tablenya di laragon MySQL
<img width="1613" height="968" alt="image" src="https://github.com/user-attachments/assets/611a6159-dd87-44c4-bb92-fb251a7dff37" />

<img width="1617" height="903" alt="image" src="https://github.com/user-attachments/assets/b0a794ff-37a7-420b-b302-1da1dc352a80" />

<img width="1592" height="786" alt="image" src="https://github.com/user-attachments/assets/64167471-86e8-4e69-b644-fea96052094e" />

<img width="1587" height="937" alt="image" src="https://github.com/user-attachments/assets/3d5c7c69-5110-4699-ada2-66e504dae030" />

<img width="1592" height="587" alt="image" src="https://github.com/user-attachments/assets/a0385f1e-30c3-4042-a6f8-0452d04d14db" />

### 3. Inisialisasi Project

<img width="650" height="135" alt="image" src="https://github.com/user-attachments/assets/c6d42c73-e2cc-43bb-9bfe-07401fba000f" />

Langkah ini digunakan untuk membuat fondasidasar proyek  bernama prime-key. Command ini akan otomatis menyiapin folder dan file awal yang dibutuhkan agar kamu tidak perlu membuat struktur foldernya dari nol.

### 4. Install & konfigurasi ORM

<img width="777" height="321" alt="image" src="https://github.com/user-attachments/assets/b43091a4-5b5a-47d6-a893-79c488670ede" />

Langkah ini digunakan untuk memasang "alat-alat bantu" (package/library) yang dibutuhkan proyek backend kamu:

1. express: Framework utama untuk menangani request dan response API (routing).
2. mysql2: Driver pendukung agar Node.js bisa mengobrol/terhubung ke database MySQL.
3. sequelize: Alat bantu (ORM) untuk mengelola query database menggunakan bahasa JavaScript 
4. dotenv: Membaca file .env untuk menyimpan rahasia/konfigurasi proyek (seperti password database).
5. cors: Izinkan aplikasi frontend untuk mengakses backend API ini dari domain/port yang berbeda.

### 5. Hubungkan ORM dengan database

<img width="798" height="150" alt="image" src="https://github.com/user-attachments/assets/e51ef705-5fb5-443a-8a4b-e9bfb95308e0" />

Tahap ini database MySQL di Laragon sudah saling terhubung



