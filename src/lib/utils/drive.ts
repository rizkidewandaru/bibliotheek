export const drivePreviewUrl = (id: string) => `https://drive.google.com/file/d/${id}/preview`;
export const driveViewUrl = (id: string) => `https://drive.google.com/file/d/${id}/view`;

/** Menerima link Drive atau ID mentah, mengembalikan ID berkas (atau null jika tidak valid). */
export function driveIdFromUrl(input: string): string | null {
	const value = input.trim();
	return (
		value.match(/\/d\/([\w-]+)/)?.[1] ??
		value.match(/[?&]id=([\w-]+)/)?.[1] ??
		(/^[\w-]{20,}$/.test(value) ? value : null)
	);
}