import type { RequestHandler } from './$types';
import { PAGES } from '$lib/llms/pages';

const ORIGIN = 'https://blossomos.org';

// Locale is resolved via cookie, not the URL (see src/hooks.ts /
// src/hooks.server.ts), so there is exactly one URL per page. PAGES is the
// same list llms.txt links out to, so the two never drift apart.

export const prerender = true;

export const GET: RequestHandler = () => {
	const urls = PAGES.map(
		(p) => `\t<url>\n\t\t<loc>${new URL(p.path, ORIGIN)}</loc>\n\t</url>`
	).join('\n');

	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

	return new Response(body, {
		headers: { 'Content-Type': 'application/xml' }
	});
};
