<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { tweened } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Disc3 } from '@lucide/svelte';
	import DownloadIcon from '$lib/components/movingicons/download.svelte';
	import HeartIcon from '@lucide/svelte/icons/heart';
	import { DiscordIcon } from '$lib/components/icons/discord/index.svelte';
	import NewsletterForm from '$lib/components/ui/newsletter-form.svelte';
	import * as m from '$lib/paraglide/messages';
	import { UseClipboard } from '$lib/hooks/use-clipboard.svelte';
	import { cn } from '$lib/utils.js';

	type IsoData = { name: string; sha256: string };

	let { class: className = '' }: { class?: string } = $props();

	const CDN = 'https://cdn.blossomos.org/iso';

	let standard = $state<IsoData | null>(null);
	let nvidiaOpen = $state<IsoData | null>(null);
	let gpu = $state<'nvidia' | 'other'>('other');
	let hoveredLabel = $state<string | null>(null);
	let copiedLabel = $state<string | null>(null);
	function copyHash(label: string, hash: string) {
		clipboard.copy(hash);
		copiedLabel = label;
		setTimeout(() => (copiedLabel = null), 1500);
	}
	function triggerDownload(label: string) {
		hoveredLabel = label;
		setTimeout(() => (hoveredLabel = null), 400);
	}
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

	function extractVersion(name: string): string {
		return name.match(/BlossomOS(?:-nvidia-open)?-(.+?)-x86_64/)?.[1] ?? '';
	}

	const clipboard = new UseClipboard();

	onMount(() => {
		gpu = detectGPU();
		rafId = requestAnimationFrame(loop);
		Promise.all([
			fetch(`${CDN}/isodata.json?${Date.now()}`).then((r) => r.json()),
			fetch(`${CDN}/isodata-nvidia-open.json?${Date.now()}`).then((r) => r.json())
		]).then(([std, nvidia]) => {
			standard = std;
			nvidiaOpen = nvidia;
			loading = false;
		});
		return () => cancelAnimationFrame(rafId);
	});

	const version = $derived(standard ? extractVersion(standard.name) : '');

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

	function downloadClick(e: MouseEvent, label: string) {
		if (e.shiftKey) e.preventDefault();
		clearTimeout(spinTimer);
		speed.set(0.72);
		spinTimer = setTimeout(() => speed.set(0), 3000);
		if (label === 'NVIDIA Open' && e.shiftKey) {
			const novideo = document.getElementById('novideo') as HTMLAudioElement;
			novideo.currentTime = 0;
			novideo.play();
		}
		dialogOpen = true;
	}

	const isos = $derived([
		{
			data: standard,
			label: 'Standard',
			description: m.iso_standard_desc(),
			gpu: 'AMD / Intel',
			recommended: gpu === 'other'
		},
		{
			data: nvidiaOpen,
			label: 'NVIDIA Open',
			description: m.iso_nvidia_desc(),
			gpu: 'NVIDIA',
			recommended: gpu === 'nvidia'
		}
	]);
</script>

<audio id="novideo" src="/novideo.mp3"></audio>

