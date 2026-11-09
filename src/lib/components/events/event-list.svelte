<script lang="ts">
	import type { Event } from '$lib/events';
	import { cn } from '$lib/utils';
	import Card from '$lib/components/cards/card.svelte';
	import EventRow from './event-row.svelte';

	let {
		events,
		reveal = 0,
		class: className
	}: { events: Event[]; reveal?: number | false; class?: string } = $props();
</script>

<Card {reveal} class={cn('divide-y divide-border p-0', className)}>
	{#each events as event (event.id)}
		<EventRow {event} />
	{/each}
</Card>
