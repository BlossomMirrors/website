<script lang="ts">
	import { splitEvents } from '$lib/events';
	import Section from '$lib/components/page/section.svelte';
	import Grid from '$lib/components/page/grid.svelte';
	import LiveLabel from '$lib/components/events/live-label.svelte';
	import EventCard from '$lib/components/events/event-card.svelte';

	const { live } = splitEvents();
</script>

{#if live.length > 0}
	<Section class="mt-20">
		<LiveLabel class="mb-8" />
		<Grid cols={3}>
			{#each live as event, i (event.id)}
				<EventCard {event} live reveal={i * 70} />
			{/each}
		</Grid>
	</Section>
{/if}
