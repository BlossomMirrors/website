<script lang="ts">
	import { page } from '$app/state';
	import * as m from '$lib/paraglide/messages';
	import './layout.css';
	import { ModeWatcher } from 'mode-watcher';
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	import ScrollToTop from '$lib/components/ui/scroll-to-top.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/favicon.ico" sizes="any" />
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<link rel="manifest" href="/manifest.webmanifest" />
	<link rel="llms" href="/llms.txt" />
	<meta name="theme-color" content="#0c0c12" />
	<meta name="keywords" content={m.meta_keywords()} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="BlossomOS" />
	<meta property="og:url" content={page.url.href} />
	<meta property="og:image" content="https://blossomos.org/cover.png" />
	<meta property="og:image:width" content="2576" />
	<meta property="og:image:height" content="1456" />
	<meta property="og:image:type" content="image/png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={page.url.href} />
	<meta name="twitter:image" content="https://blossomos.org/cover.png" />
</svelte:head>

<ModeWatcher />

<Header />
<Tooltip.Provider>
	<div class="flex items-center justify-between">
		<div class="mx-auto w-full max-w-7xl">
			<main class="px-4">{@render children()}</main>
		</div>
	</div>
	<Footer />
	<ScrollToTop />
</Tooltip.Provider>
