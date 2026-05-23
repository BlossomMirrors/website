<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import CalendarIcon from '@lucide/svelte/icons/calendar';
	import MapPinIcon from '@lucide/svelte/icons/map-pin';
	import VideoIcon from '@lucide/svelte/icons/video';
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
	import RadioIcon from '@lucide/svelte/icons/radio';
	import * as m from '$lib/paraglide/messages';
	import SectionHeader from '$lib/components/ui/section-header.svelte';
	import CommunitySection from '$lib/components/home/community-section.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { getTitle } from '$lib/utils';

	type Event = {
		id: string;
		title: string;
		from: string; // ISO 8601 UTC
		to: string; // ISO 8601 UTC
		location: string;
		online: boolean;
		image?: string;
		href?: string;
		talkHref?: string;
	};

	/*
	const events: Event[] = [
		{
			id: 'community-qa-2026-05',
			title: 'Blossom Community Q&A',
			from: '2026-05-21T22:00:00Z',
			to: '2026-05-22T20:00:00Z',
			location: 'Discord',
			online: true,
			image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&fit=crop',
			href: 'https://discord.gg/dTqsBdxvNr'
		},
		{
			id: 'linux-app-summit-2026',
			title: 'Linux App Summit 2026',
			from: '2026-09-12T08:00:00Z',
			to: '2026-09-14T18:00:00Z',
			location: 'Brno, Czech Republic',
			online: false,
			image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&fit=crop',
			href: 'https://linuxappsummit.org'
		},
		{
			id: 'fosdem-2027',
			title: 'FOSDEM 2027',
			from: '2027-02-06T08:00:00Z',
			to: '2027-02-07T18:00:00Z',
			location: 'Brussels, Belgium',
			online: false,
			image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&fit=crop',
			href: 'https://fosdem.org'
		},
		{
			id: 'roadmap-q1-2026',
			title: 'Blossom Roadmap Talk Q1 2026',
			from: '2026-03-08T18:00:00Z',
			to: '2026-03-08T20:00:00Z',
			location: 'YouTube / Peertube',
			online: true,
			image: 'https://images.unsplash.com/photo-1582192730841-2a682d7375f9?w=800&fit=crop',
			talkHref: 'https://git.blossomos.org/Blossom'
		},
		{
			id: 'fosdem-2026',
			title: 'FOSDEM 2026',
			from: '2026-02-01T08:00:00Z',
			to: '2026-02-02T18:00:00Z',
			location: 'Brussels, Belgium',
			online: false,
			image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&fit=crop',
			talkHref: 'https://fosdem.org/2026'
		}
	];
	 */

	const events: Event[] = [];

	function formatDateRange(from: string, to: string): string {
		const f = new Date(from);
		const t = new Date(to);
		const opts: Intl.DateTimeFormatOptions = {
			month: 'long',
			day: 'numeric',
			year: 'numeric',
			timeZone: 'UTC'
		};
		if (f.toDateString() === t.toDateString()) return f.toLocaleDateString('en-US', opts);
		if (f.getUTCMonth() === t.getUTCMonth() && f.getUTCFullYear() === t.getUTCFullYear()) {
			return `${f.toLocaleDateString('en-US', { month: 'long', timeZone: 'UTC' })} ${f.getUTCDate()}-${t.getUTCDate()}, ${f.getUTCFullYear()}`;
		}
		return `${f.toLocaleDateString('en-US', opts)} - ${t.toLocaleDateString('en-US', opts)}`;
	}

	const now = Date.now();
	const liveEvents = $derived(
		events.filter((e) => now >= new Date(e.from).getTime() && now <= new Date(e.to).getTime())
	);
	const upcomingEvents = $derived(
		events
			.filter((e) => new Date(e.from).getTime() > now)
			.sort((a, b) => new Date(a.from).getTime() - new Date(b.from).getTime())
	);
	const pastEvents = $derived(
		events
			.filter((e) => new Date(e.to).getTime() < now)
			.sort((a, b) => new Date(b.to).getTime() - new Date(a.to).getTime())
	);
</script>

<svelte:head>
	<meta name="description" content={m.events_subtitle()} />
	<meta property="og:title" content={getTitle(m.events())} />
	<meta property="og:description" content={m.events_subtitle()} />
	<meta name="twitter:title" content={getTitle(m.events())} />
	<meta name="twitter:description" content={m.events_subtitle()} />
	<title>{getTitle(m.events())}</title>
</svelte:head>

