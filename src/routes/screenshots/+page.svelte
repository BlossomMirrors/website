<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import PageMeta from '$lib/components/page/page-meta.svelte';
	import Page from '$lib/components/page/page.svelte';
	import Hero from './hero.svelte';
	import Gallery from './gallery.svelte';
</script>

<PageMeta title={m.screenshots_nav()} description={m.screenshots_subtitle()} />

<Page>
	<Hero />
	<Gallery />
</Page>
