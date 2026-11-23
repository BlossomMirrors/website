<script module lang="ts">
	import type { IsoData } from './isos';

	export type IsoRowData = {
		data: IsoData | null;
		label: string;
		name: string;
		description: string;
		gpu: string;
		recommended: boolean;
		matchesGpu: boolean;
	};
</script>

<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import DownloadIcon from '$lib/components/icons/animated/download.svelte';
	import Badge from '$lib/components/elements/badge.svelte';
	import * as m from '$lib/paraglide/messages';
	import Checksum from './checksum.svelte';
	import { isoUrl, type DesktopOS } from './isos';

	let {
		iso,
		loading,
		os = 'other',
		ondownload
	}: {
		iso: IsoRowData;
		loading: boolean;
		os?: DesktopOS;
		ondownload: (e: MouseEvent, label: string) => void;
	} = $props();

	let hovered = $state(false);

	function triggerDownload() {
		hovered = true;
		setTimeout(() => (hovered = false), 400);
	}
</script>

<div class="px-6 py-4 {iso.recommended ? 'bg-primary/3' : ''}">
	<div class="flex items-center gap-4">
		<div class="min-w-0 flex-1">
			<div class="flex flex-wrap items-center gap-2">
				<span class="text-sm font-medium">{iso.name}</span>
				<span class="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">{iso.gpu}</span>
				{#if iso.recommended}
					<Badge>{m.recommended()}</Badge>
				{:else if iso.matchesGpu}
					<Badge tone="muted">{m.iso_matches_gpu()}</Badge>
				{/if}
			</div>
			<p class="mt-1 text-xs leading-relaxed text-muted-foreground">{iso.description}</p>
		</div>
		{#if loading}
			<div class="loading-glare h-8 w-28 shrink-0 rounded-lg bg-muted"></div>
		{:else if !iso.data}
			<span class="shrink-0 text-xs text-muted-foreground">{m.iso_unavailable()}</span>
		{:else}
			<Button
				href={isoUrl(iso.data)}
				target="_self"
				download
				variant={iso.recommended ? 'primary' : 'default'}
				size="sm"
				class="shrink-0"
				onclick={(e) => ondownload(e, iso.label)}
				onmouseenter={triggerDownload}
				data-umami-event="download"
				data-umami-event-label={iso.label}
			>
				<DownloadIcon size={16} animate={hovered} class="pointer-events-none" />
				{m.download_button()}
			</Button>
		{/if}
	</div>
	{#if loading}
		<div class="loading-glare mt-2 h-4 w-16 rounded bg-muted"></div>
	{:else if iso.data}
		<Checksum data={iso.data} {os} class="mt-2" />
	{/if}
</div>
