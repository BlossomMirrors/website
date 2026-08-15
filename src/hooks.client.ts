import posthog from 'posthog-js';
import { env } from '$env/dynamic/public';
import type { HandleClientError } from '@sveltejs/kit';

export async function init() {
	posthog.init(env.PUBLIC_POSTHOG_PROJECT_TOKEN ?? '', {
		api_host: '/ingest',
		ui_host: 'https://eu.posthog.com',
		defaults: '2026-01-30',
		capture_exceptions: true
	});
}

export const handleError: HandleClientError = async ({ error, status, message }) => {
	// The rendered +error.svelte page only ever shows the generic `message`
	// (SvelteKit redacts unexpected errors by default) - log the real error to
	// the browser console so it's actually diagnosable from a bug report.
	console.error('[handleError]', status, message, error);
	posthog.captureException(error);

	return {
		message,
		status
	};
};
