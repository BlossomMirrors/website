<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils.js';

	let {
		label,
		muted = false,
		size = 'md',
		onclick,
		disabled = false,
		class: className,
		children
	}: {
		label?: string;
		muted?: boolean;
		size?: 'sm' | 'md';
		onclick?: () => void;
		disabled?: boolean;
		class?: string;
		children: Snippet;
	} = $props();
</script>

<button
	class={cn(
		'cursor-custom flex cursor-default items-center',
		size === 'sm' ? 'h-7 rounded' : 'h-8 rounded-md',
		label ? 'gap-2 px-2.5 text-xs' : 'justify-center',
		!label && (size === 'sm' ? 'w-7' : 'w-8'),
		muted ? 'text-muted-foreground' : 'text-foreground',
		size === 'sm' ? 'hover:bg-foreground/10' : 'hover:bg-foreground/8',
		className
	)}
	{onclick}
	{disabled}
>
	{@render children()}
	{#if label}
		{label}
	{/if}
</button>
