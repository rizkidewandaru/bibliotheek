<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import type { PageProps } from './$types';
	import { categories } from '$lib/categories';
	import { filterBooks, parseScope, type SearchScope } from '$lib/utils/search';
	import SearchBox from '$lib/components/SearchBox.svelte';
	import BookCard from '$lib/components/BookCard.svelte';

	let { data }: PageProps = $props();

	// Nilai awal dari URL, lalu ikut berubah kalau URL berganti (mis. klik tab kategori).
	let query = $state(page.url.searchParams.get('q') ?? '');
	let scope = $state<SearchScope>(parseScope(page.url.searchParams.get('cari')));

	$effect(() => {
		query = page.url.searchParams.get('q') ?? '';
		scope = parseScope(page.url.searchParams.get('cari'));
	});

	const slug = $derived(page.url.searchParams.get('kategori'));
	const newest = $derived(page.url.searchParams.get('urut') === 'terbaru');
	const active = $derived(categories.find((c) => c.slug === slug));

	const books = $derived.by(() => {
		const list = filterBooks(
			data.books.filter((b) => !active || b.category === active.slug),
			query,
			scope
		);
		return newest ? [...list].sort((a, b) => b.year - a.year) : list;
	});

	const hiddenFields = $derived({
		...(active ? { kategori: active.slug } : {}),
		...(newest ? { urut: 'terbaru' } : {})
	});

	// Tautan tab kategori mempertahankan kata kunci yang sedang dicari.
	function tabHref(categorySlug?: string) {
		const params = new URLSearchParams();
		if (categorySlug) params.set('kategori', categorySlug);
		if (query.trim()) params.set('q', query.trim());
		if (query.trim() && scope !== 'semua') params.set('cari', scope);
		if (newest) params.set('urut', 'terbaru');
		const qs = params.toString();
		return qs ? `/katalog?${qs}` : '/katalog';
	}

	// Menyimpan pencarian ke alamat URL supaya bisa dibagikan. Penyaringan sendiri sudah langsung saat mengetik.
	function onsearch() {
		goto(tabHref(active?.slug), { keepFocus: true, noScroll: true });
	}

	function clearSearch() {
		query = '';
		scope = 'semua';
		onsearch();
	}
</script>

<svelte:head>
	<title>{active?.title ?? 'Katalog Buku'} · BIBLIOTHEEK</title>
</svelte:head>

<p class="sr-only" role="status" aria-live="polite">
	{books.length ? `${books.length} buku ditampilkan.` : 'Tidak ada buku yang cocok.'}
</p>

<div class="container wrap">
	<div class="top">
		<h1>{active?.title ?? 'Katalog Buku'}</h1>
		{#if active}<p class="desc">{active.description}</p>{/if}
	</div>

	<SearchBox
		bind:query
		bind:scope
		{onsearch}
		action="/katalog"
		hidden={hiddenFields}
		idPrefix="katalog"
	/>

	<nav aria-label="Filter kategori" class="tabs">
		<a href={tabHref()} aria-current={!active ? 'page' : undefined}>Semua</a>
		{#each categories as c (c.slug)}
			<a href={tabHref(c.slug)} aria-current={active?.slug === c.slug ? 'page' : undefined}>
				{c.title}
			</a>
		{/each}
	</nav>

	<p class="count">{books.length} buku{query.trim() ? ` untuk “${query.trim()}”` : ''}</p>

	{#if books.length}
		<ul class="grid">
			{#each books as book (book.id)}<li><BookCard {book} /></li>{/each}
		</ul>
	{:else}
		<div class="empty">
			<h2>Buku tidak ditemukan</h2>
			<p>Periksa ejaan, coba kata kunci yang lebih singkat, atau ubah pilihan “Cari pada” dan kategori.</p>
			<button class="btn btn--primary" type="button" onclick={clearSearch}>Hapus pencarian</button>
		</div>
	{/if}
</div>

<style>
	.wrap { padding-block: 3rem; display: grid; gap: 1.25rem; }
	h1 { font-size: clamp(1.8rem, 4vw, 2.75rem); }
	.top { display: grid; gap: 0.5rem; }
	.desc { color: var(--ink-soft); max-width: 40rem; }
	.tabs { display: flex; flex-wrap: wrap; gap: 0.5rem; }
	.tabs a { padding: 0.5rem 1rem; border: 2px solid var(--ink); border-radius: var(--radius); text-decoration: none; font-weight: 600; }
	.tabs a:hover { background: var(--cream); }
	.tabs a[aria-current='page'] { background: var(--gold); }
	.count { color: var(--ink-soft); font-weight: 600; }
	.grid { display: grid; gap: 1.25rem; margin: 0; padding: 0; list-style: none; grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr)); }
	.empty { display: grid; justify-items: center; gap: 0.75rem; max-width: 36rem; margin-inline: auto; padding: 2.5rem 1.5rem; text-align: center; background: var(--surface); border: 2px dashed var(--brown); border-radius: var(--radius); }
	.empty p { color: var(--ink-soft); }
</style>