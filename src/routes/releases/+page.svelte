<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import TagIcon from '@lucide/svelte/icons/tag';
	import DownloadIcon from '@lucide/svelte/icons/download';
	import CalendarIcon from '@lucide/svelte/icons/calendar';
	import * as m from '$lib/paraglide/messages';
	import { getTitle } from '$lib/utils';

	const CDN = 'https://cdn.blossomos.org/iso';

	let currentVersion = $state<string | null>(null);

	onMount(() => {
		fetch(`${CDN}/isodata.json?${Date.now()}`)
			.then((r) => r.json())
			.then((d: { name: string }) => {
				currentVersion = d.name.match(/BlossomOS-(.+?)-x86_64/)?.[1] ?? null;
			})
			.catch(() => {});
	});

	const releases = $derived([
		{
			version: 'Alpha 1',
			codename: 'Sakura',
			date: '2026',
			tag: 'latest',
			highlights: [
				m.releases_a1_h1(),
				m.releases_a1_h2(),
				m.releases_a1_h3(),
				m.releases_a1_h4(),
				m.releases_a1_h5(),
				m.releases_a1_h6()
			]
		}
	]);

	const roadmap = $derived([
		{
			version: 'Alpha 2',
			items: [
				m.releases_a2_item1(),
				m.releases_a2_item2(),
				m.releases_a2_item3(),
				m.releases_a2_item4(),
				m.releases_a2_item5()
			]
		},
		{
			version: 'Alpha 3',
			items: [
				m.releases_a3_item1(),
				m.releases_a3_item2(),
				m.releases_a3_item3(),
				m.releases_a3_item4(),
				m.releases_a3_item5()
			]
		} /*,
		{
			version: 'Beta 1',
			items: [m.releases_b1_item1(), m.releases_b1_item2()]
			} */
	]);
</script>

<svelte:head>
	<meta name="description" content={m.releases_subtitle()} />
	<meta property="og:title" content={getTitle(m.releases_subheader())} />
	<meta property="og:description" content={m.releases_subtitle()} />
	<meta name="twitter:title" content={getTitle(m.releases_subheader())} />
	<meta name="twitter:description" content={m.releases_subtitle()} />
	<title>{getTitle(m.releases_subheader())}</title>
</svelte:head>

<div class="py-16 md:py-24">
	<!-- Header -->
	<div use:reveal>
		<div class="flex items-center gap-3">
			<TagIcon size={20} class="text-primary" strokeWidth={1.5} />
			<p class="text-xs font-semibold tracking-widest text-primary uppercase">
				{m.releases_subheader()}
			</p>
		</div>
		<h1 class="mt-3 font-serif text-5xl leading-tight md:text-7xl">{m.releases_h1()}</h1>
		<p class="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
			{m.releases_subtitle()}
		</p>
	</div>

	<!-- Current release -->
	<div class="mt-16 space-y-6">
		{#each releases as release (release.version)}
			<div class="rounded-2xl border border-border bg-card" use:reveal={80}>
				<div
					class="flex flex-wrap items-start justify-between gap-4 border-b border-border p-6 md:p-8"
				>
					<div>
						<div class="flex flex-wrap items-center gap-2">
							<h2 class="font-serif text-3xl">{release.version}</h2>
							{#if release.tag === 'latest'}
								<span
									class="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary"
									>{m.releases_latest_badge()}</span
								>
							{/if}
						</div>
						<p class="mt-1 text-lg text-muted-foreground italic">"{release.codename}"</p>
						<div class="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
							<CalendarIcon size={14} />
							<span>{release.date}</span>
							{#if currentVersion}
								<span class="text-muted-foreground/50">·</span>
								<span class="font-mono text-xs">{currentVersion}</span>
							{/if}
						</div>
					</div>
					<!-- eslint-disable svelte/no-navigation-without-resolve -->
					<a href="/downloads">
						<Button variant="primary" size="sm">
							<DownloadIcon size={14} />
							{m.releases_download()}
						</Button>
					</a>
				</div>
				<div class="p-6 md:p-8">
					<p class="mb-4 text-sm font-semibold">{m.releases_highlights()}</p>
					<ul class="space-y-2.5">
						{#each release.highlights as item (item)}
							<li class="flex items-start gap-3 text-sm text-muted-foreground">
								<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"></span>
								{item}
							</li>
						{/each}
					</ul>
				</div>
			</div>
		{/each}
	</div>

	<!-- Roadmap -->
	<div class="mt-20" use:reveal>
		<h2 class="font-serif text-4xl leading-tight">{m.releases_roadmap_h2()}</h2>
		<p class="mt-3 text-muted-foreground">{m.releases_roadmap_body()}</p>
	</div>

	<div class="mt-8 grid gap-6 sm:grid-cols-2">
		{#each roadmap as r, i (r.version)}
			<div class="rounded-2xl border border-border bg-card p-7" use:reveal={i * 80}>
				<p class="mb-4 text-sm font-semibold text-muted-foreground">{r.version}</p>
				<ul class="space-y-2.5">
					{#each r.items as item (item)}
						<li class="flex items-start gap-3 text-sm text-muted-foreground">
							<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-border"></span>
							{item}
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>

	<p class="mt-12 text-center text-sm text-muted-foreground" use:reveal>
		{m.releases_footer()}
		<a
			href="https://git.blossomos.org/Blossom"
			target="_blank"
			rel="noreferrer"
			class="text-primary hover:underline"
		>
			{m.releases_git_link()}
		</a>
	</p>
</div>
