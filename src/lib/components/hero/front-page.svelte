<script>
	import * as m from '$lib/paraglide/messages';
	import { reveal } from '$lib/actions/reveal';
	import { Button } from '$lib/components/ui/button';
	import { ArrowRightIcon } from 'lucide-svelte';
</script>

<div class="flex flex-col items-center py-20 text-center md:py-32" use:reveal>
	<p class="mb-4 text-xs font-semibold tracking-widest text-primary uppercase">
		{m.home_tagline()}
	</p>
	<h1 class="font-serif text-5xl leading-tight md:text-7xl lg:text-8xl">
		{m.home_hero_h1_1()}<br />{m.home_hero_h1_2()}
	</h1>
	<p class="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
		{m.home_hero_body()}
	</p>
	<div class="mt-8 flex gap-3">
		<!-- eslint-disable svelte/no-navigation-without-resolve -->
		<a href="/os">
			<Button variant="primary">
				{m.cta_download()}
				<ArrowRightIcon size={16} />
			</Button>
		</a>
		<a href="/about">
			<Button>{m.home_product_learn_more()}</Button>
		</a>
	</div>
</div>

<div class="overflow-hidden rounded-2xl" use:reveal={80}>
	<video src="/office.mp4" autoplay loop muted playsinline class="w-full object-cover"></video>
</div>
