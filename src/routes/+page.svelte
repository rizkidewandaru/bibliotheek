<script lang="ts">
	import { page } from '$app/state';
	import { tick } from 'svelte';
	import type { PageProps } from './$types';
	import { categories } from '$lib/categories';
	import { filterBooks, parseScope, type SearchScope } from '$lib/utils/search';
	import SearchBox from '$lib/components/SearchBox.svelte';
	import SectionHeading from '$lib/components/SectionHeading.svelte';
	import CategoryCard from '$lib/components/CategoryCard.svelte';
	import BookCard from '$lib/components/BookCard.svelte';
	import BookCover from '$lib/components/BookCover.svelte';
	import PublicationItem from '$lib/components/PublicationItem.svelte';
	import Icon from '$lib/components/Icon.svelte';

	let { data }: PageProps = $props();

	// Nilai awal dari URL (?q=...&cari=...) agar pencarian tanpa JS tetap berfungsi.
	let query = $state(page.url.searchParams.get('q') ?? '');
	let scope = $state<SearchScope>(parseScope(page.url.searchParams.get('cari')));
	let resultsHeading = $state<HTMLElement | undefined>();

	const isSearching = $derived(query.trim().length > 0);
	const results = $derived(filterBooks(data.books, query, scope));
	const featured = $derived(data.books.filter((b) => b.featured).slice(0, 4));
	const latest = $derived(
		[...data.books]
			.sort((a, b) => b.year - a.year || a.title.localeCompare(b.title, 'id'))
			.slice(0, 6)
	);
	const heroCovers = $derived(featured.slice(0, 3));
	const countByCategory = $derived(
		Object.fromEntries(
			categories.map((c) => [c.slug, data.books.filter((b) => b.category === c.slug).length])
		)
	);
	const statusText = $derived(
		!isSearching
			? ''
			: results.length
				? `Ditemukan ${results.length} buku untuk "${query.trim()}".`
				: `Tidak ada buku yang cocok dengan "${query.trim()}".`
	);

	async function onsearch() {
		if (!isSearching) return;
		await tick();
		resultsHeading?.scrollIntoView({ block: 'start' });
		resultsHeading?.focus({ preventScroll: true });
	}

	function clearSearch() {
		query = '';
		scope = 'semua';
	}
</script>

<svelte:head>
	<title>BIBLIOTHEEK — Digital Museum Library | Museum Daerah Provinsi NTT</title>
	<meta
		name="description"
		content="Perpustakaan digital dan arsip publikasi Museum Daerah Provinsi Nusa Tenggara Timur: katalog koleksi, katalog pameran, serta kajian dan penelitian koleksi."
	/>
</svelte:head>

<!-- Pembaca layar diberi tahu jumlah hasil pencarian -->
<p class="sr-only" role="status" aria-live="polite">{statusText}</p>

