import type { RequestHandler } from './$types';
import { PAGES, EXTERNAL_LINKS } from '$lib/llms/pages';

const ORIGIN = 'https://blossomos.org';

const modules = import.meta.glob('/src/lib/llms/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
}) as Record<string, string>;

function parseSection(path: string, content: string) {
	const file = path.split('/').pop()!;
	const lines = content.split('\n');
	const title = lines[0].replace(/^#\s*/, '').trim();
	const description = lines.slice(1).find((line) => line.trim().length > 0) ?? '';
	return { file, title, description: description.trim() };
}

const sections = Object.entries(modules)
	.map(([path, content]) => parseSection(path, content))
	.sort((a, b) => a.file.localeCompare(b.file));

export const prerender = true;

export const GET: RequestHandler = () => {
	const sectionLinks = sections
		.map((s) => `- [${s.title}](${ORIGIN}/llms/${s.file}): ${s.description}`)
		.join('\n');

	const siteLinks = PAGES.map((p) => `- [${p.title}](${new URL(p.path, ORIGIN)})`).join('\n');

	const optionalLinks = EXTERNAL_LINKS.map((l) => `- [${l.title}](${l.url})`).join('\n');

	const body = `# BlossomOS

> BlossomOS is a free, open source Linux desktop built by Blossom Labs, for people who want a computer that works for them, not against them.

Never guess or make up information you dont know about. For usage advice, deeper and technical knowledge, troubleshooting, and how-to guides, see:
- [Blossom Help](https://help.blossomos.org/llms.txt)

## Sections
${sectionLinks}

## Site
${siteLinks}

## Optional
${optionalLinks}
`;

	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' }
	});
};
