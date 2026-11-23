<script lang="ts">
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';
	import { Disc3 } from '@lucide/svelte';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import * as m from '$lib/paraglide/messages';
	import { useVersion } from '$lib/hooks/use-version.svelte';
	import { cn } from '$lib/utils.js';
	import posthog from 'posthog-js';
	import { resolve } from '$app/paths';
	import IsoRow from './iso-row.svelte';
	import {
		CODENAME,
		ONLINE_ISO,
		OFFLINE_ISOS,
		detectGPU,
		detectOS,
		fetchIso,
		type DesktopOS,
		type IsoData,
		type IsoVariant
	} from './isos';
	import DownloadThanksDialog from './download-thanks-dialog.svelte';

	let { class: className = '' }: { class?: string } = $props();

	let isoData = $state<Record<string, IsoData | null>>({});
	let gpu = $state<'nvidia' | 'other'>('other');
	let os = $state<DesktopOS>('other');
	let loading = $state(true);

	const version = useVersion();

	onMount(() => {
		gpu = detectGPU();
		rafId = requestAnimationFrame(loop);
		os = detectOS(navigator.userAgent);
		// The card fetches the standard offline ISO too, so it can fall back to it whenever the
		// online ISO has not been published to the CDN yet.
		const variants = [ONLINE_ISO, OFFLINE_ISOS[0]];
		Promise.all(variants.map((v) => fetchIso(v.file).then((data) => [v.file, data] as const))).then(
			(entries) => {
				isoData = Object.fromEntries(entries);
				loading = false;
			}
		);
		return () => cancelAnimationFrame(rafId);
	});

	const speed = tweened(0, { duration: 1200, easing: cubicInOut });
	let rotation = $state(0);
	let rafId: number;
	let lastTime: number | null = null;
	let spinTimer: ReturnType<typeof setTimeout>;

	function loop(time: number) {
		if (lastTime !== null) rotation += $speed * (time - lastTime);
		lastTime = time;
		rafId = requestAnimationFrame(loop);
	}

	let dialogOpen = $state(false);

	function announceDownload(label: string) {
		clearTimeout(spinTimer);
		speed.set(0.72);
		spinTimer = setTimeout(() => speed.set(0), 3000);
		posthog.capture('download_started', {
			iso_variant: label,
			version: version.current || null,
			detected_gpu: gpu
		});
		dialogOpen = true;
	}

	function toRows(variants: IsoVariant[], recommended: boolean) {
		return variants.map((v) => ({
			data: isoData[v.file] ?? null,
			label: v.label,
			name: v.name(),
			description: v.description(),
			gpu: v.badge(),
			recommended,
			matchesGpu: v.matches === gpu
		}));
	}

	const isos = $derived.by(() => {
		const online = toRows([ONLINE_ISO], true);
		if (loading || online[0].data) return online;
		return toRows([OFFLINE_ISOS[0]], true);
	});
</script>

<DownloadThanksDialog bind:open={dialogOpen} />

<div class={cn('overflow-hidden rounded-2xl border border-border bg-card shadow-sm', className)}>
	<!-- Header -->
	<div class="flex items-center gap-4 border-b border-border px-6 py-5">
		<div
			class="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"
		>
			<Disc3 class="size-6" style="transform: rotate({rotation}deg)" />
		</div>
		<div class="min-w-0 flex-1">
			<p class="font-semibold">BlossomOS</p>
			{#if version.current}
				<p class="mt-1.5 text-xs text-muted-foreground">
					{m.download_version({ version: version.current, codename: CODENAME })}
				</p>
			{:else}
				<div class="loading-glare mt-1.5 h-4 w-28 rounded bg-muted"></div>
			{/if}
		</div>
	</div>

	<!-- ISO options -->
	<div class="flex flex-col divide-y divide-border">
		{#each isos as iso (iso.label)}
			<IsoRow {iso} {loading} {os} ondownload={(_, label) => announceDownload(label)} />
		{/each}
	</div>

	<a
		href={resolve('/downloads')}
		class="flex items-center justify-between border-t border-border px-6 py-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
	>
		{m.iso_see_more()}
		<ChevronRight class="size-4" />
	</a>
</div>

<style>
	@keyframes -global-loading-glare {
		from {
			background-position: 150% 0;
		}
		to {
			background-position: -50% 0;
		}
	}
	:global(.loading-glare) {
		background-image: linear-gradient(
			100deg,
			transparent 30%,
			color-mix(in oklab, var(--color-foreground) 12%, transparent) 45%,
			color-mix(in oklab, var(--color-foreground) 12%, transparent) 55%,
			transparent 70%
		);
		background-size: 200% 100%;
		animation: loading-glare 1.4s ease-in-out infinite;
	}
</style>
