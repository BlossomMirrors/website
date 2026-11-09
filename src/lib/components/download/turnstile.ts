declare global {
	interface Window {
		turnstile?: {
			render: (
				container: HTMLElement,
				options: {
					sitekey: string;
					action?: string;
					callback?: (token: string) => void;
					'error-callback'?: () => void;
				}
			) => string;
			remove: (widgetId: string) => void;
		};
	}
}

let turnstileLoad: Promise<void> | null = null;

export function loadTurnstile(): Promise<void> {
	if (typeof window !== 'undefined' && window.turnstile) return Promise.resolve();
	if (turnstileLoad) return turnstileLoad;
	turnstileLoad = new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
		script.async = true;
		script.defer = true;
		script.onload = () => resolve();
		script.onerror = () => reject(new Error('turnstile_load_failed'));
		document.head.appendChild(script);
	});
	return turnstileLoad;
}
