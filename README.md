# PRIME-KEY

## Task 1 Setup ORM & Skema Database

Setup ORM & Skema Database untuk sistem ini pada dasarnya adalah **membuat fondasi/cetakan tabel** agar sistem bisa otomatis mengatur tugas berulang dan menghitung nilai kepatuhan pegawai.


### 1. Skema Database
1. User

Tabel ini berfungsi sebagai data autentikasi dasar anggota/pegawai berkominukasi dengan system

   - id (primary key) (Bigint) - ID unik sebagai kunci utama pengguna.
   - name (Varchar) - Nama Lengkap Pengguna
   - email (Varchar, optional) - Alamat email pengguna
   - password (varchar) - Kata sandi penggua
   - created_at TIMESTAMP - Waktu saat akun pengguna dibuat.
   - updated_at TIMESTAMP - Waktu saat data pengguna terakhir diubah.

2. Team
  
Tabel team Berfungsi wadah Utama organisasi atau komunitas

   - id (Bigint, Primary key) - Identitas unik setiap entitas tim/organisasi.
   - name (Varchar) - Nama resmi Tim 
   - type (Enum: personal, company, community, other)
   - created_at (TIMESTAMP) - Waktu saat team dibuat
   - updated_at (TIMESTAMP) - Waktu saat team terakhir diubah.

3. Team_member

Tabel team_member berfungs sebagai hubungan antar user dan team. Di tabel ini menyimpan data spesifik user khusus untuk tim tersebut

   - id (Bigint, Primary key) - Identitas unik setiap member
   - team_id (Bigint, FK) = Menunjuk anggota ini masuk ke tim yang mana.
   - user_id (Bigint, FK) - Menunjuk anggota ini pemilik akun login yang mana.
   - name (Varchar) - Nama lengkap orang tersebut di tim
   - phone_number (Varchar, Optional) 
   - role (Enum: owner, admin, manager, member)
   - status (Enum: trial, active, expired, cancelled) - Status member
   - trial (Timestamp, Nullable) — Menyimpan sisa masa percobaan (trial) member
   - created_at (TIMESTAMP) - Waktu saat masuk tim
   - updated_at (TIMESTAMP) - Waktu terakhir diubah saat masuk tim 

4. activity
   
Tabel ini berfungsi sebagai data tugas tugas dengan format yang di tentukan supaya bisa mengatur tugas tugas secara otomatis, rutin atau berkala.

   - id (primary key) (Bigint) - ID unik untuk setiap jadwal tugas.
   - task_name (Varchar) - Judul atau nama tugas yang harus dikerjakan.
   - team_id (foregin key) (Bigint) 
   - parent_id (Bigint, Foreign Key - activity.id, Nullable) — Mendukung Sub-Activity
   - created_by (Bigint, Foreign Key): ID pengguna yang memegang tanggung jawab atas tugas tersebut (mengacu pada id_user).
   - category (Enum) - Kategori tugas (administrasi, laporan, meeting, operasional, lainnya).
   - description (Text, Optional): Penjelasan detail mengenai petunjuk pengerjaan tugas.
   - priority (Enum) - Tingkat urgensi tugas (contoh: Urgent, High, Medium, Low).
   - frequency (Enum) - Frekuensi pengulangan tugas (contoh: Once, Daily, Weekly, Monthly).
   - target_type (Enum: boolean, numeric, Default: boolean) — Penanda tipe target
   - target_value (Int, Default: 1) — Nilai target yang harus dicapai
   - due_time (Time) - Deadline tugas
   - is_active (Boolean) - Status aktifnya jadwal tugas
   - created_at TIMESTAMP - Waktu jadwal tugas dibuat.
   - updated_at TIMESTAMP - Waktu jadwal tugas terakhir diperbarui.

5. task_logs
   
Tabel berfungsi sebagai rekam jejak (checklist) eksekusi dan bukti pengerjaan tugas secara real-time. Setiap kali tugas dikerjakan, catatan barunya masuk ke sini.

   - id (primary key) (Bigint) - ID unik untuk setiap jadwal tugas.
   - activity_id (Bigint, Foreign Key) - Mengacu pada ID jadwal tugas utama yang sedang dilaporkan.
   - user_id (Bigint, Foreign Key) - Mengacu pada ID pegawai yang mengisi laporan pengerjaan.
   - team_id (Bigint, Foreign Key - teams.id)
   - scheduled_date (Date) - Tanggal tugas tersebut seharusnya dikerjakan.
   - status (Enum) - Status hasil pengerjaan (contoh: Pending, Submitted, Approved, Rejected).
   - Progress_value (int)
   - submitted_at TIMESTAMP - Waktu presisi saat pegawai mengunggah/mengirimkan laporan.
   - file (Varchar) - Bukti pengerjaan tugas
   - notes (Text, Optional) - Catatan tambahan atau kendala dari pegawai saat mengerjakan tugas.
   - created_at TIMESTAMP - Waktu catatan log ini dibuat oleh sistem.
   - updated_at TIMESTAMP - Waktu catatan log ini terakhir diubah.

