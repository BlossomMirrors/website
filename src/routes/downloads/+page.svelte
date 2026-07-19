<script lang="ts">
	import DownloadCard from '$lib/components/home/download-card.svelte';
	import CpuIcon from '@lucide/svelte/icons/cpu';
	import MemoryStickIcon from '@lucide/svelte/icons/memory-stick';
	import HardDriveIcon from '@lucide/svelte/icons/hard-drive';
	import MonitorIcon from '@lucide/svelte/icons/monitor';
	import * as m from '$lib/paraglide/messages';
	import { getTitle } from '$lib/utils';

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
	<meta name="description" content={m.downloads_subtitle()} />
	<meta property="og:title" content={getTitle(m.downloads_subheader())} />
	<meta property="og:description" content={m.downloads_subtitle()} />
	<meta name="twitter:title" content={getTitle(m.downloads_subheader())} />
	<meta name="twitter:description" content={m.downloads_subtitle()} />
	<title>{getTitle(m.downloads_subheader())}</title>
</svelte:head>

<div class="py-16 md:py-24">
	<div class="mb-12 flex flex-col items-center">
		<p class="mb-3 text-center text-xs font-semibold tracking-widest text-primary uppercase">
			{m.downloads_subheader()}
		</p>
		<h1 class="text-center font-serif text-5xl leading-tight md:text-7xl">
			{m.downloads_h1()}
		</h1>
		<p class="mt-4 max-w-xl text-center text-lg leading-relaxed text-muted-foreground">
			{m.downloads_subtitle()}
		</p>
		<div class="mt-8 min-h-77 w-full max-w-xl">
			<DownloadCard class="w-full" />
		</div>
		<p class="mt-4 max-w-xl text-sm text-muted-foreground">
			{m.downloads_install_note()}
			<!-- eslint-disable svelte/no-navigation-without-resolve -->
			<a
				href="https://docs.blossomos.org/en/docs/user/installation"
				class="text-primary hover:underline"
				target="_blank">{m.downloads_install_link()}</a
			>
		</p>
	</div>

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
</div>
