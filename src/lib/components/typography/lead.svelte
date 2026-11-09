<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let { class: className, children }: { class?: string; children: Snippet } = $props();
</script>

<p class={cn('text-lg leading-relaxed text-muted-foreground', className)}>
	{@render children()}
</p>
