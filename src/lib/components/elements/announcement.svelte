<script lang="ts">
	import { reveal as revealAction } from '$lib/actions/reveal';
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
	import Badge from './badge.svelte';
	import TextLink from './text-link.svelte';
	import type { IconComponent } from './icon-tile.svelte';

	let {
		badge,
		icon: Icon,
		text,
		href,
		cta,
		reveal = 0
	}: {
		badge: string;
		icon?: IconComponent;
		text: string;
		href: string;
		cta: string;
		reveal?: number | false;
	} = $props();
</script>

<div
	class="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 text-center text-sm sm:text-base"
	use:revealAction={reveal}
>
	<Badge class="px-2.5 font-semibold tracking-wide uppercase">
		{#if Icon}
			<Icon size={12} />
		{/if}
		{badge}
	</Badge>
	<span class="text-foreground">{text}</span>
	<TextLink {href} tone="primary" class="inline-flex items-center gap-1 font-medium">
		{cta}
		<ArrowRightIcon size={14} />
	</TextLink>
</div>
