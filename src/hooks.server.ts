import { createServerClient } from '@supabase/ssr';
import { env } from '$env/dynamic/public';
import type { User } from '@supabase/supabase-js';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const url = env.PUBLIC_SUPABASE_URL;
	const key = env.PUBLIC_SUPABASE_ANON_KEY;
	if (!url || !key) {
		throw new Error(
			`.env belum terbaca → PUBLIC_SUPABASE_URL: ${url ? 'ada' : 'KOSONG'}, PUBLIC_SUPABASE_ANON_KEY: ${key ? 'ada' : 'KOSONG'}`
		);
	}

	event.locals.supabase = createServerClient(url, key, {
		cookies: {
			getAll: () => event.cookies.getAll(),
			setAll: (cookiesToSet) => {
				for (const { name, value, options } of cookiesToSet) {
					try {
						event.cookies.set(name, value, { ...options, path: '/' });
					} catch {
						// Respons sudah terkirim; pembaruan cookie ini dilewati agar server tidak crash.
					}
				}
			}
		}
	});

	// Dipanggil sekali per permintaan, hasilnya dipakai ulang oleh layout dan action.
	let userPromise: Promise<User | null> | undefined;
	event.locals.getUser = () =>
		(userPromise ??= (async () => {
			const {
				data: { user },
				error
			} = await event.locals.supabase.auth.getUser();
			return error ? null : user;
		})());

	return resolve(event, {
		filterSerializedResponseHeaders: (name) =>
			name === 'content-range' || name === 'x-supabase-api-version'
	});
};