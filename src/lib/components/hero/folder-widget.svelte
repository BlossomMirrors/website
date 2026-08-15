<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import gameboyJpg from '$lib/assets/flyout/gameboy.jpg';
	import polaroidJpg from '$lib/assets/flyout/polaroid.jpg';
	import amigaJpg from '$lib/assets/flyout/amiga.jpg';

	let open = $state(false);

	const photos = [
		{ src: gameboyJpg, tx: 18, ty: -68, rot: 18 },
		{ src: polaroidJpg, tx: 0, ty: -80, rot: -4 },
		{ src: amigaJpg, tx: -18, ty: -70, rot: -22 }
	];
</script>

<div
	role="button"
	tabindex="0"
	aria-label={m.widgets_open_folder()}
	aria-expanded={open}
	class="widget-in pointer-events-auto absolute top-[60%] left-[5%] z-10 cursor-default touch-none opacity-0 select-none [--tilt:2deg] [animation-delay:1.4s]"
	onmouseenter={() => (open = true)}
	onmouseleave={() => (open = false)}
	onfocus={() => (open = true)}
	onblur={() => (open = false)}
>
	<div class="relative" style="width:80px;height:68px">
		<svg
			class="absolute inset-0"
			width="80"
			height="68"
			viewBox="0 0 80 68"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect
				x="3"
				y="18"
				width="74"
				height="48"
				rx="6"
				fill="rgba(0,0,0,0.25)"
				transform="translate(0,2)"
			/>
			<rect x="0" y="14" width="80" height="54" rx="6" fill="#1451ff" />
			<path d="M4 14 L4 9 Q4 5 8 5 L30 5 Q34 5 35.5 9 L37 14 Z" fill="#1451ff" />
		</svg>

		{#each photos as photo, pi (pi)}
			<div
				class="pointer-events-none absolute overflow-hidden rounded-sm border-2 border-white/70 {open
					? 'shadow-xl'
					: ''}"
				style="
					width:64px;height:48px;
					left:8px;top:16px;
					transform:translate({open ? photo.tx : 0}px,{open ? photo.ty : 0}px) rotate({open
					? photo.rot
					: 0}deg) scale({open ? 1.5 : 1});
					transition:transform {open
					? '0.36s cubic-bezier(0.34,1.56,0.64,1)'
					: '0.22s ease-in'} {open ? pi * 55 : (2 - pi) * 40}ms;
				"
			>
				<enhanced:img src={photo.src} class="size-full object-cover" sizes="100px" alt="" />
			</div>
		{/each}

		<svg
			class="pointer-events-none absolute inset-0"
			width="80"
			height="68"
			viewBox="0 0 80 68"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect x="0" y="22" width="80" height="46" rx="6" fill="#1451ff" />
		</svg>
	</div>
</div>

<style>
	@keyframes widget-in {
		from {
			opacity: 0;
			transform: translateY(10px) rotate(var(--tilt));
		}
		to {
			opacity: 1;
			transform: translateY(0) rotate(var(--tilt));
		}
	}
	.widget-in {
		animation: widget-in 0.35s ease-out forwards;
		transform: rotate(var(--tilt));
	}
</style>
