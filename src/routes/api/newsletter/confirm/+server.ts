import { env } from '$env/dynamic/private';
import { Resend } from 'resend';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createHmac, timingSafeEqual } from 'crypto';

function verifyToken(
	token: string,
	secret: string
): { contactId: string; audienceId: string; exp: number } | null {
	const dot = token.lastIndexOf('.');
	if (dot === -1) return null;

	const payload = token.slice(0, dot);
	const sig = token.slice(dot + 1);
	const expected = createHmac('sha256', secret).update(payload).digest('base64url');

	const a = Buffer.from(sig);
	const b = Buffer.from(expected);
	if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

	try {
		return JSON.parse(Buffer.from(payload, 'base64url').toString());
	} catch {
		return null;
	}
}

export const GET: RequestHandler = async ({ url }) => {
	const token = url.searchParams.get('token');

	if (!token || !env.RESEND_API_KEY || !env.NEWSLETTER_SECRET) {
		redirect(302, '/?newsletter=error');
	}

	const data = verifyToken(token, env.NEWSLETTER_SECRET!);
	if (!data) redirect(302, '/?newsletter=error');

	if (Date.now() > data!.exp) redirect(302, '/?newsletter=expired');

	const resend = new Resend(env.RESEND_API_KEY);
	const { error } = await resend.contacts.update({
		id: data!.contactId,
		audienceId: data!.audienceId,
		unsubscribed: false
	});

	if (error) redirect(302, '/?newsletter=error');

	redirect(302, '/?newsletter=confirmed');
};
