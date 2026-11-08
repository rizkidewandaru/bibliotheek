export type CategorySlug = 'katalog-koleksi' | 'katalog-pameran' | 'kajian-penelitian';

export type IconName =
	| 'collection'
	| 'exhibition'
	| 'research'
	| 'search'
	| 'menu'
	| 'close'
	| 'arrow';

export interface Category {
	slug: CategorySlug;
	title: string;
	short: string;
	description: string;
	icon: IconName;
}

export interface Book {
	id: string;
	title: string;
	author: string;
	year: number;
	synopsis: string;
	cover: string | null;
	publisher: string;
	pages: number;
	copyright: string;
	category: CategorySlug;
	featured: boolean;
	isSample: boolean;
	driveFileId?: string;
}
/** Nilai mentah form buku (semua string agar bisa diisi ulang saat ada error). */
export interface BookFormValues {
	judul: string;
	penulis: string;
	tahun_terbit: string;
	jumlah_halaman: string;
	penerbit: string;
	kategori: string;
	sinopsis: string;
	hak_cipta: string;
	drive: string;
	cover_url: string;
	unggulan: boolean;
}