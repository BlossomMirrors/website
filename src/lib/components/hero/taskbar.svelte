<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as m from '$lib/paraglide/messages';

	let { onIconClick }: { onIconClick?: (label: string) => void } = $props();

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
		},
		{
			src: '/taskbar/kamoso.png',
			label: 'Kamoso',
			subtitle: m.kamoso_tooltip()
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
		class="pointer-events-none absolute z-50 max-w-75 -translate-x-1/2 rounded-xl border border-black/10 bg-white/60 px-5 py-5 shadow-xl backdrop-blur-md dark:border-white/15 dark:bg-black/30"
		style="left: {tooltip.x}px; bottom: {tooltip.bottom + 4}px;"
	>
		<div class="text-md text-foreground">{tooltip.label}</div>
		<div class="mt-0.5 text-xs text-muted-foreground">{tooltip.subtitle}</div>
	</div>
{/if}

<div
	bind:this={taskbarEl}
	class="taskbar-slide-up absolute right-3 bottom-3 left-3 flex items-center justify-between rounded-2xl border border-black/10 bg-white/40 px-2 py-1 shadow-xl backdrop-blur-md select-none sm:right-6 sm:bottom-6 sm:left-6 sm:px-3 sm:py-1.5 dark:border-white/15 dark:bg-black/30"
>
	<div class="flex items-center gap-1.5 sm:gap-6">
		<img
			src="/taskbar/logo.svg"
			class="pointer-events-none h-6 w-6 shrink-0 invert sm:h-8 sm:w-8 dark:invert-0"
			alt="Logo"
		/>
		{#each icons as icon (icon.label)}
			<button
				class="cursor-custom h-7 w-7 shrink-0 rounded-xl p-0.5 transition-transform duration-150 hover:brightness-130 sm:h-10 sm:w-10 sm:p-1"
				onmouseenter={(e) => showTooltip(icon, e.currentTarget)}
				onmouseleave={() => (tooltip = null)}
				onclick={() => onIconClick?.(icon.label)}
			>
				<img src={icon.src} class="pointer-events-none h-full w-full" alt={icon.label} />
			</button>
		{/each}
	</div>

	<div class="hidden text-right leading-tight text-foreground sm:block">
		<div class="text-sm font-semibold">{timeStr}</div>
		<div class="text-xs text-foreground/60">{dateStr}</div>
	</div>
</div>

<style>
	@keyframes taskbar-in {
		from {
			transform: translateY(calc(100% + 1.5rem));
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}
	.taskbar-slide-up {
		animation: taskbar-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
		animation-delay: 1s;
		opacity: 0;
	}
</style>
