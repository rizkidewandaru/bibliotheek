<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<div class="app">
	<a class="skip-link" href="#konten">Lewati ke konten utama</a>
	<Header />
	<main id="konten" tabindex="-1">
		{@render children()}
	</main>
	<Footer />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100dvh;
	}

	main {
		flex: 1;
	}

	main:focus {
		outline: none;
	}
</style>