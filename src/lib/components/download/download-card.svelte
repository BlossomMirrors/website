<script lang="ts">
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Disc3 } from '@lucide/svelte';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import * as m from '$lib/paraglide/messages';
	import { useVersion } from '$lib/hooks/use-version.svelte';
	import { cn } from '$lib/utils.js';
	import posthog from 'posthog-js';
	import { env } from '$env/dynamic/public';
	import { resolve } from '$app/paths';
	import { loadTurnstile } from './turnstile';
	import IsoRow, { type IsoData } from './iso-row.svelte';
	import DownloadThanksDialog from './download-thanks-dialog.svelte';

	type Variant = {
		label: string;
		file: string;
		badge: () => string;
		description: () => string;
		matches?: 'nvidia' | 'other';
	};

	let { class: className = '', full = false }: { class?: string; full?: boolean } = $props();

	const CDN = 'https://cdn.blossomos.org/iso';
	// The ISO metadata endpoint only returns a date-based version (e.g. "2026.08.05"), not a
	// human-readable codename, so this is hardcoded until the CDN JSON exposes one. Update this
	// when the next codenamed release ships.
	const CODENAME = '0.3.0 Alpha';

	const ONLINE: Variant[] = [
		{
			label: 'Online',
			file: 'isodata-netinstall.json',
			badge: () => m.iso_all_gpus(),
			description: () => m.iso_online_desc()
		}
	];
	const OFFLINE: Variant[] = [
		{
			label: 'Standard',
			file: 'isodata.json',
			badge: () => 'AMD / Intel',
			description: () => m.iso_standard_desc(),
			matches: 'other'
		},
		{
			label: 'NVIDIA Open',
			file: 'isodata-nvidia-open.json',
			badge: () => 'NVIDIA',
			description: () => m.iso_nvidia_desc(),
			matches: 'nvidia'
		},
		{
			label: 'NVIDIA Legacy',
			file: 'isodata-nvidia-legacy.json',
			badge: () => 'NVIDIA',
			description: () => m.iso_nvidia_legacy_desc()
		}
	];

	let isoData = $state<Record<string, IsoData | null>>({});
	let gpu = $state<'nvidia' | 'other'>('other');
	let loading = $state(true);

	function detectGPU(): 'nvidia' | 'other' {
		try {
			const canvas = document.createElement('canvas');
			const gl =
				(canvas.getContext('webgl') as WebGLRenderingContext | null) ||
				(canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);
			if (!gl) return 'other';
			const ext = gl.getExtension('WEBGL_debug_renderer_info');
			if (!ext) return 'other';
			const renderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) as string;
			return renderer.toLowerCase().includes('nvidia') ? 'nvidia' : 'other';
		} catch {
			return 'other';
		}
	}

	const version = useVersion();

	function fetchIso(file: string): Promise<IsoData | null> {
		return fetch(`${CDN}/${file}?${Date.now()}`)
			.then((r) => (r.ok ? (r.json() as Promise<IsoData>) : null))
			.catch(() => null);
	}

	onMount(() => {
		gpu = detectGPU();
		rafId = requestAnimationFrame(loop);
		// The compact card fetches the standard offline ISO too, so it can fall back to it
		// whenever the online ISO has not been published to the CDN yet.
		const variants = full ? [...ONLINE, ...OFFLINE] : [...ONLINE, OFFLINE[0]];
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

	let verifyOpen = $state(false);
	let verifyError = $state(false);
	let pendingIso = $state<{ label: string; data: IsoData } | null>(null);
	let turnstileContainer = $state<HTMLDivElement | null>(null);
	let verifyForm = $state<HTMLFormElement | null>(null);
	let tokenInput = $state<HTMLInputElement | null>(null);
	let isoInput = $state<HTMLInputElement | null>(null);
	let widgetId: string | null = null;

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

	function downloadClick(e: MouseEvent, label: string, data: IsoData) {
		if (label.startsWith('NVIDIA') && e.shiftKey) {
			const novideo = document.getElementById('novideo') as HTMLAudioElement;
			novideo.currentTime = 0;
			novideo.play();
		}
		pendingIso = { label, data };
		verifyOpen = true;
	}

	function onVerified(token: string) {
		if (!pendingIso || !tokenInput || !isoInput || !verifyForm) return;
		tokenInput.value = token;
		isoInput.value = pendingIso.data.name;
		verifyOpen = false;
		announceDownload(pendingIso.label);
		verifyForm.requestSubmit();
	}

	$effect(() => {
		if (!verifyOpen || !turnstileContainer) return;
		verifyError = false;
		let cancelled = false;
		loadTurnstile()
			.then(() => {
				if (cancelled || !turnstileContainer || !window.turnstile) return;
				widgetId = window.turnstile.render(turnstileContainer, {
					sitekey: env.PUBLIC_TURNSTILE_SITE_KEY ?? '',
					action: 'download',
					callback: onVerified,
					'error-callback': () => (verifyError = true)
				});
			})
			.catch(() => (verifyError = true));
		return () => {
			cancelled = true;
			if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
			widgetId = null;
		};
	});

	function toRows(variants: Variant[], recommended: boolean) {
		return variants.map((v) => ({
			data: isoData[v.file] ?? null,
			label: v.label,
			description: v.description(),
			gpu: v.badge(),
			recommended,
			matchesGpu: v.matches === gpu
		}));
	}

	const compactIsos = $derived.by(() => {
		const online = toRows(ONLINE, true);
		if (loading || online[0].data) return online;
		return toRows([OFFLINE[0]], true);
	});

	const groups = $derived(
		full
			? [
					{
						key: 'online',
						title: m.iso_group_online(),
						note: m.iso_group_online_note(),
						isos: toRows(ONLINE, true)
					},
					{
						key: 'offline',
						title: m.iso_group_offline(),
						note: m.iso_group_offline_note(),
						isos: toRows(OFFLINE, false)
					}
				]
			: [{ key: 'online', title: '', note: '', isos: compactIsos }]
	);
</script>

<audio id="novideo" src="/novideo.mp3"></audio>

<form bind:this={verifyForm} method="POST" action="/api/downloads/verify" class="hidden">
	<input bind:this={tokenInput} type="hidden" name="cf-turnstile-response" />
	<input bind:this={isoInput} type="hidden" name="iso" />
</form>

<Dialog.Root bind:open={verifyOpen}>
	<Dialog.Content class="gap-4 sm:max-w-sm">
		<Dialog.Header>
			<Dialog.Title>{m.download_verify_title()}</Dialog.Title>
			<Dialog.Description>{m.download_verify_body()}</Dialog.Description>
		</Dialog.Header>
		<div class="flex justify-center py-2">
			<div bind:this={turnstileContainer}></div>
		</div>
		{#if verifyError}
			<p class="text-center text-xs text-destructive">{m.download_verify_error()}</p>
		{/if}
	</Dialog.Content>
</Dialog.Root>

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
	<div class="flex flex-col">
		{#each groups as group (group.key)}
			<div class="border-b border-border last:border-b-0">
				{#if full}
					<div class="bg-muted/40 px-6 py-3">
						<p class="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
							{group.title}
						</p>
						<p class="mt-1 text-xs text-muted-foreground">{group.note}</p>
					</div>
				{/if}
				<div class="flex flex-col divide-y divide-border">
					{#each group.isos as iso (iso.label)}
						<IsoRow {iso} {loading} ondownload={downloadClick} />
					{/each}
				</div>
			</div>
		{/each}
	</div>

	{#if !full}
		<a
			href={resolve('/downloads')}
			class="flex items-center justify-between border-t border-border px-6 py-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
		>
			{m.iso_see_more()}
			<ChevronRight class="size-4" />
		</a>
	{/if}
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
