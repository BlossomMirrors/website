import type { Handle, HandleServerError } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { sequence } from '@sveltejs/kit/hooks';
import { getPostHogClient } from '$lib/server/posthog';
import { FILES } from '$lib/llms/sections';
import { buildLlmsTxt } from '$lib/llms/llms-txt';

const MARKDOWN_ROUTES: Record<string, string> = {
	'/about': 'about.md',
	'/arc': 'arc.md',
	'/cloud': 'cloud.md',
	'/hub': 'hub.md',
	'/switch': 'switch.md'
};

const handleMarkdownNegotiation: Handle = ({ event, resolve }) => {
	const accept = event.request.headers.get('accept') ?? '';
	if (!accept.includes('text/markdown')) return resolve(event);

	const { pathname } = event.url;

	if (pathname === '/') {
		return new Response(buildLlmsTxt(), {
			headers: { 'Content-Type': 'text/plain; charset=utf-8' }
		});
	}

	const content = FILES.get(MARKDOWN_ROUTES[pathname]);
	if (content) {
		return new Response(content, {
			headers: { 'Content-Type': 'text/markdown; charset=utf-8' }
		});
	}

	return resolve(event);
};

const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
		});
	});

const handlePostHogProxy: Handle = async ({ event, resolve }) => {
	const { pathname } = event.url;

	if (pathname.startsWith('/ingest')) {
		const useAssetHost =
			pathname.startsWith('/ingest/static/') || pathname.startsWith('/ingest/array/');
		const hostname = useAssetHost ? 'eu-assets.i.posthog.com' : 'eu.i.posthog.com';

		const url = new URL(event.request.url);
		url.protocol = 'https:';
		url.hostname = hostname;
		url.port = '443';
		url.pathname = pathname.replace(/^\/ingest/, '');

		const headers = new Headers(event.request.headers);
		headers.set('host', hostname);
		headers.set('accept-encoding', '');

		const clientIp = event.request.headers.get('x-forwarded-for') || event.getClientAddress();
		if (clientIp) {
			headers.set('x-forwarded-for', clientIp);
		}

		const response = await fetch(url.toString(), {
			method: event.request.method,
			headers,
			body: event.request.body,
			// @ts-expect-error - duplex is required for streaming request bodies
			duplex: 'half'
		});

		return response;
	}

	return resolve(event);
};

export const handle: Handle = sequence(
	handleMarkdownNegotiation,
	handlePostHogProxy,
	handleParaglide
);

export const handleError: HandleServerError = async ({ error, status, message }) => {
	const posthog = getPostHogClient();

	posthog.capture({
		distinctId: 'server',
		event: 'server_error',
		properties: {
			error: error instanceof Error ? error.message : String(error),
			status,
			message
		}
	});

	await posthog.flush();

	return {
		message,
		status
	};
};
