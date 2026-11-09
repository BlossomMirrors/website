<script lang="ts">
	import { reveal as revealAction } from '$lib/actions/reveal';

	let {
		items,
		lessLabel,
		moreLabel,
		reveal = 80
	}: {
		items: { less: string; more: string }[];
		lessLabel: string;
		moreLabel: string;
		reveal?: number | false;
	} = $props();
</script>

<div
	class="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2"
	use:revealAction={reveal}
>
	{#each items as item (item.less)}
		<div class="flex gap-6 bg-background p-6 md:p-8">
			<div class="flex-1">
				<p class="mb-1 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
					{lessLabel}
				</p>
				<p class="font-serif text-xl leading-snug line-through decoration-red-400 decoration-[2px]">
					{item.less}
				</p>
			</div>
			<div class="flex-1">
				<p class="mb-1 text-xs font-semibold tracking-widest text-primary uppercase">
					{moreLabel}
				</p>
				<p class="font-serif text-xl leading-snug">{item.more}</p>
			</div>
		</div>
	{/each}
</div>
