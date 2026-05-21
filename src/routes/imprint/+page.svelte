<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { marked } from 'marked';

	marked.setOptions({ breaks: true });

	const operatorBlocks = [
		m.imprint_operator_address(),
		m.imprint_operator_directors(),
		m.imprint_operator_registration()
	];

	const sections = [
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
		<div>
			<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">
				{m.imprint_tagline()}
			</p>
			<h1 class="font-serif text-5xl leading-tight md:text-7xl">{m.imprint_h1()}</h1>
		</div>

		<div class="mt-16 flex flex-col gap-10">
			<!-- Operator section with split blocks -->
			<div>
				<h2 class="mb-3 font-semibold">{m.imprint_operator_h2()}</h2>
				<div class="flex flex-col gap-4">
					{#each operatorBlocks as block, i (i)}
						<div class="prose prose-sm prose-neutral dark:prose-invert max-w-none text-muted-foreground [&>p]:leading-relaxed">
							<!-- eslint-disable svelte/no-at-html-tags -->
							{@html marked(block)}
						</div>
					{/each}
				</div>
			</div>

			{#each sections as s (s.h2)}
				<div>
					<h2 class="mb-3 font-semibold">{s.h2}</h2>
					<div class="prose prose-sm prose-neutral dark:prose-invert max-w-none text-muted-foreground [&>p]:leading-relaxed [&>ul]:mt-2">
						<!-- eslint-disable svelte/no-at-html-tags -->
						{@html marked(s.body)}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
