import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const CDN = 'https://cdn.blossomos.org/iso';
const ISO_NAME_PATTERN = /^BlossomOS(?:-nvidia-open)?-\d{4}\.\d{2}\.\d{2}-x86_64\.iso$/;
const EXPECTED_ACTION = 'download';

export const POST: RequestHandler = async ({ request }) => {
	const form = await request.formData();
	const token = form.get('cf-turnstile-response');
	const iso = form.get('iso');

	if (typeof token !== 'string' || token.length === 0 || token.length > 2048) {
		error(403, 'forbidden');
	}
	if (typeof iso !== 'string' || !ISO_NAME_PATTERN.test(iso)) {
		error(403, 'forbidden');
	}

	const expectedHostnames = new Set(
		(env.TURNSTILE_HOSTNAMES ?? '')
			.split(',')
			.map((hostname) => hostname.trim())
			.filter(Boolean)
	);
	if (!env.TURNSTILE_SECRET || expectedHostnames.size === 0) {
		error(503, 'not_configured');
	}

	let result;
	try {
		const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			signal: AbortSignal.timeout(10_000),
			body: new URLSearchParams({
				secret: env.TURNSTILE_SECRET,
				response: token,
				remoteip: request.headers.get('cf-connecting-ip') ?? ''
			})
		});
		if (!r.ok) throw new Error(`siteverify ${r.status}`);
		result = await r.json();
	} catch {
		error(403, 'forbidden');
	}

	if (
		!result.success ||
		result.action !== EXPECTED_ACTION ||
		!expectedHostnames.has(result.hostname)
	) {
		error(403, 'forbidden');
	}

	return new Response(null, {
		status: 303,
		headers: { Location: `${CDN}/${iso}` }
	});
};
