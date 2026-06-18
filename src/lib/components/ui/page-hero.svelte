<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import type { Snippet } from 'svelte';

	let {
		tagline,
		subtitle,
		children
	}: {
		tagline: string;
		subtitle: string;
		children: Snippet;
	} = $props();
</script>

<div class="mx-auto max-w-3xl text-center" use:reveal>
	<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">{tagline}</p>
	<h1 class="font-serif text-5xl leading-tight md:text-7xl">
		{@render children()}
	</h1>
	<p class="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{subtitle}</p>
</div>
