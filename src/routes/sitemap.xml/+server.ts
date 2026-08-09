import type { RequestHandler } from './$types';
import { PAGES } from '$lib/llms/pages';
import { SECTIONS } from '$lib/llms/sections';

const ORIGIN = 'https://blossomos.org';

export const prerender = true;

export const GET: RequestHandler = () => {
	const paths = [
		...PAGES.map((p) => p.path),
		'/llms.txt',
		...SECTIONS.map((s) => `/llms/${s.file}`)
	];

	const urls = paths
		.map((path) => `\t<url>\n\t\t<loc>${new URL(path, ORIGIN)}</loc>\n\t</url>`)
		.join('\n');

	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

	return new Response(body, {
		headers: { 'Content-Type': 'application/xml' }
	});
};
