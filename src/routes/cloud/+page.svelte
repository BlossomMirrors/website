<script lang="ts">
	import PageMeta from '$lib/components/page/page-meta.svelte';
	import * as m from '$lib/paraglide/messages';
	import Hero from './hero.svelte';
	import Features from './features.svelte';
	import Privacy from './privacy.svelte';
	import Cta from './cta.svelte';
</script>

<PageMeta title="Blossom Cloud" description={m.cloud_page_subtitle()} />

<div class="py-16 md:py-24">
	<Hero />
	<Features />
	<Privacy />
	<Cta />
</div>
