<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { Button } from '$lib/components/ui/button';
	import ArcSection from '$lib/components/home/arc-section.svelte';
	import WindowsIcon from '$lib/components/windows-icon.svelte';
	import PackageIcon from '@lucide/svelte/icons/package';
	import LayersIcon from '@lucide/svelte/icons/layers';
	import ZapIcon from '@lucide/svelte/icons/zap';
	import ShieldCheckIcon from '@lucide/svelte/icons/shield-check';
	import * as m from '$lib/paraglide/messages';
	import { getTitle } from '$lib/utils';

	const formats = ['Flatpak', 'AppImage', '.deb', '.rpm', 'Arch Linux'];

	const unifyFeatures = [
		{ Icon: LayersIcon, title: m.arc_unify_feature1_title(), body: m.arc_unify_feature1_body() },
		{ Icon: ZapIcon, title: m.arc_unify_feature2_title(), body: m.arc_unify_feature2_body() },
		{
			Icon: ShieldCheckIcon,
			title: m.arc_unify_feature3_title(),
			body: m.arc_unify_feature3_body()
		}
	];
</script>

<svelte:head>
	<meta name="description" content={m.arc_page_subtitle()} />
	<meta property="og:description" content={m.arc_page_subtitle()} />
	<meta property="twitter:description" content={m.arc_page_subtitle()} />
	<title>{getTitle('Arc Software')}</title>
</svelte:head>

<div class="py-16 md:py-24">
	<!-- Hero -->
	<div class="mx-auto max-w-3xl text-center" use:reveal>
		<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">Arc Software</p>
		<h1 class="font-serif text-5xl leading-tight md:text-7xl">
			{m.arc_header1()}.<br />{m.arc_header2()}.
		</h1>
		<p class="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
			{m.arc_page_subtitle()}
		</p>
		<div class="mt-8 flex justify-center gap-3">
			<!-- eslint-disable svelte/no-navigation-without-resolve -->
			<a href="/">
				<Button variant="primary">{m.cta_download()}</Button>
			</a>
			<a href="https://git.blossomos.org/Blossom" target="_blank" rel="noreferrer">
				<Button>{m.home_view_source()}</Button>
			</a>
		</div>
	</div>

	<!-- Arc Unify -->
	<div class="mt-24 grid items-center gap-12 md:grid-cols-2 md:gap-20">
		<div use:reveal>
			<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">
				{m.arc_unify_subheader()}
			</p>
			<h2 class="font-serif text-4xl leading-tight md:text-5xl">
				{m.arc_unify_h2_1()}<br />{m.arc_unify_h2_2()}
			</h2>
			<p class="mt-6 text-lg leading-relaxed text-muted-foreground">
				{m.arc_unify_body()}
			</p>
			<div class="mt-8 grid gap-4">
				{#each unifyFeatures as f, i (f.title)}
					<div class="flex gap-4" use:reveal={100 + i * 70}>
						<div
							class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
						>
							<f.Icon size={16} strokeWidth={1.5} />
						</div>
						<div>
							<p class="font-semibold">{f.title}</p>
							<p class="mt-1 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div use:reveal={120}>
			<div class="rounded-2xl border border-border bg-card p-8">
				<p class="mb-5 text-sm font-medium text-muted-foreground">{m.arc_unify_formats_label()}</p>
				<div class="flex flex-wrap gap-3">
					{#each formats as fmt (fmt)}
						<div
							class="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2"
						>
							<PackageIcon size={14} class="text-primary" />
							<span class="text-sm font-medium">{fmt}</span>
						</div>
					{/each}
				</div>
				<div class="mt-6 rounded-xl bg-muted/50 p-4 font-mono text-sm">
					<p class="text-muted-foreground">{m.arc_unify_terminal_comment()}</p>
					<p class="mt-1 line-through opacity-50">
						sudo apt install libsomething-dev && chmod +x App.AppImage && ./App.AppImage
					</p>
					<p class="mt-3 text-primary">&#10003; {m.arc_unify_terminal_cta()}</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Arc Winapps -->
	<div class="mt-24 grid items-center gap-12 md:grid-cols-2 md:gap-20">
		<div class="order-2 md:order-1" use:reveal={120}>
			<div class="flex items-center justify-center rounded-2xl border border-border bg-card p-12">
				<div class="text-center">
					<div
						class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#0078d4]/10 fill-[#0078d4] p-4"
					>
						<WindowsIcon />
					</div>
					<p class="font-semibold">{m.arc_winapps_label()}</p>
					<p class="mt-2 text-sm text-muted-foreground">{m.arc_winapps_running()}</p>
					<div class="mt-4 flex justify-center gap-2">
						{#each ['Affinity Photo', 'FL Studio', 'Foobar 2000'] as app (app)}
							<span class="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
								{app}
							</span>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<div class="order-1 md:order-2" use:reveal>
			<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">
				{m.arc_winapps_subheader()}
			</p>
			<h2 class="font-serif text-4xl leading-tight md:text-5xl">
				{m.arc_winapps_h2_1()}<br />{m.arc_winapps_h2_2()}
			</h2>
			<p class="mt-6 text-lg leading-relaxed text-muted-foreground">
				{m.arc_winapps_body1()}
			</p>
			<p class="mt-4 text-lg leading-relaxed text-muted-foreground">
				{m.arc_winapps_body2()}
			</p>
		</div>
	</div>

	<!-- Interactive demo -->
	<div class="mt-32">
		<div class="text-center" use:reveal>
			<h2 class="font-serif text-4xl leading-tight md:text-5xl">{m.arc_demo_h2()}</h2>
			<p class="text-lg text-muted-foreground">
				{m.arc_demo_body()}
			</p>
		</div>
		<ArcSection learnMore={false} />
	</div>
</div>
