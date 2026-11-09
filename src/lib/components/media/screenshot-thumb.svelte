<script lang="ts">
	import { reveal as revealAction } from '$lib/actions/reveal';
	import * as m from '$lib/paraglide/messages';
	import { Users } from '@lucide/svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import type { Screenshot } from '$lib/screenshots';

	let {
		shot,
		reveal = 0,
		onclick
	}: {
		shot: Screenshot;
		reveal?: number | false;
		onclick?: () => void;
	} = $props();
</script>

<button
	type="button"
	class="group cursor-pointer overflow-hidden rounded-md border border-border"
	{onclick}
	aria-label={shot.name}
	use:revealAction={reveal}
>
	<div class="aspect-video overflow-hidden bg-muted">
		<enhanced:img src={shot.image} alt={shot.name} class="size-full object-cover" />
		{#if shot.credit?.community}
			<div
				class="absolute right-3 bottom-3 rounded-full bg-background/80 px-3 py-1.5 text-xs text-foreground shadow-lg backdrop-blur"
			>
				<Tooltip.Root>
					<Tooltip.Trigger>
						<Users class="-mt-0.5 mr-1 inline size-3" />
						{m.community()}
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p>{m.screenshots_community_tooltip()}</p>
					</Tooltip.Content>
				</Tooltip.Root>
			</div>
		{/if}
	</div>
</button>
