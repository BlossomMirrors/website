<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import PageHero from '$lib/components/page/page-hero.svelte';
</script>

<PageHero eyebrow={m.events_tagline()} title={m.events_h1()} subtitle={m.events_subtitle()} />
