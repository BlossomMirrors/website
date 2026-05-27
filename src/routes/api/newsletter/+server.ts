import { env } from '$env/dynamic/private';
import { Resend } from 'resend';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createHmac } from 'crypto';

function makeToken(data: object, secret: string): string {
	const payload = Buffer.from(JSON.stringify(data)).toString('base64url');
	const sig = createHmac('sha256', secret).update(payload).digest('base64url');
	return `${payload}.${sig}`;
}

function confirmationEmail(confirmUrl: string): string {
	return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0a0a0a;color:#e5e5e5;margin:0;padding:40px 20px;">
  <div style="max-width:480px;margin:0 auto;">
    <p style="font-size:18px;font-weight:600;letter-spacing:-0.3px;margin:0 0 32px;">BlossomOS</p>
    <h1 style="font-size:28px;font-weight:700;margin:0 0 16px;line-height:1.2;">Confirm your subscription.</h1>
    <p style="color:#a3a3a3;line-height:1.6;margin:0 0 32px;">You asked to receive updates from BlossomOS. Click the button below to confirm your email address. This link expires in 48 hours.</p>
    <a href="${confirmUrl}" style="display:inline-block;background:#7c3aed;color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-weight:600;font-size:14px;">Confirm subscription</a>
    <p style="margin:32px 0 0;color:#737373;font-size:12px;line-height:1.5;">If you didn't sign up for this, you can safely ignore this email.</p>
    <hr style="border:none;border-top:1px solid #262626;margin:32px 0;">
    <p style="color:#525252;font-size:11px;margin:0;">BlossomOS &middot; <a href="https://blossomos.org" style="color:#525252;">blossomos.org</a></p>
  </div>
</body>
</html>`;
}

export const POST: RequestHandler = async ({ request, url }) => {
	const { email } = await request.json();

	if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		return json({ error: 'invalid_email' }, { status: 400 });
	}

	if (!env.RESEND_API_KEY || !env.NEWSLETTER_SECRET) {
		return json({ error: 'not_configured' }, { status: 503 });
	}

	const resend = new Resend(env.RESEND_API_KEY);

	const { data: audiences, error: audienceError } = await resend.audiences.list();
	const audienceId = audiences?.data?.[0]?.id;
	if (audienceError || !audienceId) {
		return json({ error: 'no_audience' }, { status: 500 });
	}

	const { data, error } = await resend.contacts.create({
		email,
		audienceId,
		unsubscribed: true
	});

	if (error || !data) {
		return json({ error: 'resend_error' }, { status: 500 });
	}

	const exp = Date.now() + 48 * 60 * 60 * 1000;
	const token = makeToken({ contactId: data.id, audienceId, exp }, env.NEWSLETTER_SECRET);
	const confirmUrl = `${url.origin}/api/newsletter/confirm?token=${token}`;

	const { error: sendError } = await resend.emails.send({
		from: env.NEWSLETTER_FROM ?? 'BlossomOS <noreply@blossomos.org>',
		to: email,
		subject: 'Confirm your BlossomOS newsletter subscription',
		html: confirmationEmail(confirmUrl)
	});

	if (sendError) {
		await resend.contacts.remove({ id: data.id, audienceId });
		return json({ error: 'send_error' }, { status: 500 });
	}

	return json({ ok: true });
};
