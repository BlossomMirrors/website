<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { Button } from '$lib/components/ui/button';
	import DownloadIcon from '@lucide/svelte/icons/download';
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
	import * as m from '$lib/paraglide/messages';
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
			<a href="/downloads">
				<Button variant="primary" size="lg">
					<DownloadIcon size={18} />
					{m.cta_download()}
				</Button>
			</a>
			<a href="https://community.blossomos.org" target="_blank" rel="noreferrer">
				<Button variant="ghost" size="lg">
					{m.cta_join_community()}
					<ArrowRightIcon size={16} />
				</Button>
			</a>
		</div>
		<p class="mt-6 text-xs text-muted-foreground">{m.cta_footer()}</p>
	</div>
</section>
