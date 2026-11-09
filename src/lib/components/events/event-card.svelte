<script lang="ts">
	import { reveal as revealAction } from '$lib/actions/reveal';
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
	import RadioIcon from '@lucide/svelte/icons/radio';
	import * as m from '$lib/paraglide/messages';
	import type { Event } from '$lib/events';
	import { cn } from '$lib/utils';
	import Button from '$lib/components/ui/button/button.svelte';
	import EventMeta from './event-meta.svelte';

	let {
		event,
		live = false,
		reveal = 0,
		class: className
	}: { event: Event; live?: boolean; reveal?: number | false; class?: string } = $props();
</script>

<div
	class={cn(
		'overflow-hidden rounded-2xl border',
		live ? 'border-destructive/30 bg-destructive/5' : 'border-border bg-card',
		className
	)}
	use:revealAction={reveal}
>
	{#if event.image}
		<img src={event.image} alt={event.title} class="h-40 w-full object-cover" />
	{/if}
	<div class="p-6">
		{#if live}
			<div class="mb-4 flex items-center gap-2 text-sm text-destructive">
				<RadioIcon size={16} />
				<span class="font-semibold">{m.events_live_badge()}</span>
			</div>
		{/if}
		<h3 class="mb-3 text-lg font-semibold">{event.title}</h3>
		<EventMeta {event} inPerson={!live} />
		{#if event.href}
			<div class={live ? 'mt-4' : 'mt-5'}>
				<Button href={event.href} size="sm">
					{live ? m.events_join() : m.learn_more()}
					<ExternalLinkIcon size={14} class="ml-1.5" />
				</Button>
			</div>
		{/if}
	</div>
</div>
