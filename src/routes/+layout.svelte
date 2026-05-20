<script lang="ts">
	import { page } from '$app/state';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import './layout.css';
	import logo from '$lib/assets/logo.svg';
	import { onMount } from 'svelte';
	import { initLocale } from '$lib/i18n/locale';
	import { ModeWatcher } from 'mode-watcher';

	let { children } = $props();

	onMount(() => {
		initLocale();
	});
</script>

<svelte:head>
	<link rel="icon" href={logo} />
	<title>BlossomOS</title>
	<script
		defer
		src="https://stats.blossomos.org/script.js"
		data-website-id="d2b9026b-0b3e-4eac-89b3-19f06fc5bad3"
	></script>
</svelte:head>

<ModeWatcher />

<div class="flex items-center justify-between">
	{@render children()}
</div>

<!-- eslint-disable -->
<div style="display:none">
	{#each locales as locale}
		<a href={localizeHref(page.url.pathname, { locale })}>
			{locale}
		</a>
	{/each}
</div>
