<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';
	import SmartLink from './smart-link.svelte';

	let {
		href,
		tone = 'default',
		class: className,
		children
	}: {
		href: string;
		tone?: 'default' | 'primary';
		class?: string;
		children: Snippet;
	} = $props();
</script>

<SmartLink
	{href}
	class={cn(
		'underline underline-offset-2',
		tone === 'default'
			? 'text-foreground hover:text-primary'
			: 'text-primary hover:text-primary/80',
		className
	)}
>
	{@render children()}
</SmartLink>
