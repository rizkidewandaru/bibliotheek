import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getBook } from '$lib/server/books';
import { requireAdmin } from '$lib/server/auth';
import { readBookForm } from '$lib/server/book-form';

export const load: PageServerLoad = async ({ params, locals }) => {
	const book = await getBook(locals.supabase, params.id);
	if (!book) error(404, 'Buku tidak ditemukan');
	return { book };
};

export const actions: Actions = {
	default: async ({ request, params, locals }) => {
		await requireAdmin(locals);
		const { values, errors, row } = readBookForm(await request.formData());
		if (!row) return fail(400, { values, errors });

		const { data, error } = await locals.supabase
			.from('buku')
			.update(row)
			.eq('id', params.id)
			.select('id');
		if (error || !data?.length)
			return fail(500, { values, errors: { form: 'Perubahan tidak dapat disimpan.' } });

		redirect(303, '/admin');
	}
};