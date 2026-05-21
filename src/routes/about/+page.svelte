<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { Button } from '$lib/components/ui/button';
	import { onMount } from 'svelte';
	import HeartIcon from '@lucide/svelte/icons/heart';
	import ShieldIcon from '@lucide/svelte/icons/shield';
	import UsersIcon from '@lucide/svelte/icons/users';
	import CodeIcon from '@lucide/svelte/icons/code';
	import GlobeIcon from '@lucide/svelte/icons/globe';
	import LightbulbIcon from '@lucide/svelte/icons/lightbulb';
	import * as m from '$lib/paraglide/messages';

	const values = [
		{ Icon: ShieldIcon, title: m.about_value_privacy_title(), body: m.about_value_privacy_body() },
		{ Icon: CodeIcon, title: m.about_value_opensource_title(), body: m.about_value_opensource_body() },
		{ Icon: UsersIcon, title: m.about_value_community_title(), body: m.about_value_community_body() },
		{ Icon: GlobeIcon, title: m.about_value_lasting_title(), body: m.about_value_lasting_body() },
		{ Icon: LightbulbIcon, title: m.about_value_useful_title(), body: m.about_value_useful_body() },
		{ Icon: HeartIcon, title: m.about_value_care_title(), body: m.about_value_care_body() }
	];

	let onlineCount = $state<number | null>(null);
	onMount(() => {
		fetch('https://discord.com/api/invites/dTqsBdxvNr?with_counts=true')
			.then((r) => r.json())
			.then((d) => {
				onlineCount = d.approximate_presence_count ?? null;
			})
			.catch(() => {});
	});
</script>

<svelte:head>
	<title>About - Blossom</title>
</svelte:head>

<div class="py-16 md:py-24">
	<!-- Hero -->
	<div class="mx-auto max-w-3xl text-center" use:reveal>
		<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">{m.about_tagline()}</p>
		<h1 class="font-serif text-5xl leading-tight md:text-7xl">
			{m.about_hero_h1_1()}<br />{m.about_hero_h1_2()}
		</h1>
		<p class="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
			{m.about_hero_body()}
		</p>
	</div>

	<!-- Mission -->
	<div class="mt-24 grid items-center gap-12 md:grid-cols-2 md:gap-20">
		<div use:reveal>
			<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">{m.about_mission_subheader()}</p>
			<h2 class="font-serif text-4xl leading-tight md:text-5xl">
				{m.about_mission_h2_1()}<br />{m.about_mission_h2_2()}
			</h2>
			<p class="mt-6 text-lg leading-relaxed text-muted-foreground">
				{m.about_mission_body1()}
			</p>
			<p class="mt-4 text-lg leading-relaxed text-muted-foreground">
				{m.about_mission_body2()}
			</p>
		</div>

		<div class="grid grid-cols-2 gap-3" use:reveal={120}>
			{#each [{ value: '100+', label: 'Contributors' }, { value: '5k+', label: 'Community members' }, { value: 'Free', label: 'Forever' }, { value: '100%', label: 'Open source' }] as stat, i (stat.label)}
				<div class="rounded-2xl border border-border bg-card p-6" use:reveal={i * 70}>
					<p class="font-serif text-4xl">{stat.value}</p>
					<p class="mt-1 text-sm text-muted-foreground">{stat.label}</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- Values -->
	<div class="mt-24">
		<div class="mb-14" use:reveal>
			<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">{m.about_values_subheader()}</p>
			<h2 class="font-serif text-5xl leading-tight md:text-6xl">{m.about_values_header()}</h2>
		</div>

		<div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
			{#each values as v, i (v.title)}
				<div class="rounded-2xl border border-border bg-card p-7" use:reveal={i * 70}>
					<div
						class="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"
					>
						<v.Icon size={20} strokeWidth={1.5} />
					</div>
					<h3 class="mb-2 font-semibold">{v.title}</h3>
					<p class="text-sm leading-relaxed text-muted-foreground">{v.body}</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- Community CTA -->
	<div
		class="relative mt-24 overflow-hidden rounded-3xl bg-linear-to-br from-primary/10 via-primary/5 to-transparent p-10 md:p-16"
		use:reveal
	>
		<div
			class="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-primary/8 blur-3xl"
		></div>
		<div class="relative max-w-xl">
			<h2 class="font-serif text-4xl leading-tight md:text-5xl">
				{m.about_community_h2()}
			</h2>
			<p class="mt-4 text-lg leading-relaxed text-muted-foreground">
				{m.about_community_body()}
			</p>
			{#if onlineCount !== null}
				<p class="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
					<span class="relative flex size-2">
						<span
							class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"
						></span>
						<span class="relative inline-flex size-2 rounded-full bg-green-500"></span>
					</span>
					{onlineCount.toLocaleString()} people online on Discord right now
				</p>
			{/if}
			<div class="mt-8 flex flex-wrap gap-3">
				<a href="https://community.blossomos.org" target="_blank" rel="noreferrer">
					<Button variant="primary">{m.community()}</Button>
				</a>
				<a href="https://git.blossomos.org/Blossom" target="_blank" rel="noreferrer">
					<Button>{m.home_view_source()}</Button>
				</a>
			</div>
		</div>
	</div>
</div>
