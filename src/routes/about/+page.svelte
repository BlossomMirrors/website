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

	const values = [
		{
			Icon: ShieldIcon,
			title: 'Privacy first',
			body: 'We build software that respects you by default. No telemetry you did not ask for, no data sold to anyone.'
		},
		{
			Icon: CodeIcon,
			title: 'Open source',
			body: 'Every line of Blossom code is public. Scrutinize it, fork it, improve it. Trust is earned, not assumed.'
		},
		{
			Icon: UsersIcon,
			title: 'Community driven',
			body: 'No corporate agenda. Decisions are made in the open with contributors and users who actually use the software.'
		},
		{
			Icon: GlobeIcon,
			title: 'Built to last',
			body: 'We focus on stability and longevity. Software that works today should still work tomorrow.'
		},
		{
			Icon: LightbulbIcon,
			title: 'Genuinely useful',
			body: 'Features are added because users need them, not because a roadmap said so. Quality over quantity, always.'
		},
		{
			Icon: HeartIcon,
			title: 'Made with care',
			body: 'We sweat the details. From the window buttons to the boot experience, everything is thought through.'
		}
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
		<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">About Blossom</p>
		<h1 class="font-serif text-5xl leading-tight md:text-7xl">
			Computing the way<br />it should be.
		</h1>
		<p class="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
			Blossom is an open source project building the desktop platform for people who want a computer
			that works for them, not against them.
		</p>
	</div>

	<!-- Mission -->
	<div class="mt-24 grid items-center gap-12 md:grid-cols-2 md:gap-20">
		<div use:reveal>
			<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">Our mission</p>
			<h2 class="font-serif text-4xl leading-tight md:text-5xl">
				Digital independence<br />for everyone.
			</h2>
			<p class="mt-6 text-lg leading-relaxed text-muted-foreground">
				Modern operating systems have drifted away from users. Forced updates, dark patterns, data
				collection baked in, and software you never asked for. We started Blossom because we believed
				it did not have to be this way.
			</p>
			<p class="mt-4 text-lg leading-relaxed text-muted-foreground">
				BlossomOS is our answer: a desktop OS that is powerful enough for developers, approachable
				enough for anyone, and honest enough to earn your trust.
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
			<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">What we stand for</p>
			<h2 class="font-serif text-5xl leading-tight md:text-6xl">Our values.</h2>
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
				Built by people like you.
			</h2>
			<p class="mt-4 text-lg leading-relaxed text-muted-foreground">
				BlossomOS is made in the open by volunteers, designers, and everyday users. No corporation
				calling the shots. Join us.
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
					<Button variant="primary">Join the community</Button>
				</a>
				<a href="https://git.blossomos.org/Blossom" target="_blank" rel="noreferrer">
					<Button>Contribute on Blossom Git</Button>
				</a>
			</div>
		</div>
	</div>
</div>
