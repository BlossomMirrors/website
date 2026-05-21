<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import * as m from '$lib/paraglide/messages';

	const sections = [
		{ h2: m.imprint_operator_h2(), body: m.imprint_operator_body() },
		{ h2: m.imprint_contact_h2(), body: m.imprint_contact_body() },
		{ h2: m.imprint_content_h2(), body: m.imprint_content_body() },
		{ h2: m.imprint_dispute_h2(), body: m.imprint_dispute_body() }
	];
</script>

<svelte:head>
	<title>Imprint - Blossom</title>
</svelte:head>

<div class="py-16 md:py-24">
	<div class="mx-auto max-w-2xl">
		<div use:reveal>
			<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">{m.imprint_tagline()}</p>
			<h1 class="font-serif text-5xl leading-tight md:text-7xl">{m.imprint_h1()}</h1>
		</div>

		<div class="mt-16 flex flex-col gap-10">
			{#each sections as s, i (s.h2)}
				<div use:reveal={i * 60}>
					<h2 class="mb-3 font-semibold">{s.h2}</h2>
					<p class="whitespace-pre-line text-muted-foreground leading-relaxed">{s.body}</p>
				</div>
			{/each}
		</div>
	</div>
</div>
