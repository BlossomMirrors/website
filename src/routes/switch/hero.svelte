<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import PageHero from '$lib/components/page/page-hero.svelte';
	import AnimatedButton from '$lib/components/elements/animated-button.svelte';
	import * as m from '$lib/paraglide/messages';
</script>

<PageHero
	eyebrow={m.switch_tagline()}
	title={[m.switch_hero_h1_1(), m.switch_hero_h1_2()]}
	subtitle={m.switch_hero_subtitle()}
>
	{#snippet actions()}
		<AnimatedButton href="/downloads" variant="primary">{m.cta_download()}</AnimatedButton>
		<Button href="https://help.blossomos.org">{m.switch_cta_docs()}</Button>
	{/snippet}
</PageHero>
