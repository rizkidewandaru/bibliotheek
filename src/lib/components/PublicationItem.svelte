<script lang="ts">
	import type { Book } from '$lib/types';
	import { getCategory } from '$lib/categories';
	import BookCover from './BookCover.svelte';

	let { book }: { book: Book } = $props();
	const category = $derived(getCategory(book.category));
</script>

<li class="item">
	<div class="thumb"><BookCover {book} decorative /></div>
	<div class="info">
		<p class="kicker">{category.title} · {book.year}</p>
		<h3><a href={`/buku/${book.id}`}>{book.title}</a></h3>
		<p class="meta">{book.author} · {book.publisher} · {book.pages} hlm.</p>
		{#if book.isSample}
			<p><span class="badge-sample">Data contoh</span></p>
		{/if}
	</div>
</li>

<style>
	.item {
		display: grid;
		grid-template-columns: 4.5rem 1fr;
		gap: 1rem;
		padding-block: 1.1rem;
		border-top: 1px solid var(--line);
	}

	.info {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.25rem;
	}

	.kicker {
		font-size: 0.8125rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--ink-soft);
	}

	h3 {
		font-size: 1.1875rem;
	}

	h3 a {
		text-decoration: none;
		background-image: linear-gradient(var(--gold), var(--gold));
		background-size: 0 3px;
		background-position: 0 100%;
		background-repeat: no-repeat;
		transition: background-size 0.2s ease;
	}

	h3 a:hover {
		background-size: 100% 3px;
	}

	.meta {
		font-size: 0.9375rem;
		color: var(--ink-soft);
	}
</style>