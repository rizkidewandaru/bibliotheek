import type { PageServerLoad } from './$types';
import { listBooks } from '$lib/server/books';

export const load: PageServerLoad = async ({ locals }) => ({
	books: await listBooks(locals.supabase)
});