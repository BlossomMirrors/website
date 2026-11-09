<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import Building2Icon from '@lucide/svelte/icons/building-2';
	import * as m from '$lib/paraglide/messages';
	import PageHero from '$lib/components/page/page-hero.svelte';
</script>

<PageHero
	icon={Building2Icon}
	eyebrow="Blossom Hub"
	title={m.hub_h1()}
	subtitle={m.hub_hero_body()}
>
	{#snippet actions()}
		<Button href="https://discord.gg/dTqsBdxvNr" variant="primary">{m.hub_notify()}</Button>
		<Button href="/about">{m.learn_more()}</Button>
	{/snippet}
</PageHero>
