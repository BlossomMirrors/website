<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import PageMeta from '$lib/components/page/page-meta.svelte';
	import Hero from './hero.svelte';
	import Features from './features.svelte';
	import Audience from './audience.svelte';
	import Cta from './cta.svelte';
</script>

<PageMeta title="Blossom Hub" description={m.hub_hero_body()} />

<div class="py-16 md:py-24">
	<Hero />
	<Features />
	<Audience />
	<Cta />
</div>
