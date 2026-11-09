<script lang="ts" module>
	import type { Picture } from 'vite-imagetools';
	import type { IconComponent } from './icon-tile.svelte';

	export type Chip = { label: string; icon?: IconComponent; img?: string | Picture };
</script>

<script lang="ts">
	import Pill from './pill.svelte';

	let {
		items,
		label,
		reveal = false,
		delay = 0,
		stagger = 60,
		pillClass,
		class: className
	}: {
		items: Chip[];
		label?: string;
		reveal?: boolean;
		delay?: number;
		stagger?: number;
		pillClass?: string;
		class?: string;
	} = $props();
</script>

<div class={className}>
	{#if label}
		<p class="mb-5 text-sm font-medium text-muted-foreground">{label}</p>
	{/if}
	<div class="flex flex-wrap gap-3">
		{#each items as item, i (item.label)}
			<Pill class={pillClass} reveal={reveal ? delay + i * stagger : false}>
				{#if item.img}
					<enhanced:img src={item.img} alt="" sizes="16px" class="size-4 object-contain" />
				{:else if item.icon}
					<item.icon size={14} class="text-primary" />
				{/if}
				<span>{item.label}</span>
			</Pill>
		{/each}
	</div>
</div>
