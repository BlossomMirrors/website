import {
	SUPPORTED_LOCALES,
	DEFAULT_LOCALE,
	STORAGE_KEY,
	type Locale
} from './constants';
import { setLocale } from '$lib/paraglide/runtime';

function isLocale(value: string): value is Locale {
	return SUPPORTED_LOCALES.includes(value as Locale);
}

export function getStoredLocale(): Locale | null {
	if (typeof localStorage === 'undefined') return null;
	const value = localStorage.getItem(STORAGE_KEY);
	return value && isLocale(value) ? value : null;
}

export function detectBrowserLocale(): Locale | null {
	if (typeof navigator === 'undefined') return null;

	const lang = navigator.language.toLowerCase(); // "de-DE"

	return (
		SUPPORTED_LOCALES.find(
			(l) => lang === l || lang.startsWith(l + '-')
		) ?? null
	);
}

export function initLocale() {
	const stored = getStoredLocale();
	if (stored) {
		setLocale(stored);
		return;
	}

	const detected = detectBrowserLocale();
	if (detected) {
		setLocale(detected);
		localStorage.setItem(STORAGE_KEY, detected);
		return;
	}

	setLocale(DEFAULT_LOCALE);
	localStorage.setItem(STORAGE_KEY, DEFAULT_LOCALE);
}

export function setUserLocale(locale: Locale) {
	setLocale(locale);
	localStorage.setItem(STORAGE_KEY, locale);
}
