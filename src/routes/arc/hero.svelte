<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import PageHero from '$lib/components/page/page-hero.svelte';
	import * as m from '$lib/paraglide/messages';
</script>

<PageHero
	eyebrow="Arc Software"
	title={[`${m.arc_header1()}.`, `${m.arc_header2()}.`]}
	subtitle={m.arc_page_subtitle()}
>
	{#snippet actions()}
		<Button href="/" variant="primary">{m.cta_download()}</Button>
		<Button href="https://dev.blossomos.org/Blossom">{m.home_view_source()}</Button>
	{/snippet}
</PageHero>
