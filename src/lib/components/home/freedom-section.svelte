<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import * as m from '$lib/paraglide/messages';

	const freedoms = [
		{ label: m.freedom1(), color: '#3e78ff' },
		{ label: m.freedom2(), color: '#ff2ea1' },
		{ label: m.freedom3(), color: '#00a349' },
		{ label: m.freedom4(), color: '#b8a800' }
	];
</script>

<section class="mt-16 py-10 md:pt-16">
	<div class="mb-8" use:reveal>
		<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">
			{m.freedoms_subheader()}
		</p>
		<h2 class="font-serif text-5xl leading-tight md:text-7xl">
			{m.freedoms_header()}
		</h2>
	</div>

	<div class="grid-row grid gap-3 md:grid-cols-4 md:gap-5">
		{#each freedoms as f, i (i)}
			<div
				class="flex items-center justify-center rounded-2xl p-6 md:rounded-3xl md:p-10"
				style="background-color: {f.color}; min-height: 80px;"
				use:reveal={i * 70}
			>
				<p class="font-serif text-xl leading-snug text-white md:text-2xl">{f.label}.</p>
			</div>
		{/each}
	</div>
</section>
