<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';
	import SectionHeader from '$lib/components/typography/section-header.svelte';
	import type { HeadingText } from '$lib/components/typography/heading.svelte';
	import type { IconComponent } from '$lib/components/elements/icon-tile.svelte';

	let {
		eyebrow,
		title,
		subtitle,
		icon,
		class: className,
		actions,
		children
	}: {
		eyebrow?: string;
		title: HeadingText;
		subtitle?: string;
		icon?: IconComponent;
		class?: string;
		actions?: Snippet;
		children?: Snippet;
	} = $props();
</script>

<SectionHeader
	level={1}
	size="xl"
	align="center"
	{eyebrow}
	{title}
	{icon}
	body={subtitle}
	{actions}
	class={cn('mx-auto max-w-3xl', className)}
>
	{@render children?.()}
</SectionHeader>
