<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { cn } from '$lib/utils.js';
	import gameboyJpg from '$lib/assets/flyout/gameboy.jpg';
	import polaroidJpg from '$lib/assets/flyout/polaroid.jpg';
	import amigaJpg from '$lib/assets/flyout/amiga.jpg';

	let open = $state(false);

	const photos = [
		{
			src: gameboyJpg,
			fanned: 'translate-x-4.5 -translate-y-17 rotate-18',
			openDelay: 'delay-0',
			closeDelay: 'delay-80'
		},
		{
			src: polaroidJpg,
			fanned: '-translate-y-20 -rotate-4',
			openDelay: 'delay-55',
			closeDelay: 'delay-40'
		},
		{
			src: amigaJpg,
			fanned: '-translate-x-4.5 -translate-y-17.5 -rotate-22',
			openDelay: 'delay-110',
			closeDelay: 'delay-0'
		}
	];
</script>

<div
	role="button"
	tabindex="0"
	aria-label={m.widgets_open_folder()}
	aria-expanded={open}
	class={cn(
		'pointer-events-auto absolute top-[72%] left-[5%] z-10 rotate-2',
		'cursor-default touch-none select-none',
		'animate-in delay-1400 duration-350 ease-out fill-mode-both fade-in slide-in-from-bottom-[10px]'
	)}
	onmouseenter={() => (open = true)}
	onmouseleave={() => (open = false)}
	onfocus={() => (open = true)}
	onblur={() => (open = false)}
>
	<div class="relative h-17 w-20">
		<svg class="absolute inset-0" width="80" height="68" viewBox="0 0 80 68">
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

		{#each photos as photo (photo.src)}
			<div
				class={cn(
					'pointer-events-none absolute top-4 left-2 h-12 w-16 overflow-hidden',
					'rounded-sm border-2 border-white/70 transition-transform',
					open && [
						'scale-150 shadow-xl duration-360 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
						photo.fanned,
						photo.openDelay
					],
					!open && ['duration-220 ease-in', photo.closeDelay]
				)}
			>
				<enhanced:img src={photo.src} class="size-full object-cover" sizes="100px" alt="" />
			</div>
		{/each}

		<svg class="pointer-events-none absolute inset-0" width="80" height="68" viewBox="0 0 80 68">
			<rect x="0" y="22" width="80" height="46" rx="6" fill="#1451ff" />
		</svg>
	</div>
</div>