<section class="hero" aria-labelledby="hero-judul">
	<div class="container hero-grid">
		<div class="hero-copy">
			<p class="eyebrow">Museum Daerah Provinsi Nusa Tenggara Timur</p>
			<h1 id="hero-judul">Bibliografi Publikasi Museum Nusa Tenggara Timur</h1>
			<p class="lead">
				BIBLIOTHEEK adalah perpustakaan digital dan arsip publikasi Museum Daerah Provinsi NTT:
				katalog koleksi, katalog pameran, serta kajian dan penelitian koleksi dalam satu tempat.
			</p>
			<SearchBox bind:query bind:scope {onsearch} />
		</div>

		<div class="hero-art" aria-hidden="true">
			<div class="stack">
				{#each heroCovers as book (book.id)}
					<div class="stack-item"><BookCover {book} decorative /></div>
				{/each}
			</div>
		</div>
	</div>
</section>

<div class="container">
	<p class="notice" role="note">
		<strong>Data contoh.</strong> Semua buku, penulis, dan cover di halaman ini adalah data
		pengisi untuk pengembangan, bukan publikasi resmi Museum Daerah Provinsi NTT.
	</p>
</div>

{#if isSearching}
	<section id="hasil-pencarian" class="section" aria-labelledby="hasil-judul">
		<div class="container">
			<div class="results-head">
				<div>
					<h2 id="hasil-judul" tabindex="-1" bind:this={resultsHeading}>Hasil pencarian</h2>
					<p class="status">
						{#if results.length}
							Ditemukan {results.length} buku untuk “{query.trim()}”
						{:else}
							Tidak ada buku ditemukan
						{/if}
					</p>
				</div>
				<div class="results-actions">
					<a class="btn btn--ghost" href={`/katalog?q=${encodeURIComponent(query.trim())}`}>
						Buka di katalog
					</a>
					<button class="btn btn--ghost" type="button" onclick={clearSearch}>
						Hapus pencarian
					</button>
				</div>
			</div>

			{#if results.length}
				<ul class="book-grid">
					{#each results as book (book.id)}
						<li><BookCard {book} /></li>
					{/each}
				</ul>
			{:else}
				<div class="empty">
					<Icon name="search" size={34} />
					<h3>Buku tidak ditemukan</h3>
					<p>
						Tidak ada judul atau penulis yang cocok dengan “{query.trim()}”. Periksa ejaan, coba
						kata kunci yang lebih singkat, atau ubah pilihan “Cari pada”.
					</p>
					<div class="empty-actions">
						<button class="btn btn--primary" type="button" onclick={clearSearch}>
							Hapus pencarian
						</button>
						<a class="btn btn--ghost" href="/katalog">Buka katalog</a>
					</div>
				</div>
			{/if}
		</div>
	</section>
{/if}

<section id="kategori" class="section" aria-labelledby="kategori-judul">
	<div class="container">
		<SectionHeading
			id="kategori-judul"
			eyebrow="Jelajahi"
			title="Tiga Kategori Publikasi"
			description="Telusuri arsip berdasarkan jenis publikasi yang diterbitkan dan dihimpun museum."
		/>
		<ul class="category-grid">
			{#each categories as category (category.slug)}
				<li><CategoryCard {category} count={countByCategory[category.slug]} /></li>
			{/each}
		</ul>
	</div>
</section>

<section id="unggulan" class="section section--tint" aria-labelledby="unggulan-judul">
	<div class="container">
		<SectionHeading
			id="unggulan-judul"
			eyebrow="Pilihan"
			title="Buku Unggulan"
			description="Publikasi pilihan untuk memulai penelusuran."
		>
			<a class="btn btn--ghost" href="/katalog">Jelajahi Katalog</a>
		</SectionHeading>
		<ul class="book-grid">
			{#each featured as book (book.id)}
				<li><BookCard {book} /></li>
			{/each}
		</ul>
	</div>
</section>

<section id="terbaru" class="section" aria-labelledby="terbaru-judul">
	<div class="container">
		<SectionHeading
			id="terbaru-judul"
			eyebrow="Terkini"
			title="Publikasi Terbaru"
			description="Terbitan terbaru yang ditambahkan ke arsip digital."
		>
			<a class="btn btn--primary" href="/katalog?urut=terbaru">Lihat Semua</a>
		</SectionHeading>
		<ul class="latest-list">
			{#each latest as book (book.id)}
				<PublicationItem {book} />
			{/each}
		</ul>
	</div>
</section>

<style>
	.hero {
		background: var(--cream);
		border-bottom: 2px solid var(--ink);
	}

	.hero-grid {
		display: grid;
		align-items: center;
		gap: 2.5rem;
		padding-block: clamp(2.5rem, 6vw, 5rem);
	}

	.hero-copy {
		display: grid;
		gap: 1.1rem;
		min-width: 0;
	}

	h1 {
		font-size: clamp(2.1rem, 5.2vw, 3.75rem);
		letter-spacing: -0.01em;
		text-wrap: balance;
	}

	.lead {
		max-width: 40rem;
		margin-bottom: 0.5rem;
		font-size: 1.1875rem;
	}

	.hero-art {
		display: none;
	}

	@media (min-width: 960px) {
		.hero-grid {
			grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.75fr);
		}

		.hero-art {
			display: block;
		}
	}

	.stack {
		position: relative;
		aspect-ratio: 1 / 1.05;
	}

	.stack-item {
		position: absolute;
		width: 54%;
		box-shadow: 0 10px 24px rgb(36 33 17 / 0.22);
	}

	.stack-item:nth-child(1) {
		left: 0;
		top: 10%;
		transform: rotate(-5deg);
	}

	.stack-item:nth-child(2) {
		left: 23%;
		top: 0;
		z-index: 2;
	}

	.stack-item:nth-child(3) {
		right: 0;
		top: 16%;
		transform: rotate(5deg);
	}

	.notice {
		margin-top: 1.5rem;
		padding: 0.75rem 1rem;
		border: 1px dashed var(--brown);
		border-radius: var(--radius);
		background: var(--surface);
		font-size: 0.9375rem;
	}

	.section {
		padding-block: clamp(2.5rem, 6vw, 4.5rem);
	}

	.section--tint {
		background: var(--cream);
		border-block: 2px solid var(--ink);
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.category-grid {
		display: grid;
		gap: 1.25rem;
	}

	@media (min-width: 800px) {
		.category-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.book-grid {
		display: grid;
		gap: 1.25rem;
		grid-template-columns: 1fr;
	}

	@media (min-width: 560px) {
		.book-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1000px) {
		.book-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.latest-list {
		display: grid;
		column-gap: 3rem;
		border-bottom: 1px solid var(--line);
	}

	@media (min-width: 900px) {
		.latest-list {
			grid-template-columns: 1fr 1fr;
		}
	}

	.results-head {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.results-head h2 {
		font-size: clamp(1.6rem, 3.4vw, 2.25rem);
	}

	.results-head h2:focus {
		outline: none;
	}

	.status {
		color: var(--ink-soft);
	}

	.results-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.empty {
		display: grid;
		justify-items: center;
		gap: 0.75rem;
		max-width: 36rem;
		margin-inline: auto;
		padding: 2.5rem 1.5rem;
		text-align: center;
		background: var(--surface);
		border: 2px dashed var(--brown);
		border-radius: var(--radius);
	}

	.empty p {
		color: var(--ink-soft);
	}

	.empty-actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.75rem;
		margin-top: 0.5rem;
	}
</style>