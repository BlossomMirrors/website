<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import PageHero from '$lib/components/page/page-hero.svelte';
	import DownloadCard from '$lib/components/download/download-card.svelte';
	import Note from '$lib/components/typography/note.svelte';
	import TextLink from '$lib/components/elements/text-link.svelte';
</script>

<PageHero eyebrow={m.downloads()} title={m.downloads_h1()} subtitle={m.downloads_subtitle()}>
	<DownloadCard class="mx-auto mt-8 w-full max-w-xl text-left" full />
	<Note class="mx-auto mt-4 max-w-xl">
		{m.downloads_install_note()}
		<TextLink href="https://help.blossomos.org/help/user/install-guide" tone="primary"
			>{m.downloads_install_link()}</TextLink
		>
	</Note>
</PageHero>
