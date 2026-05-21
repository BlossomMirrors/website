<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import RocketIcon from '@lucide/svelte/icons/rocket';
	import MonitorIcon from '@lucide/svelte/icons/monitor';
	import PackageIcon from '@lucide/svelte/icons/package';
	import CpuIcon from '@lucide/svelte/icons/cpu';
	import ShieldIcon from '@lucide/svelte/icons/shield';
	import CodeIcon from '@lucide/svelte/icons/code';
	import BookOpenIcon from '@lucide/svelte/icons/book-open';
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';

	const categories = [
		{
			Icon: RocketIcon,
			title: 'Getting started',
			description: 'Install BlossomOS, set up your account, and get familiar with the desktop.',
			links: ['Installation guide', 'First boot walkthrough', 'Migrating from Windows', 'Migrating from macOS']
		},
		{
			Icon: PackageIcon,
			title: 'Apps & software',
			description: 'Installing, managing, and removing applications with Arc Software.',
			links: ['Using Arc Software', 'Installing Flatpaks', 'Arc Winapps setup', 'Command line tools']
		},
		{
			Icon: MonitorIcon,
			title: 'Desktop & customization',
			description: 'Themes, extensions, keyboard shortcuts, and making BlossomOS yours.',
			links: ['Changing the wallpaper', 'KDE Plasma basics', 'Keyboard shortcuts', 'Accessibility']
		},
		{
			Icon: CpuIcon,
			title: 'Hardware',
			description: 'Drivers, peripherals, and getting the most from your specific hardware.',
			links: ['GPU setup', 'Printer support', 'Bluetooth & audio', 'Dual boot']
		},
		{
			Icon: ShieldIcon,
			title: 'Privacy & security',
			description: 'Encryption, firewall, updates, and understanding the security model.',
			links: ['Full disk encryption', 'Firewall basics', 'Automatic updates', 'Reporting vulnerabilities']
		},
		{
			Icon: CodeIcon,
			title: 'Contributing',
			description: 'Build, test, and submit changes to BlossomOS and its components.',
			links: ['Setting up a dev environment', 'Submitting a patch', 'Translating BlossomOS', 'Writing documentation']
		}
	];
</script>

<svelte:head>
	<title>Documentation - Blossom</title>
</svelte:head>

<div class="py-16 md:py-24">
	<!-- Hero -->
	<div use:reveal>
		<div class="flex items-center gap-3">
			<BookOpenIcon size={20} class="text-primary" strokeWidth={1.5} />
			<p class="text-xs font-semibold tracking-widest text-primary uppercase">Documentation</p>
		</div>
		<h1 class="mt-3 font-serif text-5xl leading-tight md:text-7xl">
			How to use<br />BlossomOS.
		</h1>
		<p class="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
			Guides, references, and everything you need to get the most out of BlossomOS.
		</p>
	</div>

	<!-- Quick start -->
	<a
		href="https://git.blossomos.org/Blossom"
		target="_blank"
		rel="noreferrer"
		class="mt-12 flex items-center justify-between rounded-2xl border border-primary/30 bg-primary/5 p-6 transition-colors hover:bg-primary/10"
		use:reveal={80}
	>
		<div class="flex items-center gap-4">
			<div
				class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary"
			>
				<RocketIcon size={20} strokeWidth={1.5} />
			</div>
			<div>
				<p class="font-semibold">Quick start</p>
				<p class="text-sm text-muted-foreground">New to BlossomOS? Start here.</p>
			</div>
		</div>
		<ArrowRightIcon size={18} class="text-primary" />
	</a>

	<!-- Categories -->
	<div class="mt-16 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
		{#each categories as cat, i (cat.title)}
			<div class="rounded-2xl border border-border bg-card p-7" use:reveal={i * 60}>
				<div
					class="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"
				>
					<cat.Icon size={20} strokeWidth={1.5} />
				</div>
				<h2 class="font-semibold">{cat.title}</h2>
				<p class="mt-2 text-sm leading-relaxed text-muted-foreground">{cat.description}</p>
				<ul class="mt-5 flex flex-col gap-2">
					{#each cat.links as link (link)}
						<li>
							<a
								href="https://git.blossomos.org/Blossom"
								target="_blank"
								rel="noreferrer"
								class="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
							>
								<ArrowRightIcon size={12} class="shrink-0 text-primary" />
								{link}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>

	<!-- Footer note -->
	<p class="mt-16 text-center text-sm text-muted-foreground" use:reveal>
		Documentation is community-maintained.
		<a
			href="https://git.blossomos.org/Blossom"
			target="_blank"
			rel="noreferrer"
			class="text-primary hover:underline"
		>
			Help us improve it.
		</a>
	</p>
</div>
