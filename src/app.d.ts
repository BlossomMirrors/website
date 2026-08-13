declare module '*.md' {
	import type { SvelteComponent } from 'svelte';

	export default class Comp extends SvelteComponent {}

	export const metadata: Record<string, unknown>;
}

declare module '*.svx' {
	import type { SvelteComponent } from 'svelte';

	export default class Comp extends SvelteComponent {}

	export const metadata: Record<string, unknown>;
}

declare module '*?enhanced&imgWidth=1280' {
	import type { Picture } from 'vite-imagetools';

	const value: Picture;
	export default value;
}

declare module '*?enhanced&imgWidth=1600' {
	import type { Picture } from 'vite-imagetools';

	const value: Picture;
	export default value;
}

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}
