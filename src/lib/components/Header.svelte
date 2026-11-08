<script lang="ts">
	import { page } from '$app/state';
	import Icon from './Icon.svelte';

	const links = [
		{ href: '/', label: 'Beranda' },
		{ href: '/katalog', label: 'Katalog Buku' },
		{ href: '/tentang', label: 'Tentang Museum' }
	];

	let open = $state(false);

	const isCurrent = (href: string) =>
		href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href);

	// Tutup menu seluler setiap kali berpindah halaman.
	$effect(() => {
		void page.url.pathname;
		open = false;
	});
</script>

<svelte:window
	onkeydown={(event) => {
		if (event.key === 'Escape') open = false;
	}}
/>

<header class="site-header">
	<div class="rule-band" aria-hidden="true"></div>
	<div class="container bar">
		<a class="brand" href="/">
			<span class="mark" aria-hidden="true">B</span>
			<span class="brand-text">
				<span class="name">BIBLIOTHEEK</span>
				<span class="sub">Digital Museum Library</span>
			</span>
		</a>

		<button
			class="toggle"
			type="button"
			aria-expanded={open}
			aria-controls="nav-utama"
			onclick={() => (open = !open)}
		>
			<Icon name={open ? 'close' : 'menu'} size={22} />
			<span>Menu</span>
		</button>

		<nav id="nav-utama" aria-label="Navigasi utama" class:open>
			<ul>
				{#each links as link (link.href)}
					<li>
						<a href={link.href} aria-current={isCurrent(link.href) ? 'page' : undefined}>
							{link.label}
						</a>
					</li>
				{/each}
			</ul>
			
		</nav>
	</div>
</header>

<style>
	.site-header {
		position: sticky;
		top: 0;
		z-index: 50;
		background: var(--paper);
		border-bottom: 1px solid var(--line);
	}

	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		min-height: 4.5rem;
	}

	.brand {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		text-decoration: none;
	}

	.mark {
		display: grid;
		place-items: center;
		width: 2.5rem;
		height: 2.5rem;
		background: var(--gold);
		border: 2px solid var(--ink);
		font-family: var(--font-display);
		font-size: 1.4rem;
		font-weight: 700;
	}

	.brand-text {
		display: grid;
		line-height: 1.1;
	}

	.name {
		font-family: var(--font-display);
		font-size: 1.3rem;
		font-weight: 700;
		letter-spacing: 0.08em;
	}

	.sub {
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--ink-soft);
	}

	.toggle {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		min-height: 2.75rem;
		padding: 0.4rem 0.9rem;
		background: transparent;
		border: 2px solid var(--ink);
		border-radius: var(--radius);
		font: inherit;
		font-weight: 700;
		color: var(--ink);
		cursor: pointer;
	}

	nav ul {
		display: grid;
		gap: 0.25rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	nav ul a {
		display: block;
		padding: 0.75rem 0.25rem;
		font-weight: 600;
		text-decoration: none;
		border-bottom: 3px solid transparent;
	}

	nav ul a:hover {
		border-bottom-color: var(--gold);
	}

	nav ul a[aria-current='page'] {
		border-bottom-color: var(--brown);
		font-weight: 700;
	}

	/* Seluler: menu terlipat di bawah bilah */
	@media (max-width: 859px) {
		nav {
			display: none;
			position: absolute;
			top: 100%;
			left: 0;
			right: 0;
			padding: 0.5rem 1.25rem 1.25rem;
			background: var(--paper);
			border-bottom: 2px solid var(--ink);
		}

		nav.open {
			display: block;
		}

		
	}

	@media (min-width: 860px) {
		.toggle {
			display: none;
		}

		nav {
			display: flex;
			align-items: center;
			gap: 2rem;
		}

		nav ul {
			display: flex;
			gap: 1.5rem;
		}

		nav ul a {
			padding: 0.5rem 0;
		}
	}
</style>