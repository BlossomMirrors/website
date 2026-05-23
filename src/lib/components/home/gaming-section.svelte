<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { onMount } from 'svelte';
	import * as m from '$lib/paraglide/messages';
	import steamPng from '$lib/assets/taskbar/steam.png?enhanced';

	let videoEl = $state<HTMLVideoElement | null>(null);
	let canvasEl = $state<HTMLCanvasElement | null>(null);

	onMount(() => {
		const video = videoEl!;
		const canvas = canvasEl!;
		const ctx = canvas.getContext('2d')!;
		let raf: number;

		function draw() {
			if (video.readyState >= 2) {
				ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
			}
			raf = requestAnimationFrame(draw);
		}

		draw();
		return () => cancelAnimationFrame(raf);
	});

	const highlights = [
		{ label: m.gaming_steam(), icon: steamPng },
		{ label: m.gaming_proton() },
		{ label: m.gaming_native() },
		{ label: m.gaming_performance() }
	];
</script>

<section class="my-16 py-10 md:py-16">
	<div class="grid items-center gap-12 md:grid-cols-2 md:gap-16">
		<div use:reveal>
			<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">
				{m.gaming_subheader()}
			</p>
			<h2 class="font-serif text-5xl leading-tight md:text-6xl">
				{m.gaming_header1()}<br />{m.gaming_header2()}
			</h2>
			<p class="mt-6 text-lg leading-relaxed text-muted-foreground">
				{m.gaming_description()}
			</p>
			<div class="mt-8 flex flex-wrap gap-3">
				{#each highlights as h, i (i)}
					<div
						class="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium"
						use:reveal={100 + i * 60}
					>
						{#if h.icon}
							<enhanced:img src={h.icon} alt="" sizes="16px" class="h-4 w-4 object-contain" />
						{/if}
						{h.label}
					</div>
				{/each}
			</div>
		</div>
		<div class="relative" use:reveal={120}>
			<canvas
				bind:this={canvasEl}
				width="64"
				height="36"
				class="pointer-events-none absolute -inset-10 hidden sm:block"
				style="width: calc(100% + 5rem); height: calc(100% + 5rem); border-radius: 2rem; filter: blur(60px) saturate(1.2); opacity: 0.45"
			></canvas>
			<div class="overflow-hidden rounded-2xl md:justify-center lg:relative" style="z-index: 1">
				<video
					bind:this={videoEl}
					src="/gaming.webm"
					autoplay
					loop
					muted
					playsinline
					class="aspect-video w-full object-cover"
				></video>
			</div>
		</div>
	</div>
</section>
