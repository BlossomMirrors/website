import type { Picture } from '@sveltejs/enhanced-img';
import { credits, type Credit } from './assets/screenshots/credits';

const modules = import.meta.glob(
	'/src/lib/assets/screenshots/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}',
	{
		eager: true,
		query: { enhanced: true }
	}
) as Record<string, { default: Picture }>;

export type Screenshot = {
	name: string;
	image: Picture;
	credit?: Credit;
};

function stemFromPath(path: string): string {
	return path.split('/').pop()!.replace(/\.[^.]+$/, '');
}

export const screenshots: Screenshot[] = Object.entries(modules)
	.map(([path, mod]) => {
		const stem = stemFromPath(path);
		return {
			name: stem.replace(/[-_]+/g, ' '),
			image: mod.default,
			credit: credits[stem]
		};
	})
	.sort((a, b) => a.name.localeCompare(b.name));
