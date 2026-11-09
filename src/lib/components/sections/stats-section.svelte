<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import * as m from '$lib/paraglide/messages';
	import StatCard from '$lib/components/cards/stat-card.svelte';

	const stats = [
		/*{ value: '3', label: m.contributors() },*/
		/*{ value: '15', label: m.community_members() },*/
		{ value: m.free(), label: m.forever() },
		{ value: '100%', label: m.open_source() }
	];
</script>

<div class="grid grid-cols-2 gap-4" use:reveal={120}>
	{#each stats as stat, i (stat.label)}
		<StatCard value={stat.value} label={stat.label} reveal={i * 80} />
	{/each}
</div>
