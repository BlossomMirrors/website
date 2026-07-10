<script lang="ts">
	import Desktop from '$lib/components/hero/desktop.svelte';
	import ReleaseBanner from '$lib/components/home/release-banner.svelte';
	import FreedomSection from '$lib/components/home/freedom-section.svelte';
	import ArcSection from '$lib/components/home/arc-section.svelte';
	import GamingSection from '$lib/components/home/gaming-section.svelte';
	import FoundationSection from '$lib/components/home/foundation-section.svelte';
	import DesignSection from '$lib/components/home/design-section.svelte';
	import CrtSection from '$lib/components/home/crt-section.svelte';
	import CloudSection from '$lib/components/home/cloud-section.svelte';
	import BusinessSection from '$lib/components/home/business-section.svelte';
	import SovereigntySection from '$lib/components/home/sovereignty-section.svelte';
	import LessMoreSection from '$lib/components/home/less-more-section.svelte';
	import CommunitySection from '$lib/components/home/community-section.svelte';
	import DownloadCta from '$lib/components/home/download-cta.svelte';
	import GameCopyright from '$lib/components/home/game-copyright.svelte';
	import * as m from '$lib/paraglide/messages';
	import DownloadCard from '$lib/components/home/download-card.svelte';
	import { getTitle } from '$lib/utils';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import CheckCircleIcon from '@lucide/svelte/icons/check-circle';

	let toast = $state<string | null>(null);

	onMount(() => {
		// eslint-disable-next-line svelte/prefer-svelte-reactivity
		const params = new URLSearchParams(window.location.search);
		const newsletter = params.get('newsletter');
		if (newsletter === 'confirmed') {
			toast = m.newsletter_confirmed_toast();
			params.delete('newsletter');
			const newUrl = window.location.pathname + (params.size ? `?${params}` : '');
			history.replaceState(null, '', newUrl);
			setTimeout(() => (toast = null), 5000);
		}
	});
</script>

<svelte:head>
	<meta name="description" content={m.home_subtitle()} />
	<meta property="og:title" content={getTitle('BlossomOS')} />
	<meta property="og:description" content={m.home_subtitle()} />
	<meta name="twitter:title" content={getTitle('BlossomOS')} />
	<meta name="twitter:description" content={m.home_subtitle()} />
	<title>{getTitle('BlossomOS')}</title>
</svelte:head>

<div class="mb-4 flex flex-col">
	<ReleaseBanner />
	<Desktop />

	<div class="mt-8 grid min-h-77 grid-cols-1 items-start gap-6 md:grid-cols-2 md:gap-12">
		<div>
			<h1 class="font-serif text-5xl leading-none sm:text-7xl md:text-8xl">BlossomOS</h1>
			<p class="mt-3 text-lg leading-relaxed text-muted-foreground md:text-xl">
				{m.home_subtitle()}
			</p>
		</div>
		<div>
			<DownloadCard />
		</div>
	</div>
</div>

<FreedomSection />
<ArcSection />
<DesignSection />
<CrtSection />
<FoundationSection />
<GamingSection />
<CloudSection />
<BusinessSection />
<SovereigntySection />
<LessMoreSection />
<CommunitySection />
<DownloadCta />
<GameCopyright />

{#if toast}
	<div
		transition:fly={{ y: 16, duration: 250 }}
		class="fixed right-4 bottom-4 z-50 flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-lg"
	>
		<CheckCircleIcon size={16} class="shrink-0 text-primary" />
		<span class="text-sm font-medium">{toast}</span>
	</div>
{/if}

<style>
	@keyframes screen-on {
		0% {
			opacity: 1;
		}
		60% {
			opacity: 1;
		}
		100% {
			opacity: 0;
			pointer-events: none;
		}
	}

	:global(.animate-screen-on) {
		animation: screen-on 1.4s ease-out forwards;
	}
</style>
