<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import HeartIcon from '@lucide/svelte/icons/heart';
	import { LiberapayIcon } from '$lib/components/icons/liberapay/index.svelte';
	import * as m from '$lib/paraglide/messages';
	import GlowPanel from '$lib/components/panels/glow-panel.svelte';
	import Heading from '$lib/components/typography/heading.svelte';
	import Lead from '$lib/components/typography/lead.svelte';
	import Watermark from '$lib/components/elements/watermark.svelte';
</script>

<GlowPanel tone="destructive" class="mt-24 md:mt-32">
	{#snippet decoration()}
		<Watermark class="absolute top-1/2 right-10 hidden -translate-y-1/2 opacity-[0.04] md:block">
			<LiberapayIcon size={220} />
		</Watermark>
	{/snippet}

	<div class="max-w-2xl">
		<div class="mb-4 flex items-center gap-2">
			<HeartIcon size={12} class="text-secondary-500" fill="currentColor" />
			<p class="text-xs font-semibold tracking-widest text-secondary-500 uppercase">
				{m.donate_nav()}
			</p>
		</div>
		<Heading size="md" text={m.donate_header()} />
		<Lead class="mt-5">{m.donate_body()}</Lead>
		<Button href="https://liberapay.com/blossomos" variant="destructive" size="lg" class="mt-8">
			<LiberapayIcon size={16} />
			{m.donate_cta()}
		</Button>
	</div>
</GlowPanel>
