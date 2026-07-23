<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { Button } from '$lib/components/ui/button';
	import { getTitle } from '$lib/utils';
	import * as m from '$lib/paraglide/messages';
	import PackageIcon from '@lucide/svelte/icons/package';
	import SettingsIcon from '@lucide/svelte/icons/settings';
	import FolderOpenIcon from '@lucide/svelte/icons/folder-open';
	import BookmarkIcon from '@lucide/svelte/icons/bookmark';
	import ScanIcon from '@lucide/svelte/icons/scan';
	import DownloadIcon from '@lucide/svelte/icons/download';
	import CheckCircleIcon from '@lucide/svelte/icons/check-circle';
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
	import AlertCircleIcon from '@lucide/svelte/icons/alert-circle';
	import WindowsIcon from '$lib/components/windows-icon.svelte';

	const features = $derived([
		{
			Icon: PackageIcon,
			title: m.switch_feat_apps_title(),
			body: m.switch_feat_apps_body()
		},
		{
			Icon: FolderOpenIcon,
			title: m.switch_feat_files_title(),
			body: m.switch_feat_files_body()
		},
		{
			Icon: SettingsIcon,
			title: m.switch_feat_settings_title(),
			body: m.switch_feat_settings_body()
		},
		{
			Icon: BookmarkIcon,
			title: m.switch_feat_browser_title(),
			body: m.switch_feat_browser_body()
		}
	]);

	const steps = $derived([
		{
			Icon: ScanIcon,
			label: m.switch_step1_label(),
			body: m.switch_step1_body()
		},
		{
			Icon: DownloadIcon,
			label: m.switch_step2_label(),
			body: m.switch_step2_body()
		},
		{
			Icon: CheckCircleIcon,
			label: m.switch_step3_label(),
			body: m.switch_step3_body()
		}
	]);
</script>

<svelte:head>
	<meta name="description" content={m.switch_hero_subtitle()} />
	<meta property="og:title" content={getTitle(m.switch_tagline())} />
	<meta property="og:description" content={m.switch_hero_subtitle()} />
	<meta name="twitter:title" content={getTitle(m.switch_tagline())} />
	<meta name="twitter:description" content={m.switch_hero_subtitle()} />
	<title>{getTitle(m.switch_tagline())}</title>
</svelte:head>

<div class="py-16 md:py-24">
	<!-- Hero -->
	<div class="mx-auto max-w-3xl text-center" use:reveal>
		<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">
			{m.switch_tagline()}
		</p>
		<h1 class="font-serif text-5xl leading-tight md:text-7xl">
			{m.switch_hero_h1_1()}<br />{m.switch_hero_h1_2()}
		</h1>
		<p class="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
			{m.switch_hero_subtitle()}
		</p>
		<div class="mt-8 flex flex-wrap justify-center gap-3">
			<!-- eslint-disable svelte/no-navigation-without-resolve -->
			<a href="/downloads">
				<Button variant="primary"
					>{m.download_title()} <ArrowRightIcon size={16} strokeWidth={1.5} /></Button
				>
			</a>
			<a href="https://help.blossomos.org" target="_blank" rel="noreferrer">
				<Button>{m.switch_cta_docs()}</Button>
			</a>
		</div>
	</div>

	<!-- EndOf10 banner -->
	<div
		class="relative mt-20 overflow-hidden rounded-3xl bg-linear-to-br from-red-500/10 via-orange-500/5 to-transparent p-8 md:p-12"
		use:reveal
	>
		<div
			class="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full bg-red-500/8 blur-3xl"
		></div>
		<div class="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
			<div class="flex items-start gap-4">
				<div
					class="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500"
				>
					<AlertCircleIcon size={20} strokeWidth={1.5} />
				</div>
				<div>
					<p class="mb-1 text-xs font-semibold tracking-widest text-red-500 uppercase">
						{m.switch_endof10_badge()}
					</p>
					<h2 class="font-serif text-2xl leading-snug md:text-3xl">
						{m.switch_endof10_h2()}
					</h2>
					<p class="mt-2 max-w-xl text-base leading-relaxed text-muted-foreground">
						{m.switch_endof10_body()}
						<a
							href="https://endof10.org"
							target="_blank"
							rel="noreferrer"
							class="text-foreground underline underline-offset-2 hover:text-primary"
							>{m.switch_endof10_link()}</a
						>.
					</p>
				</div>
			</div>
			<div class="shrink-0">
				<a href="/downloads">
					<Button variant="primary">{m.switch_endof10_cta()}</Button>
				</a>
			</div>
		</div>
	</div>

	<!-- Features -->
	<div class="mt-24">
		<div use:reveal>
			<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">
				{m.switch_features_subheader()}
			</p>
			<h2 class="font-serif text-5xl leading-tight md:text-6xl">
				{m.switch_features_h2()}
			</h2>
		</div>

		<div class="mt-10 grid gap-4 sm:grid-cols-2 md:gap-6">
			{#each features as f, i (f.title)}
				<div class="rounded-2xl border border-border bg-card p-7" use:reveal={i * 70}>
					<div
						class="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"
					>
						<f.Icon size={20} strokeWidth={1.5} />
					</div>
					<h3 class="mb-2 font-semibold">{f.title}</h3>
					<p class="text-sm leading-relaxed text-muted-foreground">{f.body}</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- How it works -->
	<div class="mt-24">
		<div use:reveal>
			<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">
				{m.switch_steps_subheader()}
			</p>
			<h2 class="font-serif text-5xl leading-tight md:text-6xl">
				{m.switch_steps_h2_1()}<br />{m.switch_steps_h2_2()}
			</h2>
		</div>

		<div class="mt-10 grid gap-6 md:grid-cols-3">
			{#each steps as s, i (s.label)}
				<div class="rounded-2xl border border-border bg-card p-7" use:reveal={i * 80}>
					<div
						class="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"
					>
						<s.Icon size={20} strokeWidth={1.5} />
					</div>
					<p class="mb-1 text-xs font-semibold tracking-widest text-primary uppercase">
						{m.switch_step_prefix()}
						{i + 1}
					</p>
					<h3 class="mb-2 font-semibold">{s.label}</h3>
					<p class="text-sm leading-relaxed text-muted-foreground">{s.body}</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- CTA -->
	<div
		class="relative mt-24 overflow-hidden rounded-3xl bg-linear-to-br from-primary/10 via-primary/5 to-transparent p-10 md:p-16"
		use:reveal
	>
		<div
			class="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-primary/8 blur-3xl"
		></div>
		<div class="relative grid items-center gap-10 md:grid-cols-2">
			<div>
				<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">
					{m.switch_cta2_subheader()}
				</p>
				<h2 class="font-serif text-4xl leading-tight md:text-5xl">
					{m.switch_cta2_h2_1()}<br />{m.switch_cta2_h2_2()}
				</h2>
				<p class="mt-4 text-lg leading-relaxed text-muted-foreground">
					{m.switch_cta2_body()}
				</p>
				<div class="mt-8 flex flex-wrap gap-3">
					<a href="/downloads">
						<Button variant="primary">{m.download_title()}</Button>
					</a>
					<a href="/about">
						<Button>{m.learn_more()}</Button>
					</a>
				</div>
			</div>
			<div
				class="flex items-center justify-center opacity-5 dark:opacity-[0.04]"
				aria-hidden="true"
			>
				<div class="h-48 w-48 fill-foreground md:h-64 md:w-64">
					<WindowsIcon />
				</div>
			</div>
		</div>
	</div>
</div>
