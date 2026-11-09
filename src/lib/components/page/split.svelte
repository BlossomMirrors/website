<script lang="ts">
	import { reveal as revealAction } from '$lib/actions/reveal';
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		reverse = false,
		reveal = true,
		class: className,
		children,
		aside
	}: {
		reverse?: boolean;
		reveal?: boolean;
		class?: string;
		children: Snippet;
		aside: Snippet;
	} = $props();
</script>

<div class={cn('grid items-center gap-12 md:grid-cols-2 md:gap-20', className)}>
	<div class={cn(reverse && 'md:order-2')} use:revealAction={reveal ? 0 : false}>
		{@render children()}
	</div>
	<div class={cn(reverse && 'md:order-1')} use:revealAction={reveal ? 120 : false}>
		{@render aside()}
	</div>
</div>
