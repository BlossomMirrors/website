<script lang="ts">
	import { onMount } from 'svelte';

	type W = { id: string; x: number; y: number; delay: number; tilt: number };

	const SIZES: Record<string, { w: number; h: number }> = {
		circle:   { w: 62, h: 62 },
		triangle: { w: 68, h: 60 },
		diamond:  { w: 58, h: 78 },
		plus:     { w: 56, h: 56 },
	};

	const TILTS = [-8, 13, -4, 16];

	let items = $state<W[]>([
		{ id: 'circle',   x: 0, y: 0, delay: 1.1,  tilt: TILTS[0] },
		{ id: 'triangle', x: 0, y: 0, delay: 1.25, tilt: TILTS[1] },
		{ id: 'diamond',  x: 0, y: 0, delay: 1.15, tilt: TILTS[2] },
		{ id: 'plus',     x: 0, y: 0, delay: 1.3,  tilt: TILTS[3] },
	]);

	let containerEl = $state<HTMLDivElement | null>(null);
	let drag = $state<{ idx: number; ox: number; oy: number } | null>(null);
	let topIdx = $state(-1);

	const TASKBAR_H = 76;
	const PAD = 16;
	let cW = 0;
	let cH = 0;

	onMount(() => {
		if (!containerEl) return;
		({ width: cW, height: cH } = containerEl.getBoundingClientRect());

		items = items.map((item) => ({
			...item,
			x: PAD + Math.random() * (cW - SIZES[item.id].w - PAD * 2),
			y: PAD + Math.random() * (cH - SIZES[item.id].h - TASKBAR_H - PAD),
		}));

		const ro = new ResizeObserver(() => {
			if (!containerEl) return;
			const { width, height } = containerEl.getBoundingClientRect();
			const scaleX = width / (cW || width);
			const scaleY = height / (cH || height);
			cW = width;
			cH = height;
			items = items.map((item) => ({
				...item,
				x: Math.max(0, Math.min(item.x * scaleX, cW - SIZES[item.id].w)),
				y: Math.max(0, Math.min(item.y * scaleY, cH - SIZES[item.id].h - TASKBAR_H)),
			}));
		});
		ro.observe(containerEl);
		return () => ro.disconnect();
	});

	function down(e: PointerEvent, idx: number) {
		drag = { idx, ox: e.clientX - items[idx].x, oy: e.clientY - items[idx].y };
		topIdx = idx;
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
		e.preventDefault();
	}

	function move(e: PointerEvent, idx: number) {
		if (drag?.idx !== idx) return;
		const { w, h } = SIZES[items[idx].id];
		items[idx].x = Math.max(0, Math.min(e.clientX - drag.ox, cW - w));
		items[idx].y = Math.max(0, Math.min(e.clientY - drag.oy, cH - h - TASKBAR_H));
	}

	function up(idx: number) {
		if (drag?.idx === idx) drag = null;
	}
</script>

<div bind:this={containerEl} class="pointer-events-none absolute inset-0">
	{#each items as item, idx (item.id)}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="widget-in pointer-events-auto absolute touch-none select-none opacity-0"
			style="left:{item.x}px;top:{item.y}px;z-index:{topIdx===idx?20:10};--tilt:{item.tilt}deg;animation-delay:{item.delay}s;cursor:{drag?.idx===idx?"url('/cursor/grabbing.svg') 10 10, grabbing":"url('/cursor/hand1.svg') 8 2, pointer"}"
			onpointerdown={(e) => down(e, idx)}
			onpointermove={(e) => move(e, idx)}
			onpointerup={() => up(idx)}
		>
			{#if item.id === 'circle'}
				<svg width="62" height="62" viewBox="0 0 62 62" xmlns="http://www.w3.org/2000/svg">
					<circle cx="31" cy="31" r="31" fill="#3e78ff" fill-opacity="0.72"/>
				</svg>

			{:else if item.id === 'triangle'}
				<svg width="68" height="60" viewBox="0 0 68 60" xmlns="http://www.w3.org/2000/svg">
					<polygon points="34,2 66,58 2,58" fill="#ff2ea1" fill-opacity="0.68"/>
				</svg>

			{:else if item.id === 'diamond'}
				<svg width="58" height="78" viewBox="0 0 58 78" xmlns="http://www.w3.org/2000/svg">
					<polygon points="29,2 56,39 29,76 2,39" fill="#fff200" fill-opacity="0.80"/>
				</svg>

			{:else if item.id === 'plus'}
				<svg width="56" height="56" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
					<path d="M20 0 L36 0 L36 20 L56 20 L56 36 L36 36 L36 56 L20 56 L20 36 L0 36 L0 20 L20 20 Z" fill="#00ff73" fill-opacity="0.72"/>
				</svg>
			{/if}
		</div>
	{/each}
</div>

<style>
	@keyframes widget-in {
		from { opacity: 0; transform: translateY(10px) rotate(var(--tilt)); }
		to   { opacity: 1; transform: translateY(0)    rotate(var(--tilt)); }
	}
	.widget-in {
		animation: widget-in 0.35s ease-out forwards;
		transform: rotate(var(--tilt));
	}
</style>
