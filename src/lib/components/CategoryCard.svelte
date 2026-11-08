<script lang="ts">
	import type { Category } from '$lib/types';
	import { categoryHref } from '$lib/categories';
	import Icon from './Icon.svelte';

	let { category, count }: { category: Category; count: number } = $props();
</script>

<article class="card">
	<span class="icon"><Icon name={category.icon} size={30} /></span>
	<h3>{category.title}</h3>
	<p class="desc">{category.description}</p>
	<p class="count">{count} publikasi contoh</p>
	<a class="link" href={categoryHref(category.slug)}>
		Telusuri kategori<span class="sr-only">: {category.title}</span>
		<Icon name="arrow" size={18} />
	</a>
</article>

<style>
	.card {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.6rem;
		height: 100%;
		padding: 1.5rem;
		background: var(--surface);
		border: 1px solid var(--line);
		border-top: 4px solid var(--brown);
		border-radius: var(--radius);
		transition: border-color 0.15s ease;
	}

	.card:hover {
		border-color: var(--ink);
	}

	.card:focus-within {
		outline: 3px solid var(--ink);
		outline-offset: 3px;
	}

	.icon {
		display: grid;
		place-items: center;
		width: 3.25rem;
		height: 3.25rem;
		background: var(--cream);
		border: 2px solid var(--ink);
		border-radius: 50%;
	}

	h3 {
		font-size: 1.375rem;
	}

	.desc {
		color: var(--ink-soft);
	}

	.count {
		font-size: 0.875rem;
		font-weight: 700;
	}

	.link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		margin-top: auto;
		padding-top: 0.5rem;
		font-weight: 700;
		text-decoration: underline;
		text-underline-offset: 4px;
		text-decoration-thickness: 2px;
		text-decoration-color: var(--gold);
	}

	/* Seluruh kartu dapat diklik lewat tautan ini */
	.link::after {
		content: '';
		position: absolute;
		inset: 0;
	}

	.link:focus-visible {
		outline: none;
	}
</style>