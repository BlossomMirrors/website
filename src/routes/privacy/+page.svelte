<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { getLocale } from '$lib/paraglide/runtime';
	import { getTitle } from '$lib/utils';
	import PrivacyDe from '../../content/privacy/de.md';
	import PrivacyEn from '../../content/privacy/en.md';

	const language = getLocale();
</script>

<svelte:head>
	<meta name="description" content={m.privacy_meta_description()} />
	<meta property="og:title" content={getTitle(m.footer_link_privacy())} />
	<meta property="og:description" content={m.privacy_meta_description()} />
	<meta name="twitter:title" content={getTitle(m.footer_link_privacy())} />
	<meta name="twitter:description" content={m.privacy_meta_description()} />
	<title>{getTitle(m.footer_link_privacy())}</title>
</svelte:head>

<div class="py-16 md:py-24">
	<div class="typeset mx-auto max-w-2xl">
		{#if language === 'de'}
			<PrivacyDe />
		{:else}
			<PrivacyEn />
		{/if}
		<p>{m.privacy_updated({ date: '2026-07-13' })}</p>
	</div>
</div>
