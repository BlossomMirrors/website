import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { FILES } from '$lib/llms/sections';

export const GET: RequestHandler = () => {
	const content = FILES.get('arc.md');
	if (!content) error(404);

	return new Response(content, {
		headers: { 'Content-Type': 'text/markdown; charset=utf-8' }
	});
};
