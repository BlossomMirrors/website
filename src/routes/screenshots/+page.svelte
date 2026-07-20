<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import * as m from '$lib/paraglide/messages';
	import { getTitle } from '$lib/utils';
	import { screenshots } from '$lib/screenshots';
	import * as Dialog from '$lib/components/ui/dialog';
	import { SvelteMap } from 'svelte/reactivity';
	import ImageOffIcon from '@lucide/svelte/icons/image-off';
	import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left';
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
	import ZoomInIcon from '@lucide/svelte/icons/zoom-in';
	import ZoomOutIcon from '@lucide/svelte/icons/zoom-out';
	import XIcon from '@lucide/svelte/icons/x';

	const MIN_ZOOM = 1;
	const MAX_ZOOM = 4;
	const ZOOM_STEP = 0.5;

	let activeIndex = $state<number | null>(null);
	let zoom = $state(1);
	let panX = $state(0);
	let panY = $state(0);
	let gesturing = $state(false);
	let stageEl = $state<HTMLDivElement | null>(null);
	const hasMultiple = $derived(screenshots.length > 1);

	const pointers = new SvelteMap<number, { x: number; y: number }>();
	let gestureStartZoom = 1;
	let gestureStartPan = { x: 0, y: 0 };
	let gestureStartDist = 0;
	let gestureStartMid = { x: 0, y: 0 };
	let wheelTimeout: ReturnType<typeof setTimeout> | undefined;

	function resetZoom() {
		zoom = 1;
		panX = 0;
		panY = 0;
		pointers.clear();
		gesturing = false;
		clearTimeout(wheelTimeout);
	}

	function open(i: number) {
		activeIndex = i;
		resetZoom();
	}

	function close() {
		activeIndex = null;
		resetZoom();
	}

	function prev() {
		if (activeIndex === null) return;
		activeIndex = (activeIndex - 1 + screenshots.length) % screenshots.length;
		resetZoom();
	}

	function next() {
		if (activeIndex === null) return;
		activeIndex = (activeIndex + 1) % screenshots.length;
		resetZoom();
	}

	// Clamps panning so the (possibly letterboxed) image can't be dragged past its own edges
	function clampPan(x: number, y: number, atZoom: number) {
		if (!stageEl || activeIndex === null) return { x: 0, y: 0 };
		const { w: naturalW, h: naturalH } = screenshots[activeIndex].image.img;
		const stageW = stageEl.clientWidth;
		const stageH = stageEl.clientHeight;
		const widthConstrained = naturalW / naturalH > stageW / stageH;
		const contentW = widthConstrained ? stageW : (stageH * naturalW) / naturalH;
		const contentH = widthConstrained ? (stageW * naturalH) / naturalW : stageH;
		const maxX = Math.max(0, (contentW * atZoom - stageW) / 2);
		const maxY = Math.max(0, (contentH * atZoom - stageH) / 2);
		return { x: Math.min(maxX, Math.max(-maxX, x)), y: Math.min(maxY, Math.max(-maxY, y)) };
	}

	function zoomTo(next: number) {
		zoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, next));
		({ x: panX, y: panY } = clampPan(panX, panY, zoom));
	}

	function zoomIn() {
		zoomTo(zoom + ZOOM_STEP);
	}

	function zoomOut() {
		zoomTo(zoom - ZOOM_STEP);
	}

	function midpoint(a: { x: number; y: number }, b: { x: number; y: number }) {
		return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
	}

	function pointerDist(a: { x: number; y: number }, b: { x: number; y: number }) {
		return Math.hypot(a.x - b.x, a.y - b.y);
	}

	// Zooms around the cursor position so the point under it stays put, like Discord's lightbox
	function onWheel(e: WheelEvent) {
		if (!stageEl) return;
		e.preventDefault();

		gesturing = true;
		clearTimeout(wheelTimeout);
		wheelTimeout = setTimeout(() => (gesturing = false), 150);

		const rect = stageEl.getBoundingClientRect();
		const cx = e.clientX - rect.left - rect.width / 2;
		const cy = e.clientY - rect.top - rect.height / 2;
		const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom * Math.exp(-e.deltaY * 0.001)));
		const pointX = (cx - panX) / zoom;
		const pointY = (cy - panY) / zoom;

		zoom = newZoom;
		({ x: panX, y: panY } = clampPan(cx - pointX * newZoom, cy - pointY * newZoom, zoom));
	}

	// Re-baselines the active gesture so switching between one and two fingers doesn't jump
	function beginGesture() {
		gestureStartZoom = zoom;
		gestureStartPan = { x: panX, y: panY };
		const pts = [...pointers.values()];
		if (pts.length === 2) {
			gestureStartDist = pointerDist(pts[0], pts[1]);
			gestureStartMid = midpoint(pts[0], pts[1]);
		} else if (pts.length === 1) {
			gestureStartMid = pts[0];
		}
	}

	function onStagePointerDown(e: PointerEvent) {
		if (e.pointerType === 'mouse' && e.button !== 0) return;
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
		pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
		gesturing = true;
		beginGesture();
	}

	function onStagePointerMove(e: PointerEvent) {
		if (!pointers.has(e.pointerId)) return;
		pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
		const pts = [...pointers.values()];

		if (pts.length === 2) {
			const scale = pointerDist(pts[0], pts[1]) / gestureStartDist;
			const mid = midpoint(pts[0], pts[1]);
			zoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, gestureStartZoom * scale));
			({ x: panX, y: panY } = clampPan(
				gestureStartPan.x + (mid.x - gestureStartMid.x),
				gestureStartPan.y + (mid.y - gestureStartMid.y),
				zoom
			));
		} else if (pts.length === 1 && zoom > MIN_ZOOM) {
			const p = pts[0];
			({ x: panX, y: panY } = clampPan(
				gestureStartPan.x + (p.x - gestureStartMid.x),
				gestureStartPan.y + (p.y - gestureStartMid.y),
				zoom
			));
		}
	}

	function endPointer(e: PointerEvent) {
		pointers.delete(e.pointerId);
		if (pointers.size === 0) {
			gesturing = false;
		} else {
			beginGesture();
		}
	}

	function onkeydown(e: KeyboardEvent) {
		if (activeIndex === null) return;
		if (e.key === 'ArrowLeft') prev();
		else if (e.key === 'ArrowRight') next();
	}
