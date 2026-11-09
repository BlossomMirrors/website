<script lang="ts">
	import Taskbar from '$lib/components/desktop/taskbar.svelte';
	import FolderWidget from '$lib/components/desktop/folder-widget.svelte';
	import DolphinWindow from '$lib/components/desktop/dolphin-window.svelte';
	import KamosoWindow from '$lib/components/desktop/kamoso-window.svelte';
	import noiseSrc from '$lib/assets/noise.png';
	import { cn } from '$lib/utils.js';
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
	<div
		class={cn(
			'pointer-events-none absolute inset-0 z-50 bg-black',
			'animate-out delay-840 duration-560 ease-out fill-mode-forwards fade-out'
		)}
	></div>
	<!-- custom cursor-->
	<div class="cursor-custom absolute inset-0" aria-hidden="true"></div>
	<FolderWidget />
	<div class="absolute top-[3%] left-[16%] hidden h-[78%] w-[58%] xl:block">
		<KamosoWindow />
	</div>
	<div
		class="absolute top-3 right-3 bottom-16 left-3 sm:top-6 sm:right-6 sm:bottom-20 sm:left-6 xl:top-auto xl:right-[2%] xl:bottom-[14%] xl:left-auto xl:w-[70%]"
	>
		<DolphinWindow />
	</div>
	<Taskbar />
	<div class="glare-sweep pointer-events-none absolute inset-0 z-200" aria-hidden="true"></div>
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
		/* `both` holds the stripe above the screen during the delay instead of flashing it in place */
		animation: glare-sweep 1.5s 1.6s ease-in-out both;
	}
</style>
