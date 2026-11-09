<script lang="ts">
	import { reveal as revealAction } from '$lib/actions/reveal';
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		reveal = false,
		class: className,
		children
	}: { reveal?: number | false; class?: string; children: Snippet } = $props();
</script>

<div
	class={cn(
		'flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium',
		className
	)}
	use:revealAction={reveal}
>
	{@render children()}
</div>