</script>

<svelte:window {onkeydown} />

<svelte:head>
	<meta name="description" content={m.screenshots_subtitle()} />
	<meta property="og:title" content={getTitle(m.screenshots_tagline())} />
	<meta property="og:description" content={m.screenshots_subtitle()} />
	<meta name="twitter:title" content={getTitle(m.screenshots_tagline())} />
	<meta name="twitter:description" content={m.screenshots_subtitle()} />
	<title>{getTitle(m.screenshots_tagline())}</title>
</svelte:head>

<div class="py-16 md:py-24">
	<div class="mx-auto max-w-3xl text-center" use:reveal>
		<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">
			{m.screenshots_tagline()}
		</p>
		<h1 class="font-serif text-5xl leading-tight md:text-7xl">
			{m.screenshots_h1_1()}<br />{m.screenshots_h1_2()}
		</h1>
		<p class="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
			{m.screenshots_subtitle()}
		</p>
	</div>

	{#if screenshots.length === 0}
		<div
			class="mt-16 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border py-24 text-center"
			use:reveal={120}
		>
			<ImageOffIcon size={28} class="text-muted-foreground" strokeWidth={1.5} />
			<p class="text-muted-foreground">{m.screenshots_empty()}</p>
		</div>
	{:else}
		<div class="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each screenshots as shot, i (shot.name)}
				<button
					type="button"
					class="group overflow-hidden rounded-2xl border border-border"
					onclick={() => open(i)}
					aria-label={shot.name}
					use:reveal={i * 60}
				>
					<div class="aspect-video overflow-hidden bg-muted">
						<enhanced:img
							src={shot.image}
							alt={shot.name}
							class="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
						/>
					</div>
				</button>
			{/each}
		</div>
	{/if}
</div>

<Dialog.Root open={activeIndex !== null} onOpenChange={(o) => !o && close()}>
	<Dialog.Content
		class="h-[88vh] w-[95vw] max-w-6xl border-none bg-transparent p-0 shadow-none sm:max-w-6xl"
		hideClose
	>
		{#if activeIndex !== null}
			{@const credit = screenshots[activeIndex].credit}
			<Dialog.Title class="sr-only">{screenshots[activeIndex].name}</Dialog.Title>
			<div class="relative h-full w-full">
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					bind:this={stageEl}
					class="h-full w-full touch-none overflow-hidden rounded-2xl"
					onpointerdown={onStagePointerDown}
					onpointermove={onStagePointerMove}
					onpointerup={endPointer}
					onpointercancel={endPointer}
					onwheel={onWheel}
				>
					<enhanced:img
						src={screenshots[activeIndex].image}
						alt={screenshots[activeIndex].name}
						draggable="false"
						class="h-full w-full touch-none object-contain select-none"
						style="transform: translate({panX}px, {panY}px) scale({zoom}); transition: {gesturing
							? 'none'
							: 'transform 150ms ease-out'}; cursor: {zoom > MIN_ZOOM
							? pointers.size > 0
								? 'grabbing'
								: 'grab'
							: 'default'}"
					/>
				</div>

				<Dialog.Close
					class="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-background text-foreground shadow-lg"
					aria-label={m.screenshots_close()}
				>
					<XIcon size={16} />
				</Dialog.Close>

				<div class="absolute top-3 left-3 flex items-center gap-1.5">
					<button
						type="button"
						class="flex h-9 w-9 items-center justify-center rounded-full bg-background text-foreground shadow-lg disabled:opacity-40"
						onclick={zoomOut}
						disabled={zoom <= MIN_ZOOM}
						aria-label={m.screenshots_zoom_out()}
					>
						<ZoomOutIcon size={16} />
					</button>
					<button
						type="button"
						class="flex h-9 w-9 items-center justify-center rounded-full bg-background text-foreground shadow-lg disabled:opacity-40"
						onclick={zoomIn}
						disabled={zoom >= MAX_ZOOM}
						aria-label={m.screenshots_zoom_in()}
					>
						<ZoomInIcon size={16} />
					</button>
				</div>

				{#if credit}
					<div
						class="absolute bottom-3 left-3 rounded-full bg-background/80 px-3 py-1.5 text-xs text-foreground shadow-lg backdrop-blur"
					>
						{#if credit.url}
							<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
							<a href={credit.url} target="_blank" rel="noreferrer" class="hover:underline">
								{m.screenshots_credit({ name: credit.name })}
							</a>
						{:else}
							{m.screenshots_credit({ name: credit.name })}
						{/if}
					</div>
				{/if}

				{#if hasMultiple}
					<button
						type="button"
						class="absolute top-1/2 left-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground shadow-lg backdrop-blur"
						onclick={prev}
						aria-label={m.screenshots_prev()}
					>
						<ChevronLeftIcon size={18} />
					</button>
					<button
						type="button"
						class="absolute top-1/2 right-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground shadow-lg backdrop-blur"
						onclick={next}
						aria-label={m.screenshots_next()}
					>
						<ChevronRightIcon size={18} />
					</button>
				{/if}
			</div>
		{/if}
	</Dialog.Content>
</Dialog.Root>
