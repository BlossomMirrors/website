<script lang="ts">
	import { onMount } from 'svelte';
	import Taskbar from '$lib/components/hero/taskbar.svelte';
	import WallpaperReveal from '$lib/components/hero/wallpaper-reveal.svelte';
	import Widgets from '$lib/components/hero/widgets.svelte';
	import DolphinWindow from '$lib/components/hero/dolphin-window.svelte';
	import KamosoWindow from '$lib/components/hero/kamoso-window.svelte';
	import FreedomSection from '$lib/components/home/freedom-section.svelte';
	import ArcSection from '$lib/components/home/arc-section.svelte';
	import GamingSection from '$lib/components/home/gaming-section.svelte';
	import FoundationSection from '$lib/components/home/foundation-section.svelte';
	import DesignSection from '$lib/components/home/design-section.svelte';
	import CrtSection from '$lib/components/home/crt-section.svelte';
	import CloudSection from '$lib/components/home/cloud-section.svelte';
	import BusinessSection from '$lib/components/home/business-section.svelte';
	import LessMoreSection from '$lib/components/home/less-more-section.svelte';
	import CommunitySection from '$lib/components/home/community-section.svelte';
	import DownloadCta from '$lib/components/home/download-cta.svelte';
	import { Button } from '$lib/components/ui/button';
	import DownloadIcon from '@lucide/svelte/icons/download';
	import * as m from '$lib/paraglide/messages';
	import DownloadCard from '$lib/components/home/download-card.svelte';

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
		if (label === 'Helium') window.open('https://helium.computer', '_blank');
		if (label === 'Thunderbird') window.open('https://thunderbird.net', '_blank');
		if (label === 'Arc Software') location.href = '/arc';
		if (label === 'Discord') window.open('https://discord.com', '_blank');
		if (label === 'Obsidian') window.open('https://obsidian.md', '_blank');
		if (label === 'LibreOffice') window.open('https://www.libreoffice.org', '_blank');
		if (label === 'Steam') window.open('https://store.steampowered.com', '_blank');
	}
</script>

<div class="mb-4">
	<div
		bind:this={heroEl}
		style="background: url('/noise.png') center center / cover no-repeat;"
		class="cursor-custom relative z-0 aspect-square overflow-hidden rounded-2xl sm:aspect-video"
	>
		<div class="pointer-events-none absolute inset-0 bg-white/50 dark:hidden"></div>
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

	<div class="mt-8 grid grid-cols-1 items-end gap-6 md:grid-cols-2 md:gap-12">
		<div>
			<h1 class="font-serif text-5xl leading-none sm:text-7xl md:text-8xl">BlossomOS</h1>
			<p class="mt-3 text-lg leading-relaxed text-muted-foreground md:text-xl">
				{m.home_subtitle()}
			</p>
		</div>
		<div>
			<DownloadCard />
		</div>
	</div>
</div>

<FreedomSection />
<ArcSection />
<GamingSection />
<FoundationSection />
<DesignSection />
<CrtSection />
<CloudSection />
<BusinessSection />
<LessMoreSection />
<CommunitySection />
<DownloadCta />

<style>
	.cursor-custom {
		cursor:
			url('/cursor/left_ptr.svg') 0 0,
			auto;
	}

	@keyframes screen-on {
		0% {
			opacity: 1;
		}
		60% {
			opacity: 1;
		}
		100% {
			opacity: 0;
			pointer-events: none;
		}
	}

	:global(.animate-screen-on) {
		animation: screen-on 1.4s ease-out forwards;
	}
</style>
