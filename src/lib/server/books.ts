import type { Book } from '$lib/types';
import { sampleBooks } from './sample-data';


/** Saat ini hanya data contoh lokal. Nanti ganti isinya dengan query Supabase. */
export async function listBooks(): Promise<Book[]> {
	return sampleBooks;
}
export async function getBook(id: string): Promise<Book | undefined> {
	return sampleBooks.find((b) => b.id === id);
}