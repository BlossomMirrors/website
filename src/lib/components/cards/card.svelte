<script lang="ts">
	import { reveal as revealAction } from '$lib/actions/reveal';
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';
	import SmartLink from '$lib/components/elements/smart-link.svelte';

	let {
		href,
		reveal = false,
		class: className,
		children
	}: { href?: string; reveal?: number | false; class?: string; children: Snippet } = $props();

	const base = 'rounded-2xl border border-border bg-card p-7';
</script>

{#if href}
	<div class="h-full" use:revealAction={reveal}>
		<SmartLink
			{href}
			class={cn(
				base,
				'group flex h-full flex-col transition-colors hover:border-primary/30 hover:bg-primary/3',
				className
			)}
		>
			{@render children()}
		</SmartLink>
	</div>
{:else}
	<div class={cn(base, className)} use:revealAction={reveal}>
		{@render children()}
	</div>
{/if}
