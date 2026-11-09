<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let { class: className, children }: { class?: string; children: Snippet } = $props();
</script>

<div class={cn('typeset mx-auto max-w-2xl', className)}>
	{@render children()}
</div>
