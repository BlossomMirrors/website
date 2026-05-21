<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import LottieEmoji from './lottie-emoji.svelte';
	import * as m from '$lib/paraglide/messages';

	const items = [
		{ less: m.less1(), more: m.more1() },
		{ less: m.less2(), more: m.more2() },
		{ less: m.less3(), more: m.more3() },
		{ less: m.less4(), more: m.more4() },
		{ less: m.less5(), more: m.more5() },
		{ less: m.less6(), more: m.more6() }
	];
</script>

<section class="my-16 py-10 md:py-16">
	<div class="mb-12" use:reveal>
		<h2 class="font-serif text-5xl leading-tight md:text-7xl">
			{m.less()}
			<LottieEmoji src="/lottie/1f62d.json" size={64} class="align-middle" />
			{m.more()}
			<LottieEmoji src="/lottie/1f60a.json" size={64} class="align-middle" />
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
						{m.less()}
					</p>
					<p class="font-serif text-xl leading-snug line-through decoration-destructive/60">
						{item.less}
					</p>
				</div>
				<div class="flex-1">
					<p class="mb-1 text-xs font-semibold tracking-widest text-primary uppercase">
						{m.more()}
					</p>
					<p class="font-serif text-xl leading-snug">{item.more}</p>
				</div>
			</div>
		{/each}
	</div>
</section>
