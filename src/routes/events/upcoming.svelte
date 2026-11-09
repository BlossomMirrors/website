<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { splitEvents } from '$lib/events';
	import Section from '$lib/components/page/section.svelte';
	import Grid from '$lib/components/page/grid.svelte';
	import EmptyState from '$lib/components/elements/empty-state.svelte';
	import EventCard from '$lib/components/events/event-card.svelte';

	const { upcoming } = splitEvents();
</script>

<Section
	class="mt-20"
	eyebrow={m.events_upcoming_subheader()}
	title={m.events_upcoming_subheader()}
>
	{#if upcoming.length > 0}
		<Grid cols={2} gap="lg">
			{#each upcoming as event, i (event.id)}
				<EventCard {event} reveal={i * 70} />
			{/each}
		</Grid>
	{:else}
		<EmptyState text={m.events_no_upcoming()} bordered={false} />
	{/if}
</Section>
