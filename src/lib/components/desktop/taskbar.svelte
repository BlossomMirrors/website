<script lang="ts">
	import { onMount } from 'svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { cn } from '$lib/utils.js';
	import SunIcon from '@lucide/svelte/icons/sun';
	import SmartphoneIcon from '@lucide/svelte/icons/smartphone';
	import Volume2Icon from '@lucide/svelte/icons/volume-2';
	import ChevronUpIcon from '@lucide/svelte/icons/chevron-up';

	import * as m from '$lib/paraglide/messages';
	import { LanIcon } from '$lib/components/icons/lan/index.svelte';
	import LogoMono from '$lib/components/brand/logo-mono.svelte';

	import dolphinPng from '$lib/assets/taskbar/dolphin.png';
	import heliumPng from '$lib/assets/taskbar/helium.png';
	import thunderbirdPng from '$lib/assets/taskbar/thunderbird.png';
	import arcPng from '$lib/assets/taskbar/arc.png';
	import discordPng from '$lib/assets/taskbar/discord.png';
	import obsidianPng from '$lib/assets/taskbar/obsidian.png';
	import libreofficePng from '$lib/assets/taskbar/libreoffice.png';
	import steamPng from '$lib/assets/taskbar/steam.png';
	import kamosoPng from '$lib/assets/taskbar/kamoso.png';

	const icons = [
		{ src: dolphinPng, label: 'Dolphin', subtitle: m.dolphin_tooltip() },
		{ src: heliumPng, label: 'Helium', subtitle: m.helium_tooltip() },
		{ src: thunderbirdPng, label: 'Thunderbird', subtitle: m.thunderbird_tooltip() },
		{ src: arcPng, label: 'Arc Software', subtitle: m.arc_tooltip() },
		{ src: discordPng, label: 'Discord', subtitle: m.discord_tooltip() },
		{ src: obsidianPng, label: 'Obsidian', subtitle: m.obsidian_tooltip() },
		{ src: libreofficePng, label: 'LibreOffice', subtitle: m.libreoffice_tooltip() },
		{ src: steamPng, label: 'Steam', subtitle: m.steam_tooltip() },
		{ src: kamosoPng, label: 'Kamoso', subtitle: m.kamoso_tooltip() }
	];

	let time = $state(new Date());

	onMount(() => {
		const interval = setInterval(() => (time = new Date()), 1000);
		return () => clearInterval(interval);
	});

	const timeStr = $derived(
		time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
	);
	const dateStr = $derived(
		time.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' })
	);
</script>

<div
	class={cn(
		'pointer-events-auto absolute right-3 bottom-3 left-3 flex items-center justify-between select-none',
		'px-2 py-1 sm:right-6 sm:bottom-6 sm:left-6 sm:px-3 sm:py-1.5',
		'rounded-2xl border border-black/10 bg-white/40 shadow-xl backdrop-blur-md',
		'dark:border-white/15 dark:bg-black/30',
		'animate-in fill-mode-both fade-in slide-in-from-bottom-[calc(100%+1.5rem)]',
		'delay-1000 duration-600 ease-[cubic-bezier(0.34,1.56,0.64,1)]'
	)}
>
	<div
		class="flex min-w-0 [scrollbar-width:none] items-center gap-1.5 overflow-x-auto sm:gap-6 [&::-webkit-scrollbar]:hidden"
	>
		<LogoMono class="pointer-events-none size-6 shrink-0 text-foreground sm:size-8" />
		{#each icons as icon (icon.label)}
			<Tooltip.Root>
				<Tooltip.Trigger
					class="cursor-custom size-7 shrink-0 rounded-xl p-0.5 transition-transform duration-150 hover:brightness-130 sm:size-10 sm:p-1"
					aria-label={icon.label}
				>
					<enhanced:img
						src={icon.src}
						class="pointer-events-none size-full"
						sizes="40px"
						alt={icon.label}
					/>
				</Tooltip.Trigger>
				<Tooltip.Content
					sideOffset={4}
					arrowClasses="hidden"
					class={cn(
						'max-w-75 flex-col items-start gap-0.5 p-5 text-foreground',
						'rounded-xl border border-black/10 bg-white/60 shadow-xl backdrop-blur-md',
						'dark:border-white/15 dark:bg-black/30'
					)}
				>
					<div class="text-base">{icon.label}</div>
					<div class="text-xs text-foreground/70">{icon.subtitle}</div>
				</Tooltip.Content>
			</Tooltip.Root>
		{/each}
	</div>

	<div class="hidden items-center gap-3 sm:flex">
		<div class="flex items-center gap-3 text-foreground">
			<ChevronUpIcon size={18} class="hover:brightness-150" />
			<SunIcon size={18} class="hover:brightness-150" />
			<SmartphoneIcon size={18} class="hover:brightness-150" />
			<Volume2Icon size={18} class="hover:brightness-150" />
			<LanIcon size={18} class="hover:brightness-150" />
		</div>
		<div class="ml-1 text-right leading-tight text-foreground">
			<div class="text-sm font-semibold">{timeStr}</div>
			<div class="text-xs text-foreground/60">{dateStr}</div>
		</div>
	</div>
</div>
