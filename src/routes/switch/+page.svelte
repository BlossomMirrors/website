<script lang="ts">
	import PageMeta from '$lib/components/page/page-meta.svelte';
	import Page from '$lib/components/page/page.svelte';
	import * as m from '$lib/paraglide/messages';
	import Hero from './hero.svelte';
	import Endof10 from './endof10.svelte';
	import Features from './features.svelte';
	import Steps from './steps.svelte';
	import Cta from './cta.svelte';
</script>

<PageMeta title={m.switch_tagline()} description={m.switch_hero_subtitle()} />

<Page>
	<Hero />
	<Endof10 />
	<Features />
	<Steps />
	<Cta />
</Page>
