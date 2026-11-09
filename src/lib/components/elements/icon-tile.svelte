<script lang="ts" module>
	import type { Component } from 'svelte';

	export type IconComponent = Component<{ size?: number; strokeWidth?: number; class?: string }>;
	export type IconTileSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	export type IconTileTone = 'primary' | 'muted' | 'amber' | 'red';
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		icon: Icon,
		size = 'md',
		tone = 'primary',
		class: className,
		children
	}: {
		icon?: IconComponent;
		size?: IconTileSize;
		tone?: IconTileTone;
		class?: string;
		children?: Snippet;
	} = $props();

	const sizes: Record<IconTileSize, { box: string; icon: number }> = {
		xs: { box: 'size-8 rounded-lg', icon: 16 },
		sm: { box: 'size-9 rounded-xl', icon: 18 },
		md: { box: 'size-10 rounded-xl', icon: 20 },
		lg: { box: 'size-12 rounded-2xl', icon: 24 },
		xl: { box: 'size-16 rounded-2xl', icon: 32 }
	};

	const tones: Record<IconTileTone, string> = {
		primary: 'bg-primary/10 text-primary',
		muted: 'bg-muted text-muted-foreground',
		amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
		red: 'bg-red-500/10 text-red-500'
	};
</script>

<div
	class={cn('flex shrink-0 items-center justify-center', sizes[size].box, tones[tone], className)}
>
	{#if children}
		{@render children()}
	{:else if Icon}
		<Icon size={sizes[size].icon} strokeWidth={1.5} />
	{/if}
</div>
