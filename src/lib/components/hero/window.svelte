<script lang="ts">
	import type { Snippet } from 'svelte';
	import { mode } from 'mode-watcher';
	import WindowControl from './window-control.svelte';

	let {
		title,
		icon,
		closable = true,
		bgClass = 'bg-card',
		children
	}: {
		title: string;
		icon?: string;
		closable?: boolean;
		bgClass?: string;
		children: Snippet;
	} = $props();

	const isDark = $derived(mode.current === 'dark');
	let closing = $state(false);

	function handleClose() {
		if (!closable || !children || closing) return;
		closing = true;
		setTimeout(() => children(), 140);
	}
</script>

<div
	role="dialog"
	aria-label={title}
	tabindex="-1"
	class="win pointer-events-auto flex flex-col overflow-hidden rounded-[12px] border border-border shadow-2xl {bgClass}"
	class:closing
>
	<!-- Title bar -->
	<div class="cursor-custom flex h-9 shrink-0 items-center justify-between px-2.5 select-none">
		<div class="flex items-center gap-2">
			{#if icon}
				<enhanced:img src={icon} class="pointer-events-none size-4" alt="" />
			{/if}
			<span class="text-xs text-foreground">{title}</span>
		</div>
		<div class="cursor-custom flex items-center gap-2">
			<WindowControl type="minimize" {isDark} />
			<WindowControl type="maximize" {isDark} />
			<WindowControl type="close" {isDark} onclick={handleClose} />
		</div>
	</div>

	<!-- Content -->
	<div class="flex min-h-0 flex-1 flex-col overflow-hidden">
		{@render children()}
	</div>
</div>

<style>
	@keyframes win-open {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
	@keyframes win-close {
		from {
			opacity: 1;
			transform: scale(1);
		}
		to {
			opacity: 0;
			transform: scale(0.95);
		}
	}
	.win {
		animation: win-open 150ms ease-out forwards;
		transform-origin: center;
	}
	.win.closing {
		animation: win-close 140ms ease-in forwards;
	}
</style>
