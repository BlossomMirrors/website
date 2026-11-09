<script lang="ts" module>
	import type { IconComponent } from '$lib/components/elements/icon-tile.svelte';

	export type FeatureChipItem = {
		icon?: IconComponent;
		img?: string;
		label: string;
		done?: boolean;
	};
</script>

<script lang="ts">
	import Grid from '$lib/components/page/grid.svelte';
	import FeatureChip from './feature-chip.svelte';

	let {
		items,
		tone = 'primary',
		stagger = 60,
		class: className
	}: {
		items: FeatureChipItem[];
		tone?: 'primary' | 'amber';
		stagger?: number;
		class?: string;
	} = $props();
</script>

<Grid gap="sm" class={className}>
	{#each items as item, i (item.label)}
		<FeatureChip {...item} {tone} reveal={i * stagger} />
	{/each}
</Grid>
