<script lang="ts" module>
	export type GlowTone = 'primary' | 'destructive' | 'amber' | 'red';
</script>

<script lang="ts">
	import { reveal as revealAction } from '$lib/actions/reveal';
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		tone = 'primary',
		size = 'lg',
		accent,
		reveal = 0,
		class: className,
		decoration,
		children
	}: {
		tone?: GlowTone;
		size?: 'md' | 'lg';
		accent?: string;
		reveal?: number | false;
		class?: string;
		decoration?: Snippet;
		children: Snippet;
	} = $props();

	const tones: Record<GlowTone, { gradient: string; glow: string }> = {
		primary: { gradient: 'from-primary/10 via-primary/5', glow: 'bg-primary/8' },
		destructive: { gradient: 'from-destructive/10 via-destructive/5', glow: 'bg-destructive/8' },
		amber: { gradient: 'from-amber-500/10 via-orange-500/5', glow: 'bg-amber-500/8' },
		red: { gradient: 'from-red-500/10 via-orange-500/5', glow: 'bg-red-500/8' }
	};
</script>

<div
	class={cn(
		'relative overflow-hidden rounded-3xl bg-linear-to-br to-transparent',
		tones[tone].gradient,
		size === 'lg' ? 'p-10 md:p-16' : 'p-8 md:p-12',
		className
	)}
	use:revealAction={reveal}
>
	<div
		class={cn(
			'pointer-events-none absolute rounded-full blur-3xl',
			tones[tone].glow,
			size === 'lg' ? '-top-16 -right-16 size-64' : '-top-12 -right-12 size-48'
		)}
	></div>
	{#if accent}
		<div
			class={cn(
				'pointer-events-none absolute -bottom-12 left-1/3 size-48 rounded-full blur-3xl',
				accent
			)}
		></div>
	{/if}
	{@render decoration?.()}
	<div class="relative">
		{@render children()}
	</div>
</div>
