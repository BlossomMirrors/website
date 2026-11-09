<script lang="ts">
	import PageMeta from '$lib/components/page/page-meta.svelte';
	import ArcSection from '$lib/components/sections/arc-section.svelte';
	import CommunitySection from '$lib/components/sections/community-section.svelte';
	import Hero from './hero.svelte';
	import Freedom from './freedom.svelte';
	import Design from './design.svelte';
	import Crt from './crt.svelte';
	import Foundation from './foundation.svelte';
	import Gaming from './gaming.svelte';

	import Business from './business.svelte';
	import Sovereignty from './sovereignty.svelte';
	import LessMore from './less-more.svelte';
	import DownloadCta from './download-cta.svelte';
	import GameCopyright from './game-copyright.svelte';
	import NewsletterToast from './newsletter-toast.svelte';
</script>

<PageMeta title="BlossomOS" />

<Hero />
<ArcSection />
<Design />
<Crt />
<Foundation />
<Gaming />

<Business />
<Sovereignty />
<LessMore />
<CommunitySection />
<DownloadCta />
<GameCopyright />

<NewsletterToast />
