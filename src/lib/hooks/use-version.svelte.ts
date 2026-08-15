import { browser } from '$app/environment';

const CDN = 'https://cdn.blossomos.org/iso';

function extractVersion(name: string): string {
	return name.match(/BlossomOS(?:-nvidia-open)?-(.+?)-x86_64/)?.[1] ?? '';
}

let version = $state('');
let loading: Promise<void> | null = null;

function load(): Promise<void> {
	if (!browser || version) return Promise.resolve();
	if (loading) return loading;
	loading = fetch(`${CDN}/isodata.json?${Date.now()}`)
		.then((r) => r.json())
		.then((data: { name: string }) => {
			version = extractVersion(data.name);
		})
		.catch(() => {});
	return loading;
}

/** Use this hook to read the current BlossomOS release version (e.g. `2026.08.05`), fetched
 * once from the ISO metadata CDN and shared across every component that uses it.
 *
 * ## Usage
 * ```svelte
 * <script lang="ts">
 * 		import { useVersion } from '$lib/hooks/use-version.svelte';
 *
 * 		const version = useVersion();
 * </script>
 *
 * <p>Version {version.current}</p>
 * ```
 */
export function useVersion() {
	load();
	return {
		get current() {
			return version;
		}
	};
}
