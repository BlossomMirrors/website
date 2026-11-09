<script lang="ts" module>
	export type GridCols = 1 | 2 | 3 | 4;
	export type GridGap = 'sm' | 'md' | 'lg';
</script>

<script lang="ts">
	import { reveal as revealAction } from '$lib/actions/reveal';
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		cols = 2,
		gap = 'md',
		reveal = false,
		class: className,
		children
	}: {
		cols?: GridCols;
		gap?: GridGap;
		reveal?: number | false;
		class?: string;
		children: Snippet;
	} = $props();

	const colClasses: Record<GridCols, string> = {
		1: '',
		2: 'sm:grid-cols-2',
		3: 'sm:grid-cols-2 md:grid-cols-3',
		4: 'sm:grid-cols-2 md:grid-cols-4'
	};

	const gapClasses: Record<GridGap, string> = {
		sm: 'gap-3',
		md: 'gap-4',
		lg: 'gap-4 md:gap-6'
	};
</script>

<div class={cn('grid', colClasses[cols], gapClasses[gap], className)} use:revealAction={reveal}>
	{@render children()}
</div>
