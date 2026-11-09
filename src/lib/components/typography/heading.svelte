<script lang="ts" module>
	export type HeadingSize = 'display' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
	export type HeadingText = string | string[];
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		level = 2,
		size = 'lg',
		text,
		class: className,
		children
	}: {
		level?: 1 | 2 | 3;
		size?: HeadingSize;
		text?: HeadingText;
		class?: string;
		children?: Snippet;
	} = $props();

	const sizes: Record<HeadingSize, string> = {
		display: 'text-5xl leading-none sm:text-7xl md:text-8xl',
		xl: 'text-5xl leading-tight md:text-7xl',
		lg: 'text-5xl leading-tight md:text-6xl',
		md: 'text-4xl leading-tight md:text-5xl',
		sm: 'text-3xl leading-tight md:text-4xl',
		xs: 'text-2xl leading-snug md:text-3xl'
	};

	const lines = $derived(text === undefined ? [] : Array.isArray(text) ? text : [text]);
</script>

<svelte:element this={`h${level}`} class={cn('font-serif', sizes[size], className)}>
	{#if children}
		{@render children()}
	{:else}
		{#each lines as line, i (i)}{#if i > 0}<br />{/if}{line}{/each}
	{/if}
</svelte:element>
