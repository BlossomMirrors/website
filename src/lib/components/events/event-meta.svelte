<script lang="ts">
	import CalendarIcon from '@lucide/svelte/icons/calendar';
	import MapPinIcon from '@lucide/svelte/icons/map-pin';
	import * as m from '$lib/paraglide/messages';
	import { formatDateRange, type Event } from '$lib/events';
	import { cn } from '$lib/utils';
	import Badge from '$lib/components/elements/badge.svelte';

	let {
		event,
		inPerson = false,
		inline = false,
		class: className
	}: { event: Event; inPerson?: boolean; inline?: boolean; class?: string } = $props();
</script>

{#snippet badge()}
	{#if event.online}
		<Badge tone="primary-outline" class="font-normal">{m.events_online()}</Badge>
	{:else if inPerson}
		<Badge tone="outline" class="font-normal">{m.events_in_person()}</Badge>
	{/if}
{/snippet}

{#if inline}
	<div class={cn('flex flex-wrap items-center gap-3 text-sm text-muted-foreground', className)}>
		<div class="flex items-center gap-1.5">
			<CalendarIcon size={13} />
			<span>{formatDateRange(event.from, event.to)}</span>
		</div>
		<div class="flex items-center gap-1.5">
			<MapPinIcon size={13} />
			<span>{event.location}</span>
		</div>
		{@render badge()}
	</div>
{:else}
	<div class={cn('flex flex-col gap-1.5 text-sm text-muted-foreground', className)}>
		<div class="flex items-center gap-2">
			<CalendarIcon size={14} />
			<span>{formatDateRange(event.from, event.to)}</span>
		</div>
		<div class="flex items-center gap-2">
			<MapPinIcon size={14} />
			<span>{event.location}</span>
			{@render badge()}
		</div>
	</div>
{/if}
