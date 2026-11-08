<script lang="ts">
	import { categories, categoryHref } from '$lib/categories';

	const year = new Date().getFullYear();
</script>

<footer class="site-footer">
	<div class="rule-band" aria-hidden="true"></div>
	<div class="container grid">
		<div class="identity">
			<p class="name">BIBLIOTHEEK</p>
			<p class="sub">Digital Museum Library</p>
			<p class="about">
				Arsip digital dan media edukasi Museum Daerah Provinsi Nusa Tenggara Timur.
			</p>
			<p class="note">
				Situs dalam tahap pengembangan. Seluruh buku yang tampil saat ini adalah data contoh.
			</p>
		</div>

		<nav aria-labelledby="footer-nav">
			<h2 id="footer-nav">Navigasi</h2>
			<ul>
				<li><a href="/">Beranda</a></li>
				<li><a href="/katalog">Katalog Buku</a></li>
				<li><a href="/tentang">Tentang Museum</a></li>
			</ul>
		</nav>

		<nav aria-labelledby="footer-kategori">
			<h2 id="footer-kategori">Kategori</h2>
			<ul>
				{#each categories as category (category.slug)}
					<li><a href={categoryHref(category.slug)}>{category.title}</a></li>
				{/each}
			</ul>
		</nav>
	</div>

	<div class="container legal">
		<p>
			&copy; {year} Museum Daerah Provinsi Nusa Tenggara Timur. Seluruh hak cipta dilindungi.
		</p>
	</div>
</footer>

<style>
	.site-footer {
		margin-top: 4rem;
		background: var(--ink);
		color: var(--cream);
	}

	.grid {
		display: grid;
		gap: 2.5rem;
		padding-block: 3rem 2rem;
	}

	@media (min-width: 800px) {
		.grid {
			grid-template-columns: 1.6fr 1fr 1fr;
		}
	}

	.name {
		font-family: var(--font-display);
		font-size: 1.6rem;
		font-weight: 700;
		letter-spacing: 0.08em;
	}

	.sub {
		font-size: 0.8125rem;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--gold);
	}

	.about {
		margin-top: 1rem;
		max-width: 30rem;
	}

	.note {
		margin-top: 0.75rem;
		max-width: 30rem;
		font-size: 0.9375rem;
		opacity: 0.85;
	}

	h2 {
		margin-bottom: 0.75rem;
		font-family: var(--font-body);
		font-size: 0.8125rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--gold);
	}

	ul {
		display: grid;
		gap: 0.4rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	a {
		text-decoration: underline;
		text-decoration-color: transparent;
		text-underline-offset: 4px;
		text-decoration-thickness: 2px;
	}

	a:hover {
		text-decoration-color: var(--gold);
	}

	a:focus-visible {
		outline-color: var(--cream);
	}

	.legal {
		padding-block: 1.25rem 2rem;
		border-top: 1px solid rgb(243 232 164 / 0.3);
		font-size: 0.9375rem;
	}
</style>