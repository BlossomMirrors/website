<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Pathname } from '$app/types';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	/** Renders an `<a>` whose `href` may be either an internal route (e.g. `/downloads`) or an
	 * external URL (e.g. `https://discord.gg/...`), decided at runtime from the value itself.
	 *
	 * Internal hrefs are routed through SvelteKit's `resolve()`. External hrefs open in a new
	 * tab with `rel="external noreferrer"`. This exists so data-driven links (nav items, CTA
	 * props, etc.) can satisfy `svelte/no-navigation-without-resolve` without a lint-disable,
	 * since the rule can't statically prove which branch a dynamic string takes. */
	let { href, children, ...restProps }: HTMLAnchorAttributes & { href: string; children: Snippet } =
		$props();

	const isExternal = $derived(!href.startsWith('/'));
</script>

{#if isExternal}
	<a {href} target="_blank" rel="external noreferrer" {...restProps}>
		{@render children()}
	</a>
{:else}
	<a href={resolve(href as Pathname)} {...restProps}>
		{@render children()}
	</a>
{/if}
