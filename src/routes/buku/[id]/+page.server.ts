import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getBook } from '$lib/server/books';

export const load: PageServerLoad = async ({ params, locals }) => {
	const book = await getBook(locals.supabase, params.id);
	if (!book) error(404, 'Buku tidak ditemukan');
	return { book };
};