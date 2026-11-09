<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import PageMeta from '$lib/components/page/page-meta.svelte';
	import CommunitySection from '$lib/components/sections/community-section.svelte';
	import DonateSection from '$lib/components/sections/donate-section.svelte';
	import Hero from './hero.svelte';
	import Mission from './mission.svelte';
	import Values from './values.svelte';
</script>

<PageMeta title={m.about_tagline()} description={m.about_hero_body()} />

<div class="py-16 md:py-24">
	<Hero />
	<Mission />
	<Values />
	<DonateSection />
	<CommunitySection />
</div>
