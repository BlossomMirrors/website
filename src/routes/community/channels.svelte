<script lang="ts">
	import GitBranchIcon from '@lucide/svelte/icons/git-branch';
	import BookOpenIcon from '@lucide/svelte/icons/book-open';
	import { DiscordIcon } from '$lib/components/icons/discord/index.svelte';
	import { MatrixIcon } from '$lib/components/icons/matrix/index.svelte';
	import { BlueskyIcon } from '$lib/components/icons/bluesky/index.svelte';
	import { YouTubeIcon } from '$lib/components/icons/youtube/index.svelte';
	import * as m from '$lib/paraglide/messages';
	import Section from '$lib/components/page/section.svelte';
	import FeatureGrid from '$lib/components/cards/feature-grid.svelte';
	import type { Feature } from '$lib/components/cards/feature-card.svelte';

	const channels: Feature[] = [
		{
			icon: DiscordIcon,
			title: m.community_channel_discord_title(),
			body: m.community_channel_discord_body(),
			href: 'https://discord.gg/dTqsBdxvNr',
			cta: m.learn_more()
		},
		{
			icon: MatrixIcon,
			title: m.matrix(),
			body: m.community_channel_matrix_body(),
			href: 'https://matrix.to/#/#space:blossomos.org',
			cta: m.learn_more()
		},
		{
			icon: GitBranchIcon,
			title: m.footer_link_git(),
			body: m.community_channel_git_body(),
			href: 'https://dev.blossomos.org/Blossom',
			cta: m.learn_more()
		},
		{
			icon: BookOpenIcon,
			title: m.community_channel_docs_title(),
			body: m.community_channel_docs_body(),
			href: 'https://help.blossomos.org',
			cta: m.learn_more()
		},
		{
			icon: BlueskyIcon,
			title: m.community_channel_bluesky_title(),
			body: m.community_channel_bluesky_body(),
			href: 'https://bsky.app/profile/blossom.computer',
			cta: m.learn_more()
		},
		{
			icon: YouTubeIcon,
			title: m.community_channel_youtube_title(),
			body: m.community_channel_youtube_body(),
			href: 'https://www.youtube.com/@blossomlabstv',
			cta: m.learn_more()
		}
	];
</script>

<Section eyebrow={m.community_channels_subheader()} title={m.community_channels_h2()}>
	<FeatureGrid items={channels} size="lg" />
</Section>
