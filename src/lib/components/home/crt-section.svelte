<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { onMount } from 'svelte';
	import * as m from '$lib/paraglide/messages';

	let isDark = $state(false);
	let crtEl = $state<HTMLDivElement | null>(null);
	let lit = $state(false);

	onMount(() => {
		isDark = document.documentElement.classList.contains('dark');
		const mo = new MutationObserver(() => {
			isDark = document.documentElement.classList.contains('dark');
		});
		mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

		const io = new IntersectionObserver(
			([e]) => {
				if (e.isIntersecting) {
					lit = true;
					io.disconnect();
				}
			},
			{ threshold: 0.3 }
		);
		if (crtEl) io.observe(crtEl);

		return () => {
			mo.disconnect();
			io.disconnect();
		};
	});
</script>

<section class="my-16 py-10 md:my-32 md:py-16">
	<div class="grid items-center gap-12 md:grid-cols-2 md:gap-20">
		<div use:reveal>
			<p class="mb-3 text-xs font-semibold tracking-widest text-green-500 uppercase">
				{m.crt_subheader()}
			</p>
			<h2 class="font-serif text-5xl leading-tight md:text-6xl">
				{m.crt_header1()}
				{m.crt_header2()}
				<img src="/recycling.svg" alt="Recycling" class="sticker inline animate-spin" />
			</h2>
			<p class="mt-6 text-lg leading-relaxed text-muted-foreground">
				{m.crt_description()}
			</p>
		</div>

		<div class="relative md:-my-16 md:-mr-8" use:reveal={120} bind:this={crtEl}>
			<div class="relative mx-auto max-w-lg md:max-w-none" style="aspect-ratio: 2445/2312">
				<img
					src={isDark ? '/wallpaper-dark.png' : '/wallpaper-light.png'}
					alt="BlossomOS desktop"
					class="absolute inset-0 h-full w-full object-cover"
					style="clip-path: inset(9% 12% 25% 12% round 4px); transform: scale(1.14); transform-origin: center center; object-position: center calc(50% - 25px)"
				/>
				<div
					class="pointer-events-none absolute"
					style="inset: 11% 13.5% 27% 13.5%; background: repeating-linear-gradient(transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)"
				></div>
				<div
					class="crt-overlay pointer-events-none absolute inset-0 h-full w-full"
					class:lit
					style="clip-path: inset(9% 12% 25% 12% round 4px); background: black; transform: scale(1.14); transform-origin: center center"
				></div>
				<img
					src="/crt.png"
					alt="CRT monitor"
					class="pointer-events-none absolute inset-0 h-full w-full"
					style="object-fit: fill"
				/>
				<!-- Green power LED: coords (2119,1971)→(2152,1978) in a 2445×2312 image -->
				<div
					class="crt-led pointer-events-none absolute rounded-sm"
					class:lit
					style="left: 86.67%; top: 85.26%; width: 1.35%; height: 0.3%"
				></div>
			</div>
		</div>
	</div>
</section>

<style>
	@keyframes crt-on {
		0% {
			opacity: 1;
		}
		6% {
			opacity: 0.05;
		}
		8% {
			opacity: 1;
		}
		16% {
			opacity: 0.08;
		}
		18% {
			opacity: 1;
		}
		45% {
			opacity: 1;
		}
		52% {
			opacity: 0.35;
		}
		56% {
			opacity: 1;
		}
		62% {
			opacity: 0;
		}
		70% {
			opacity: 0.12;
		}
		78% {
			opacity: 0;
		}
		100% {
			opacity: 0;
		}
	}

	.crt-overlay {
		opacity: 1;
	}
	.crt-overlay.lit {
		animation: crt-on 1.8s ease-out forwards;
	}

	.crt-led {
		background: #1a3a1a;
		box-shadow: none;
		transition:
			background 0.3s ease 1.6s,
			box-shadow 0.3s ease 1.6s;
	}
	.crt-led.lit {
		background: #00e040;
		box-shadow:
			0 0 2px 1px #00e040,
			0 0 6px 2px #00ff6033;
	}
	.sticker {
		height: 24px;
		margin-left: -6px;
		margin-top: 24px;
	}
</style>
