import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
	const user = await locals.getUser();

	const polos = await locals.supabase.from('buku').select('id');
	const urut = await locals.supabase
		.from('buku')
		.select('*')
		.order('dibuat_pada', { ascending: false });

	return json({
		proyek: env.PUBLIC_SUPABASE_URL,
		sudahLogin: Boolean(user),
		tanpaUrutan: { jumlah: polos.data?.length ?? null, error: polos.error?.message ?? null },
		denganUrutan: { jumlah: urut.data?.length ?? null, error: urut.error?.message ?? null }
	});
};