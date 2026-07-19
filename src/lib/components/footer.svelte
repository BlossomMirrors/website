<script lang="ts">
	import { MatrixIcon } from '$lib/components/icons/matrix/index.svelte';
	import HeartIcon from '@lucide/svelte/icons/heart';
	import { BlueskyIcon } from '$lib/components/icons/bluesky/index.svelte';
	import { LiberapayIcon } from '$lib/components/icons/liberapay/index.svelte';
	import * as m from '$lib/paraglide/messages';
	import LogoMono from './icons/logo-mono.svelte';
	import { YouTubeIcon } from '$lib/components/icons/youtube/index.svelte';

	const year = new Date().getFullYear();

	const socials = [
		{ label: 'YouTube', href: 'https://www.youtube.com/@blossomlabstv', Icon: YouTubeIcon },
		{ label: 'Matrix', href: 'https://matrix.to/#/#blossomos:blossomos.org', Icon: MatrixIcon },
		{ label: 'Bluesky', href: 'https://bsky.app/profile/blossomos.org', Icon: BlueskyIcon },
		{ label: 'Liberapay', href: 'https://liberapay.com/blossomos', Icon: LiberapayIcon }
	];

	const columns = $derived([
		{
			heading: m.products(),
			links: [
				{ label: 'BlossomOS', href: '/' },
				{ label: 'Arc Software', href: '/arc' },
				{ label: 'Blossom Cloud', href: '/cloud' }
			]
		},
		{
			heading: m.footer_resources(),
			links: [
				{ label: m.downloads(), href: '/downloads' },
				{ label: m.screenshots_nav(), href: '/screenshots' },
				{ label: m.footer_link_docs(), href: 'https://docs.blossomos.org' }
			]
		},
		{
			heading: m.community(),
			links: [
				{ label: m.footer_link_forum(), href: 'https://community.blossomos.org' },
				{ label: m.discord(), href: 'https://discord.gg/dTqsBdxvNr' },
				{
					label: m.footer_link_git(),
					href: 'https://dev.blossomos.org/Blossom'
				}
			]
		},
		{
			heading: m.footer_legal(),
			links: [{ label: m.footer_link_privacy(), href: '/privacy' }]
		}
	]);
</script>

<footer class="relative overflow-hidden border-t border-border bg-card">
	<LogoMono
		class="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 animate-spin-slow text-foreground opacity-50 md:h-96 md:w-96"
	/>
	<div class="mx-auto max-w-7xl px-4 py-16 md:py-20">
		<!-- Link columns -->
		<div class="grid gap-10 sm:grid-cols-2 md:grid-cols-5">
			<!-- Social column -->
			<div>
				<p class="mb-4 text-sm font-semibold">{m.footer_follow_us()}</p>
				<div class="flex gap-3">
					{#each socials as s (s.label)}
						<!-- eslint-disable svelte/no-navigation-without-resolve -->
						<a
							href={s.href}
							target="_blank"
							rel="noreferrer"
							aria-label={s.label}
							class="text-muted-foreground transition-colors hover:text-foreground"
						>
							<s.Icon size={20} class="mr-2" />
						</a>
					{/each}
				</div>
			</div>

			{#each columns as col (col.heading)}
				<div>
					<p class="mb-4 text-sm font-semibold">{col.heading}</p>
					<ul class="flex flex-col gap-2.5">
						{#each col.links as link (link.href)}
							<li>
								<a
									href={link.href}
									class="text-sm text-muted-foreground transition-colors hover:text-foreground"
									target={link.href.startsWith('http') && link.href.includes('://')
										? '_blank'
										: undefined}
								>
									{link.label}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>

		<!-- Bottom bar -->
		<div class="mt-14 flex flex-wrap items-center justify-between gap-4">
			<div class="flex flex-col gap-2">
				<div class="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
					<span>{m.footer_made_with()}</span>
					<HeartIcon size={14} class="text-destructive" fill="currentColor" />
					<span>{m.footer_made_by()}</span>
				</div>
				<p class="text-sm text-muted-foreground">{m.footer_copyright({ year })}</p>
			</div>
			<!-- Will be enabled soon
			<div class="flex gap-4 text-sm text-muted-foreground">
				<a href="/imprint" class="transition-colors hover:text-foreground">{m.footer_imprint()}</a>
				<a href="/privacy" class="transition-colors hover:text-foreground">{m.footer_privacy()}</a>
			</div>
			-->
		</div>
	</div>
</footer>
