<script lang="ts">
	import { getTitle } from '$lib/utils';

	let { title, description }: { title: string; description?: string } = $props();
</script>

<svelte:head>
	{#if description}
		<meta name="description" content={description} />
		<meta property="og:description" content={description} />
		<meta name="twitter:description" content={description} />
	{/if}
	<meta property="og:title" content={getTitle(title)} />
	<meta name="twitter:title" content={getTitle(title)} />
	<title>{getTitle(title)}</title>
</svelte:head>
