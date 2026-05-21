<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import DownloadCard from '$lib/components/home/download-card.svelte';
	import CpuIcon from '@lucide/svelte/icons/cpu';
	import MemoryStickIcon from '@lucide/svelte/icons/memory-stick';
	import HardDriveIcon from '@lucide/svelte/icons/hard-drive';
	import MonitorIcon from '@lucide/svelte/icons/monitor';
	import PackageIcon from '@lucide/svelte/icons/package';
	import ArrowDownToLineIcon from '@lucide/svelte/icons/arrow-down-to-line';

	const requirements = [
		{ Icon: CpuIcon, label: 'Processor', value: '64-bit x86 CPU (2012 or newer)' },
		{ Icon: MemoryStickIcon, label: 'Memory', value: '4 GB RAM minimum, 8 GB recommended' },
		{ Icon: HardDriveIcon, label: 'Storage', value: '20 GB free disk space' },
		{ Icon: MonitorIcon, label: 'Display', value: '1280x720 minimum resolution' }
	];
</script>

<svelte:head>
	<title>Downloads - Blossom</title>
</svelte:head>

<div class="py-16 md:py-24">
	<!-- Header -->
	<div class="mb-12" use:reveal>
		<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">Downloads</p>
		<h1 class="font-serif text-5xl leading-tight md:text-7xl">Get BlossomOS.</h1>
		<p class="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
			Free, open source, and ready to install. Choose the edition that matches your hardware below.
		</p>
	</div>

	<!-- Download card -->
	<div class="max-w-xl" use:reveal={80}>
		<DownloadCard />
	</div>

	<!-- Installation note -->
	<p class="mt-4 max-w-xl text-sm text-muted-foreground" use:reveal={120}>
		Need help installing?
		<!-- eslint-disable svelte/no-navigation-without-resolve -->
		<a
			href="https://docs.blossomos.org/en/docs/user/installation"
			class="text-primary hover:underline"
			target="_blank">Read the installation guide.</a
		>
	</p>

	<!-- System requirements -->
	<div class="mt-20" use:reveal>
		<h2 class="font-serif text-3xl leading-tight md:text-4xl">System requirements.</h2>
		<div class="mt-6 grid gap-4 sm:grid-cols-2">
			{#each requirements as r, i (r.label)}
				<div
					class="flex items-start gap-4 rounded-2xl border border-border bg-card p-5"
					use:reveal={i * 60}
				>
					<div
						class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
					>
						<r.Icon size={16} strokeWidth={1.5} />
					</div>
					<div>
						<p class="text-sm font-semibold">{r.label}</p>
						<p class="mt-0.5 text-sm text-muted-foreground">{r.value}</p>
					</div>
				</div>
			{/each}
		</div>
		<p class="mt-4 text-sm text-muted-foreground">
			NVIDIA GPU? Use the NVIDIA Open edition above for the best out-of-the-box experience.
		</p>
	</div>

	<!-- Press kit & branding -->
	<div class="mt-20" use:reveal>
		<h2 class="font-serif text-3xl leading-tight md:text-4xl">Press kit &amp; branding.</h2>
		<p class="mt-3 max-w-xl text-muted-foreground">
			Writing about Blossom? Download our official logos, screenshots, wordmarks, and brand
			guidelines.
		</p>
		<div class="mt-6 flex flex-wrap gap-3">
			<!-- eslint-disable svelte/no-navigation-without-resolve -->
			<a href="/logo.svg" download="blossom-logo.svg">
				<button
					class="flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium transition-colors hover:border-primary/30 hover:bg-primary/5"
				>
					<PackageIcon size={16} class="text-primary" />
					Icon (SVG)
					<ArrowDownToLineIcon size={14} class="text-muted-foreground" />
				</button>
			</a>
			<a href="/press-kit.zip" rel="noreferrer">
				<button
					class="flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium transition-colors hover:border-primary/30 hover:bg-primary/5"
				>
					<PackageIcon size={16} class="text-primary" />
					Full press kit
					<ArrowDownToLineIcon size={14} class="text-muted-foreground" />
				</button>
			</a>
		</div>
		<p class="mt-3 text-xs text-muted-foreground">Please review our brand guidelines before use.</p>
	</div>
</div>
