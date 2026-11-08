<script lang="ts">
	import { categories } from '$lib/categories';
	import type { Book, BookFormValues } from '$lib/types';

	let {
		book,
		form,
		submitLabel
	}: {
		book?: Book;
		form?: { values?: BookFormValues; errors?: Record<string, string> } | null;
		submitLabel: string;
	} = $props();

	const v = $derived<BookFormValues>(
		form?.values ?? {
			judul: book?.title ?? '',
			penulis: book?.author ?? '',
			tahun_terbit: book ? String(book.year) : '',
			jumlah_halaman: book ? String(book.pages) : '',
			penerbit: book?.publisher ?? '',
			kategori: book?.category ?? '',
			sinopsis: book?.synopsis ?? '',
			hak_cipta: book?.copyright ?? '',
			drive: book?.driveFileId ?? '',
			cover_url: book?.cover ?? '',
			unggulan: book?.featured ?? false
		}
	);
	const err = $derived(form?.errors ?? {});

	const textFields = [
		{ name: 'judul', label: 'Judul', type: 'text' },
		{ name: 'penulis', label: 'Penulis', type: 'text' },
		{ name: 'tahun_terbit', label: 'Tahun terbit', type: 'number' },
		{ name: 'jumlah_halaman', label: 'Jumlah halaman', type: 'number' },
		{ name: 'penerbit', label: 'Penerbit (opsional)', type: 'text' }
	] as const;
</script>

<form method="post" novalidate>
	{#if err.form}<p class="err" role="alert">{err.form}</p>{/if}

	{#each textFields as f (f.name)}
		<div class="field">
			<label for={f.name}>{f.label}</label>
			<input
				id={f.name}
				name={f.name}
				type={f.type}
				value={v[f.name]}
				aria-invalid={err[f.name] ? 'true' : undefined}
				aria-describedby={err[f.name] ? `e-${f.name}` : undefined}
			/>
			{#if err[f.name]}<p class="err-text" id="e-{f.name}">{err[f.name]}</p>{/if}
		</div>
	{/each}

	<div class="field">
		<label for="kategori">Kategori</label>
		<select
			id="kategori"
			name="kategori"
			aria-invalid={err.kategori ? 'true' : undefined}
			aria-describedby={err.kategori ? 'e-kategori' : undefined}
		>
			<option value="" selected={!v.kategori}>— Pilih kategori —</option>
			{#each categories as c (c.slug)}
				<option value={c.slug} selected={v.kategori === c.slug}>{c.title}</option>
			{/each}
		</select>
		{#if err.kategori}<p class="err-text" id="e-kategori">{err.kategori}</p>{/if}
	</div>

	<div class="field">
		<label for="sinopsis">Sinopsis (opsional)</label>
		<textarea id="sinopsis" name="sinopsis" rows="5">{v.sinopsis}</textarea>
	</div>

	<div class="field">
		<label for="hak_cipta">Informasi hak cipta (opsional)</label>
		<textarea id="hak_cipta" name="hak_cipta" rows="3">{v.hak_cipta}</textarea>
	</div>

	<div class="field">
		<label for="drive">Link Google Drive PDF (atau ID berkas)</label>
		<input
			id="drive"
			name="drive"
			type="text"
			value={v.drive}
			placeholder="https://drive.google.com/file/d/.../view"
			aria-describedby="h-drive{err.drive ? ' e-drive' : ''}"
			aria-invalid={err.drive ? 'true' : undefined}
		/>
		<p class="hint" id="h-drive">Berkas harus dibagikan sebagai “Siapa saja yang memiliki link”.</p>
		{#if err.drive}<p class="err-text" id="e-drive">{err.drive}</p>{/if}
	</div>

	<div class="field">
		<label for="cover_url">URL gambar cover (opsional)</label>
		<input
			id="cover_url"
			name="cover_url"
			type="text"
			value={v.cover_url}
			placeholder="https://..."
			aria-invalid={err.cover_url ? 'true' : undefined}
			aria-describedby={err.cover_url ? 'e-cover_url' : undefined}
		/>
		{#if err.cover_url}<p class="err-text" id="e-cover_url">{err.cover_url}</p>{/if}
	</div>

	<label class="check">
		<input type="checkbox" name="unggulan" checked={v.unggulan} />
		Tampilkan sebagai Buku Unggulan di beranda
	</label>

	<div class="buttons">
		<button class="btn btn--primary" type="submit">{submitLabel}</button>
		<a class="btn btn--ghost" href="/admin">Batal</a>
	</div>
</form>

<style>
	form { display: grid; gap: 1.1rem; max-width: 40rem; }
	.field { display: grid; gap: 0.35rem; }
	label { font-weight: 700; font-size: 0.9375rem; }
	input[type='text'], input[type='number'], select, textarea {
		min-height: 2.75rem; padding: 0.5rem 0.8rem; border: 2px solid var(--ink);
		border-radius: var(--radius); font: inherit; background: #fff; color: var(--ink); width: 100%;
	}
	[aria-invalid='true'] { border-color: #8a1c1c; }
	.check { display: flex; align-items: center; gap: 0.6rem; font-weight: 600; }
	.check input { width: 1.25rem; height: 1.25rem; }
	.hint { font-size: 0.875rem; color: var(--ink-soft); }
	.err-text { font-size: 0.9375rem; font-weight: 700; color: #8a1c1c; }
	.err { padding: 0.6rem 0.8rem; border: 2px solid #8a1c1c; background: #fdecec; color: #5c0f0f; border-radius: var(--radius); }
	.buttons { display: flex; flex-wrap: wrap; gap: 0.75rem; }
</style>