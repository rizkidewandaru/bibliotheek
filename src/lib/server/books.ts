import type { SupabaseClient } from '@supabase/supabase-js';
import type { Book, CategorySlug } from '$lib/types';

interface BukuRow {
	id: string;
	judul: string;
	penulis: string;
	tahun_terbit: number | null;
	sinopsis: string | null;
	penerbit: string | null;
	jumlah_halaman: number | null;
	hak_cipta: string | null;
	kategori: CategorySlug;
	unggulan: boolean;
	drive_file_id: string | null;
	cover_url: string | null;
}

function rowToBook(row: BukuRow): Book {
	return {
		id: row.id,
		title: row.judul,
		author: row.penulis,
		year: row.tahun_terbit ?? 0,
		synopsis: row.sinopsis ?? '',
		cover: row.cover_url,
		publisher: row.penerbit ?? '',
		pages: row.jumlah_halaman ?? 0,
		copyright: row.hak_cipta ?? '',
		category: row.kategori,
		featured: row.unggulan,
		isSample: false,
		driveFileId: row.drive_file_id ?? undefined
	};
}

export async function listBooks(supabase: SupabaseClient): Promise<Book[]> {
	const { data, error } = await supabase
		.from('buku')
		.select('*')
		.order('dibuat_pada', { ascending: false });
	if (error) throw new Error(`Gagal memuat buku: ${error.message}`);
	return (data as BukuRow[]).map(rowToBook);
}

export async function getBook(supabase: SupabaseClient, id: string): Promise<Book | undefined> {
	const { data, error } = await supabase.from('buku').select('*').eq('id', id).maybeSingle();
	// 22P02 = ID bukan UUID yang valid, perlakukan sebagai "tidak ditemukan".
	if (error && error.code !== '22P02') throw new Error(`Gagal memuat buku: ${error.message}`);
	return data ? rowToBook(data as BukuRow) : undefined;
}