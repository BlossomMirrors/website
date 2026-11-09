<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let { class: className, children }: { class?: string; children: Snippet } = $props();
</script>

<p class={cn('mb-3 text-xs font-semibold tracking-widest text-primary uppercase', className)}>
	{@render children()}
</p>
