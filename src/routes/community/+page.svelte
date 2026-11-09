<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import PageMeta from '$lib/components/page/page-meta.svelte';
	import Page from '$lib/components/page/page.svelte';
	import CommunitySection from '$lib/components/sections/community-section.svelte';
	import Hero from './hero.svelte';
	import Channels from './channels.svelte';
	import Involved from './involved.svelte';
	import Stats from './stats.svelte';
</script>

<PageMeta title={m.community()} description={m.community_hero_body()} />

<Page>
	<Hero />
	<Channels />
	<Involved />
	<Stats />
	<CommunitySection />
</Page>
