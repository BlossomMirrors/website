<script lang="ts">
	import type { Component } from 'svelte';

	let {
		icon,
		label,
		active = false
	}: {
		icon: Component<{ size?: number; class?: string }>;
		label: string;
		active?: boolean;
	} = $props();

	const Icon = $derived(icon);
</script>

<div
	class="cursor-custom my-1.5 flex w-full items-center gap-1.5 rounded-sidebar-item px-2 py-1 text-left text-xs transition-colors {active
		? 'bg-accent/15 font-bold text-accent hover:bg-accent/10'
		: 'text-foreground/70 hover:bg-foreground/10'}"
>
	<Icon size={16} class="shrink-0" />
	<span class="truncate">{label}</span>
</div>