relasi nya 

1. user - activity 
  - setiap user dapat mempunyai satu atau banyaknya activity
  - setiap activity harus dipunyai satu hanya satu user

2. user - tim_member 
  - setiap tim_member harus memiliki satu atau banyaknya user
  - setiap user harus dimiliki satu dan hanya satu tim_member

3. task_log - user
  - setiap user harus mencatat satu atau banyaknya task_log
  - setiap task_log harus dicatat satu dan hanya satu user
  
4. activity - task_log 
  - setiap activity  harus menghasilkan satu atau banyaknya task_log
  - setiap task_log harus dihasilkan satu dan hanya satu activity 

5. tim - activity 
  - setiap tim dapat memiliki satu atau banyaknya activity
  - setiap activity harus dimiliki satu dan hanya satu tim

6. tim - tim_member
  - setiap tim harus memiliki satu atau banyaknya tim_member
  - setiap tim_member dimiliki satu dan hanya satu tim

7. tim - task_log
  - setiap tim harus memuat satu atau banyaknya task_log
  - setiap task_log harus dimuat satu dan hanya satu tim
  
Perancangan ERD nya sebagai berikut 

<img width="767" height="424" alt="Logic222al" src="https://github.com/user-attachments/assets/73d909cb-7107-4b4b-a2b9-02abfe8a004e" />

### 2. Buat database baru di laragon MySQL

Ketika sudah merancang skema database dengan erd maka kita bikin tablenya di laragon MySQL

<img width="1623" height="802" alt="image" src="https://github.com/user-attachments/assets/fe6e192d-7028-4e1d-a0af-c5835f88f819" />

<img width="1592" height="615" alt="image" src="https://github.com/user-attachments/assets/507234b9-1202-4e24-adac-2ba9aebee7d0" />

<img width="1617" height="392" alt="image" src="https://github.com/user-attachments/assets/68d5055a-a522-4077-8c20-88554f764f3d" />

<img width="1618" height="582" alt="image" src="https://github.com/user-attachments/assets/724db1dc-2aa5-4f46-8fce-830e69ca021a" />

<img width="1627" height="395" alt="image" src="https://github.com/user-attachments/assets/19e1f238-7553-4710-adc2-be5e8496e5bf" />

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

### 6. Alur Panel

1. Autentikasi Akun

	a. Akses Awal & Pilihan Jalur:

      User membuka aplikasi dan memilih antara masuk (Login) jika sudah punya akun, atau daftar (Register) jika belum.
   
   b. Alur Login
   
      User mengisikan Email dan Password.
   
      	Jika data benar: Akun berhasil masuk dan user langsung diarahkan ke Dashboard.
   
      	Jika data salah: Sistem menampilkan notifikasi Email/Password Salahdan mengembalikan user ke halaman Login.
   
   c. Alur Register (User Baru):
   
      User mengisikan Nama, Email, Password, dan Konfirmasi Password. Sistem melakukan validasi data:
   
      	Jika Email sudah ada: Muncul notifikasi Sudah Terdaftar dan user diarahkan ke halaman Login.
      	Jika Konfirmasi Password beda: Muncul notifikasi Password Tidak Sesuai dan user diminta mengulang di halaman Register.
      	Jika Semua Data Sesuai: Akun berhasil dibuat dan user diarahkan ke halaman Login untuk masuk ke sistem.

. Dashboard Umum

Begitu user masuk (setelah login), sistem mengecek apakah user sudah punya tim atau belum.

 a. Jika User Sudah Punya Tim
 
      Sistem membaca role user di database.
      Jika Admin: Diarahkan langsung ke Dashboard Admin.
      Jika Member: Diarahkan langsung ke Dashboard Member.
      
b. Jika User Belum Punya Tim (Masuk Halaman Onboarding)

