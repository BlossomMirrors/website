<script lang="ts">
	import { reveal as revealAction } from '$lib/actions/reveal';
	import { cn } from '$lib/utils';
	import type { IconComponent } from './icon-tile.svelte';

	let {
		icon: Icon,
		text,
		bordered = true,
		reveal = 0,
		class: className
	}: {
		icon?: IconComponent;
		text: string;
		bordered?: boolean;
		reveal?: number | false;
		class?: string;
	} = $props();
</script>

{#if bordered}
	<div
		class={cn(
			'flex flex-col items-center gap-3 rounded-md border border-dashed border-border py-24 text-center',
			className
		)}
		use:revealAction={reveal}
	>
		{#if Icon}
			<Icon size={28} class="text-muted-foreground" strokeWidth={1.5} />
		{/if}
		<p class="text-muted-foreground">{text}</p>
	</div>
{:else}
	<p class={cn('text-muted-foreground', className)} use:revealAction={reveal}>{text}</p>
{/if}
