<script lang="ts">
	import FolderSyncIcon from '@lucide/svelte/icons/folder-sync';
	import VideoIcon from '@lucide/svelte/icons/video';
	import ServerIcon from '@lucide/svelte/icons/server';
	import SettingsIcon from '@lucide/svelte/icons/settings';
	import * as m from '$lib/paraglide/messages';
	import Section from '$lib/components/page/section.svelte';
	import FeatureGrid from '$lib/components/cards/feature-grid.svelte';
	import type { Feature } from '$lib/components/cards/feature-card.svelte';

	const features: Feature[] = [
		{
			icon: FolderSyncIcon,
			title: m.cloud_feature_file_sync_title(),
			body: m.cloud_file_sync_body()
		},
		{ icon: VideoIcon, title: m.video_calls(), body: m.cloud_video_body() },
		{ icon: ServerIcon, title: m.eu_datacenters(), body: m.cloud_eu_body() },
		{
			icon: SettingsIcon,
			title: m.cloud_feature_settings_title(),
			body: m.cloud_settings_body()
		}
	];
</script>

<Section>
	<FeatureGrid items={features} size="lg" />
</Section>
