<script lang="ts">
	import Section from '$lib/components/page/section.svelte';
	import FeatureGrid from '$lib/components/cards/feature-grid.svelte';
	import type { Feature } from '$lib/components/cards/feature-card.svelte';
	import PackageIcon from '@lucide/svelte/icons/package';
	import FolderOpenIcon from '@lucide/svelte/icons/folder-open';
	import SettingsIcon from '@lucide/svelte/icons/settings';
	import BookmarkIcon from '@lucide/svelte/icons/bookmark';
	import * as m from '$lib/paraglide/messages';

	const features: Feature[] = $derived([
		{
			icon: PackageIcon,
			title: m.switch_feat_apps_title(),
			body: m.switch_feat_apps_body()
		},
		{
			icon: FolderOpenIcon,
			title: m.switch_feat_files_title(),
			body: m.switch_feat_files_body()
		},
		{
			icon: SettingsIcon,
			title: m.switch_feat_settings_title(),
			body: m.switch_feat_settings_body()
		},
		{
			icon: BookmarkIcon,
			title: m.switch_feat_browser_title(),
			body: m.switch_feat_browser_body()
		}
	]);
</script>

<Section eyebrow={m.switch_features_subheader()} title={m.switch_features_h2()}>
	<FeatureGrid items={features} gap="lg" />
</Section>
