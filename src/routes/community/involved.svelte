<script lang="ts">
	import CodeIcon from '@lucide/svelte/icons/code';
	import LanguagesIcon from '@lucide/svelte/icons/languages';
	import BugIcon from '@lucide/svelte/icons/bug';
	import MessageCircleIcon from '@lucide/svelte/icons/message-circle';
	import * as m from '$lib/paraglide/messages';
	import Section from '$lib/components/page/section.svelte';
	import FeatureGrid from '$lib/components/cards/feature-grid.svelte';
	import type { Feature } from '$lib/components/cards/feature-card.svelte';

	const involved: Feature[] = [
		{ icon: CodeIcon, title: m.community_involved1_title(), body: m.community_involved1_body() },
		{
			icon: LanguagesIcon,
			title: m.community_involved2_title(),
			body: m.community_involved2_body()
		},
		{ icon: BugIcon, title: m.community_involved3_title(), body: m.community_involved3_body() },
		{
			icon: MessageCircleIcon,
			title: m.community_involved4_title(),
			body: m.community_involved4_body()
		}
	];
</script>

<Section eyebrow={m.community_involved_subheader()} title={m.community_involved_h2()}>
	<FeatureGrid items={involved} size="lg" />
</Section>
