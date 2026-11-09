<script lang="ts">
	import { reveal as revealAction } from '$lib/actions/reveal';
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';
	import Eyebrow from './eyebrow.svelte';
	import Heading, { type HeadingSize, type HeadingText } from './heading.svelte';
	import Lead from './lead.svelte';
	import Note from './note.svelte';
	import IconTile, { type IconComponent } from '$lib/components/elements/icon-tile.svelte';

	let {
		eyebrow,
		title,
		body,
		footnote,
		icon,
		size = 'lg',
		level = 2,
		align = 'left',
		reveal = 0,
		eyebrowClass,
		class: className,
		heading,
		actions,
		children
	}: {
		eyebrow?: string;
		title?: HeadingText;
		body?: string | string[];
		footnote?: string;
		icon?: IconComponent;
		size?: HeadingSize;
		level?: 1 | 2;
		align?: 'left' | 'center';
		reveal?: number | false;
		eyebrowClass?: string;
		class?: string;
		heading?: Snippet;
		actions?: Snippet;
		children?: Snippet;
	} = $props();

	const paragraphs = $derived(body === undefined ? [] : Array.isArray(body) ? body : [body]);
	const center = $derived(align === 'center');
	const bodyGap = $derived(size === 'xl' || size === 'lg' || size === 'display' ? 'mt-6' : 'mt-4');
</script>

<div class={cn(center && 'text-center', className)} use:revealAction={reveal}>
	{#if icon}
		<IconTile
			{icon}
			size={level === 1 ? 'xl' : 'lg'}
			class={cn(level === 1 ? 'mb-6' : 'mb-4', center && 'mx-auto')}
		/>
	{/if}
	{#if eyebrow}
		<Eyebrow class={eyebrowClass}>{eyebrow}</Eyebrow>
	{/if}
	<Heading {level} {size} text={title} children={heading} />
	{#each paragraphs as paragraph, i (i)}
		<Lead class={cn(i === 0 ? bodyGap : 'mt-4', center && 'mx-auto max-w-xl')}>{paragraph}</Lead>
	{/each}
	{@render children?.()}
	{#if actions}
		<div class={cn('mt-8 flex flex-wrap gap-3', center && 'justify-center')}>
			{@render actions()}
		</div>
	{/if}
	{#if footnote}
		<Note size="xs" class="mt-6">{footnote}</Note>
	{/if}
</div>
