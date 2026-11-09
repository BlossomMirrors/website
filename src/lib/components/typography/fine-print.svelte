<script lang="ts">
	import { cn } from '$lib/utils';

	let { items, class: className }: { items: string[]; class?: string } = $props();
</script>

<div class={cn('grid gap-x-4 gap-y-2 sm:grid-cols-2', className)}>
	{#each items as item (item)}
		<p class="text-left font-mono text-[10px] text-muted-foreground/30">{item}</p>
	{/each}
</div>
