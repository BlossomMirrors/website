<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		size = 'sm',
		class: className,
		children
	}: { size?: 'sm' | 'xs'; class?: string; children: Snippet } = $props();
</script>

<p class={cn(size === 'sm' ? 'text-sm' : 'text-xs', 'text-muted-foreground', className)}>
	{@render children()}
</p>
