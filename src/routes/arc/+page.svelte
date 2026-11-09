<script lang="ts">
	import PageMeta from '$lib/components/page/page-meta.svelte';
	import Page from '$lib/components/page/page.svelte';
	import * as m from '$lib/paraglide/messages';
	import Hero from './hero.svelte';
	import Unify from './unify.svelte';
	import Winapps from './winapps.svelte';
	import Demo from './demo.svelte';
</script>

<PageMeta title="Arc Software" description={m.arc_page_subtitle()} />

<Page>
	<Hero />
	<Unify />
	<Winapps />
	<Demo />
</Page>
