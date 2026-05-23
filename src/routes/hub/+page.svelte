<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { Button } from '$lib/components/ui/button';
	import Building2Icon from '@lucide/svelte/icons/building-2';
	import UsersIcon from '@lucide/svelte/icons/users';
	import PackageIcon from '@lucide/svelte/icons/package';
	import ShieldCheckIcon from '@lucide/svelte/icons/shield-check';
	import LayoutDashboardIcon from '@lucide/svelte/icons/layout-dashboard';
	import KeyIcon from '@lucide/svelte/icons/key';
	import ScrollTextIcon from '@lucide/svelte/icons/scroll-text';
	import MonitorSmartphoneIcon from '@lucide/svelte/icons/monitor-smartphone';
	import GlobeIcon from '@lucide/svelte/icons/globe';
	import * as m from '$lib/paraglide/messages';
	import Features from '$lib/components/ui/features.svelte';
	import CtaArea from '$lib/components/ui/cta-area.svelte';
	import SectionHeader from '$lib/components/ui/section-header.svelte';
	import { getTitle } from '$lib/utils';

	const features = [
		{ Icon: LayoutDashboardIcon, title: m.hub_feature1_title(), body: m.hub_feature1_body() },
		{ Icon: UsersIcon, title: m.hub_feature2_title(), body: m.hub_feature2_body() },
		{ Icon: PackageIcon, title: m.hub_feature3_title(), body: m.hub_feature3_body() },
		{ Icon: ShieldCheckIcon, title: m.hub_feature4_title(), body: m.hub_feature4_body() },
		{ Icon: KeyIcon, title: m.hub_feature5_title(), body: m.hub_feature5_body() },
		{ Icon: ScrollTextIcon, title: m.hub_feature6_title(), body: m.hub_feature6_body() },
		{ Icon: MonitorSmartphoneIcon, title: m.hub_feature7_title(), body: m.hub_feature7_body() },
		{ Icon: GlobeIcon, title: m.hub_feature8_title(), body: m.hub_feature8_body() }
	];

	const audiences = [
		{ title: m.hub_audience1_title(), body: m.hub_audience1_body() },
		{ title: m.hub_audience2_title(), body: m.hub_audience2_body() },
		{ title: m.hub_audience3_title(), body: m.hub_audience3_body() }
	];
</script>

<svelte:head>
	<meta name="description" content={m.hub_hero_body()} />
	<meta property="og:title" content={getTitle('Blossom Hub')} />
	<meta property="og:description" content={m.hub_hero_body()} />
	<meta name="twitter:title" content={getTitle('Blossom Hub')} />
	<meta name="twitter:description" content={m.hub_hero_body()} />
	<title>{getTitle('Blossom Hub')}</title>
</svelte:head>

<div class="py-16 md:py-24">
	<!-- Hero -->
	<div class="mx-auto max-w-3xl text-center" use:reveal>
		<div
			class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary"
		>
			<Building2Icon size={32} strokeWidth={1.5} />
		</div>
		<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">Blossom Hub</p>
		<h1 class="font-serif text-5xl leading-tight md:text-7xl">{m.hub_h1()}</h1>
		<p class="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
			{m.hub_hero_body()}
		</p>
		<div class="mt-8 flex justify-center gap-3">
			<a href="https://discord.gg/dTqsBdxvNr" target="_blank" rel="noreferrer">
				<Button variant="primary">{m.hub_notify()}</Button>
			</a>
			<!-- eslint-disable svelte/no-navigation-without-resolve -->
			<a href="/about">
				<Button>{m.home_product_learn_more()}</Button>
			</a>
		</div>
	</div>

	<!-- Planned features -->
	<div class="mt-24">
		<SectionHeader subheader={m.hub_features_subheader()} class="mb-14">
			{m.hub_features_h2()}
		</SectionHeader>

		<Features {features} />
	</div>

	<!-- Who it's for -->
	<div class="mt-24">
		<SectionHeader subheader={m.hub_audience_subheader()} class="mb-12">
			{m.hub_audience_h2()}
		</SectionHeader>

		<div class="grid gap-4 md:grid-cols-3">
			{#each audiences as a, i (a.title)}
				<div class="rounded-2xl border border-border bg-card p-7" use:reveal={i * 80}>
					<h3 class="font-semibold">{a.title}</h3>
					<p class="mt-2 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
				</div>
			{/each}
		</div>
	</div>

	<CtaArea
		title1={m.hub_cta_h2()}
		body={m.hub_cta_body()}
		button1Text={m.hub_join_discord()}
		button1Href="https://discord.gg/dTqsBdxvNr"
		button2Text={m.community_forums()}
		button2Href="https://community.blossomos.org"
	/>
</div>
