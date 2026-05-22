<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import type { LocalizedString } from '@inlang/paraglide-js';
	import * as m from '$lib/paraglide/messages';

	type Stat = {
		label: string | LocalizedString;
		value: string | number;
	};

	let stats: Stat[] = [
		/*{ value: '3', label: m.contributors() },*/
		/*{ value: '15', label: m.community_members() },*/
		{ value: m.free(), label: m.forever() },
		{ value: '100%', label: m.open_source() }
	];
</script>

<div class="grid grid-cols-2 gap-4" use:reveal={120}>
	{#each stats as stat, i (stat.label)}
		<div class="rounded-2xl border border-border bg-card p-6" use:reveal={i * 80}>
			<p class="font-serif text-4xl">{stat.value}</p>
			<p class="mt-1 text-sm text-muted-foreground">{stat.label}</p>
		</div>
	{/each}
</div>
