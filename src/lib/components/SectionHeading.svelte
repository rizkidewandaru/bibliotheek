<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		id,
		eyebrow,
		title,
		description,
		children
	}: {
		id: string;
		eyebrow?: string;
		title: string;
		description?: string;
		children?: Snippet;
	} = $props();
</script>

<div class="heading">
	<div class="text">
		{#if eyebrow}<p class="eyebrow">{eyebrow}</p>{/if}
		<h2 {id}>{title}</h2>
		{#if description}<p class="desc">{description}</p>{/if}
	</div>
	{#if children}
		<div class="action">{@render children()}</div>
	{/if}
</div>

<style>
	.heading {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		justify-content: space-between;
		gap: 1rem 2rem;
		margin-bottom: 2rem;
	}

	.text {
		display: grid;
		gap: 0.6rem;
		max-width: 40rem;
	}

	h2 {
		font-size: clamp(1.6rem, 3.4vw, 2.25rem);
		text-wrap: balance;
	}

	.desc {
		color: var(--ink-soft);
	}
</style>