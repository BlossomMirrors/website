<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { onMount } from 'svelte';
	import HeartIcon from '@lucide/svelte/icons/heart';
	import ShieldIcon from '@lucide/svelte/icons/shield';
	import UsersIcon from '@lucide/svelte/icons/users';
	import CodeIcon from '@lucide/svelte/icons/code';
	import GlobeIcon from '@lucide/svelte/icons/globe';
	import LightbulbIcon from '@lucide/svelte/icons/lightbulb';
	import * as m from '$lib/paraglide/messages';
	import Stats from '$lib/components/community/stats.svelte';
	import CommunitySection from '$lib/components/home/community-section.svelte';

	const values = [
		{ Icon: ShieldIcon, title: m.about_value_privacy_title(), body: m.about_value_privacy_body() },
		{
			Icon: CodeIcon,
			title: m.about_value_opensource_title(),
			body: m.about_value_opensource_body()
		},
		{
			Icon: UsersIcon,
			title: m.about_value_community_title(),
			body: m.about_value_community_body()
		},
		{ Icon: GlobeIcon, title: m.about_value_lasting_title(), body: m.about_value_lasting_body() },
		{ Icon: LightbulbIcon, title: m.about_value_useful_title(), body: m.about_value_useful_body() },
		{ Icon: HeartIcon, title: m.about_value_care_title(), body: m.about_value_care_body() }
	];

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
		<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">
			{m.about_tagline()}
		</p>
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
			<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">
				{m.about_mission_subheader()}
			</p>
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

		<Stats />
	</div>

	<!-- Values -->
	<div class="mt-24">
		<div class="mb-14" use:reveal>
			<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">
				{m.about_values_subheader()}
			</p>
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

	<CommunitySection />
</div>