<div class="py-16 md:py-24">
	<!-- Hero -->
	<div class="mx-auto max-w-3xl text-center" use:reveal>
		<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">
			{m.events_tagline()}
		</p>
		<h1 class="font-serif text-5xl leading-tight md:text-7xl">
			{m.events_h1()}
		</h1>
		<p class="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
			{m.events_subtitle()}
		</p>
	</div>

	<!-- Live -->
	{#if liveEvents.length > 0}
		<div class="mt-20">
			<div class="mb-8 flex items-center gap-3" use:reveal>
				<span
					class="flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/10 px-3 py-1 text-xs font-semibold text-destructive"
				>
					<span class="relative flex h-2 w-2">
						<span
							class="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75"
						></span>
						<span class="relative inline-flex h-2 w-2 rounded-full bg-destructive"></span>
					</span>
					{m.events_live_badge()}
				</span>
				<p class="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
					{m.events_live_subheader()}
				</p>
			</div>

			<div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
				{#each liveEvents as event, i (event.id)}
					<div
						class="overflow-hidden rounded-2xl border border-destructive/30 bg-destructive/5"
						use:reveal={i * 70}
					>
						{#if event.image}
							<img src={event.image} alt={event.title} class="h-40 w-full object-cover" />
						{/if}
						<div class="p-6">
							<div class="mb-4 flex items-center gap-2 text-sm text-destructive">
								<RadioIcon size={16} />
								<span class="font-semibold">{m.events_live_badge()}</span>
							</div>
							<h3 class="mb-3 text-lg font-semibold">{event.title}</h3>
							<div class="flex flex-col gap-1.5 text-sm text-muted-foreground">
								<div class="flex items-center gap-2">
									<CalendarIcon size={14} />
									<span>{formatDateRange(event.from, event.to)}</span>
								</div>
								<div class="flex items-center gap-2">
									<MapPinIcon size={14} />
									<span>{event.location}</span>
									{#if event.online}
										<span
											class="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs text-primary"
											>{m.events_online()}</span
										>
									{/if}
								</div>
							</div>
							{#if event.href}
								<div class="mt-4">
									<!-- eslint-disable svelte/no-navigation-without-resolve -->
									<a href={event.href} target="_blank" rel="noreferrer">
										<Button size="sm">
											{m.events_join()}
											<ExternalLinkIcon size={14} class="ml-1.5" />
										</Button>
									</a>
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Upcoming -->
	<div class="mt-20">
		<SectionHeader subheader={m.events_upcoming_subheader()} class="mb-10">
			{m.events_upcoming_subheader()}
		</SectionHeader>

		{#if upcomingEvents.length > 0}
			<div class="grid gap-4 sm:grid-cols-2 md:gap-6">
				{#each upcomingEvents as event, i (event.id)}
					<div class="overflow-hidden rounded-2xl border border-border bg-card" use:reveal={i * 70}>
						{#if event.image}
							<img src={event.image} alt={event.title} class="h-40 w-full object-cover" />
						{/if}
						<div class="p-6">
							<h3 class="mb-3 text-lg font-semibold">{event.title}</h3>
							<div class="flex flex-col gap-1.5 text-sm text-muted-foreground">
								<div class="flex items-center gap-2">
									<CalendarIcon size={14} />
									<span>{formatDateRange(event.from, event.to)}</span>
								</div>
								<div class="flex items-center gap-2">
									<MapPinIcon size={14} />
									<span>{event.location}</span>
									{#if event.online}
										<span
											class="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs text-primary"
											>{m.events_online()}</span
										>
									{:else}
										<span
											class="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground"
											>{m.events_in_person()}</span
										>
									{/if}
								</div>
							</div>
							{#if event.href}
								<div class="mt-5">
									<a href={event.href} target="_blank" rel="noreferrer">
										<Button size="sm">
											{m.events_learn_more()}
											<ExternalLinkIcon size={14} class="ml-1.5" />
										</Button>
									</a>
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<p class="text-muted-foreground" use:reveal>{m.events_no_upcoming()}</p>
		{/if}
	</div>

	<!-- Past -->
	{#if pastEvents.length > 0}
		<div class="mt-20">
			<SectionHeader subheader={m.events_past_subheader()} class="mb-10">
				{m.events_past_subheader()}
			</SectionHeader>

			<div class="divide-y divide-border rounded-2xl border border-border bg-card" use:reveal>
				{#each pastEvents as event (event.id)}
					<div class="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:gap-6">
						{#if event.image}
							<img
								src={event.image}
								alt={event.title}
								class="h-20 w-full rounded-xl object-cover sm:w-32 sm:shrink-0"
							/>
						{/if}
						<div class="flex-1">
							<p class="font-semibold">{event.title}</p>
							<div class="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
								<div class="flex items-center gap-1.5">
									<CalendarIcon size={13} />
									<span>{formatDateRange(event.from, event.to)}</span>
								</div>
								<div class="flex items-center gap-1.5">
									<MapPinIcon size={13} />
									<span>{event.location}</span>
								</div>
								{#if event.online}
									<span
										class="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs text-primary"
										>{m.events_online()}</span
									>
								{/if}
							</div>
						</div>
						{#if event.talkHref}
							<a href={event.talkHref} target="_blank" rel="noreferrer">
								<Button size="sm">
									<VideoIcon size={14} class="mr-1.5" />
									{m.events_watch_talk()}
								</Button>
							</a>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<div class="mt-24">
		<CommunitySection />
	</div>
</div>
