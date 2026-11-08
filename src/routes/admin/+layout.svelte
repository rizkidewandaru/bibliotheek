<script lang="ts">
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
</script>

<svelte:head>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="bar">
	<div class="container inner">
		<p><strong>Admin</strong> · {data.email}</p>
		<nav aria-label="Navigasi admin">
			<a href="/admin">Daftar buku</a>
			<a href="/">Lihat situs</a>
			<form method="post" action="/logout">
				<button class="btn btn--ghost" type="submit">Keluar</button>
			</form>
		</nav>
	</div>
</div>

<div class="container content">
	{@render children()}
</div>

<style>
	.bar { background: var(--cream); border-bottom: 2px solid var(--ink); }
	.inner { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.75rem; padding-block: 0.75rem; }
	nav { display: flex; flex-wrap: wrap; align-items: center; gap: 1.25rem; }
	nav a { font-weight: 600; }
	.content { padding-block: 2.5rem; }
</style>