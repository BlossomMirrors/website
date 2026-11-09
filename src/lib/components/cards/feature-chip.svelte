<script lang="ts">
	import { reveal as revealAction } from '$lib/actions/reveal';
	import * as m from '$lib/paraglide/messages';
	import IconTile, { type IconComponent } from '$lib/components/elements/icon-tile.svelte';

	let {
		icon,
		img,
		label,
		done = true,
		reveal = 0,
		tone = 'primary'
	}: {
		icon?: IconComponent;
		img?: string;
		label: string;
		done?: boolean;
		reveal?: number | false;
		tone?: 'primary' | 'amber';
	} = $props();
</script>

<div
	class="flex items-center gap-3 rounded-xl border border-border bg-card/80 px-4 py-4"
	use:revealAction={reveal}
>
	{#if img}
		<IconTile size="xs" tone={done ? tone : 'muted'}>
			<enhanced:img src={img} alt="" sizes="20px" class="size-5 object-contain" />
		</IconTile>
	{:else}
		<IconTile {icon} size="xs" tone={done ? tone : 'muted'} />
	{/if}
	<div>
		<p class="text-sm font-medium">{label}</p>
		{#if !done}
			<p class="text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
				{m.coming_soon()}
			</p>
		{/if}
	</div>
</div>
