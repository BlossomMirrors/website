<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';
	import SectionHeader from '$lib/components/typography/section-header.svelte';
	import type { HeadingSize, HeadingText } from '$lib/components/typography/heading.svelte';
	import type { IconComponent } from '$lib/components/elements/icon-tile.svelte';

	let {
		eyebrow,
		eyebrowClass,
		title,
		body,
		footnote,
		icon,
		size = 'lg',
		align = 'left',
		class: className,
		heading,
		actions,
		children
	}: {
		eyebrow?: string;
		eyebrowClass?: string;
		title?: HeadingText;
		body?: string | string[];
		footnote?: string;
		icon?: IconComponent;
		size?: HeadingSize;
		align?: 'left' | 'center';
		class?: string;
		heading?: Snippet;
		actions?: Snippet;
		children?: Snippet;
	} = $props();

	const hasHeader = $derived(Boolean(eyebrow || title || heading));
</script>

<section class={cn('mt-24', className)}>
	{#if hasHeader}
		<SectionHeader
			{eyebrow}
			{eyebrowClass}
			{title}
			{body}
			{footnote}
			{icon}
			{size}
			{align}
			{heading}
			{actions}
		/>
		{#if children}
			<div class="mt-12">
				{@render children()}
			</div>
		{/if}
	{:else}
		{@render children?.()}
	{/if}
</section>
