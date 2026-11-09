<script lang="ts">
	import { onMount } from 'svelte';
	import Window from './window.svelte';
	import SmartLink from '$lib/components/elements/smart-link.svelte';
	import HomeIcon from '@lucide/svelte/icons/house';
	import SearchIcon from '@lucide/svelte/icons/search';
	import SlidersHorizontalIcon from '@lucide/svelte/icons/sliders-horizontal';
	import * as m from '$lib/paraglide/messages';

	import whatsappPng from '$lib/assets/proprietary/whatsapp.png';
	import netflixPng from '$lib/assets/proprietary/netflix.png';
	import spotifyPng from '$lib/assets/proprietary/spotify.png';
	import arcPng from '$lib/assets/taskbar/arc.png';
	import steamPng from '$lib/assets/taskbar/steam.png';
	import discordPng from '$lib/assets/taskbar/discord.png';
	import thunderbirdPng from '$lib/assets/taskbar/thunderbird.png';
	import libreofficePng from '$lib/assets/taskbar/libreoffice.png';
	import obsidianPng from '$lib/assets/taskbar/obsidian.png';

	type InstallApp = {
		name: string;
		appstreamId: string;
		image: typeof whatsappPng;
	};

	const demoApps: InstallApp[] = [
		{ name: 'WhatsApp', appstreamId: 'io.opencode.OpenCode', image: whatsappPng },
		{ name: 'Netflix', appstreamId: 'com.netflix.Netflix', image: netflixPng },
		{ name: 'Spotify', appstreamId: 'com.spotify.Client', image: spotifyPng }
	];

	const browseApps = [
		{ name: 'Steam', img: steamPng, appstreamId: 'com.valvesoftware.Steam' },
		{ name: 'Discord', img: discordPng, appstreamId: 'com.discordapp.Discord' },
		{ name: 'Thunderbird', img: thunderbirdPng, appstreamId: 'org.mozilla.Thunderbird' },
		{ name: 'LibreOffice', img: libreofficePng, appstreamId: 'org.libreoffice.LibreOffice' },
		{ name: 'Obsidian', img: obsidianPng, appstreamId: 'md.obsidian.Obsidian' }
	];

	let { isLinux = false }: { isLinux?: boolean } = $props();

	let progress = $state<Record<string, number>>({
		WhatsApp: 100,
		Netflix: 23,
		Spotify: 0
	});
	let activeTab = $state<'installed' | 'downloads'>('downloads');
	let rootEl = $state<HTMLElement | null>(null);
	let visible = $state(false);

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					visible = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.2 }
		);
		if (rootEl) observer.observe(rootEl);
		return () => observer.disconnect();
	});

	$effect(() => {
		if (!visible) return;

		const WhatsApp = setInterval(() => {
			if (progress['WhatsApp'] >= 100) {
				clearInterval(WhatsApp);
				return;
			}
			progress['WhatsApp'] = Math.min(100, progress['WhatsApp'] + 1);
		}, 120);

		const Netflix = setInterval(() => {
			if (progress['Netflix'] >= 100) {
				clearInterval(Netflix);
				return;
			}
			progress['Netflix'] = Math.min(100, progress['Netflix'] + 1);
		}, 200);

		const Spotify = setInterval(() => {
			if (progress['Spotify'] >= 100) {
				clearInterval(Spotify);
				return;
			}
			progress['Spotify'] = Math.min(100, progress['Spotify'] + 1);
		}, 200);

		return () => {
			clearInterval(WhatsApp);
			clearInterval(Netflix);
			clearInterval(Spotify);
		};
	});

	function installUrl(id: string) {
		return isLinux ? `appstream://${id}` : '/downloads';
	}
</script>

<div bind:this={rootEl}>
	<Window title="Arc Software" icon={arcPng}>
		<div class="hidden items-center gap-2 border-b border-border px-3 py-2 sm:flex">
			<button
				class="flex size-7 items-center justify-center rounded-md text-foreground/60 hover:bg-foreground/8"
			>
				<HomeIcon size={14} />
			</button>
			<div
				class="flex flex-1 items-center gap-2 rounded-md border border-border bg-background px-2.5 py-1.5"
			>
				<SearchIcon size={13} class="text-foreground/60" />
				<span class="text-xs text-foreground/60">{m.arc_search_placeholder()}</span>
			</div>
			<div class="flex items-center overflow-hidden rounded-md border border-border text-xs">
				<button
					class="px-3 py-1.5 transition-colors {activeTab === 'installed'
						? 'bg-foreground/15 text-foreground'
						: 'text-foreground/60 hover:text-foreground'}"
					onclick={() => (activeTab = 'installed')}>{m.arc_tab_installed()}</button
				>
				<button
					class="px-3 py-1.5 transition-colors {activeTab === 'downloads'
						? 'bg-foreground/15 text-foreground'
						: 'text-foreground/60 hover:text-foreground'}"
					onclick={() => (activeTab = 'downloads')}>{m.arc_tab_downloads()}</button
				>
			</div>
			<button
				class="flex size-7 items-center justify-center rounded-md text-foreground/60 hover:bg-foreground/8"
			>
				<SlidersHorizontalIcon size={14} />
			</button>
		</div>

		<div class="h-80 overflow-hidden">
			{#if activeTab === 'downloads'}
				<div class="p-4">
					<div class="mb-3 flex items-center justify-between">
						<span class="text-sm font-bold text-foreground">{m.arc_tab_downloads()}</span>
						<button
							class="rounded-md border border-border px-3 py-1 text-xs text-foreground/60 hover:bg-foreground/8"
						>
							{m.arc_check_updates()}
						</button>
					</div>

					<div class="flex flex-col gap-2">
						{#each demoApps as app (app.name)}
							{@const pct = progress[app.name] ?? 0}
							<div class="flex items-center gap-3 rounded-xl bg-muted px-3 py-3">
								<div class="flex size-10 shrink-0 items-center justify-center rounded-xl">
									<enhanced:img src={app.image} alt={app.name} sizes="32px" class="size-8" />
								</div>
								<div class="min-w-0 flex-1">
									<div class="mb-1 flex items-center justify-between">
										<span class="text-sm font-medium text-foreground">{app.name}</span>
										<div class="flex items-center gap-2">
											<span class="text-xs text-foreground/60">
												{pct < 100 ? m.arc_installing() : m.arc_tab_installed()}
											</span>
											<span class="text-xs font-semibold text-primary">{pct}%</span>
										</div>
									</div>
									<div class="h-1.5 w-full overflow-hidden rounded-full bg-border">
										<div
											class="h-full rounded-full bg-primary transition-all duration-300"
											style="width: {pct}%"
										></div>
									</div>
								</div>
								{#if pct < 100}
									<button
										class="shrink-0 rounded-md bg-destructive px-2.5 py-1 text-xs font-semibold text-white"
									>
										{m.arc_cancel()}
									</button>
								{/if}
							</div>
						{/each}
					</div>
				</div>
			{:else}
				<div class="p-4">
					<p class="mb-3 text-xs text-foreground/60">{m.arc_installed_apps()}</p>
					<div class="flex flex-col gap-1">
						{#each browseApps as app (app.appstreamId)}
							<SmartLink
								href={installUrl(app.appstreamId)}
								class="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-foreground/8"
							>
								<enhanced:img
									src={app.img}
									alt={app.name}
									sizes="32px"
									class="size-8 rounded-lg object-contain"
								/>
								<span class="flex-1 text-sm text-foreground/80">{app.name}</span>
								<span class="text-xs text-primary"
									>{isLinux ? m.arc_open_in_arc() : m.arc_install()}</span
								>
							</SmartLink>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</Window>
</div>
