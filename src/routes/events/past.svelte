<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { splitEvents } from '$lib/events';
	import Section from '$lib/components/page/section.svelte';
	import EventList from '$lib/components/events/event-list.svelte';

	const { past } = splitEvents();
</script>

{#if past.length > 0}
	<Section class="mt-20" eyebrow={m.events_past_subheader()} title={m.events_past_subheader()}>
		<EventList events={past} />
	</Section>
{/if}
