<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import steamPng from '$lib/assets/taskbar/steam.png?enhanced';
	import ChipList from '$lib/components/elements/chip-list.svelte';
	import AmbientVideo from '$lib/components/media/ambient-video.svelte';
	import SplitSection from '$lib/components/page/split-section.svelte';

	const highlights = [
		{ label: m.gaming_steam(), img: steamPng },
		{ label: m.gaming_proton() },
		{ label: m.gaming_native() },
		{ label: m.gaming_performance() }
	];
</script>

<SplitSection
	eyebrow={m.gaming_subheader()}
	title={[m.gaming_header1(), m.gaming_header2()]}
	body={m.gaming_description()}
	class="my-16 py-10 md:py-16"
	splitClass="md:gap-16"
>
	<ChipList items={highlights} reveal delay={100} stagger={60} class="mt-8" />

	{#snippet aside()}
		<AmbientVideo src="/gaming.webm" />
	{/snippet}
</SplitSection>
