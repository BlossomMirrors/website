<script lang="ts">
	import { onMount } from 'svelte';
	import lottie from 'lottie-web';

	let {
		src,
		size = 80,
		class: className
	}: { src: string; size?: number; class?: string } = $props();

	let el = $state<HTMLDivElement | null>(null);

	onMount(() => {
		if (!el) return;
		const anim = lottie.loadAnimation({
			container: el,
			renderer: 'svg',
			loop: true,
			autoplay: true,
			path: src
		});
		return () => anim.destroy();
	});
</script>

<div
	bind:this={el}
	style="width:{size}px;height:{size}px;display:inline-block"
	class={className}
></div>
