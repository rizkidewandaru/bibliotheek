import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { listBooks } from '$lib/server/books';
import { requireAdmin } from '$lib/server/auth';

export const load: PageServerLoad = async ({ locals }) => ({
	books: await listBooks(locals.supabase)
});

export const actions: Actions = {
	hapus: async ({ request, locals }) => {
		await requireAdmin(locals);
		const id = String((await request.formData()).get('id') ?? '');

		const { data, error } = await locals.supabase.from('buku').delete().eq('id', id).select('id');
		if (error || !data?.length) return fail(400, { message: 'Buku tidak dapat dihapus.' });

		return { success: true };
	},

	unggulan: async ({ request, locals }) => {
		await requireAdmin(locals);
		const form = await request.formData();
		const id = String(form.get('id') ?? '');
		const nilai = form.get('nilai') === 'true';

		const { data, error } = await locals.supabase
			.from('buku')
			.update({ unggulan: nilai })
			.eq('id', id)
			.select('id');
		if (error || !data?.length) return fail(400, { message: 'Status unggulan tidak dapat diubah.' });

		return { success: true };
	}
};