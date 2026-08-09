import type { RequestHandler } from './$types';
import { buildLlmsTxt } from '$lib/llms/llms-txt';

export const GET: RequestHandler = () => {
	return new Response(buildLlmsTxt(), {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' }
	});
};
