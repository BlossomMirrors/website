<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import PageMeta from '$lib/components/page/page-meta.svelte';
	import Page from '$lib/components/page/page.svelte';
	import CommunitySection from '$lib/components/sections/community-section.svelte';
	import Hero from './hero.svelte';
	import Live from './live.svelte';
	import Upcoming from './upcoming.svelte';
	import Past from './past.svelte';
</script>

<PageMeta title={m.events()} description={m.events_subtitle()} />

<Page>
	<Hero />
	<Live />
	<Upcoming />
	<Past />
	<CommunitySection />
</Page>
