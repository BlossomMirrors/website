<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { Button } from '$lib/components/ui/button';
	import Download from '$lib/components/movingicons/download.svelte';
	import ArrowRight from '$lib/components/movingicons/arrow-right.svelte';
	import * as m from '$lib/paraglide/messages';

	let dlAnimating = $state(false);
	let communityAnimating = $state(false);
	function triggerCommunity() {
		communityAnimating = true;
		setTimeout(() => (communityAnimating = false), 250);
	}
</script>

<section class="my-16 py-10 md:my-32 md:py-16" use:reveal>
	<div class="text-center">
		<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">
			{m.cta_subheader()}
		</p>
		<h2 class="font-serif text-5xl leading-tight md:text-7xl">{m.cta_header()}</h2>
		<p class="mx-auto mt-6 max-w-md text-lg text-muted-foreground">
			{m.cta_description()}
		</p>
		<div class="mt-10 flex flex-wrap items-center justify-center gap-4">
			<!-- eslint-disable svelte/no-navigation-without-resolve -->
			<a
				href="/downloads"
				onmouseenter={() => {
					dlAnimating = true;
					setTimeout(() => (dlAnimating = false), 400);
				}}
			>
				<Button variant="primary" size="lg">
					<Download size={18} animate={dlAnimating} class="pointer-events-none" />
					{m.cta_download()}
				</Button>
			</a>
			<a
				href="https://community.blossomos.org"
				target="_blank"
				rel="noreferrer"
				onmouseenter={triggerCommunity}
			>
				<Button variant="ghost" size="lg">
					{m.cta_join_community()}
					<ArrowRight size={16} animate={communityAnimating} class="pointer-events-none" />
				</Button>
			</a>
		</div>
		<p class="mt-6 text-xs text-muted-foreground">{m.cta_footer()}</p>
	</div>
</section>
