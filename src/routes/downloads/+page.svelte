<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import PageMeta from '$lib/components/page/page-meta.svelte';
	import Page from '$lib/components/page/page.svelte';
	import Hero from './hero.svelte';
	import Requirements from './requirements.svelte';
</script>

<PageMeta title={m.downloads()} description={m.downloads_subtitle()} />

<Page>
	<Hero />
	<Requirements />
</Page>
