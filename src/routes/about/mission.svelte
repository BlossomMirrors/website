<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import SplitSection from '$lib/components/page/split-section.svelte';
	import StatsSection from '$lib/components/sections/stats-section.svelte';
</script>

<SplitSection
	size="md"
	eyebrow={m.about_mission_subheader()}
	title={[m.about_mission_h2_1(), m.about_mission_h2_2()]}
	body={[m.about_mission_body1(), m.about_mission_body2()]}
>
	{#snippet aside()}
		<StatsSection />
	{/snippet}
</SplitSection>
