<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { getLocale } from '$lib/paraglide/runtime';
	import PageMeta from '$lib/components/page/page-meta.svelte';
	import Page from '$lib/components/page/page.svelte';
	import Prose from '$lib/components/typography/prose.svelte';
	import PrivacyDe from '../../content/privacy/de.md';
	import PrivacyEn from '../../content/privacy/en.md';

	const language = getLocale();
</script>

<PageMeta title={m.footer_link_privacy()} description={m.privacy_meta_description()} />

<Page>
	<Prose>
		{#if language === 'de'}
			<PrivacyDe />
		{:else}
			<PrivacyEn />
		{/if}
		<p>{m.privacy_updated({ date: '2026-07-13' })}</p>
	</Prose>
</Page>
