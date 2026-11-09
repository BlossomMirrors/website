<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		comment,
		command,
		result,
		class: className
	}: { comment?: string; command: string; result?: string; class?: string } = $props();
</script>

<div class={cn('rounded-xl bg-muted/50 p-4 font-mono text-sm', className)}>
	{#if comment}
		<p class="text-muted-foreground">{comment}</p>
	{/if}
	<p class="mt-1 line-through opacity-50">{command}</p>
	{#if result}
		<p class="mt-3 text-primary">&#10003; {result}</p>
	{/if}
</div>
