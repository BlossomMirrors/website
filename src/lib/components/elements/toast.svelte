<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { IconComponent } from './icon-tile.svelte';

	let { message, icon: Icon }: { message: string | null; icon?: IconComponent } = $props();
</script>

{#if message}
	<div
		transition:fly={{ y: 16, duration: 250 }}
		class="fixed right-4 bottom-4 z-50 flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-lg"
	>
		{#if Icon}
			<Icon size={16} class="shrink-0 text-primary" />
		{/if}
		<span class="text-sm font-medium">{message}</span>
	</div>
{/if}
