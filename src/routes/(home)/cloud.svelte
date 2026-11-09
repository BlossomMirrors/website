<script lang="ts">
	import CloudIcon from '@lucide/svelte/icons/cloud';
	import FolderSyncIcon from '@lucide/svelte/icons/folder-sync';
	import VideoIcon from '@lucide/svelte/icons/video';
	import ShieldIcon from '@lucide/svelte/icons/shield';
	import SettingsIcon from '@lucide/svelte/icons/settings';
	import * as m from '$lib/paraglide/messages';
	import FeatureChipGrid from '$lib/components/cards/feature-chip-grid.svelte';
	import AnimatedButton from '$lib/components/elements/animated-button.svelte';
	import SplitSection from '$lib/components/page/split-section.svelte';

	const features = [
		{ icon: FolderSyncIcon, label: m.file_sync(), done: true },
		{ icon: VideoIcon, label: m.video_calls(), done: true },
		{ icon: ShieldIcon, label: m.eu_datacenters(), done: true },
		{ icon: SettingsIcon, label: m.settings_sync(), done: false }
	];
</script>

<SplitSection
	panel="primary"
	accent="bg-secondary-400/10"
	icon={CloudIcon}
	title="Blossom Cloud"
	body={m.cloud_description()}
	size="md"
	class="mt-48 mb-32"
>
	{#snippet actions()}
		<AnimatedButton href="/cloud" variant="primary">{m.learn_more()}</AnimatedButton>
	{/snippet}

	{#snippet aside()}
		<FeatureChipGrid items={features} />
	{/snippet}
</SplitSection>
