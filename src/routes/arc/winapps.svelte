<script lang="ts">
	import SplitSection from '$lib/components/page/split-section.svelte';
	import ShowcaseCard from '$lib/components/cards/showcase-card.svelte';
	import WindowsIcon from '$lib/components/icons/windows.svelte';
	import * as m from '$lib/paraglide/messages';

	const apps = ['Affinity Photo', 'FL Studio', 'Foobar 2000'];
</script>

<SplitSection
	reverse
	size="md"
	eyebrow={m.arc_winapps_subheader()}
	title={[m.arc_winapps_h2_1(), m.arc_winapps_h2_2()]}
	body={[m.arc_winapps_body1(), m.arc_winapps_body2()]}
>
	{#snippet aside()}
		<ShowcaseCard
			title={m.arc_winapps_label()}
			subtitle={m.arc_winapps_running()}
			tags={apps}
			tileClass="bg-[#0078d4]/10 fill-[#0078d4]"
		>
			<WindowsIcon />
		</ShowcaseCard>
	{/snippet}
</SplitSection>
