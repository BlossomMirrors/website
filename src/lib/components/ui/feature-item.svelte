<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import * as m from '$lib/paraglide/messages';
	import type { Component } from 'svelte';
	let { Icon, img, label, done = true, delay = 0, color = 'primary' }: {
		Icon?: Component<{ size?: number; strokeWidth?: number }>;
		img?: import('vite-imagetools').Picture;
		label: string;
		done?: boolean;
		delay?: number;
		color?: 'primary' | 'amber';
	} = $props();

	const iconClass = $derived(
		!done
			? 'bg-muted text-muted-foreground'
			: color === 'amber'
			? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
			: 'bg-primary/10 text-primary'
	);
</script>

<div
	class="flex items-center gap-3 rounded-xl border border-border bg-card/80 px-4 py-4"
	use:reveal={delay}
>
	<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg {iconClass}">
		{#if img}
			<enhanced:img src={img} alt="" sizes="20px" class="h-5 w-5 object-contain" />
		{:else if Icon}
			<Icon size={16} strokeWidth={1.5} />
		{/if}
	</div>
	<div>
		<p class="text-sm font-medium">{label}</p>
		{#if !done}
			<p class="text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
				{m.coming_soon()}
			</p>
		{/if}
	</div>
</div>
