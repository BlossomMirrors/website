<script lang="ts">
	import UsersIcon from '@lucide/svelte/icons/users';
	import PackageIcon from '@lucide/svelte/icons/package';
	import ShieldCheckIcon from '@lucide/svelte/icons/shield-check';
	import LayoutDashboardIcon from '@lucide/svelte/icons/layout-dashboard';
	import KeyIcon from '@lucide/svelte/icons/key';
	import ScrollTextIcon from '@lucide/svelte/icons/scroll-text';
	import MonitorSmartphoneIcon from '@lucide/svelte/icons/monitor-smartphone';
	import GlobeIcon from '@lucide/svelte/icons/globe';
	import * as m from '$lib/paraglide/messages';
	import Section from '$lib/components/page/section.svelte';
	import FeatureGrid from '$lib/components/cards/feature-grid.svelte';
	import type { Feature } from '$lib/components/cards/feature-card.svelte';

	const features: Feature[] = [
		{ icon: LayoutDashboardIcon, title: m.hub_feature1_title(), body: m.hub_feature1_body() },
		{ icon: UsersIcon, title: m.hub_feature2_title(), body: m.hub_feature2_body() },
		{ icon: PackageIcon, title: m.hub_feature3_title(), body: m.hub_feature3_body() },
		{ icon: ShieldCheckIcon, title: m.hub_feature4_title(), body: m.hub_feature4_body() },
		{ icon: KeyIcon, title: m.hub_feature5_title(), body: m.hub_feature5_body() },
		{ icon: ScrollTextIcon, title: m.hub_feature6_title(), body: m.hub_feature6_body() },
		{ icon: MonitorSmartphoneIcon, title: m.hub_feature7_title(), body: m.hub_feature7_body() },
		{ icon: GlobeIcon, title: m.hub_feature8_title(), body: m.hub_feature8_body() }
	];
</script>

<Section eyebrow={m.hub_features_subheader()} title={m.hub_features_h2()}>
	<FeatureGrid items={features} size="lg" />
</Section>
