import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Raw markdown sections consumed by llms.txt, auto-discovered from
// src/lib/llms/*.md and served here as their own fetchable .md files.
const modules = import.meta.glob('/src/lib/llms/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
}) as Record<string, string>;

const files = new Map(
	Object.entries(modules).map(([path, content]) => [path.split('/').pop()!, content])
);

export const prerender = true;

export function entries() {
	return [...files.keys()].map((file) => ({ file }));
}

export const GET: RequestHandler = ({ params }) => {
	const content = files.get(params.file);
	if (!content) error(404);

	return new Response(content, {
		headers: { 'Content-Type': 'text/markdown; charset=utf-8' }
	});
};
