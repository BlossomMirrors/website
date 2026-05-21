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

	const features = [
		{
			Icon: LayoutDashboardIcon,
			title: 'Company dashboard',
			body: 'See every managed device, user, and deployment status in one place. No more guessing what is running where.'
		},
		{
			Icon: UsersIcon,
			title: 'Team management',
			body: 'Organise users into groups, assign roles, and control who has access to what across your entire organisation.'
		},
		{
			Icon: PackageIcon,
			title: 'Software deployment',
			body: 'Push apps to devices silently or on a schedule. Define approved software lists and keep everything up to date automatically.'
		},
		{
			Icon: ShieldCheckIcon,
			title: 'Policy enforcement',
			body: 'Set security baselines, enforce disk encryption, control peripheral access, and ensure every machine meets your standards.'
		},
		{
			Icon: KeyIcon,
			title: 'Single sign-on',
			body: 'Integrate with your existing identity provider. One login for BlossomOS, Blossom Cloud, and every managed app.'
		},
		{
			Icon: ScrollTextIcon,
			title: 'Audit logs',
			body: 'Full activity history for every device and user. Know exactly what changed, when, and who made the change.'
		},
		{
			Icon: MonitorSmartphoneIcon,
			title: 'Remote management',
			body: 'Enrol new devices, wipe lost machines, and push configurations remotely without touching the hardware.'
		},
		{
			Icon: GlobeIcon,
			title: 'Multi-site support',
			body: 'Manage offices across multiple locations from a single Hub instance. Separate policies per site or share them globally.'
		}
	];

	const audiences = [
		{
			title: 'IT teams',
			body: 'Stop wrestling with disparate tools. Hub gives your IT department one place to manage every BlossomOS device in the company.'
		},
		{
			title: 'Schools',
			body: 'Roll out and lock down student devices in minutes. Manage software, block distractions, and keep the fleet up to date without touching each machine.'
		},
		{
			title: 'Small businesses',
			body: 'Enterprise device management without the enterprise price tag. Get started with a handful of machines and scale as you grow.'
		}
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
		<h1 class="font-serif text-5xl leading-tight md:text-7xl">Coming soon.</h1>
		<p class="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
			Blossom Hub is the central management platform for organisations running BlossomOS. Devices,
			users, policies, and software deployment. All in one place, with no vendor lock-in.
		</p>
		<div class="mt-8 flex justify-center gap-3">
			<a href="https://discord.gg/dTqsBdxvNr" target="_blank" rel="noreferrer">
				<Button variant="primary">Get notified when it launches</Button>
			</a>
			<!-- eslint-disable svelte/no-navigation-without-resolve -->
			<a href="/about">
				<Button>Learn about Blossom</Button>
			</a>
		</div>
	</div>

	<!-- Planned features -->
	<div class="mt-24">
		<div class="mb-14" use:reveal>
			<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">
				What to expect
			</p>
			<h2 class="font-serif text-5xl leading-tight md:text-6xl">Everything IT needs.</h2>
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
			<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">Who it's for</p>
			<h2 class="font-serif text-5xl leading-tight md:text-6xl">Built for organisations.</h2>
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
			<h2 class="font-serif text-4xl leading-tight md:text-5xl">Interested in early access?</h2>
			<p class="mt-4 text-lg leading-relaxed text-muted-foreground">
				Join the community and be the first to hear when Blossom Hub is available for testing.
			</p>
			<div class="mt-8 flex flex-wrap gap-3">
				<a href="https://discord.gg/dTqsBdxvNr" target="_blank" rel="noreferrer">
					<Button variant="primary">Join on Discord</Button>
				</a>
				<a href="https://community.blossomos.org" target="_blank" rel="noreferrer">
					<Button>Community forum</Button>
				</a>
			</div>
		</div>
	</div>
</div>
