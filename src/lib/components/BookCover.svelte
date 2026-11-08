<script lang="ts">
	import type { Book } from '$lib/types';
	import { getCategory } from '$lib/categories';

	let {
		book,
		decorative = false
	}: {
		book: Pick<Book, 'id' | 'title' | 'cover' | 'category'>;
		decorative?: boolean;
	} = $props();

	const tones = {
		'katalog-koleksi': { bg: '#8B5E3C', fg: '#F3E8A4', accent: '#F2A900' },
		'katalog-pameran': { bg: '#F2A900', fg: '#242111', accent: '#8B5E3C' },
		'kajian-penelitian': { bg: '#F3E8A4', fg: '#242111', accent: '#8B5E3C' }
	} as const;

	const tone = $derived(tones[book.category]);
	const label = $derived(getCategory(book.category).short);
	const seed = $derived([...book.id].reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) >>> 0, 7));
	const cy = $derived(140 + (seed % 40));
	const steps = [0, 1, 2, 3];
</script>

{#if book.cover}
	<img
		class="cover"
		src={book.cover}
		alt={decorative ? '' : `Cover buku ${book.title}`}
		width="300"
		height="400"
		loading="lazy"
	/>
{:else}
	<svg
		class="cover"
		viewBox="0 0 300 400"
		xmlns="http://www.w3.org/2000/svg"
		role={decorative ? undefined : 'img'}
		aria-label={decorative ? undefined : `Cover contoh (pengganti) untuk buku ${book.title}`}
		aria-hidden={decorative ? 'true' : undefined}
	>
		<rect width="300" height="400" fill={tone.bg} />
		<rect x="14" y="14" width="272" height="372" fill="none" stroke={tone.accent} stroke-width="2" />
		{#each steps as i (i)}
			{@const half = 22 + i * 22}
			<rect
				x={150 - half}
				y={cy - half}
				width={half * 2}
				height={half * 2}
				fill="none"
				stroke={tone.accent}
				stroke-width="2"
				opacity={1 - i * 0.15}
				transform={`rotate(45 150 ${cy})`}
			/>
		{/each}
		<text x="150" y="338" text-anchor="middle" font-size="14" letter-spacing="3" fill={tone.fg}>
			{label}
		</text>
		<text x="150" y="362" text-anchor="middle" font-size="11" letter-spacing="2" fill={tone.fg}>
			COVER CONTOH
		</text>
	</svg>
{/if}

<style>
	.cover {
		display: block;
		width: 100%;
		height: auto;
		aspect-ratio: 3 / 4;
		object-fit: cover;
		border: 1px solid var(--line);
	}

	.cover text {
		font-family: var(--font-body);
		font-weight: 700;
	}
</style>