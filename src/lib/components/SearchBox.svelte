<script lang="ts">
	import Icon from './Icon.svelte';
	import { searchScopes, type SearchScope } from '$lib/utils/search';

	let {
		query = $bindable(''),
		scope = $bindable<SearchScope>('semua'),
		onsearch,
		idPrefix = 'cari',
		action = '/',
		hidden = {}
	}: {
		query?: string;
		scope?: SearchScope;
		onsearch?: () => void;
		idPrefix?: string;
		action?: string;
		hidden?: Record<string, string>;
	} = $props();

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		onsearch?.();
	}
</script>


<!-- Tanpa JavaScript, formulir tetap berfungsi lewat GET ke "/" (?q=...&cari=...). -->
<form class="search" role="search" method="get" {action} onsubmit={handleSubmit}>
	{#each Object.entries(hidden) as [name, value] (name)}
		<input type="hidden" {name} {value} />
	{/each}
	<div class="field grow">
		<label for="{idPrefix}-q">Cari buku berdasarkan judul atau penulis</label>
		<div class="input-wrap">
			<Icon name="search" size={20} />
			<input
				id="{idPrefix}-q"
				name="q"
				type="search"
				bind:value={query}
				placeholder="Contoh: tekstil, anyaman, Penulis Contoh A"
				autocomplete="off"
			/>
		</div>
	</div>

	<div class="field">
		<label for="{idPrefix}-scope">Cari pada</label>
		<select id="{idPrefix}-scope" name="cari" bind:value={scope}>
			{#each searchScopes as option (option.value)}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
	</div>

	<button class="btn btn--primary submit" type="submit">
		<Icon name="search" size={18} />
		Cari Buku
	</button>
</form>

<style>
	.search {
		display: grid;
		gap: 1rem;
		padding: 1.25rem;
		background: var(--surface);
		border: 2px solid var(--ink);
		border-radius: var(--radius);
	}

	.field {
		display: grid;
		gap: 0.35rem;
		min-width: 0;
	}

	label {
		font-size: 0.875rem;
		font-weight: 700;
	}

	.input-wrap {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		min-height: 2.75rem;
		padding-inline: 0.8rem;
		background: #fff;
		border: 2px solid var(--ink);
		border-radius: var(--radius);
	}

	.input-wrap:focus-within {
		outline: 3px solid var(--ink);
		outline-offset: 2px;
	}

	input {
		flex: 1;
		min-width: 0;
		padding: 0.5rem 0;
		border: 0;
		background: transparent;
		font: inherit;
		color: var(--ink);
	}

	input:focus {
		outline: none;
	}

	input::placeholder {
		color: var(--ink-soft);
	}

	select {
		min-height: 2.75rem;
		padding: 0.5rem 0.8rem;
		background: #fff;
		border: 2px solid var(--ink);
		border-radius: var(--radius);
		font: inherit;
		color: var(--ink);
	}

	@media (min-width: 760px) {
		.search {
			grid-template-columns: 1fr auto auto;
			align-items: end;
		}
	}
</style>