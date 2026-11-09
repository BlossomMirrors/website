<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';
	import Card from './card.svelte';
	import Badge from '$lib/components/elements/badge.svelte';

	let {
		title,
		subtitle,
		tags = [],
		tileClass,
		class: className,
		children
	}: {
		title: string;
		subtitle?: string;
		tags?: string[];
		tileClass?: string;
		class?: string;
		children: Snippet;
	} = $props();
</script>

<Card class={cn('flex items-center justify-center p-12', className)}>
	<div class="text-center">
		<div
			class={cn(
				'mx-auto mb-6 flex size-20 items-center justify-center rounded-2xl bg-primary/10 p-4',
				tileClass
			)}
		>
			{@render children()}
		</div>
		<p class="font-semibold">{title}</p>
		{#if subtitle}
			<p class="mt-2 text-sm text-muted-foreground">{subtitle}</p>
		{/if}
		{#if tags.length}
			<div class="mt-4 flex flex-wrap justify-center gap-2">
				{#each tags as tag (tag)}
					<Badge tone="soft" class="px-3 py-1">{tag}</Badge>
				{/each}
			</div>
		{/if}
	</div>
</Card>
