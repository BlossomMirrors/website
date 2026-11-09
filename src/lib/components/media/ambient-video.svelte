<script lang="ts">
	import { onMount } from 'svelte';

	let { src }: { src: string } = $props();

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
</script>

<div class="relative">
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
			{src}
			autoplay
			loop
			muted
			playsinline
			class="aspect-video w-full object-cover"
		></video>
	</div>
</div>
