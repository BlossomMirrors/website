<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import PageHero from '$lib/components/page/page-hero.svelte';
	import CloudIcon from '@lucide/svelte/icons/cloud';
	import * as m from '$lib/paraglide/messages';
</script>

<PageHero
	icon={CloudIcon}
	eyebrow="Blossom Cloud"
	title={[m.cloud_page_h1_1(), m.cloud_page_h1_2()]}
	subtitle={m.cloud_page_subtitle()}
>
	{#snippet actions()}
		<Button href="https://auth.blossomos.org" variant="primary">{m.cloud_get_started()}</Button>
		<Button href="/">{m.cloud_get_blossomos()}</Button>
	{/snippet}
</PageHero>
