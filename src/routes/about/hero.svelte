<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import PageHero from '$lib/components/page/page-hero.svelte';
</script>

<PageHero
	eyebrow={m.about_tagline()}
	title={[m.home_hero_h1_1(), m.home_hero_h1_2()]}
	subtitle={m.about_hero_body()}
/>
