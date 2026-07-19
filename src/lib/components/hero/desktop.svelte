<script lang="ts">
	import { onMount } from 'svelte';
	import Taskbar from '$lib/components/hero/taskbar.svelte';
	import Widgets from '$lib/components/hero/widgets.svelte';
	import DolphinWindow from '$lib/components/hero/dolphin-window.svelte';
	import KamosoWindow from '$lib/components/hero/kamoso-window.svelte';
	import noiseSrc from '$lib/assets/noise.png?enhanced';

	let dolphinOpen = $state(true);
	let kamosoOpen = $state(true);
	let isMobile = $state(false);
	let heroEl = $state<HTMLDivElement | null>(null);

	let nextZ = 31;
	let dolphinZ = $state(31);
	let kamosoZ = $state(30);

	onMount(() => {
		const ro = new ResizeObserver(([entry]) => {
			isMobile = entry.contentRect.width < 768;
		});
		if (heroEl) ro.observe(heroEl);
		return () => ro.disconnect();
	});
</script>

<div
	bind:this={heroEl}
	class="pointer-events-none relative z-0 aspect-video overflow-hidden rounded-2xl md:max-h-100 lg:max-h-120 xl:max-h-140 2xl:max-h-full"
>
	<enhanced:img
		src={noiseSrc}
		alt=""
		aria-hidden="true"
		sizes="100vw"
		class="pointer-events-none absolute inset-0 h-full w-full object-cover"
	/>
	<div class="animate-screen-on pointer-events-none absolute inset-0 z-50 bg-black"></div>
	<Widgets />
	{#if dolphinOpen}
		<DolphinWindow
			onClose={() => (dolphinOpen = false)}
			zIndex={dolphinZ}
			onFocus={() => (dolphinZ = ++nextZ)}
		/>
	{/if}
	{#if kamosoOpen && !isMobile}
		<KamosoWindow
			onClose={() => (kamosoOpen = false)}
			zIndex={kamosoZ}
			onFocus={() => (kamosoZ = ++nextZ)}
		/>
	{/if}
	<Taskbar />
	<!-- Keeps the custom cursor visible over the inert desktop instead of the browser default -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="cursor-custom absolute inset-0 z-[100]"
		aria-hidden="true"
		onpointerdown={(e) => e.stopPropagation()}
		onpointermove={(e) => e.stopPropagation()}
		onpointerup={(e) => e.stopPropagation()}
	></div>
</div>
