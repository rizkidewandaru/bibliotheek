<script lang="ts">
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
</script>

<svelte:head>
	<title>Masuk · BIBLIOTHEEK</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<section class="container wrap">
	<h1>Masuk</h1>
	<p class="lead">Halaman ini untuk petugas museum.</p>

	<form method="post">
		{#if form?.message}
			<p class="err" role="alert">{form.message}</p>
		{/if}
		<label for="email">Email</label>
		<input id="email" name="email" type="email" autocomplete="username" required value={form?.email ?? ''} />

		<label for="password">Kata sandi</label>
		<input id="password" name="password" type="password" autocomplete="current-password" required />

		<button class="btn btn--primary" type="submit">Masuk</button>
	</form>
</section>

<style>
	.wrap { padding-block: 3rem; display: grid; gap: 1rem; max-width: 30rem; }
	h1 { font-size: clamp(1.8rem, 4vw, 2.75rem); }
	.lead { color: var(--ink-soft); }
	form { display: grid; gap: 0.5rem; padding: 1.5rem; background: var(--surface); border: 2px solid var(--ink); border-radius: var(--radius); }
	label { font-weight: 700; font-size: 0.9375rem; margin-top: 0.5rem; }
	input { min-height: 2.75rem; padding: 0.5rem 0.8rem; border: 2px solid var(--ink); border-radius: var(--radius); font: inherit; background: #fff; color: var(--ink); }
	button { margin-top: 1rem; }
	.err { padding: 0.6rem 0.8rem; border: 2px solid #8a1c1c; background: #fdecec; color: #5c0f0f; border-radius: var(--radius); }
</style>