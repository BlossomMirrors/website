<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import UsersIcon from '@lucide/svelte/icons/users';
	import GitBranchIcon from '@lucide/svelte/icons/git-branch';
	import BookOpenIcon from '@lucide/svelte/icons/book-open';
	import CodeIcon from '@lucide/svelte/icons/code';
	import LanguagesIcon from '@lucide/svelte/icons/languages';
	import BugIcon from '@lucide/svelte/icons/bug';
	import MessageCircleIcon from '@lucide/svelte/icons/message-circle';
	import { DiscordIcon } from '$lib/components/icons/discord/index.svelte';
	import { MatrixIcon } from '$lib/components/icons/matrix/index.svelte';
	import { BlueskyIcon } from '$lib/components/icons/bluesky/index.svelte';
	import { YouTubeIcon } from '$lib/components/icons/youtube/index.svelte';
	import { LiberapayIcon } from '$lib/components/icons/liberapay/index.svelte';
	import * as m from '$lib/paraglide/messages';
	import Features from '$lib/components/ui/features.svelte';
	import Stats from '$lib/components/community/stats.svelte';
	import CommunitySection from '$lib/components/home/community-section.svelte';
	import SectionHeader from '$lib/components/ui/section-header.svelte';
	import { getTitle } from '$lib/utils';

	const channels = [
		{
			Icon: DiscordIcon,
			title: m.community_channel_discord_title(),
			body: m.community_channel_discord_body(),
			href: 'https://discord.gg/dTqsBdxvNr',
			cta: m.learn_more()
		},
		{
			Icon: MatrixIcon,
			title: m.matrix(),
			body: m.community_channel_matrix_body(),
			href: 'https://matrix.to/#/#space:blossomos.org',
			cta: m.learn_more()
		},
		{
			Icon: GitBranchIcon,
			title: m.footer_link_git(),
			body: m.community_channel_git_body(),
			href: 'https://dev.blossomos.org/Blossom',
			cta: m.learn_more()
		},
		{
			Icon: BookOpenIcon,
			title: m.community_channel_docs_title(),
			body: m.community_channel_docs_body(),
			href: 'https://help.blossomos.org',
			cta: m.learn_more()
		},
		{
			Icon: BlueskyIcon,
			title: m.community_channel_bluesky_title(),
			body: m.community_channel_bluesky_body(),
			href: 'https://bsky.app/profile/blossomos.org',
			cta: m.learn_more()
		},
		{
			Icon: YouTubeIcon,
			title: m.community_channel_youtube_title(),
			body: m.community_channel_youtube_body(),
			href: 'https://www.youtube.com/@blossomlabstv',
			cta: m.learn_more()
		}
	];

	const involved = [
		{ Icon: CodeIcon, title: m.community_involved1_title(), body: m.community_involved1_body() },
		{
			Icon: LanguagesIcon,
			title: m.community_involved2_title(),
			body: m.community_involved2_body()
		},
		{ Icon: BugIcon, title: m.community_involved3_title(), body: m.community_involved3_body() },
		{
			Icon: MessageCircleIcon,
			title: m.community_involved4_title(),
			body: m.community_involved4_body()
		}
	];
</script>

<svelte:head>
	<meta name="description" content={m.community_hero_body()} />
	<meta property="og:title" content={getTitle(m.community())} />
	<meta property="og:description" content={m.community_hero_body()} />
	<meta name="twitter:title" content={getTitle(m.community())} />
	<meta name="twitter:description" content={m.community_hero_body()} />
	<title>{getTitle(m.community())}</title>
</svelte:head>

<div class="py-16 md:py-24">
	<!-- Hero -->
	<div class="mx-auto max-w-4xl text-center" use:reveal>
		<div
			class="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary"
		>
			<UsersIcon size={32} strokeWidth={1.5} />
		</div>
		<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">{m.community()}</p>
		<h1 class="font-serif text-5xl leading-tight md:text-7xl">{m.community_discover()}</h1>
		<p class="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
			{m.community_hero_body()}
		</p>
	</div>

	<!-- Channels -->
	<div class="mt-24">
		<SectionHeader subheader={m.community_channels_subheader()} class="mb-14">
			{m.community_channels_h2()}
		</SectionHeader>

		<Features features={channels} />
	</div>

	<!-- Ways to get involved -->
	<div class="mt-24">
		<SectionHeader subheader={m.community_involved_subheader()} class="mb-14">
			{m.community_involved_h2()}
		</SectionHeader>

		<div class="grid gap-4 sm:grid-cols-2">
			{#each involved as i, idx (i.title)}
				<div class="rounded-2xl border border-border bg-card p-7 md:p-9" use:reveal={idx * 70}>
					<div
						class="mb-5 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary"
					>
						<i.Icon size={20} strokeWidth={1.5} />
					</div>
					<h3 class="font-semibold">{i.title}</h3>
					<p class="mt-2 text-sm leading-relaxed text-muted-foreground">{i.body}</p>
				</div>
			{/each}
		</div>
	</div>

	<div class="mt-24">
		<Stats />
	</div>

	<CommunitySection />
</div>
