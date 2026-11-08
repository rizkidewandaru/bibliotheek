# BIBLIOTHEEK — Digital Museum Library

Perpustakaan digital dan arsip publikasi Museum Daerah Provinsi NTT. Tahap ini: **halaman beranda** (SvelteKit + TypeScript + Svelte 5).

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:5173
npm run check    # pemeriksaan tipe
npm run build    # build produksi
```

## Data

Seluruh buku di `src/lib/server/sample-data.ts` adalah **data contoh**, bukan publikasi asli museum.
Akses data dipusatkan di `src/lib/server/books.ts` (`listBooks()`); ganti isinya dengan query Supabase nanti.
Supabase **belum terhubung**: `src/lib/supabase/config.ts` hanya membaca variabel di `.env.example`.

## Route berikutnya yang perlu dibuat

Beranda menautkan ke route berikut (saat ini menampilkan halaman 404 informatif dari `+error.svelte`):

| Route | Berkas |
| --- | --- |
| `/katalog` (mendukung `?q=`, `?kategori=`, `?urut=terbaru`) | `src/routes/katalog/+page.svelte` |
| `/buku/[id]` | `src/routes/buku/[id]/+page.svelte` |
| `/tentang` | `src/routes/tentang/+page.svelte` |
| `/login` | `src/routes/login/+page.svelte` |
