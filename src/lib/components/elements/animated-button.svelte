<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import ArrowRight from '$lib/components/icons/animated/arrow-right.svelte';
	import Download from '$lib/components/icons/animated/download.svelte';

	let {
		icon = 'arrow-right',
		iconSize = 16,
		children,
		...restProps
	}: ComponentProps<typeof Button> & {
		icon?: 'arrow-right' | 'download';
		iconSize?: number;
	} = $props();

	let animating = $state(false);

	function animate() {
		animating = true;
		setTimeout(() => (animating = false), icon === 'download' ? 400 : 250);
	}
</script>

<Button {...restProps} onmouseenter={animate}>
	{#if icon === 'download'}
		<Download size={iconSize} animate={animating} class="pointer-events-none" />
	{/if}
	{@render children?.()}
	{#if icon === 'arrow-right'}
		<ArrowRight size={iconSize} animate={animating} class="pointer-events-none" />
	{/if}
</Button>
