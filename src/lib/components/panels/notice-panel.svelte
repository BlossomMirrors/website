<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';
	import GlowPanel from './glow-panel.svelte';
	import IconTile, { type IconComponent } from '$lib/components/elements/icon-tile.svelte';
	import Eyebrow from '$lib/components/typography/eyebrow.svelte';
	import Heading from '$lib/components/typography/heading.svelte';

	let {
		tone = 'primary',
		icon,
		eyebrow,
		title,
		class: className,
		action,
		children
	}: {
		tone?: 'primary' | 'red' | 'amber';
		icon?: IconComponent;
		eyebrow?: string;
		title: string;
		class?: string;
		action?: Snippet;
		children?: Snippet;
	} = $props();

	const eyebrowTones = {
		primary: 'text-primary',
		red: 'text-red-500',
		amber: 'text-amber-600 dark:text-amber-400'
	};
</script>

<GlowPanel {tone} size="md" class={className}>
	<div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
		<div class="flex items-start gap-4">
			{#if icon}
				<IconTile {icon} {tone} class="mt-1" />
			{/if}
			<div>
				{#if eyebrow}
					<Eyebrow class={cn('mb-1', eyebrowTones[tone])}>{eyebrow}</Eyebrow>
				{/if}
				<Heading size="xs" text={title} />
				{#if children}
					<p class="mt-2 max-w-xl text-base leading-relaxed text-muted-foreground">
						{@render children()}
					</p>
				{/if}
			</div>
		</div>
		{#if action}
			<div class="shrink-0">
				{@render action()}
			</div>
		{/if}
	</div>
</GlowPanel>
