<script lang="ts">
	import { page } from '$app/state';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import './layout.css';
	import logo from '$lib/assets/logo.svg';
	import { onMount } from 'svelte';
	import { initLocale } from '$lib/i18n/locale';
	import { ModeWatcher } from 'mode-watcher';
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	import ScrollToTop from '$lib/components/ui/scroll-to-top.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={logo} />
	<title>Blossom</title>
	<script
		defer
		src="https://stats.blossomos.org/script.js"
		data-website-id="d2b9026b-0b3e-4eac-89b3-19f06fc5bad3"
	></script>
</svelte:head>

<ModeWatcher />

<div class="flex items-center justify-between">
	<div class="mx-auto mt-2 w-full max-w-7xl *:px-4">
		<Header />
		<main>{@render children()}</main>
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
