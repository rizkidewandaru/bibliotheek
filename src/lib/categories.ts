import type { Category, CategorySlug } from './types';

export const categories: Category[] = [
	{
		slug: 'katalog-koleksi',
		title: 'Katalog Koleksi',
		short: 'KOLEKSI',
		description:
			'Publikasi yang mendokumentasikan benda koleksi museum beserta identitas, bahan, dan konteks budayanya.',
		icon: 'collection'
	},
	{
		slug: 'katalog-pameran',
		title: 'Katalog Pameran',
		short: 'PAMERAN',
		description:
			'Katalog pendamping pameran tetap maupun temporer, memuat narasi kurasi dan karya yang dipamerkan.',
		icon: 'exhibition'
	},
	{
		slug: 'kajian-penelitian',
		title: 'Kajian dan Penelitian Koleksi',
		short: 'KAJIAN',
		description:
			'Hasil kajian, penelitian, dan konservasi atas koleksi sebagai rujukan peneliti, pendidik, dan masyarakat.',
		icon: 'research'
	}
];

export function getCategory(slug: CategorySlug): Category {
	return categories.find((c) => c.slug === slug) ?? categories[0];
}

export function categoryHref(slug: CategorySlug): string {
	return `/katalog?kategori=${slug}`;
}