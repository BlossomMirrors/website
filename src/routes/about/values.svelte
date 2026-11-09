<script lang="ts">
	import HeartIcon from '@lucide/svelte/icons/heart';
	import ShieldIcon from '@lucide/svelte/icons/shield';
	import UsersIcon from '@lucide/svelte/icons/users';
	import CodeIcon from '@lucide/svelte/icons/code';
	import GlobeIcon from '@lucide/svelte/icons/globe';
	import LightbulbIcon from '@lucide/svelte/icons/lightbulb';
	import * as m from '$lib/paraglide/messages';
	import Section from '$lib/components/page/section.svelte';
	import FeatureGrid from '$lib/components/cards/feature-grid.svelte';
	import type { Feature } from '$lib/components/cards/feature-card.svelte';

	const values: Feature[] = [
		{ icon: ShieldIcon, title: m.about_value_privacy_title(), body: m.about_value_privacy_body() },
		{
			icon: CodeIcon,
			title: m.about_value_opensource_title(),
			body: m.about_value_opensource_body()
		},
		{
			icon: UsersIcon,
			title: m.about_value_community_title(),
			body: m.about_value_community_body()
		},
		{ icon: GlobeIcon, title: m.about_value_lasting_title(), body: m.about_value_lasting_body() },
		{ icon: LightbulbIcon, title: m.about_value_useful_title(), body: m.about_value_useful_body() },
		{ icon: HeartIcon, title: m.about_value_care_title(), body: m.about_value_care_body() }
	];
</script>

<Section eyebrow={m.about_values_subheader()} title={m.about_values_header()}>
	<FeatureGrid items={values} cols={3} gap="lg" />
</Section>
