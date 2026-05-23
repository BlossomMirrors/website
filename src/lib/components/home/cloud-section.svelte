<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { Button } from '$lib/components/ui/button';
	import ArrowRight from '$lib/components/movingicons/arrow-right.svelte';
	import CloudIcon from '@lucide/svelte/icons/cloud';
	import FolderSyncIcon from '@lucide/svelte/icons/folder-sync';
	import VideoIcon from '@lucide/svelte/icons/video';
	import ShieldIcon from '@lucide/svelte/icons/shield';
	import SettingsIcon from '@lucide/svelte/icons/settings';
	import * as m from '$lib/paraglide/messages';
	import FeatureItem from '$lib/components/ui/feature-item.svelte';

	let btnAnimating = $state(false);
	function triggerArrow() {
		btnAnimating = true;
		setTimeout(() => (btnAnimating = false), 250);
	}

	const features = [
		{ Icon: FolderSyncIcon, label: m.file_sync(), done: true },
		{ Icon: VideoIcon, label: m.video_calls(), done: true },
		{ Icon: ShieldIcon, label: m.eu_datacenters(), done: true },
		{ Icon: SettingsIcon, label: m.settings_sync(), done: false }
	];
</script>

<section class="mt-48 mb-32">
	<div
		class="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary/10 via-primary/5 to-transparent p-10 md:p-16"
		use:reveal
	>
		<div
			class="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-primary/8 blur-3xl"
		></div>
		<div
			class="pointer-events-none absolute -bottom-12 left-1/3 h-48 w-48 rounded-full bg-secondary-400/10 blur-3xl"
		></div>

		<div class="relative grid items-center gap-10 md:grid-cols-2">
			<div>
				<div
					class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary"
				>
					<CloudIcon size={24} strokeWidth={1.5} />
				</div>
				<h2 class="font-serif text-4xl leading-tight md:text-5xl">Blossom Cloud</h2>
				<p class="mt-4 text-lg leading-relaxed text-muted-foreground">
					{m.cloud_description()}
				</p>
				<a href="/cloud" class="mt-6 inline-block" onmouseenter={triggerArrow}>
					<Button variant="primary">{m.learn_more()}<ArrowRight size={16} animate={btnAnimating} class="pointer-events-none" /></Button>
				</a>
			</div>

			<div class="grid-rows grid gap-3 md:grid-cols-2">
				{#each features as f, i (i)}
					<FeatureItem Icon={f.Icon} label={f.label} done={f.done} delay={i * 60} />
				{/each}
			</div>
		</div>
	</div>
</section>
