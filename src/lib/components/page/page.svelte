<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let { class: className, children }: { class?: string; children: Snippet } = $props();
</script>

<div class={cn('py-16 md:py-24', className)}>
	{@render children()}
</div>
