<script lang="ts">
	import { page } from '$app/state';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import './layout.css';
	import { ModeWatcher } from 'mode-watcher';
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	import ScrollToTop from '$lib/components/ui/scroll-to-top.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/favicon.ico" sizes="any" />
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<link rel="manifest" href="/manifest.webmanifest" />
	<script
		defer
		src="https://stats.blossomos.org/script.js"
		data-website-id="d2b9026b-0b3e-4eac-89b3-19f06fc5bad3"
	></script>

	<meta
		name="keywords"
		content="open source operating system, linux distribution, blossomos, privacy os, secure linux, community driven os, custom linux iso, linux for creators, open source community"
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://blossomos.org/" />
	<meta property="og:image" content="/cover.png" />

	<!-- X (Twitter) -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://blossomos.org/" />
	<meta property="twitter:image" content="/cover.png" />
</svelte:head>

<ModeWatcher />

<Header />
<div class="flex items-center justify-between">
	<div class="mx-auto w-full max-w-7xl">
		<main class="px-4">{@render children()}</main>
	</div>
</div>
<Footer />
<ScrollToTop />

<!-- eslint-disable -->
<div style="display:none">
	{#each locales as locale}
		<a href={localizeHref(page.url.pathname, { locale })}>
			{locale}
		</a>
	{/each}
</div>
