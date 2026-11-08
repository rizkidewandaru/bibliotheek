<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status} · BIBLIOTHEEK</title>
</svelte:head>

<section class="container error">
		{#if page.status === 404}
		<p class="eyebrow">Tidak ditemukan</p>
		<h1>Halaman tidak ditemukan</h1>
		<p>Alamat <code>{page.url.pathname}</code> tidak tersedia atau belum dibuat.</p>
		
	{:else}
		<p class="eyebrow">Kesalahan {page.status}</p>
		<h1>Terjadi kesalahan</h1>
		<p>{page.error?.message}</p>
	{/if}
	<a class="btn btn--primary" href="/">Kembali ke Beranda</a>
</section>

<style>
	.error {
		display: grid;
		justify-items: start;
		gap: 1rem;
		padding-block: 4rem;
		max-width: 44rem;
	}

	h1 {
		font-size: clamp(1.8rem, 4vw, 2.75rem);
	}

	code {
		padding: 0.1rem 0.4rem;
		background: var(--cream);
		border-radius: var(--radius);
	}
</style>