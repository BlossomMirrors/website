<script lang="ts">
	import { page } from '$app/state';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import './layout.css';
	import logo from '$lib/assets/logo.svg';
	import { onMount } from 'svelte';
	import { initLocale } from '$lib/i18n/locale';

	let { children } = $props();

	onMount(() => {
		initLocale();
	});
</script>

<svelte:head>
	<link rel="icon" href={logo} />
	<title>BlossomOS</title>
</svelte:head>

<div class="flex flex-col min-h-screen justify-center items-center">
	<div class="flex justify-between items-center mb-8">
		{@render children()}
	</div>
</div>

<div style="display:none">
	{#each locales as locale}
		<a href={localizeHref(page.url.pathname, { locale })}>
			{locale}
		</a>
	{/each}
</div>
