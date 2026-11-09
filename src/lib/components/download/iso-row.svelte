<script module lang="ts">
	export type IsoData = { name: string; sha256: string };
	export type IsoRowData = {
		data: IsoData | null;
		label: string;
		description: string;
		gpu: string;
		recommended: boolean;
		matchesGpu: boolean;
	};
</script>

<script lang="ts">
	import { fade } from 'svelte/transition';
	import { Button } from '$lib/components/ui/button/index.js';
	import DownloadIcon from '$lib/components/icons/animated/download.svelte';
	import Badge from '$lib/components/elements/badge.svelte';
	import * as m from '$lib/paraglide/messages';
	import { UseClipboard } from '$lib/hooks/use-clipboard.svelte';

	let {
		iso,
		loading,
		ondownload
	}: {
		iso: IsoRowData;
		loading: boolean;
		ondownload: (e: MouseEvent, label: string, data: IsoData) => void;
	} = $props();

	const clipboard = new UseClipboard();
	let hovered = $state(false);
	let copied = $state(false);

	function copyHash(hash: string) {
		clipboard.copy(hash);
		copied = true;
		setTimeout(() => (copied = false), 1500);
	}

	function triggerDownload() {
		hovered = true;
		setTimeout(() => (hovered = false), 400);
	}
</script>

<div class="px-6 py-4 {iso.recommended ? 'bg-primary/3' : ''}">
	<div class="flex items-center gap-4">
		<div class="min-w-0 flex-1">
			<div class="flex flex-wrap items-center gap-2">
				<span class="text-sm font-medium">{iso.label}</span>
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
				variant={iso.recommended ? 'primary' : 'default'}
				size="sm"
				class="shrink-0"
				onclick={(e) => ondownload(e, iso.label, iso.data as IsoData)}
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
		<details class="mt-2">
			<summary class="cursor-pointer text-xs text-muted-foreground hover:text-foreground">
				SHA256
				{#if copied}
					<span transition:fade={{ duration: 200 }} class="ml-1 text-primary">{m.copied()}</span>
				{/if}
			</summary>
			<button
				class="mt-1 block w-full cursor-pointer text-left font-mono text-xs break-all text-muted-foreground hover:text-foreground"
				onclick={() => copyHash(iso.data?.sha256 || '')}
			>
				{iso.data.sha256}
			</button>
		</details>
	{/if}
</div>
