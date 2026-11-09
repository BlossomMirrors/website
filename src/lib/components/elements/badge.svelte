<script lang="ts" module>
	export type BadgeTone =
		'primary' | 'soft' | 'muted' | 'outline' | 'primary-outline' | 'destructive';
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		tone = 'primary',
		class: className,
		children
	}: { tone?: BadgeTone; class?: string; children: Snippet } = $props();

	const tones: Record<BadgeTone, string> = {
		primary: 'bg-primary/15 text-primary',
		soft: 'bg-primary/10 text-primary',
		muted: 'bg-muted text-muted-foreground',
		outline: 'border border-border text-muted-foreground',
		'primary-outline': 'border border-primary/30 bg-primary/10 text-primary',
		destructive: 'border border-destructive/30 bg-destructive/10 text-destructive'
	};
</script>

<span
	class={cn(
		'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium',
		tones[tone],
		className
	)}
>
	{@render children()}
</span>
