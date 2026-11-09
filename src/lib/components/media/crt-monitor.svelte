<script lang="ts">
	import { onMount } from 'svelte';
	import crtPng from '$lib/assets/crt.png';
	import wallpaperDark from '$lib/assets/wallpaper-dark.png';
	import wallpaperLight from '$lib/assets/wallpaper-light.png';
	import ThemedImage from './themed-image.svelte';

	let crtEl = $state<HTMLDivElement | null>(null);
	let lit = $state(false);

	onMount(() => {
		const io = new IntersectionObserver(
			([e]) => {
				if (e.isIntersecting) {
					lit = true;
					io.disconnect();
				}
			},
			{ threshold: 0.3 }
		);
		if (crtEl) io.observe(crtEl);

		return () => io.disconnect();
	});
</script>

<div class="relative md:-my-16 md:-mr-8" bind:this={crtEl}>
	<div
		class="relative mx-auto max-w-lg overflow-hidden md:max-w-none"
		style="aspect-ratio: 2445/2312"
	>
		<ThemedImage
			dark={wallpaperDark}
			light={wallpaperLight}
			alt="BlossomOS desktop"
			sizes="(min-width: 768px) 50vw, 100vw"
			class="absolute inset-0 size-full object-cover"
			style="clip-path: inset(9% 12% 25% 12% round 4px); transform: scale(1.14); transform-origin: center center; object-position: center calc(50% - 25px)"
		/>
		<div
			class="pointer-events-none absolute"
			style="inset: 11% 13.5% 27% 13.5%; background: repeating-linear-gradient(transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)"
		></div>
		<div
			class="crt-overlay pointer-events-none absolute inset-0 size-full"
			class:lit
			style="clip-path: inset(9% 12% 25% 12% round 4px); background: black; transform: scale(1.14); transform-origin: center center"
		></div>
		<enhanced:img
			src={crtPng}
			alt="CRT monitor"
			sizes="(min-width: 768px) 50vw, 100vw"
			class="pointer-events-none absolute inset-0 size-full"
			style="object-fit: fill"
		/>
		<div
			class="crt-led pointer-events-none absolute rounded-sm"
			class:lit
			style="left: 86.67%; top: 85.26%; width: 1.35%; height: 0.3%"
		></div>
	</div>
</div>

<style>
	@keyframes crt-on {
		0% {
			opacity: 1;
		}
		6% {
			opacity: 0.05;
		}
		8% {
			opacity: 1;
		}
		16% {
			opacity: 0.08;
		}
		18% {
			opacity: 1;
		}
		45% {
			opacity: 1;
		}
		52% {
			opacity: 0.35;
		}
		56% {
			opacity: 1;
		}
		62% {
			opacity: 0;
		}
		70% {
			opacity: 0.12;
		}
		78% {
			opacity: 0;
		}
		100% {
			opacity: 0;
		}
	}

	.crt-overlay {
		opacity: 1;
	}
	.crt-overlay.lit {
		animation: crt-on 1.8s ease-out forwards;
	}

	.crt-led {
		background: #1a3a1a;
		box-shadow: none;
		transition:
			background 0.3s ease 1.6s,
			box-shadow 0.3s ease 1.6s;
	}
	.crt-led.lit {
		background: #00e040;
		box-shadow:
			0 0 2px 1px #00e040,
			0 0 8px 3px #00e040cc,
			0 0 18px 6px #00ff6066,
			0 0 36px 10px #00ff6033;
	}
</style>
