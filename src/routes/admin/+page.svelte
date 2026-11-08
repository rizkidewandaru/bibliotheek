<script lang="ts">
	import type { PageProps } from './$types';
	import { getCategory } from '$lib/categories';

	let { data, form }: PageProps = $props();
</script>

<svelte:head><title>Kelola Buku · Admin BIBLIOTHEEK</title></svelte:head>

<div class="head">
	<h1>Kelola Buku</h1>
	<a class="btn btn--primary" href="/admin/buku/baru">Tambah Buku</a>
</div>

{#if form?.message}
	<p class="err" role="alert">{form.message}</p>
{/if}

{#if data.books.length}
	<div class="table-wrap">
		<table>
			<caption class="sr-only">Daftar buku</caption>
			<thead>
				<tr>
					<th scope="col">Judul</th>
					<th scope="col">Penulis</th>
					<th scope="col">Kategori</th>
					<th scope="col">Tahun</th>
					<th scope="col">PDF</th>
					<th scope="col"><span class="sr-only">Aksi</span></th>
				</tr>
			</thead>
			<tbody>
				{#each data.books as book (book.id)}
					<tr>
						<th scope="row">{book.title}</th>
						<td>{book.author}</td>
						<td>{getCategory(book.category).title}</td>
						<td>{book.year}</td>
						<td>{book.driveFileId ? 'Ada' : 'Belum'}</td>
						<td class="actions">
							<a href={`/admin/buku/${book.id}`}>Ubah<span class="sr-only">: {book.title}</span></a>
							<form
								method="post"
								action="?/hapus"
								onsubmit={(event) => {
									if (!confirm(`Hapus "${book.title}"? Tindakan ini tidak dapat dibatalkan.`))
										event.preventDefault();
								}}
							>
								<input type="hidden" name="id" value={book.id} />
								<button type="submit">Hapus<span class="sr-only">: {book.title}</span></button>
							</form>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{:else}
	<p class="empty">Belum ada buku. Klik “Tambah Buku” untuk memulai.</p>
{/if}

<style>
	.head { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1.5rem; }
	h1 { font-size: clamp(1.6rem, 3.4vw, 2.25rem); }
	.table-wrap { overflow-x: auto; border: 1px solid var(--line); background: var(--surface); }
	table { width: 100%; border-collapse: collapse; min-width: 44rem; }
	th, td { padding: 0.75rem 1rem; text-align: left; border-bottom: 1px solid var(--line); vertical-align: top; }
	thead th { font-size: 0.8125rem; letter-spacing: 0.06em; text-transform: uppercase; background: var(--cream); }
	tbody th { font-weight: 700; }
	.actions { display: flex; gap: 1rem; align-items: center; white-space: nowrap; }
	.actions form { margin: 0; }
	.actions button { padding: 0; border: 0; background: none; font: inherit; color: #8a1c1c; text-decoration: underline; cursor: pointer; }
	.empty { padding: 2rem; text-align: center; border: 2px dashed var(--brown); }
	.err { margin-bottom: 1rem; padding: 0.6rem 0.8rem; border: 2px solid #8a1c1c; background: #fdecec; color: #5c0f0f; border-radius: var(--radius); }
</style>