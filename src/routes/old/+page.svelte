<script lang="ts">
	import MonitorIcon from '@lucide/svelte/icons/monitor';
	import ShoppingBagIcon from '@lucide/svelte/icons/shopping-bag';
	import CloudIcon from '@lucide/svelte/icons/cloud';
	import Building2Icon from '@lucide/svelte/icons/building-2';
	import * as m from '$lib/paraglide/messages';
	import FrontPage from '$lib/components/hero/front-page.svelte';
	import Features from '$lib/components/ui/features.svelte';
	import CtaArea from '$lib/components/ui/cta-area.svelte';
	import SectionHeader from '$lib/components/ui/section-header.svelte';
	import DonateBanner from '$lib/components/ui/donate-banner.svelte';
	import { getTitle } from '$lib/utils';

	const products = [
		{
			Icon: MonitorIcon,
			title: 'BlossomOS',
			body: m.home_product_os_tagline(),
			href: '/',
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
	<meta name="description" content={m.home_hero_body()} />
	<meta property="og:description" content={m.home_hero_body()} />
	<meta property="twitter:description" content={m.home_hero_body()} />
	<title>{getTitle(m.home_tagline())}</title>
</svelte:head>

<FrontPage />

<div class="mt-24 md:mt-32">
	<SectionHeader subheader={m.home_products_subheader()} class="mb-12">
		{m.home_products_header()}
	</SectionHeader>
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

<DonateBanner />

<div class="mb-16"></div>
