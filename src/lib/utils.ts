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

export type WithoutChild<T> = 'child' extends keyof T ? Omit<T, 'child'> : T;
export type WithoutChildren<T> = 'children' extends keyof T ? Omit<T, 'children'> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };
