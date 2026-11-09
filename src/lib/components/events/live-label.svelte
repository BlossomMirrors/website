<script lang="ts">
	import { reveal as revealAction } from '$lib/actions/reveal';
	import * as m from '$lib/paraglide/messages';
	import { cn } from '$lib/utils';
	import Badge from '$lib/components/elements/badge.svelte';
	import LiveDot from '$lib/components/elements/live-dot.svelte';

	let { reveal = 0, class: className }: { reveal?: number | false; class?: string } = $props();
</script>

<div class={cn('flex items-center gap-3', className)} use:revealAction={reveal}>
	<Badge tone="destructive" class="gap-2 px-3 py-1 font-semibold">
		<LiveDot tone="destructive" />
		{m.events_live_badge()}
	</Badge>
	<p class="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
		{m.events_live_subheader()}
	</p>
</div>
