<script lang="ts">
	import { page } from '$app/state';
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';
	import { categories, getCategory } from '$lib/categories';
	import { filterBooks } from '$lib/utils/search';

	let { data, form }: PageProps = $props();

	let query = $state('');

	const slug = $derived(page.url.searchParams.get('kategori'));
	const active = $derived(categories.find((c) => c.slug === slug));

	const counts = $derived(
		Object.fromEntries(
			categories.map((c) => [c.slug, data.books.filter((b) => b.category === c.slug).length])
		)
	);
	const withoutPdf = $derived(data.books.filter((b) => !b.driveFileId).length);

	const books = $derived(
		filterBooks(
			data.books.filter((b) => !active || b.category === active.slug),
			query,
			'semua'
		)
	);

	// Menjaga tab kategori tetap aktif setelah aksi (hapus / unggulan).
	const actionUrl = (name: string) =>
		active ? `?/${name}&kategori=${active.slug}` : `?/${name}`;
</script>

<svelte:head><title>Kelola Buku · Admin BIBLIOTHEEK</title></svelte:head>

<div class="head">
	<h1>Kelola Buku</h1>
	<a class="btn btn--primary" href="/admin/buku/baru">Tambah Buku</a>
</div>

<dl class="stats">
	<div><dt>Total buku</dt><dd>{data.books.length}</dd></div>
	{#each categories as c (c.slug)}
		<div><dt>{c.title}</dt><dd>{counts[c.slug]}</dd></div>
	{/each}
	<div class:warn={withoutPdf > 0}><dt>Belum ada PDF</dt><dd>{withoutPdf}</dd></div>
</dl>

{#if form?.message}
	<p class="err" role="alert">{form.message}</p>
{/if}

<nav aria-label="Filter kategori" class="tabs">
	<a href="/admin" aria-current={!active ? 'page' : undefined}>
		Semua <span class="n">{data.books.length}</span>
	</a>
	{#each categories as c (c.slug)}
		<a href={`/admin?kategori=${c.slug}`} aria-current={active?.slug === c.slug ? 'page' : undefined}>
			{c.title} <span class="n">{counts[c.slug]}</span>
		</a>
	{/each}
</nav>

<div class="search">
	<label for="admin-cari">Cari judul atau penulis</label>
	<input id="admin-cari" type="search" bind:value={query} autocomplete="off" />
</div>

{#if books.length}
	<div class="table-wrap">
		<table>
			<caption class="sr-only">Daftar buku{active ? ` kategori ${active.title}` : ''}</caption>
			<thead>
				<tr>
					<th scope="col">Judul</th>
					<th scope="col">Kategori</th>
					<th scope="col">Tahun</th>
					<th scope="col">Status</th>
					<th scope="col"><span class="sr-only">Aksi</span></th>
				</tr>
			</thead>
			<tbody>
				{#each books as book (book.id)}
					<tr>
						<th scope="row">
							<span class="title">{book.title}</span>
							<span class="author">{book.author}</span>
						</th>
						<td>{getCategory(book.category).title}</td>
						<td>{book.year || '–'}</td>
						<td>
							<span class="badges">
								<span class="badge" class:ok={book.driveFileId} class:no={!book.driveFileId}>
									{book.driveFileId ? 'PDF ada' : 'PDF belum'}
								</span>
								{#if book.featured}<span class="badge star">Unggulan</span>{/if}
							</span>
						</td>
						<td class="actions">
							<a href={`/admin/buku/${book.id}`}>Ubah<span class="sr-only">: {book.title}</span></a>

							<form method="post" action={actionUrl('unggulan')} use:enhance>
								<input type="hidden" name="id" value={book.id} />
								<input type="hidden" name="nilai" value={String(!book.featured)} />
								<button type="submit">
									{book.featured ? 'Cabut unggulan' : 'Jadikan unggulan'}<span class="sr-only">: {book.title}</span>
								</button>
							</form>

							<form
								method="post"
								action={actionUrl('hapus')}
								onsubmit={(event) => {
									if (!confirm(`Hapus "${book.title}"? Tindakan ini tidak dapat dibatalkan.`))
										event.preventDefault();
								}}
							>
								<input type="hidden" name="id" value={book.id} />
								<button class="danger" type="submit">Hapus<span class="sr-only">: {book.title}</span></button>
							</form>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{:else}
	<p class="empty">
		{data.books.length
			? 'Tidak ada buku yang cocok dengan filter atau pencarian ini.'
			: 'Belum ada buku. Klik “Tambah Buku” untuk memulai.'}
	</p>
{/if}

<style>
	.head { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1.5rem; }
	h1 { font-size: clamp(1.6rem, 3.4vw, 2.25rem); }

	.stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(9.5rem, 1fr)); gap: 0.75rem; margin: 0 0 1.5rem; }
	.stats div { padding: 0.9rem 1rem; background: var(--surface); border: 1px solid var(--line); border-top: 4px solid var(--brown); border-radius: var(--radius); }
	.stats div.warn { border-top-color: #8a1c1c; }
	dt { font-size: 0.8125rem; font-weight: 700; letter-spacing: 0.04em; color: var(--ink-soft); }
	dd { margin: 0.1rem 0 0; font-family: var(--font-display); font-size: 1.75rem; font-weight: 700; }

	.tabs { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
	.tabs a { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border: 2px solid var(--ink); border-radius: var(--radius); text-decoration: none; font-weight: 600; }
	.tabs a:hover { background: var(--cream); }
	.tabs a[aria-current='page'] { background: var(--gold); }
	.n { padding: 0 0.45rem; border-radius: 999px; background: var(--ink); color: var(--cream); font-size: 0.8125rem; }

	.search { display: grid; gap: 0.35rem; max-width: 26rem; margin-bottom: 1rem; }
	.search label { font-weight: 700; font-size: 0.9375rem; }
	.search input { min-height: 2.75rem; padding: 0.5rem 0.8rem; border: 2px solid var(--ink); border-radius: var(--radius); font: inherit; background: #fff; color: var(--ink); }

	.table-wrap { overflow-x: auto; border: 1px solid var(--line); background: var(--surface); }
	table { width: 100%; border-collapse: collapse; min-width: 52rem; }
	th, td { padding: 0.75rem 1rem; text-align: left; border-bottom: 1px solid var(--line); vertical-align: top; }
	thead th { font-size: 0.8125rem; letter-spacing: 0.06em; text-transform: uppercase; background: var(--cream); }
	tbody th { font-weight: 700; max-width: 26rem; }
	.title { display: block; }
	.author { display: block; font-weight: 400; font-size: 0.9375rem; color: var(--ink-soft); }
	tbody tr:hover { background: var(--paper); }

	.badges { display: flex; flex-wrap: wrap; gap: 0.35rem; }
	.badge { display: inline-block; padding: 0.1rem 0.55rem; border: 1px solid var(--ink); border-radius: 999px; font-size: 0.8125rem; font-weight: 700; white-space: nowrap; }
	.badge.ok { background: var(--cream); }
	.badge.no { border-style: dashed; border-color: #8a1c1c; color: #5c0f0f; }
	.badge.star { background: var(--gold); }

	.actions { display: flex; flex-wrap: wrap; gap: 0.5rem 1rem; align-items: center; }
	.actions form { margin: 0; }
	.actions a, .actions button { padding: 0; border: 0; background: none; font: inherit; font-weight: 600; text-decoration: underline; text-underline-offset: 3px; cursor: pointer; color: var(--ink); }
	.actions .danger { color: #8a1c1c; }

	.empty { padding: 2rem; text-align: center; border: 2px dashed var(--brown); }
	.err { margin-bottom: 1rem; padding: 0.6rem 0.8rem; border: 2px solid #8a1c1c; background: #fdecec; color: #5c0f0f; border-radius: var(--radius); }
</style>