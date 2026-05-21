<script lang="ts">
	import { DiscordIcon } from '$lib/components/icons/discord/index.svelte';
	import { MatrixIcon } from '$lib/components/icons/matrix/index.svelte';
	import GitForkIcon from '@lucide/svelte/icons/git-fork';
	import HeartIcon from '@lucide/svelte/icons/heart';
	import { BlueskyIcon } from '$lib/components/icons/bluesky/index.svelte';

	const year = new Date().getFullYear();

	const socials = [
		{ label: 'Discord', href: 'https://discord.gg/dTqsBdxvNr', Icon: DiscordIcon },
		{ label: 'Matrix', href: 'https://matrix.to/#/#blossomos:blossomos.org', Icon: MatrixIcon },
		{ label: 'Git', href: 'https://git.blossomos.org/Blossom', Icon: GitForkIcon },
		{ label: 'Bluesky', href: 'https://bsky.app/profile/blossomos.org', Icon: BlueskyIcon }
	];

	const columns = [
		{
			heading: 'Products',
			links: [
				{ label: 'BlossomOS', href: '/os' },
				{ label: 'Arc Software', href: '/arc' },
				{ label: 'Blossom Cloud', href: '/cloud' }
			]
		},
		{
			heading: 'Resources',
			links: [
				{ label: 'Downloads', href: '/downloads' },
				{ label: 'Documentation', href: '/docs' },
				{ label: 'Release Notes', href: '/releases' }
			]
		},
		{
			heading: 'Community',
			links: [
				{ label: 'Forum', href: 'https://community.blossomos.org' },
				{ label: 'Discord', href: 'https://discord.gg/dTqsBdxvNr' },
				{ label: 'Report an Issue', href: 'https://git.blossomos.org/Blossom/blossomos/issues' }
			]
		}
	];
</script>

<footer class="relative overflow-hidden border-t border-border bg-card">
	<img
		src="/logo.svg"
		alt=""
		aria-hidden="true"
		class="logo-spin pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 opacity-10 md:h-96 md:w-96"
	/>
	<div class="mx-auto max-w-7xl px-4 py-16 md:py-20">
		<!-- Link columns -->
		<div class="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
			<!-- Social column -->
			<div>
				<p class="mb-4 text-sm font-semibold">Follow Us</p>
				<div class="flex gap-3">
					{#each socials as s (s.label)}
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
		<div class="mt-14 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
			<span>Made with</span>
			<HeartIcon size={14} class="text-destructive" fill="currentColor" />
			<span>by Blossom Labs · © {year}</span>
		</div>
	</div>
</footer>

<style>
	@keyframes slow-spin {
		to {
			transform: rotate(360deg);
		}
	}
	.logo-spin {
		animation: slow-spin 20s linear infinite;
		transform-origin: center;
	}
</style>
