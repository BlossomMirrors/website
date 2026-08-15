<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { Button } from '$lib/components/ui/button';
	import HeartIcon from '@lucide/svelte/icons/heart';
	import { LiberapayIcon } from '$lib/components/icons/liberapay/index.svelte';
	import * as m from '$lib/paraglide/messages';
</script>

<div
	class="relative mt-24 overflow-hidden rounded-3xl bg-linear-to-br from-destructive/10 via-destructive/5 to-transparent p-10 md:mt-32 md:p-16"
	use:reveal
>
	<div
		class="pointer-events-none absolute -top-16 -right-16 size-64 rounded-full bg-destructive/8 blur-3xl"
	></div>
	<div
		class="pointer-events-none absolute top-1/2 right-10 hidden -translate-y-1/2 text-foreground opacity-[0.04] md:block"
	>
		<LiberapayIcon size={220} />
	</div>

	<div class="relative max-w-2xl">
		<div class="mb-4 flex items-center gap-2">
			<HeartIcon size={12} class="text-secondary-500" fill="currentColor" />
			<p class="text-xs font-semibold tracking-widest text-secondary-500 uppercase">
				{m.donate_nav()}
			</p>
		</div>
		<h2 class="font-serif text-4xl leading-tight md:text-5xl">
			{m.donate_header()}
		</h2>
		<p class="mt-5 text-lg leading-relaxed text-muted-foreground">
			{m.donate_body()}
		</p>
		<Button href="https://liberapay.com/blossomos" variant="destructive" size="lg" class="mt-8">
			<LiberapayIcon size={16} />
			{m.donate_cta()}
		</Button>
	</div>
</div>
