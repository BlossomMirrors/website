<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let { class: className, children }: { class?: string; children: Snippet } = $props();
</script>

<div
	class={cn(
		'pointer-events-none fill-foreground text-foreground opacity-5 dark:opacity-[0.04]',
		className
	)}
	aria-hidden="true"
>
	{@render children()}
</div>
