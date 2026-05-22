<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import PageHero from '$lib/components/ui/page-hero.svelte';
	import SectionHeader from '$lib/components/ui/section-header.svelte';
	import PostGrid from '$lib/components/press/post-grid.svelte';
	// import PressKit from '$lib/components/press/press-kit.svelte';
	import Interviews from '$lib/components/press/interviews.svelte';
	import { getTitle } from '$lib/utils.js';

	const { data } = $props();
</script>

<svelte:head>
	<meta name="description" content={m.press_subtitle()} />
	<meta property="og:description" content={m.press_subtitle()} />
	<meta property="twitter:description" content={m.press_subtitle()} />
	<title>{getTitle(m.press_tagline())}</title>
</svelte:head>

<div class="py-16 md:py-24">
	<PageHero tagline={m.press_tagline()} subtitle={m.press_subtitle()}>
		{m.press_h1()}
	</PageHero>

	<div class="mt-24">
		<SectionHeader subheader={m.press_posts_subheader()} class="mb-10">
			{m.press_posts_subheader()}
		</SectionHeader>
		<PostGrid posts={data.posts} />
	</div>

	<!--
	<div class="mt-24">
		<SectionHeader subheader={m.press_kit_subheader()} class="mb-10">
			{m.press_kit_subheader()}
		</SectionHeader>
		<PressKit />
	</div>
	-->

	<div class="mt-24">
		<SectionHeader subheader={m.press_interviews_subheader()} class="mb-10">
			{m.press_interviews_subheader()}
		</SectionHeader>
		<Interviews />
	</div>
</div>
