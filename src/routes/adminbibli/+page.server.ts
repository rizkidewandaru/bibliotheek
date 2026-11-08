import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (await locals.getUser()) redirect(303, '/admin');
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await request.formData();
		const email = String(form.get('email') ?? '').trim();
		const password = String(form.get('password') ?? '');

		if (!email || !password)
			return fail(400, { email, message: 'Email dan kata sandi wajib diisi.' });

		const { error } = await locals.supabase.auth.signInWithPassword({ email, password });
		if (error) return fail(400, { email, message: 'Email atau kata sandi salah.' });

		redirect(303, '/admin');
	}
};