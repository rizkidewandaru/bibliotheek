<script lang="ts">
	import type { PageProps } from './$types';
	import { getCategory } from '$lib/categories';
	import { drivePreviewUrl, driveViewUrl } from '$lib/utils/drive';

	let { data }: PageProps = $props();
	const book = $derived(data.book);
</script>

<svelte:head><title>{book.title} · BIBLIOTHEEK</title></svelte:head>

<article class="container wrap">
	<a href="/katalog?kategori={book.category}">← {getCategory(book.category).title}</a>
	<h1>{book.title}</h1>
	<p class="meta">{book.author} · {book.year} · {book.publisher} · {book.pages} hlm.</p>
	<p>{book.synopsis}</p>
	<p class="copy">{book.copyright}</p>

	{#if book.driveFileId}
		<iframe
			title={`Pembaca PDF: ${book.title}`}
			src={drivePreviewUrl(book.driveFileId)}
			allow="autoplay"
		></iframe>
		<a class="btn btn--ghost" href={driveViewUrl(book.driveFileId)} target="_blank" rel="noopener noreferrer">
			Buka di Google Drive
		</a>
	{:else}
		<p>Berkas PDF belum tersedia.</p>
	{/if}
</article>

<style>
	.wrap { padding-block: 3rem; display: grid; gap: 1rem; justify-items: start; }
	h1 { font-size: clamp(1.8rem, 4vw, 2.75rem); }
	.meta, .copy { color: var(--ink-soft); }
	iframe { width: 100%; height: 80vh; border: 2px solid var(--ink); border-radius: var(--radius); }
</style>