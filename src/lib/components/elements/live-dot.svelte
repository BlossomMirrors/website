<script lang="ts">
	let { tone = 'green' }: { tone?: 'green' | 'destructive' } = $props();

	const color = $derived(tone === 'green' ? 'bg-green-500' : 'bg-destructive');
</script>

<span class="relative flex size-2">
	<span class="absolute inline-flex size-full animate-ping rounded-full opacity-75 {color}"></span>
	<span class="relative inline-flex size-2 rounded-full {color}"></span>
</span>
