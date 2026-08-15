<script lang="ts">
	import Taskbar from '$lib/components/hero/taskbar.svelte';
	import Widgets from '$lib/components/hero/widgets.svelte';
	import DolphinWindow from '$lib/components/hero/dolphin-window.svelte';
	import KamosoWindow from '$lib/components/hero/kamoso-window.svelte';
	import noiseSrc from '$lib/assets/noise.png';
	import { reveal } from '$lib/actions/reveal';

	import { Tween } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';

	const y = new Tween(-100, { duration: 1000, easing: cubicInOut });

	$effect(() => {
		setTimeout(() => y.set(100), 1100);
	});
</script>

<div
	class="pointer-events-none relative z-0 aspect-video overflow-hidden rounded-2xl md:max-h-100 lg:max-h-120 xl:max-h-140 2xl:max-h-full"
>
	<enhanced:img
		src={noiseSrc}
		alt="noise wallpaper"
		aria-hidden="true"
		sizes="100vw"
		fetchpriority="high"
		class="pointer-events-none absolute inset-0 size-full object-cover"
	/>
	<div class="animate-screen-on pointer-events-none absolute inset-0 z-50 bg-black"></div>
	<!-- custom cursor-->
	<div
		class="cursor-custom absolute inset-0"
		aria-hidden="true"
		onpointerdown={(e) => e.stopPropagation()}
		onpointermove={(e) => e.stopPropagation()}
		onpointerup={(e) => e.stopPropagation()}
	></div>
	<Widgets />
	<div class="absolute top-[3%] left-[16%] hidden h-[78%] w-[58%] xl:block">
		<KamosoWindow />
	</div>
	<div
		class="absolute top-3 right-3 bottom-16 left-3 sm:top-6 sm:right-6 sm:bottom-20 sm:left-6 xl:top-auto xl:right-[2%] xl:bottom-[14%] xl:left-auto xl:w-[70%]"
	>
		<DolphinWindow />
	</div>
	<Taskbar />
	<div
		use:reveal
		class="glare-sweep pointer-events-none absolute inset-0 z-200"
		style="transform: translateY({y.current}%)"
		aria-hidden="true"
	></div>
</div>

<style>
	@keyframes glare-sweep {
		from {
			transform: translateY(-100%);
		}
		to {
			transform: translateY(100%);
		}
	}
	.glare-sweep {
		background: linear-gradient(
			180deg,
			transparent 0%,
			transparent 20%,
			rgba(255, 255, 255, 0.06) 35%,
			rgba(255, 255, 255, 0.22) 48%,
			rgba(255, 255, 255, 0.28) 50%,
			rgba(255, 255, 255, 0.22) 52%,
			rgba(255, 255, 255, 0.06) 65%,
			transparent 80%,
			transparent 100%
		);
		animation: glare-sweep 1.5s 1.6s ease-in-out forwards;
	}
</style>
