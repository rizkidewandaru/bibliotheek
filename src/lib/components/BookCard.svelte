<script lang="ts">
	import type { Book } from '$lib/types';
	import { getCategory } from '$lib/categories';
	import BookCover from './BookCover.svelte';
	import Icon from './Icon.svelte';

	let { book }: { book: Book } = $props();
	const category = $derived(getCategory(book.category));
</script>

<article class="card">
	<div class="cover-wrap">
		<BookCover {book} />
	</div>
	<div class="body">
		<p class="tag">{category.title}</p>
		<h3 class="title">{book.title}</h3>
		<p class="author">{book.author}</p>
		<p class="meta">Terbit {book.year} · {book.pages} hlm.</p>
		{#if book.isSample}
			<p><span class="badge-sample">Data contoh</span></p>
		{/if}
		<a class="btn btn--primary" href={`/buku/${book.id}`}>
			Lihat Buku<span class="sr-only">: {book.title}</span>
			<Icon name="arrow" size={18} />
		</a>
	</div>
</article>

<style>
	.card {
		display: grid;
		height: 100%;
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius);
		overflow: hidden;
		transition: border-color 0.15s ease;
	}

	.card:hover {
		border-color: var(--brown);
	}

	.cover-wrap {
		padding: 1rem 1rem 0;
		background: var(--cream);
	}

	.body {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.4rem;
		padding: 1rem;
	}

	.tag {
		font-size: 0.8125rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--ink-soft);
	}

	.title {
		font-size: 1.125rem;
	}

	.author,
	.meta {
		color: var(--ink-soft);
		font-size: 0.9375rem;
	}

	.btn {
		margin-top: auto;
	}

	.body > :nth-last-child(2) {
		margin-bottom: 0.4rem;
	}

	@media (max-width: 559px) {
		.card {
			grid-template-columns: 7.5rem 1fr;
		}

		.cover-wrap {
			padding: 0.75rem;
			align-self: stretch;
		}
	}
</style>