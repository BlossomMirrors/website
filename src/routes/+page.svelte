<script lang="ts">
	import Desktop from '$lib/components/hero/desktop.svelte';
	import FreedomSection from '$lib/components/home/freedom-section.svelte';
	import ArcSection from '$lib/components/home/arc-section.svelte';
	import GamingSection from '$lib/components/home/gaming-section.svelte';
	import FoundationSection from '$lib/components/home/foundation-section.svelte';
	import DesignSection from '$lib/components/home/design-section.svelte';
	import CrtSection from '$lib/components/home/crt-section.svelte';
	import CloudSection from '$lib/components/home/cloud-section.svelte';
	import BusinessSection from '$lib/components/home/business-section.svelte';
	import LessMoreSection from '$lib/components/home/less-more-section.svelte';
	import CommunitySection from '$lib/components/home/community-section.svelte';
	import DownloadCta from '$lib/components/home/download-cta.svelte';
	import * as m from '$lib/paraglide/messages';
	import DownloadCard from '$lib/components/home/download-card.svelte';
	import { getTitle } from '$lib/utils';
</script>

<svelte:head>
	<meta name="description" content={m.home_subtitle()} />
	<meta property="og:description" content={m.home_subtitle()} />
	<meta property="twitter:description" content={m.home_subtitle()} />
	<title>{getTitle('BlossomOS')}</title>
</svelte:head>

<div class="mb-4 flex flex-col">
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
<LessMoreSection />
<CommunitySection />
<DownloadCta />

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