<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Content class="gap-0 overflow-hidden p-0 sm:max-w-md" hideClose={false}>
		<!-- Gradient header -->
		<div
			class="relative overflow-hidden bg-linear-to-br from-primary/15 via-primary/5 to-transparent px-8 pt-8 pb-6"
		>
			<div
				class="pointer-events-none absolute -top-10 -right-10 h-36 w-36 rounded-full bg-primary/15 blur-2xl"
			></div>
			<div
				class="pointer-events-none absolute bottom-0 left-1/3 h-20 w-20 rounded-full bg-primary/10 blur-xl"
			></div>
			<div class="relative">
				<h2 class="mt-4 font-serif text-3xl leading-tight">{m.download_dialog_title()}</h2>
			</div>
		</div>

		<!-- Body -->
		<div class="px-8 py-5">
			<p class="text-sm leading-relaxed text-muted-foreground">{m.download_dialog_body()}</p>
		</div>

		<!-- Action buttons -->
		<div class="grid grid-cols-2 gap-3 px-6">
			<a
				href="https://liberapay.com/blossomos"
				target="_blank"
				rel="noreferrer"
				class="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-xs font-medium transition-colors hover:bg-muted"
			>
				<HeartIcon size={16} class="text-destructive" strokeWidth={0} fill="currentColor" />
				{m.download_dialog_support()}
			</a>
			<a
				href="https://discord.gg/dTqsBdxvNr"
				target="_blank"
				rel="noreferrer"
				class="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-xs font-medium transition-colors hover:bg-muted"
			>
				<DiscordIcon size={16} />
				{m.download_dialog_community()}
			</a>
		</div>

		<!-- Newsletter -->
		<div class="px-6 pt-4 pb-6">
			<p class="mb-2 text-xs font-medium text-muted-foreground">{m.newsletter_label()}</p>
			<NewsletterForm />
		</div>
	</Dialog.Content>
</Dialog.Root>

<div class={cn('overflow-hidden rounded-2xl border border-border bg-card shadow-sm', className)}>
	<!-- Header -->
	<div class="flex items-center gap-4 border-b border-border px-6 py-5">
		<div
			class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"
		>
			<Disc3 class="h-6 w-6" style="transform: rotate({rotation}deg)" />
		</div>
		<div class="min-w-0 flex-1">
			<p class="font-semibold">BlossomOS</p>
			{#if version}
				<p class="text-xs text-muted-foreground">
					Version {version} · Alpha 1
				</p>
			{:else}
				<div class="mt-1.5 h-3 w-28 animate-pulse rounded bg-muted"></div>
			{/if}
		</div>
	</div>

	<!-- ISO options -->
	<div class="flex flex-col divide-y divide-border">
		{#each isos as iso (iso.label)}
			<div class="px-6 py-4 {iso.recommended ? 'bg-primary/3' : ''}">
				<div class="flex items-center gap-4">
					<div class="min-w-0 flex-1">
						<div class="flex flex-wrap items-center gap-2">
							<span class="text-sm font-medium">{iso.label}</span>
							<span class="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground"
								>{iso.gpu}</span
							>
							{#if iso.recommended}
								<span
									class="rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary"
								>
									{m.recommended()}
								</span>
							{/if}
						</div>
					</div>
					{#if loading || !iso.data}
						<div class="h-9 w-28 shrink-0 animate-pulse rounded-lg bg-muted"></div>
					{:else}
						<a
							href="{CDN}/{iso.data.name}"
							download
							class="shrink-0"
							onclick={(e) => downloadClick(e, iso.label)}
							onmouseenter={() => triggerDownload(iso.label)}
							data-umami-event="download"
							data-umami-event-label={iso.label}
						>
							<Button variant={iso.recommended ? 'primary' : 'default'} size="sm">
								<DownloadIcon
									size={16}
									animate={hoveredLabel === iso.label}
									class="pointer-events-none"
								/>
								{m.download_button()}
							</Button>
						</a>
					{/if}
				</div>
				{#if iso.data}
					<details class="mt-2">
						<summary class="cursor-pointer text-xs text-muted-foreground hover:text-foreground">
							SHA256
							{#if copiedLabel === iso.label}
								<span transition:fade={{ duration: 200 }} class="ml-1 text-primary"
									>{m.copied()}</span
								>
							{/if}
						</summary>
						<button
							class="mt-1 block w-full cursor-pointer text-left font-mono text-xs break-all text-muted-foreground hover:text-foreground"
							onclick={() => copyHash(iso.label, iso.data?.sha256 || '')}
						>
							{iso.data.sha256}
						</button>
					</details>
				{/if}
			</div>
		{/each}
	</div>
</div>
