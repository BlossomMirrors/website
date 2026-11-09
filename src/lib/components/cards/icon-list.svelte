<script lang="ts" module>
	import type { IconComponent } from '$lib/components/elements/icon-tile.svelte';

	export type IconListEntry = { icon: IconComponent; title: string; body: string };
</script>

<script lang="ts">
	import Grid from '$lib/components/page/grid.svelte';
	import IconListItem from './icon-list-item.svelte';

	let {
		items,
		variant = 'plain',
		cols = 1,
		reveal = true,
		delay = 0,
		stagger = 70,
		class: className
	}: {
		items: IconListEntry[];
		variant?: 'plain' | 'card';
		cols?: 1 | 2;
		reveal?: boolean;
		delay?: number;
		stagger?: number;
		class?: string;
	} = $props();
</script>

<Grid {cols} class={className}>
	{#each items as item, i (item.title)}
		<IconListItem {...item} {variant} reveal={reveal ? delay + i * stagger : false} />
	{/each}
</Grid>
