<script lang="ts">
	import SparklesIcon from '@lucide/svelte/icons/sparkles';
	import Announcement from '$lib/components/elements/announcement.svelte';
	import Desktop from '$lib/components/desktop/desktop.svelte';
	import DownloadCard from '$lib/components/download/download-card.svelte';
	import Section from '$lib/components/page/section.svelte';
	import Split from '$lib/components/page/split.svelte';
	import Heading from '$lib/components/typography/heading.svelte';
	import Lead from '$lib/components/typography/lead.svelte';
	import * as m from '$lib/paraglide/messages';
</script>

<Section class="mt-0 mb-4 flex flex-col gap-7">
	<Announcement
		icon={SparklesIcon}
		badge={m.home_alpha3_badge()}
		text={m.home_alpha3_text()}
		href="https://help.blossomos.org/help/changelog/alpha-3"
		cta={m.home_alpha3_cta()}
	/>
	<Desktop />

	<Split reveal={false} class="min-h-77 grid-cols-1 items-start gap-6 md:gap-12">
		<Heading level={1} size="display" text="BlossomOS" />
		<Lead class="md:text-xl">{m.home_subtitle()}</Lead>

		{#snippet aside()}
			<DownloadCard class="mt-2" />
		{/snippet}
	</Split>
</Section>
