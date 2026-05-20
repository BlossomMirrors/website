<script lang="ts">
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Download, Disc3 } from '@lucide/svelte';
	import * as m from '$lib/paraglide/messages';

	type IsoData = { name: string; sha256: string };

	const CDN = 'https://cdn.blossomos.org/iso';

	let standard = $state<IsoData | null>(null);
	let nvidiaOpen = $state<IsoData | null>(null);
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

	function extractVersion(name: string): string {
		return name.match(/BlossomOS(?:-nvidia-open)?-(.+?)-x86_64/)?.[1] ?? '';
	}

	onMount(() => {
		gpu = detectGPU();
		rafId = requestAnimationFrame(loop);
		Promise.all([
			fetch(`${CDN}/isodata.json`).then((r) => r.json()),
			fetch(`${CDN}/isodata-nvidia-open.json`).then((r) => r.json())
		]).then(([std, nvidia]) => {
			standard = std;
			nvidiaOpen = nvidia;
			loading = false;
		});
		return () => cancelAnimationFrame(rafId);
	});

	const version = $derived(standard ? extractVersion(standard.name) : '');

	// deg/ms: 0.72 = ~2 rotations/sec
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

	function startSpin() {
		clearTimeout(spinTimer);
		speed.set(0.72);
		spinTimer = setTimeout(() => speed.set(0), 3000);
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

<div class="rounded-2xl border border-border bg-card p-6 shadow-sm">
	<!-- Header -->
	<div class="mb-6 flex items-center gap-3">
		<Disc3 class="h-10 w-10 shrink-0 text-muted-foreground" style="transform: rotate({rotation}deg)" />
		<div>
			<p class="font-semibold leading-tight">BlossomOS</p>
			{#if version}
				<p class="text-xs text-muted-foreground">v{version} · x86_64</p>
			{:else}
				<div class="mt-1 h-3 w-24 animate-pulse rounded bg-muted"></div>
			{/if}
		</div>
	</div>

	<!-- ISO options -->
	<div class="flex flex-col gap-2">
		{#each isos as iso (iso.label)}
			<div
				class="flex items-center justify-between gap-4 rounded-xl border px-4 py-3 transition-colors {iso.recommended
					? 'border-green-500/30 bg-green-500/5'
					: 'border-border'}"
			>
				<div class="min-w-0">
					<div class="flex items-center gap-2">
						<span class="text-sm font-medium">{iso.label}</span>
						<span class="rounded-md bg-muted px-1.5 py-0.5 text-xs text-muted-foreground"
							>{iso.gpu}</span
						>
						{#if iso.recommended}
							<span
								class="rounded-full bg-green-500/15 px-2 py-0.5 text-xs font-medium text-green-500"
							>
								{m.recommended()}
							</span>
						{/if}
					</div>
					{#if iso.data}
						<details class="mt-0.5">
							<summary class="cursor-pointer text-xs text-muted-foreground hover:text-foreground"
								>SHA256</summary
							>
							<p class="mt-1 break-all font-mono text-xs text-muted-foreground">
								{iso.data.sha256}
							</p>
						</details>
					{/if}
				</div>

				{#if loading || !iso.data}
					<div class="h-8 w-28 shrink-0 animate-pulse rounded-lg bg-muted"></div>
				{:else}
					<a href="{CDN}/{iso.data.name}" download class="shrink-0" onclick={startSpin}>
						<Button variant={iso.recommended ? 'primary' : 'default'} size="sm">
							<Download />
							{m.download_button()}
						</Button>
					</a>
				{/if}
			</div>
		{/each}
	</div>
</div>
