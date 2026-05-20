<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as m from '$lib/paraglide/messages';

	const icons = [
		{ src: '/taskbar/dolphin.png', label: 'Dolphin', subtitle: m.dolphin_tooltip() },
		{ src: '/taskbar/helium.png', label: 'Helium', subtitle: m.helium_tooltip() },
		{ src: '/taskbar/thunderbird.png', label: 'Thunderbird', subtitle: m.thunderbird_tooltip() },
		{ src: '/taskbar/arc.png', label: 'Arc Software', subtitle: m.arc_tooltip() },
		{ src: '/taskbar/discord.png', label: 'Discord', subtitle: m.discord_tooltip() },
		{ src: '/taskbar/obsidian.png', label: 'Obsidian', subtitle: m.obsidian_tooltip() },
		{ src: '/taskbar/libreoffice.png', label: 'LibreOffice', subtitle: m.libreoffice_tooltip() },
		{
			src: '/taskbar/steam.png',
			label: 'Steam',
			subtitle: m.steam_tooltip()
		}
	];

	let time = $state(new Date());
	let interval: ReturnType<typeof setInterval>;

	onMount(() => {
		interval = setInterval(() => {
			time = new Date();
		}, 1000);
	});

	onDestroy(() => clearInterval(interval));

	const timeStr = $derived(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
	const dateStr = $derived(
		time.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })
	);

	let tooltip = $state<{ label: string; subtitle: string; x: number; bottom: number } | null>(null);
	let taskbarEl = $state<HTMLDivElement | null>(null);

	function showTooltip(icon: (typeof icons)[0], btn: HTMLButtonElement) {
		const btnRect = btn.getBoundingClientRect();
		const parentRect = taskbarEl!.parentElement!.getBoundingClientRect();
		tooltip = {
			label: icon.label,
			subtitle: icon.subtitle,
			x: btnRect.left + btnRect.width / 2 - parentRect.left,
			bottom: parentRect.bottom - btnRect.top
		};
	}
</script>

{#if tooltip}
	<div
		class="pointer-events-none absolute z-50 max-w-75 -translate-x-1/2 rounded-xl border dark:border-white/15 border-black/10 dark:bg-black/30 bg-white/60 px-5 py-5 shadow-xl backdrop-blur-md"
		style="left: {tooltip.x}px; bottom: {tooltip.bottom + 4}px;"
	>
		<div class="text-md text-foreground">{tooltip.label}</div>
		<div class="mt-0.5 text-xs text-muted-foreground">{tooltip.subtitle}</div>
	</div>
{/if}

<div
	bind:this={taskbarEl}
	class="absolute right-6 bottom-6 left-6 flex items-center justify-between rounded-2xl border dark:border-white/15 border-black/10 dark:bg-black/30 bg-white/40 px-3 py-1.5 shadow-xl backdrop-blur-md select-none"
>
	<div class="flex items-center gap-6">
		<img src="/taskbar/logo.svg" class="pointer-events-none h-8 w-8 dark:invert-0 invert" alt="Logo" />
		{#each icons as icon (icon.label)}
			<button
				class="cursor-custom h-10 w-10 rounded-xl p-1 transition-transform duration-150 hover:brightness-130"
				onmouseenter={(e) => showTooltip(icon, e.currentTarget)}
				onmouseleave={() => (tooltip = null)}
			>
				<img src={icon.src} class="pointer-events-none h-full w-full" alt={icon.label} />
			</button>
		{/each}
	</div>

	<div class="text-right leading-tight text-foreground">
		<div class="text-sm font-semibold">{timeStr}</div>
		<div class="text-xs text-foreground/60">{dateStr}</div>
	</div>
</div>
