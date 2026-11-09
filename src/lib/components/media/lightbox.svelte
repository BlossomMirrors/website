<script lang="ts" module>
	import type { Picture } from '@sveltejs/enhanced-img';

	export type LightboxImage = {
		name: string;
		image: Picture;
		credit?: { name: string; url?: string };
	};
</script>

<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import * as Dialog from '$lib/components/ui/dialog';
	import Panzoom, { type PanzoomEventDetail, type PanzoomObject } from '@panzoom/panzoom';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { prefersReducedMotion } from 'svelte/motion';
	import { on } from 'svelte/events';
	import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left';
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
	import ZoomInIcon from '@lucide/svelte/icons/zoom-in';
	import ZoomOutIcon from '@lucide/svelte/icons/zoom-out';
	import XIcon from '@lucide/svelte/icons/x';
	import { Button } from '$lib/components/ui/button';

	let {
		images,
		index: activeIndex = $bindable(null)
	}: { images: LightboxImage[]; index?: number | null } = $props();

	const MIN_ZOOM = 1;
	const MAX_ZOOM = 4;

	let zoom = $state(MIN_ZOOM);
	let panzoom: PanzoomObject | undefined;
	// 1 = next, -1 = prev, 0 = no slide (when the lightbox opens)
	let direction = $state<1 | -1 | 0>(0);

	function go(step: 1 | -1) {
		if (activeIndex === null) return;
		direction = step;
		activeIndex = (activeIndex + step + images.length) % images.length;
	}

	function onkeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowLeft') go(-1);
		else if (e.key === 'ArrowRight') go(1);
	}

	function slide(node: Element, { from }: { from: 1 | -1 }) {
		const animate = direction !== 0 && !prefersReducedMotion.current;
		return fly(node, {
			x: `${from * direction * 100}%`,
			opacity: 1,
			duration: animate ? 300 : 0,
			easing: cubicOut
		});
	}

	function zoomable(el: HTMLElement) {
		// 'outside' keeps the zoomed image covering its frame, so it can't be dragged past its edges
		const pz = Panzoom(el, {
			minScale: MIN_ZOOM,
			maxScale: MAX_ZOOM,
			contain: 'outside',
			panOnlyWhenZoomed: true,
			cursor: ''
		});
		panzoom = pz;
		zoom = MIN_ZOOM;

		const offChange = on(el, 'panzoomchange', (e) => {
			zoom = (e as CustomEvent<PanzoomEventDetail>).detail.scale;
		});
		const offWheel = on(el.parentElement!, 'wheel', pz.zoomWithWheel);

		return () => {
			offChange();
			offWheel();
			pz.destroy();
		};
	}
</script>

<svelte:window {onkeydown} />

<Dialog.Root
	bind:open={
		() => activeIndex !== null,
		(open) => {
			if (!open) [activeIndex, direction] = [null, 0];
		}
	}
>
	<Dialog.Content
		class="max-w-6xl border-none bg-transparent p-0 shadow-none sm:max-w-[80vw]"
		hideClose
	>
		{#if activeIndex !== null}
			{@const credit = images[activeIndex].credit}
			<Dialog.Title class="sr-only">{images[activeIndex].name}</Dialog.Title>
			<div class="relative size-full">
				<div class="grid size-full overflow-hidden">
					{#each [activeIndex] as i (i)}
						<div class="[grid-area:1/1]" in:slide={{ from: 1 }} out:slide={{ from: -1 }}>
							<div
								class={{ 'cursor-grab active:cursor-grabbing': zoom > MIN_ZOOM }}
								{@attach zoomable}
							>
								<enhanced:img
									src={images[i].image}
									alt={images[i].name}
									draggable="false"
									class="block h-auto w-full select-none"
								/>
							</div>
						</div>
					{/each}
				</div>

				<Dialog.Close>
					{#snippet child({ props })}
						<Button
							{...props}
							size="icon"
							class="absolute top-3 right-3 rounded-full shadow-lg"
							aria-label={m.screenshots_close()}
						>
							<XIcon />
						</Button>
					{/snippet}
				</Dialog.Close>

				<div class="absolute top-3 left-3 flex items-center gap-1.5">
					<Button
						size="icon"
						class="rounded-full shadow-lg"
						aria-label={m.screenshots_zoom_out()}
						onclick={() => panzoom?.zoomOut()}
						disabled={zoom <= MIN_ZOOM}
					>
						<ZoomOutIcon />
					</Button>
					<Button
						size="icon"
						class="rounded-full shadow-lg"
						aria-label={m.screenshots_zoom_in()}
						onclick={() => panzoom?.zoomIn()}
						disabled={zoom >= MAX_ZOOM}
					>
						<ZoomInIcon />
					</Button>
				</div>

				{#if credit}
					<div
						class="absolute bottom-3 left-3 rounded-full bg-background/80 px-3 py-1.5 text-xs text-foreground shadow-lg backdrop-blur"
					>
						{#if credit.url}
							<a
								href={credit.url}
								target="_blank"
								rel="external noreferrer"
								class="hover:underline"
							>
								{m.screenshots_credit({ name: credit.name })}
							</a>
						{:else}
							{m.screenshots_credit({ name: credit.name })}
						{/if}
					</div>
				{/if}

				{#if images.length > 1}
					<Button
						size="icon-lg"
						class="absolute inset-y-0 left-3 my-auto rounded-full bg-button/80 shadow-lg backdrop-blur"
						aria-label={m.screenshots_prev()}
						onclick={() => go(-1)}
					>
						<ChevronLeftIcon class="size-4.5" />
					</Button>
					<Button
						size="icon-lg"
						class="absolute inset-y-0 right-3 my-auto rounded-full bg-button/80 shadow-lg backdrop-blur"
						aria-label={m.screenshots_next()}
						onclick={() => go(1)}
					>
						<ChevronRightIcon class="size-4.5" />
					</Button>
				{/if}
			</div>
		{/if}
	</Dialog.Content>
</Dialog.Root>
