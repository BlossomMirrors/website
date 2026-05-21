<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { onMount } from 'svelte';
	import Window from '$lib/components/hero/window.svelte';
	import HomeIcon from '@lucide/svelte/icons/house';
	import SearchIcon from '@lucide/svelte/icons/search';
	import SlidersHorizontalIcon from '@lucide/svelte/icons/sliders-horizontal';
	import * as m from '$lib/paraglide/messages';

	type InstallApp = {
		name: string;
		appstreamId: string;
		image: string;
	};

	const demoApps: InstallApp[] = [
		{
			name: 'WhatsApp',
			appstreamId: 'io.opencode.OpenCode',
			image: '/proprietary/whatsapp.png'
		},
		{
			name: 'Netflix',
			appstreamId: 'com.netflix.Netflix',
			image: '/proprietary/netflix.png'
		},
		{
			name: 'Spotify',
			appstreamId: 'com.spotify.Client',
			image: '/proprietary/spotify.png'
		}
	];

	const browseApps = [
		{ name: 'Steam', img: '/taskbar/steam.png', appstreamId: 'com.valvesoftware.Steam' },
		{ name: 'Discord', img: '/taskbar/discord.png', appstreamId: 'com.discordapp.Discord' },
		{
			name: 'Thunderbird',
			img: '/taskbar/thunderbird.png',
			appstreamId: 'org.mozilla.Thunderbird'
		},
		{
			name: 'LibreOffice',
			img: '/taskbar/libreoffice.png',
			appstreamId: 'org.libreoffice.LibreOffice'
		},
		{ name: 'Obsidian', img: '/taskbar/obsidian.png', appstreamId: 'md.obsidian.Obsidian' }
	];

	let isLinux = $state(false);
	let progress = $state<Record<string, number>>({
		WhatsApp: 100,
		Netflix: 23,
		Spotify: 0
	});
	let activeTab = $state<'installed' | 'downloads'>('downloads');

	onMount(() => {
		isLinux = /Linux/.test(navigator.userAgent) && !/Android/.test(navigator.userAgent);

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
		};
	});

	function installUrl(id: string) {
		return isLinux ? `appstream://${id}` : '/downloads';
	}
</script>

<section class="py-24 md:py-36">
	<div class="grid items-center gap-12 md:grid-cols-2 md:gap-16">
		<div use:reveal>
			<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">Arc Software</p>
			<h2 class="font-serif text-5xl leading-tight md:text-6xl">
				{m.arc_header1()}.<br />{m.arc_header2()}.
			</h2>
			<p class="mt-6 text-lg leading-relaxed text-muted-foreground">
				{m.arc_description()}
			</p>
			{#if isLinux}
				<p class="mt-4 text-sm text-primary">
					{m.arc_linux()}
				</p>
			{/if}
		</div>

		<div use:reveal={120}>
			<Window
				title="Arc Software"
				icon="/taskbar/arc.png"
				embedded
				closable={false}
				bgClass="bg-neutral-900"
			>
				<!-- Toolbar -->
				<div class="flex items-center gap-2 border-b border-white/8 px-3 py-2">
					<button
						class="flex h-7 w-7 items-center justify-center rounded-md text-white/40 hover:bg-white/8"
					>
						<HomeIcon size={14} />
					</button>
					<div
						class="flex flex-1 items-center gap-2 rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5"
					>
						<SearchIcon size={13} class="text-white/30" />
						<span class="text-xs text-white/30">{m.arc_search_placeholder()}</span>
					</div>
					<div class="flex items-center overflow-hidden rounded-md border border-white/10 text-xs">
						<button
							class="px-3 py-1.5 transition-colors {activeTab === 'installed'
								? 'bg-white/15 text-white'
								: 'text-white/40 hover:text-white/60'}"
							onclick={() => (activeTab = 'installed')}>{m.arc_tab_installed()}</button
						>
						<button
							class="px-3 py-1.5 transition-colors {activeTab === 'downloads'
								? 'bg-white/15 text-white'
								: 'text-white/40 hover:text-white/60'}"
							onclick={() => (activeTab = 'downloads')}>{m.arc_tab_downloads()}</button
						>
					</div>
					<button
						class="flex h-7 w-7 items-center justify-center rounded-md text-white/40 hover:bg-white/8"
					>
						<SlidersHorizontalIcon size={14} />
					</button>
				</div>

				<!-- Content -->
				{#if activeTab === 'downloads'}
					<div class="p-4">
						<div class="mb-3 flex items-center justify-between">
							<span class="text-sm font-bold text-white">{m.arc_tab_downloads()}</span>
							<button
								class="rounded-md border border-white/15 px-3 py-1 text-xs text-white/60 hover:bg-white/8"
							>
								{m.arc_check_updates()}
							</button>
						</div>

						<div class="flex flex-col gap-2">
							{#each demoApps as app (app.name)}
								{@const pct = progress[app.name] ?? 0}
								<div class="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-3">
									<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
										<img src={app.image} alt={app.name} class="h-8 w-8" />
									</div>
									<div class="min-w-0 flex-1">
										<div class="mb-1 flex items-center justify-between">
											<span class="text-sm font-medium text-white">{app.name}</span>
											<div class="flex items-center gap-2">
												<span class="text-xs text-white/40">
													{pct < 100 ? m.arc_installing() : m.arc_installed_status()}
												</span>
												<span class="text-xs font-semibold text-primary">{pct}%</span>
											</div>
										</div>
										<div class="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
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
						<p class="mb-3 text-xs text-white/40">{m.arc_installed_apps()}</p>
						<div class="flex flex-col gap-1">
							{#each browseApps as app (app.appstreamId)}
								<!-- eslint-disable svelte/no-navigation-without-resolve -->
								<a
									href={installUrl(app.appstreamId)}
									class="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/8"
								>
									<img src={app.img} alt={app.name} class="h-8 w-8 rounded-lg object-contain" />
									<span class="flex-1 text-sm text-white/80">{app.name}</span>
									<span class="text-xs text-primary">{isLinux ? m.arc_open_in_arc() : m.arc_install()}</span>
								</a>
							{/each}
						</div>
					</div>
				{/if}
			</Window>
		</div>
	</div>
</section>
