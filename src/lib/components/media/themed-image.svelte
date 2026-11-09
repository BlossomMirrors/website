<script lang="ts">
	import { mode } from 'mode-watcher';
	import type { Picture } from 'vite-imagetools';

	let {
		dark,
		light,
		alt,
		sizes,
		class: className,
		style
	}: {
		dark: string | Picture;
		light: string | Picture;
		alt: string;
		sizes?: string;
		class?: string;
		style?: string;
	} = $props();
</script>

{#if mode.current === 'dark'}
	<enhanced:img src={dark} {alt} {sizes} class={className} {style} />
{:else}
	<enhanced:img src={light} {alt} {sizes} class={className} {style} />
{/if}
