<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import MonitorIcon from '@lucide/svelte/icons/monitor';
	import ShoppingBagIcon from '@lucide/svelte/icons/shopping-bag';
	import CloudIcon from '@lucide/svelte/icons/cloud';
	import Building2Icon from '@lucide/svelte/icons/building-2';
	import * as m from '$lib/paraglide/messages';
	import FrontPage from '$lib/components/hero/front-page.svelte';
	import Features from '$lib/components/ui/features.svelte';
	import CtaArea from '$lib/components/ui/cta-area.svelte';

	const products = [
		{
			Icon: MonitorIcon,
			title: 'BlossomOS',
			body: m.home_product_os_tagline(),
			href: '/os',
			cta: m.home_product_learn_more()
		},
		{
			Icon: ShoppingBagIcon,
			title: 'Arc Software',
			body: m.home_product_arc_tagline(),
			href: '/arc',
			cta: m.home_product_learn_more()
		},
		{
			Icon: CloudIcon,
			title: 'Blossom Cloud',
			body: m.home_product_cloud_tagline(),
			href: '/cloud',
			cta: m.home_product_learn_more()
		},
		{
			Icon: Building2Icon,
			title: 'Blossom Hub',
			body: m.home_product_hub_tagline(),
			href: '/hub',
			cta: m.coming_soon(),
			soon: true
		}
	];
</script>

<svelte:head>
	<title>Blossom</title>
</svelte:head>

<FrontPage />

<div class="mt-24 md:mt-32">
	<div class="mb-12" use:reveal>
		<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">
			{m.home_products_subheader()}
		</p>
		<h2 class="font-serif text-5xl leading-tight md:text-6xl">{m.home_products_header()}</h2>
	</div>
	<Features features={products} />
</div>

<CtaArea
	title1={m.home_mission_h2_1()}
	title2={m.home_mission_h2_2()}
	body={m.home_mission_body()}
	button1Text={m.home_mission_about()}
	button2Text={m.home_view_source()}
	button1Href="/about"
	button2Href="https://git.blossomos.org/Blossom"
/>

<div class="mb-16"></div>
