<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import PageMeta from '$lib/components/page/page-meta.svelte';
	import Page from '$lib/components/page/page.svelte';
	import Hero from './hero.svelte';
	import Features from './features.svelte';
	import Audience from './audience.svelte';
	import Cta from './cta.svelte';
</script>

<PageMeta title="Blossom Hub" description={m.hub_hero_body()} />

<Page>
	<Hero />
	<Features />
	<Audience />
	<Cta />
</Page>
