<script lang="ts">
	import ColorCard from '$lib/components/cards/color-card.svelte';
	import Grid from '$lib/components/page/grid.svelte';
	import Section from '$lib/components/page/section.svelte';
	import SectionHeader from '$lib/components/typography/section-header.svelte';
	import * as m from '$lib/paraglide/messages';

	const freedoms = [
		{ label: m.freedom1(), color: '#3e78ff' },
		{ label: m.freedom2(), color: '#ff2ea1' },
		{ label: m.freedom3(), color: '#00a349' },
		{ label: m.freedom4(), color: '#b8a800' }
	];
</script>

<Section class="mt-16 py-10 md:pt-16">
	<SectionHeader
		eyebrow={m.freedoms_subheader()}
		title={m.freedoms_header()}
		size="xl"
		class="mb-8"
	/>

	<Grid cols={4} gap="sm" class="md:gap-5">
		{#each freedoms as f, i (i)}
			<ColorCard label={`${f.label}.`} color={f.color} reveal={i * 70} />
		{/each}
	</Grid>
</Section>
