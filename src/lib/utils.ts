import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getDiscord() {
	return 'https://discord.gg/dTqsBdxvNr';
}

export function getEmail() {
	return 'hello@blossomos.org';
}

export function getTitle(page?: string): string {
	let title = 'Blossom';

	if (page) {
		if (page === 'BlossomOS') {
			title = page;
		} else {
			title = page + ' – Blossom';
		}
	} else {
		title = 'Blossom';
	}
	return title;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, 'child'> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, 'children'> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };
