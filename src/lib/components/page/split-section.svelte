<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';
	import Split from './split.svelte';
	import GlowPanel, { type GlowTone } from '$lib/components/panels/glow-panel.svelte';
	import SectionHeader from '$lib/components/typography/section-header.svelte';
	import type { HeadingSize, HeadingText } from '$lib/components/typography/heading.svelte';
	import type { IconComponent } from '$lib/components/elements/icon-tile.svelte';

	let {
		eyebrow,
		eyebrowClass,
		title,
		body,
		icon,
		size = 'lg',
		reverse = false,
		panel,
		accent,
		class: className,
		splitClass,
		heading,
		actions,
		children,
		aside
	}: {
		eyebrow?: string;
		eyebrowClass?: string;
		title?: HeadingText;
		body?: string | string[];
		icon?: IconComponent;
		size?: HeadingSize;
		reverse?: boolean;
		panel?: GlowTone;
		accent?: string;
		class?: string;
		splitClass?: string;
		heading?: Snippet;
		actions?: Snippet;
		children?: Snippet;
		aside: Snippet;
	} = $props();
</script>

{#snippet split()}
	<Split {reverse} reveal={!panel} class={cn(panel && 'gap-10 md:gap-10', splitClass)} {aside}>
		<SectionHeader
			{eyebrow}
			{eyebrowClass}
			{title}
			{body}
			{icon}
			{size}
			{heading}
			{actions}
			reveal={false}
		>
			{@render children?.()}
		</SectionHeader>
	</Split>
{/snippet}

<section class={cn('mt-24', className)}>
	{#if panel}
		<GlowPanel tone={panel} {accent}>
			{@render split()}
		</GlowPanel>
	{:else}
		{@render split()}
	{/if}
</section>
