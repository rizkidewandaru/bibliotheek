import type { Book } from '$lib/types';

export type SearchScope = 'semua' | 'judul' | 'penulis';

export const searchScopes: { value: SearchScope; label: string }[] = [
	{ value: 'semua', label: 'Judul dan penulis' },
	{ value: 'judul', label: 'Judul saja' },
	{ value: 'penulis', label: 'Penulis saja' }
];

export function normalize(text: string): string {
	return text
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.trim()
		.replace(/\s+/g, ' ');
}

export function parseScope(value: string | null): SearchScope {
	return searchScopes.some((s) => s.value === value) ? (value as SearchScope) : 'semua';
}

export function filterBooks(books: Book[], query: string, scope: SearchScope): Book[] {
	const q = normalize(query);
	if (!q) return books;
	const terms = q.split(' ');

	return books.filter((book) => {
		const haystack =
			scope === 'judul'
				? normalize(book.title)
				: scope === 'penulis'
					? normalize(book.author)
					: normalize(`${book.title} ${book.author}`);
		return terms.every((term) => haystack.includes(term));
	});
}