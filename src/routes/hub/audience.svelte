<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import Section from '$lib/components/page/section.svelte';
	import FeatureGrid from '$lib/components/cards/feature-grid.svelte';
	import type { Feature } from '$lib/components/cards/feature-card.svelte';

	const audiences: Feature[] = [
		{ title: m.hub_audience1_title(), body: m.hub_audience1_body() },
		{ title: m.hub_audience2_title(), body: m.hub_audience2_body() },
		{ title: m.hub_audience3_title(), body: m.hub_audience3_body() }
	];
</script>

<Section eyebrow={m.hub_audience_subheader()} title={m.hub_audience_h2()}>
	<FeatureGrid items={audiences} cols={3} size="md" stagger={80} />
</Section>