User diberi 2 pilihan: Membuat Tim Baru atau Bergabung ke Tim (Pakai Kode).

	1. Kondisi B1 — Jalur Membuat Tim Baru (Bikin Workspace):
	User mengisi nama & tipe tim kemudian memilih paket langganan, setelah itu melakukan pembayaran (Payment Gateway).
	Jika pembayaran gagal: Muncul notifikasi gagal dan user diminta mengulang pembayaran.
	Jika pembayaran berhasil: Sistem menyimpan data tim, menetapkan user tersebut otomatis menjadi Admin/Owner, lalu mengarahkannya ke halaman utama/dashboard.
   
	2. Kondisi B2 — Jalur Bergabung ke Tim (Sebagai Member):
	User memasukkan Kode Undangan Tim.
	Jika kode salah/tidak valid: Muncul notifikasi kode tidak ditemukan.
	Jika kode valid: User memilih paket member/trial habis itu proses verifikasi/pembayaran dan sistem menyimpan data user sebagai Member di tim tersebut maka user masuk ke dashboard.

c. Navigasi panel Member

Member memilih salah satu dari 6 menu utama di dashboard:

1. Menu 1 Dashboard Utama: Memuat ringkasan ringkasan statistik dan daftar tugas mendatang.
   
2. Menu 2 Daftar Tugas (Task List):

Tampilkan list tugas hari ini dan pilih tugas.

      Jika status Submitted/Approved: Hanya bisa melihat detail dan bukti yang sudah terkirim.
      Jika status Pending/Rejected: Buka form pengisian isi data & upload bukti klik kirim.
      Validasi: Jika data belum lengkap, muncul peringatan. Jika lengkap, sistem mengalokasikan pembaruan ke task_logs dan menampilkan notifikasi sukses.
	
3. Menu 3 Riwayat Laporan:
Tampilkan tabel log laporan dan pilih satu laporan.

         Status Approved: Lihat bukti, progress, dan tanggal disetujui.
      	Status Rejected: Lihat catatan evaluasi / alasan penolakan dari admin.
      	Status Submitted: Menampilkan keterangan laporan sedang menunggu peninjauan.

5. Menu 4 Rekap Kepatuhan Saya: Memuat data dari activity & task_logs untuk menampilkan grafik statistik kepatuhan pribadi secara real-time.
   
6. Menu 5 Profil & Info Tim: Mengarahkan alur ke halaman Profil & Info Tim dan bisa mengupdate profile member.
   
7. Menu 6 Keluar (Logout): Mengakhiri sesi pengguna dan melempar kembali ke Halaman Login.

d. Navigasi Panel Admin

Admin memilih salah satu dari 6 menu utama di dashboard: 

1. Menu 1 Dashboard Eksekutif:
   
Sistem membaca data teams, team_members, dan task_logs.

Menampilkan widget ringkasan statistik (total anggota, status langganan, dan tingkat kepatuhan tim).

2. Menu 2 Kelola Anggota:
   
Sistem menampilkan daftar team_members.

	Opsi Undang Member: Generate & kirim kode undangan tim, kode siap digunakan.
	Opsi Hapus Member: Konfirmasi hapus, jika Ya, sistem memperbarui/menghapus data member dari database berhasil dihapus.
   
3. Menu 3 Master Activity & Review:
	
         Sub-Opsi 1 (CRUD Template Tugas): Admin membuat, mengedit, atau menghapus Master Activity, sistem memperbarui tabel activity.
      	Sub-Opsi 2 (Review & Approval Laporan): Admin melihat antrean task_logs terkirim.
      	Disetujui: Update status task_logs menjadi disetujui dan notifikasi laporan berhasil disetujui.
      	Ditolak: Admin mengisi catatan evaluasi/alasan penolakan dan update status task_logs.

4. Menu 4 Langganan & Billing:

Sistem memuat data paket aktif & riwayat pembayaran.

	Aksi Upgrade/Perpanjang: Pilih paket terus proses payment gateway, jika sukses, update status langganan tim. Jika gagal, muncul notifikasi pembayaran gagal.
	Aksi Unduh Invoice: Generate & unduh berkas PDF bukti pembayaran/faktur.

5. Menu 5 Laporan & Rekap Tahunan:
   
Admin memilih periode & tahun laporan.

	Sistem mengagregasi data kepatuhan tim, menampilkan diagram kinerja tim dan individu.
	Export: Admin dapat mengunduh berkas rekap kepatuhan format PDF.
   
6. Menu 6 Keluar (Logout):

Mengakhiri sesi pengguna Admin dan mengarahkan kembali ke Halaman Login.







