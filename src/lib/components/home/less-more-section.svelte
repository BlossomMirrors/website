<script lang="ts">
	import { reveal } from '$lib/actions/reveal';

	const items = [
		{ less: 'Reinstalling your OS', more: 'Updates that actually work' },
		{ less: 'Driver hell', more: 'Hardware that just works' },
		{ less: "Wondering who's watching", more: 'Knowing nobody is' },
		{ less: 'Bloat you never asked for', more: 'Only what you need' },
		{ less: 'Crashing at the worst moment', more: 'A system you can rely on' },
		{ less: 'Being locked in', more: 'Real freedom to switch' }
	];
</script>

<section class="py-10 md:py-16">
	<div class="mb-12" use:reveal>
		<h2 class="font-serif text-5xl leading-tight md:text-7xl">
			Less<span class="ml-12"> 😭 <br />More 😊</span>
		</h2>
	</div>

	<div
		class="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2"
		use:reveal={80}
	>
		{#each items as item (item.less)}
			<div class="flex gap-6 bg-background p-6 md:p-8">
				<div class="flex-1">
					<p class="mb-1 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
						Less
					</p>
					<p class="font-serif text-xl leading-snug line-through decoration-destructive/60">
						{item.less}
					</p>
				</div>
				<div class="flex-1">
					<p class="mb-1 text-xs font-semibold tracking-widest text-primary uppercase">More</p>
					<p class="font-serif text-xl leading-snug">{item.more}</p>
				</div>
			</div>
		{/each}
	</div>
</section>
