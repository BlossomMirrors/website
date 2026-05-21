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
	<title>Blossom Hub - Blossom</title>
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
		<div class="mb-14" use:reveal>
			<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">
				{m.hub_features_subheader()}
			</p>
			<h2 class="font-serif text-5xl leading-tight md:text-6xl">{m.hub_features_h2()}</h2>
		</div>

		<div class="grid gap-4 sm:grid-cols-2 md:gap-6">
			{#each features as f, i (f.title)}
				<div class="rounded-2xl border border-border bg-card p-7" use:reveal={i * 60}>
					<div
						class="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"
					>
						<f.Icon size={20} strokeWidth={1.5} />
					</div>
					<h3 class="font-semibold">{f.title}</h3>
					<p class="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- Who it's for -->
	<div class="mt-24">
		<div class="mb-12" use:reveal>
			<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">{m.hub_audience_subheader()}</p>
			<h2 class="font-serif text-5xl leading-tight md:text-6xl">{m.hub_audience_h2()}</h2>
		</div>

		<div class="grid gap-4 md:grid-cols-3">
			{#each audiences as a, i (a.title)}
				<div class="rounded-2xl border border-border bg-card p-7" use:reveal={i * 80}>
					<h3 class="font-semibold">{a.title}</h3>
					<p class="mt-2 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- CTA strip -->
	<div
		class="relative mt-24 overflow-hidden rounded-3xl bg-linear-to-br from-primary/10 via-primary/5 to-transparent p-10 md:p-16"
		use:reveal
	>
		<div
			class="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-primary/8 blur-3xl"
		></div>
		<div class="relative max-w-xl">
			<h2 class="font-serif text-4xl leading-tight md:text-5xl">{m.hub_cta_h2()}</h2>
			<p class="mt-4 text-lg leading-relaxed text-muted-foreground">
				{m.hub_cta_body()}
			</p>
			<div class="mt-8 flex flex-wrap gap-3">
				<a href="https://discord.gg/dTqsBdxvNr" target="_blank" rel="noreferrer">
					<Button variant="primary">{m.hub_join_discord()}</Button>
				</a>
				<a href="https://community.blossomos.org" target="_blank" rel="noreferrer">
					<Button>{m.community_forums()}</Button>
				</a>
			</div>
		</div>
	</div>
</div>
