<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils.js';

	let {
		label,
		muted = false,
		onclick,
		disabled = false,
		class: className,
		children
	}: {
		label?: string;
		muted?: boolean;
		onclick?: () => void;
		disabled?: boolean;
		class?: string;
		children: Snippet;
	} = $props();
</script>

<div
	class={cn(
		'cursor-custom flex cursor-default items-center',
		'h-8 rounded-md',
		label ? 'gap-2 px-2.5 text-xs' : 'justify-center',
		!label && 'w-8',
		muted ? 'text-muted-foreground' : 'text-foreground',
		'hover:bg-foreground/10',
		className
	)}
>
	{@render children()}
	{#if label}
		{label}
	{/if}
</div>
