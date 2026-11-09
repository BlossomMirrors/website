<script lang="ts" module>
	import type { IconComponent } from '$lib/components/elements/icon-tile.svelte';

	export type Feature = {
		icon?: IconComponent;
		title: string;
		body: string;
		eyebrow?: string;
		badge?: string;
		href?: string;
		cta?: string;
	};

	export type FeatureCardSize = 'sm' | 'md' | 'lg';
</script>

<script lang="ts">
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
	import { cn } from '$lib/utils';
	import Card from './card.svelte';
	import IconTile from '$lib/components/elements/icon-tile.svelte';
	import Badge from '$lib/components/elements/badge.svelte';
	import Eyebrow from '$lib/components/typography/eyebrow.svelte';

	let {
		icon,
		title,
		body,
		eyebrow,
		badge,
		href,
		cta,
		size = 'md',
		reveal = false,
		class: className
	}: Feature & { size?: FeatureCardSize; reveal?: number | false; class?: string } = $props();

	const paddings: Record<FeatureCardSize, string> = {
		sm: 'p-6',
		md: 'p-7',
		lg: 'p-7 md:p-9'
	};
</script>

<Card {href} {reveal} class={cn('flex h-full flex-col', paddings[size], className)}>
	{#if icon}
		<IconTile {icon} size={size === 'sm' ? 'sm' : 'md'} class={size === 'sm' ? 'mb-4' : 'mb-5'} />
	{/if}
	<div class="flex-1">
		{#if eyebrow}
			<Eyebrow class="mb-1">{eyebrow}</Eyebrow>
		{/if}
		<div class="flex items-center gap-2">
			<h3 class="font-semibold">{title}</h3>
			{#if badge}
				<Badge tone="muted" class="text-[10px] font-semibold tracking-wide uppercase">{badge}</Badge
				>
			{/if}
		</div>
		<p class="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
	</div>
	{#if href}
		<div class="mt-6 flex items-center gap-1 text-sm font-medium text-primary">
			{cta}
			<ArrowRightIcon size={14} class="transition-transform group-hover:translate-x-1" />
		</div>
	{/if}
</Card>
