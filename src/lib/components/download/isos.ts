import * as m from '$lib/paraglide/messages';

export const ISO_CDN = 'https://cdn.blossomos.org/iso';
export const SWITCH_CDN = 'https://cdn.blossomos.org/switch';
export const INSTALL_GUIDE_URL = 'https://help.blossomos.org/help/user/install-guide';

// The ISO metadata endpoint only returns a date-based version (e.g. "2026.08.05"), not a
// human-readable codename, so this is hardcoded until the CDN JSON exposes one. Update this
// when the next codenamed release ships.
export const CODENAME = '0.3.3 Alpha';
export const CHANGELOG_URL = 'https://help.blossomos.org/help/changelog/alpha-3';

export type IsoData = { name: string; sha256: string };

export type IsoVariant = {
	/** Stable id for analytics and logic, never shown */
	label: string;
	name: () => string;
	file: string;
	badge: () => string;
	description: () => string;
	matches?: 'nvidia' | 'other';
};

export const ONLINE_ISO: IsoVariant = {
	label: 'Online',
	name: () => m.iso_variant_online(),
	file: 'isodata-netinstall.json',
	badge: () => m.iso_all_gpus(),
	description: () => m.iso_online_desc()
};

export const OFFLINE_ISOS: IsoVariant[] = [
	{
		label: 'Standard',
		name: () => m.iso_variant_standard(),
		file: 'isodata.json',
		badge: () => 'AMD / Intel',
		description: () => m.iso_standard_desc(),
		matches: 'other'
	},
	{
		label: 'NVIDIA Open',
		name: () => 'NVIDIA Open',
		file: 'isodata-nvidia-open.json',
		badge: () => 'NVIDIA',
		description: () => m.iso_nvidia_desc(),
		matches: 'nvidia'
	},
	{
		label: 'NVIDIA Legacy',
		name: () => 'NVIDIA Legacy',
		file: 'isodata-nvidia-legacy.json',
		badge: () => 'NVIDIA',
		description: () => m.iso_nvidia_legacy_desc()
	}
];

export function fetchIso(file: string): Promise<IsoData | null> {
	return fetch(`${ISO_CDN}/${file}?${Date.now()}`)
		.then((r) => (r.ok ? (r.json() as Promise<IsoData>) : null))
		.catch(() => null);
}

export function isoUrl(data: IsoData): string {
	return `${ISO_CDN}/${data.name}`;
}

export function detectGPU(): 'nvidia' | 'other' {
	try {
		const canvas = document.createElement('canvas');
		const gl =
			(canvas.getContext('webgl') as WebGLRenderingContext | null) ||
			(canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);
		if (!gl) return 'other';
		const ext = gl.getExtension('WEBGL_debug_renderer_info');
		if (!ext) return 'other';
		const renderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) as string;
		return renderer.toLowerCase().includes('nvidia') ? 'nvidia' : 'other';
	} catch {
		return 'other';
	}
}

export type DesktopOS = 'windows' | 'mac' | 'other';

/** Guesses the visitor's desktop OS from a user-agent string. Phones and tablets count as
 * "other", since iOS user agents also contain "Mac OS X". */
export function detectOS(userAgent: string): DesktopOS {
	const ua = userAgent.toLowerCase();
	if (/iphone|ipad|ipod|android/.test(ua)) return 'other';
	if (ua.includes('windows')) return 'windows';
	if (ua.includes('macintosh') || ua.includes('mac os x')) return 'mac';
	return 'other';
}

/** Plays the NVIDIA easter egg sound when an NVIDIA ISO is downloaded with Shift held. */
export function maybePlayNovideo(e: MouseEvent, label: string) {
	if (!label.startsWith('NVIDIA') || !e.shiftKey) return;
	const novideo = document.getElementById('novideo') as HTMLAudioElement | null;
	if (!novideo) return;
	novideo.currentTime = 0;
	novideo.play();
}
