<script lang="ts">
	import Grid, { type GridCols, type GridGap } from '$lib/components/page/grid.svelte';
	import FeatureCard, { type Feature, type FeatureCardSize } from './feature-card.svelte';

	let {
		items,
		cols = 2,
		gap = 'md',
		size = 'md',
		stagger = 70,
		class: className
	}: {
		items: Feature[];
		cols?: GridCols;
		gap?: GridGap;
		size?: FeatureCardSize;
		stagger?: number;
		class?: string;
	} = $props();
</script>

<Grid {cols} {gap} class={className}>
	{#each items as item, i (item.title)}
		<FeatureCard {...item} {size} reveal={i * stagger} />
	{/each}
</Grid>
