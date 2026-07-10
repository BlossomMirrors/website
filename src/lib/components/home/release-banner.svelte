<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import SparklesIcon from '@lucide/svelte/icons/sparkles';
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
	import * as m from '$lib/paraglide/messages';
</script>

<div
	class="mb-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 text-center text-sm sm:text-base"
	use:reveal
>
	<span
		class="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-semibold tracking-wide text-primary uppercase"
	>
		<SparklesIcon size={12} />
		{m.home_alpha2_badge()}
	</span>
	<span class="text-foreground">{m.home_alpha2_text()}</span>
	<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
	<a
		href="https://help.blossomos.org/help/changelog/alpha-2"
		target="_blank"
		rel="noreferrer"
		class="inline-flex items-center gap-1 font-medium text-primary underline underline-offset-2 hover:text-primary/80"
	>
		{m.home_alpha2_cta()}
		<ArrowRightIcon size={14} />
	</a>
</div>
