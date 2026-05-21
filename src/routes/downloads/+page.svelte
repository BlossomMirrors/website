<script lang="ts">
	import DownloadCard from '$lib/components/home/download-card.svelte';
	import CpuIcon from '@lucide/svelte/icons/cpu';
	import MemoryStickIcon from '@lucide/svelte/icons/memory-stick';
	import HardDriveIcon from '@lucide/svelte/icons/hard-drive';
	import MonitorIcon from '@lucide/svelte/icons/monitor';
	import PackageIcon from '@lucide/svelte/icons/package';
	import ArrowDownToLineIcon from '@lucide/svelte/icons/arrow-down-to-line';
	import * as m from '$lib/paraglide/messages';

	const requirements = [
		{ Icon: CpuIcon, label: m.downloads_req_cpu(), value: m.downloads_req_cpu_value() },
		{ Icon: MemoryStickIcon, label: m.downloads_req_ram(), value: m.downloads_req_ram_value() },
		{
			Icon: HardDriveIcon,
			label: m.downloads_req_storage(),
			value: m.downloads_req_storage_value()
		},
		{ Icon: MonitorIcon, label: m.downloads_req_display(), value: m.downloads_req_display_value() }
	];
</script>

<svelte:head>
	<title>Downloads - Blossom</title>
</svelte:head>

<div class="py-16 md:py-24">
	<!-- Header -->
	<div class="mb-12">
		<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">
			{m.downloads_subheader()}
		</p>
		<h1 class="font-serif text-5xl leading-tight md:text-7xl">{m.downloads_h1()}</h1>
		<p class="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
			{m.downloads_subtitle()}
		</p>
	</div>

	<!-- Download card -->
	<div class="max-w-xl">
		<DownloadCard />
	</div>

	<!-- Installation note -->
	<p class="mt-4 max-w-xl text-sm text-muted-foreground">
		{m.downloads_install_note()}
		<!-- eslint-disable svelte/no-navigation-without-resolve -->
		<a
			href="https://docs.blossomos.org/en/docs/user/installation"
			class="text-primary hover:underline"
			target="_blank">{m.downloads_install_link()}</a
		>
	</p>

	<!-- System requirements -->
	<div class="mt-20">
		<h2 class="font-serif text-3xl leading-tight md:text-4xl">{m.downloads_requirements_h2()}</h2>
		<div class="mt-6 grid gap-4 sm:grid-cols-2">
			{#each requirements as r (r.label)}
				<div class="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
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
		<p class="mt-4 text-sm text-muted-foreground">{m.downloads_req_nvidia_note()}</p>
	</div>

	<!-- Press kit & branding -->
	<div class="mt-20">
		<h2 class="font-serif text-3xl leading-tight md:text-4xl">{m.downloads_presskit_h2()}</h2>
		<p class="mt-3 max-w-xl text-muted-foreground">
			{m.downloads_presskit_body()}
		</p>
		<div class="mt-6 flex flex-wrap gap-3">
			<!-- eslint-disable svelte/no-navigation-without-resolve -->
			<a href="/logo.svg" download="blossom-logo.svg">
				<button
					class="flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium transition-colors hover:border-primary/30 hover:bg-primary/5"
				>
					<PackageIcon size={16} class="text-primary" />
					{m.downloads_presskit_icon()}
					<ArrowDownToLineIcon size={14} class="text-muted-foreground" />
				</button>
			</a>
			<a href="/press-kit.zip" rel="noreferrer">
				<button
					class="flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium transition-colors hover:border-primary/30 hover:bg-primary/5"
				>
					<PackageIcon size={16} class="text-primary" />
					{m.downloads_presskit_full()}
					<ArrowDownToLineIcon size={14} class="text-muted-foreground" />
				</button>
			</a>
		</div>
		<p class="mt-3 text-xs text-muted-foreground">{m.downloads_presskit_note()}</p>
	</div>
</div>
