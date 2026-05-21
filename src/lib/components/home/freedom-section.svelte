<script lang="ts">
	import { reveal } from '$lib/actions/reveal';

	const freedoms = [
		{ label: 'No data collection', color: '#3e78ff' },
		{ label: 'No forced updates', color: '#ff2ea1' },
		{ label: 'No built-in ads', color: '#00a349' },
		{ label: "No AI you didn't ask for", color: '#b8a800' }
	];
</script>

<section class="mt-16 py-10 md:py-16">
	<div class="mb-16" use:reveal>
		<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">
			Your computer. Your rules.
		</p>
		<h2 class="font-serif text-5xl leading-tight md:text-7xl">Finally yours.</h2>
	</div>

	<div class="grid grid-cols-2 gap-3 md:gap-5">
		{#each freedoms as f, i}
			<div
				class="flex items-end rounded-2xl p-6 md:rounded-3xl md:p-10"
				style="background-color: {f.color}; min-height: 160px;"
				use:reveal={i * 70}
			>
				<p class="font-serif text-xl leading-snug text-white md:text-3xl">{f.label}.</p>
			</div>
		{/each}
	</div>

	<p class="mt-14 max-w-lg text-lg leading-relaxed text-muted-foreground" use:reveal={350}>
		Linux-based and actually worth using. Open source code means anyone can verify it's trustworthy.
		Security researchers, hardware partners, and you can all check for themselves.
	</p>
</section>
