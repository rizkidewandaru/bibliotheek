import type { Book } from '$lib/types';

/**
 * Data contoh — bukan publikasi asli Museum Daerah Provinsi NTT,
 * kecuali entri 'koleksi-001' yang memakai berkas Drive asli.
 */
const NOTE_COPYRIGHT =
	'Data contoh untuk pengembangan antarmuka. Bukan publikasi resmi Museum Daerah Provinsi NTT.';
const NOTE_SYNOPSIS = 'Sinopsis contoh sebagai teks pengisi; isi sebenarnya akan menggantikan teks ini.';

function sample(
	id: string,
	title: string,
	author: string,
	year: number,
	pages: number,
	category: Book['category'],
	featured: boolean
): Book {
	return {
		id,
		title,
		author,
		year,
		synopsis: NOTE_SYNOPSIS,
		cover: null,
		publisher: 'Penerbit Contoh',
		pages,
		copyright: NOTE_COPYRIGHT,
		category,
		featured,
		isSample: true
	};
}

export const sampleBooks: Book[] = [
	{
		id: 'koleksi-001',
		title: 'ISI JUDUL ASLI DI SINI',
		author: 'ISI PENULIS',
		year: 2024, // ganti dengan tahun terbit sebenarnya
		synopsis: 'Isi sinopsis.',
		cover: null,
		publisher: 'ISI PENERBIT',
		pages: 0, // ganti dengan jumlah halaman
		copyright: 'Isi informasi hak cipta.',
		category: 'katalog-koleksi',
		featured: true,
		isSample: false,
		driveFileId: '1luMA2x45SDF9PjD_wkiiSDcurks2OCTC'
	},
	sample('contoh-001', 'Contoh Katalog Koleksi Tekstil Tradisional', 'Penulis Contoh A', 2024, 128, 'katalog-koleksi', true),
	sample('contoh-002', 'Contoh Katalog Koleksi Peralatan Upacara Adat', 'Penulis Contoh B', 2022, 96, 'katalog-koleksi', true),
	sample('contoh-003', 'Contoh Katalog Pameran Tetap: Jejak Pelayaran dan Perdagangan', 'Tim Penyusun Contoh', 2023, 144, 'katalog-pameran', true),
	sample('contoh-004', 'Contoh Katalog Pameran Temporer: Ragam Rupa Anyaman', 'Penulis Contoh C', 2025, 80, 'katalog-pameran', false),
	sample('contoh-005', 'Contoh Kajian Penelitian: Pencatatan dan Dokumentasi Koleksi', 'Penulis Contoh D', 2021, 164, 'kajian-penelitian', false),
	sample('contoh-006', 'Contoh Kajian Konservasi Bahan Organik pada Koleksi', 'Penulis Contoh E', 2025, 112, 'kajian-penelitian', false),
	sample('contoh-007', 'Contoh Panduan Registrasi dan Inventarisasi Koleksi', 'Penulis Contoh F', 2020, 72, 'katalog-koleksi', false),
	sample('contoh-008', 'Contoh Bunga Rampai Kajian Budaya Material', 'Penulis Contoh A', 2023, 210, 'kajian-penelitian', false)
];