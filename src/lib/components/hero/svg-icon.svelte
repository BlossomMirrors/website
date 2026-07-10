<script lang="ts">
	let {
		svg,
		size = 24,
		class: className = ''
	}: { svg: string; size?: number | string; class?: string } = $props();

	const dimension = $derived(typeof size === 'number' ? `${size}px` : size);
</script>

<span
	class="inline-flex shrink-0 items-center justify-center [&>svg]:h-full [&>svg]:w-full {className}"
	style="width:{dimension};height:{dimension}"
>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html svg}
</span>
