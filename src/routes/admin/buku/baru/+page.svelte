<script lang="ts">
	import type { PageProps } from './$types';
	import BookForm from '$lib/components/BookForm.svelte';

	let { form }: PageProps = $props();
</script>

<svelte:head><title>Tambah Buku · Admin BIBLIOTHEEK</title></svelte:head>

<h1>Tambah Buku</h1>
<BookForm {form} submitLabel="Simpan Buku" />

<style>
	h1 { font-size: clamp(1.6rem, 3.4vw, 2.25rem); margin-bottom: 1.5rem; }
</style>