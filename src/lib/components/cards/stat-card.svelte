<script lang="ts">
	import Card from './card.svelte';

	let {
		value,
		label,
		reveal = false
	}: { value: string | number; label: string; reveal?: number | false } = $props();
</script>

<Card {reveal} class="p-6">
	<p class="font-serif text-4xl">{value}</p>
	<p class="mt-1 text-sm text-muted-foreground">{label}</p>
</Card>
