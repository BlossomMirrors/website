<script lang="ts">
	import type { Snippet } from 'svelte';

	import WindowControl from './window-control.svelte';
	import { cn } from '$lib/utils.js';

	let {
		title,
		icon,
		bgClass = 'bg-card',
		children
	}: {
		title: string;
		icon?: string;
		bgClass?: string;
		children: Snippet;
	} = $props();
</script>

<div
	role="dialog"
	aria-label={title}
	tabindex="-1"
	class={cn(
		'pointer-events-auto flex flex-col overflow-hidden rounded-[12px] border border-border shadow-2xl',
		'animate-in duration-150 ease-out zoom-in-95 fade-in',
		bgClass
	)}
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
			<WindowControl type="minimize" />
			<WindowControl type="maximize" />
			<WindowControl type="close" />
		</div>
	</div>

	<!-- Content -->
	<div class="flex min-h-0 flex-1 flex-col overflow-hidden">
		{@render children()}
	</div>
</div>
