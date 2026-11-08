import { error } from '@sveltejs/kit';

/** Memastikan pengguna login dan terdaftar sebagai admin. Selain itu: 404 (tidak membocorkan keberadaan halaman admin). */
export async function requireAdmin(locals: App.Locals) {
	const user = await locals.getUser();
	if (!user) error(404, 'Halaman tidak ditemukan');

	const { data } = await locals.supabase
		.from('admin_users')
		.select('user_id')
		.eq('user_id', user.id)
		.maybeSingle();
	if (!data) error(404, 'Halaman tidak ditemukan');

	return user;
}