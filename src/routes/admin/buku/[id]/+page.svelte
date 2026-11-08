<script lang="ts">
	import type { PageProps } from './$types';
	import BookForm from '$lib/components/BookForm.svelte';

	let { data, form }: PageProps = $props();
</script>

<svelte:head><title>Ubah Buku · Admin BIBLIOTHEEK</title></svelte:head>

<h1>Ubah Buku</h1>
<BookForm book={data.book} {form} submitLabel="Simpan Perubahan" />

<style>
	h1 { font-size: clamp(1.6rem, 3.4vw, 2.25rem); margin-bottom: 1.5rem; }
</style>