<script lang="ts">
	import { onMount } from 'svelte';
	import Taskbar from '$lib/components/hero/taskbar.svelte';
	import WallpaperReveal from '$lib/components/hero/wallpaper-reveal.svelte';
	import Widgets from '$lib/components/hero/widgets.svelte';
	import DolphinWindow from '$lib/components/hero/dolphin-window.svelte';
	import KamosoWindow from '$lib/components/hero/kamoso-window.svelte';
	import { getDiscord, getEmail } from '$lib/utils';
	import noiseSrc from '$lib/assets/noise.png?enhanced';

	let dolphinOpen = $state(false);
	let kamosoOpen = $state(false);
	let isMobile = $state(false);
	let heroEl = $state<HTMLDivElement | null>(null);

	let nextZ = 30;
	let dolphinZ = $state(30);
	let kamosoZ = $state(30);

	onMount(() => {
		const ro = new ResizeObserver(([entry]) => {
			isMobile = entry.contentRect.width < 768;
		});
		if (heroEl) ro.observe(heroEl);
		return () => ro.disconnect();
	});

	function handleIconClick(label: string) {
		if (label === 'Dolphin' && !isMobile) {
			dolphinOpen = true;
			dolphinZ = ++nextZ;
		}
		if (label === 'Kamoso' && !isMobile) {
			kamosoOpen = true;
			kamosoZ = ++nextZ;
		}
		if (label === 'Thunderbird') window.open('mailto:' + getEmail(), '_blank');
		if (label === 'Arc Software') location.href = '/arc';
		if (label === 'Discord') window.open(getDiscord(), '_blank');
	}
</script>

<div
	bind:this={heroEl}
	class="cursor-custom relative z-0 aspect-video overflow-hidden rounded-2xl md:max-h-100 lg:max-h-120 xl:max-h-140 2xl:max-h-full"
>
	<enhanced:img
		src={noiseSrc}
		alt=""
		aria-hidden="true"
		sizes="100vw"
		class="pointer-events-none absolute inset-0 h-full w-full object-cover"
	/>
	<div class="animate-screen-on pointer-events-none absolute inset-0 z-50 bg-black"></div>
	<WallpaperReveal />
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
	<Taskbar onIconClick={handleIconClick} />
</div>

<style>
	.cursor-custom {
		cursor:
			url('/cursor/left_ptr.svg') 0 0,
			auto;
	}
</style>
