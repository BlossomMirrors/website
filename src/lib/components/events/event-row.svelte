<script lang="ts">
	import VideoIcon from '@lucide/svelte/icons/video';
	import * as m from '$lib/paraglide/messages';
	import type { Event } from '$lib/events';
	import Button from '$lib/components/ui/button/button.svelte';
	import EventMeta from './event-meta.svelte';

	let { event }: { event: Event } = $props();
</script>

<div class="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:gap-6">
	{#if event.image}
		<img
			src={event.image}
			alt={event.title}
			class="h-20 w-full rounded-xl object-cover sm:w-32 sm:shrink-0"
		/>
	{/if}
	<div class="flex-1">
		<p class="font-semibold">{event.title}</p>
		<EventMeta {event} inline class="mt-1" />
	</div>
	{#if event.talkHref}
		<Button href={event.talkHref} size="sm">
			<VideoIcon size={14} class="mr-1.5" />
			{m.events_watch_talk()}
		</Button>
	{/if}
</div>
