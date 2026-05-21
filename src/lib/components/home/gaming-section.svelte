<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import * as m from '$lib/paraglide/messages';

	const highlights = [
		{ label: m.gaming_steam(), icon: '/taskbar/steam.png' },
		{ label: m.gaming_proton() },
		{ label: m.gaming_native() },
		{ label: m.gaming_performance() }
	];
</script>

<section class="py-10 md:py-16">
	<div class="grid items-center gap-12 md:grid-cols-2 md:gap-16">
		<div use:reveal>
			<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">
				{m.gaming_subheader()}
			</p>
			<h2 class="font-serif text-5xl leading-tight md:text-6xl">
				{m.gaming_header1()}<br />{m.gaming_header2()}
			</h2>
			<p class="mt-6 text-lg leading-relaxed text-muted-foreground">
				{m.gaming_description()}
			</p>
			<div class="mt-8 flex flex-wrap gap-3">
				{#each highlights as h, i (i)}
					<div
						class="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium"
						use:reveal={100 + i * 60}
					>
						{#if h.icon}
							<img src={h.icon} alt="" class="h-4 w-4 object-contain" />
						{/if}
						{h.label}
					</div>
				{/each}
			</div>
		</div>

		<div class="overflow-hidden rounded-2xl" use:reveal={120}>
			<video
				src="/gaming.mp4"
				autoplay
				loop
				muted
				playsinline
				class="w-full object-cover"
				style="aspect-ratio: 16/9"
			></video>
		</div>
	</div>
</section>
