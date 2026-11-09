<script lang="ts">
	import ComparisonGrid from '$lib/components/cards/comparison-grid.svelte';
	import LottieEmoji from '$lib/components/media/lottie-emoji.svelte';
	import Section from '$lib/components/page/section.svelte';
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

<Section size="xl" class="my-16 py-10 md:py-16">
	{#snippet heading()}
		{m.less()}
		<LottieEmoji src="/lottie/1f62d.json" size={64} class="align-middle" />
		{m.more()}
		<LottieEmoji src="/lottie/1f60a.json" size={64} class="align-middle" />
	{/snippet}

	<ComparisonGrid {items} lessLabel={m.less()} moreLabel={m.more()} />
</Section>
