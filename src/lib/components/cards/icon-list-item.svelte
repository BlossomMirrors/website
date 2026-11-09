<script lang="ts">
	import { reveal as revealAction } from '$lib/actions/reveal';
	import { cn } from '$lib/utils';
	import IconTile, { type IconComponent } from '$lib/components/elements/icon-tile.svelte';

	let {
		icon,
		title,
		body,
		variant = 'plain',
		reveal = false
	}: {
		icon: IconComponent;
		title: string;
		body: string;
		variant?: 'plain' | 'card';
		reveal?: number | false;
	} = $props();

	const card = $derived(variant === 'card');
</script>

<div
	class={cn('flex gap-4', card && 'items-start rounded-2xl border border-border bg-card p-5')}
	use:revealAction={reveal}
>
	<IconTile {icon} size="xs" class="mt-0.5" />
	<div>
		<p class={cn('font-semibold', card && 'text-sm')}>{title}</p>
		<p class={cn('text-sm text-muted-foreground', card ? 'mt-0.5' : 'mt-1 leading-relaxed')}>
			{body}
		</p>
	</div>
</div>
