<script lang="ts">
	import { onMount } from 'svelte';
	import { mode } from 'mode-watcher';
	import wallpaperDarkUrl from '$lib/assets/wallpaper-dark.png';
	import wallpaperLightUrl from '$lib/assets/wallpaper-light.png';

	let canvas: HTMLCanvasElement;

	let targetX = 0;
	let targetY = 0;
	let displayX = 0;
	let displayY = 0;
	let targetOpacity = 0;
	let currentOpacity = 0;
	let rafId: number;
	let img: HTMLImageElement | null = null;

	const RADIUS = 80;
	const EDGE = 18;
	const LAG = 0.07;

	// Stable per-pixel hash, no flickering grain
	function grain(x: number, y: number): number {
		const h = (((x * 2246822519) ^ (y * 3266489917)) >>> 0) & 0xff;
		return h / 255;
	}

	function wallpaperSrc(): string {
		return mode.current === 'dark' ? wallpaperDarkUrl : wallpaperLightUrl;
	}

	function loadImage(src: string): Promise<HTMLImageElement> {
		return new Promise((resolve) => {
			const i = new Image();
			i.onload = () => resolve(i);
			i.src = src;
		});
	}

	function draw() {
		if (!canvas || !img) return;
		const ctx = canvas.getContext('2d')!;
		const W = canvas.width;
		const H = canvas.height;
		const cx = displayX;
		const cy = displayY;

		ctx.clearRect(0, 0, W, H);
		if (currentOpacity < 0.01) return;

		ctx.save();
		ctx.globalAlpha = currentOpacity;
		ctx.beginPath();
		ctx.arc(cx, cy, RADIUS + EDGE + 4, 0, Math.PI * 2);
		ctx.clip();
		ctx.drawImage(img, 0, 0, W, H);
		ctx.restore();

		// Process only the edge zone bounding box
		const x0 = Math.max(0, Math.floor(cx - RADIUS - EDGE - 4));
		const y0 = Math.max(0, Math.floor(cy - RADIUS - EDGE - 4));
		const x1 = Math.min(W, Math.ceil(cx + RADIUS + EDGE + 4));
		const y1 = Math.min(H, Math.ceil(cy + RADIUS + EDGE + 4));
		const bw = x1 - x0;
		const bh = y1 - y0;
		if (bw <= 0 || bh <= 0) return;

		const imageData = ctx.getImageData(x0, y0, bw, bh);
		const data = imageData.data;

		for (let row = 0; row < bh; row++) {
			for (let col = 0; col < bw; col++) {
				const px = x0 + col;
				const py = y0 + row;
				const dist = Math.sqrt((px - cx) ** 2 + (py - cy) ** 2);

				// Inside clean zone, untouched
				if (dist <= RADIUS - EDGE) continue;
				// Outside grain zone, erase explicitly to kill anti-aliased clip fringe
				if (dist > RADIUS + EDGE) {
					data[(row * bw + col) * 4 + 3] = 0;
					continue;
				}

				// Edge zone: threshold grain against a gradient.
				// t=0 at inner edge to most grain survives; t=1 at outer edge to almost none survives
				const t = (dist - (RADIUS - EDGE)) / (2 * EDGE);
				const g = grain(px, py);
				if (g < t) {
					data[(row * bw + col) * 4 + 3] = 0;
				}
			}
		}

		ctx.putImageData(imageData, x0, y0);
	}

	$effect(() => {
		mode.current;
		loadImage(wallpaperSrc()).then((loaded) => {
			img = loaded;
		});
	});

	onMount(() => {
		function resize() {
			const rect = canvas.getBoundingClientRect();
			canvas.width = rect.width;
			canvas.height = rect.height;
		}
		resize();
		const ro = new ResizeObserver(resize);
		ro.observe(canvas);

		const parent = canvas.parentElement!;

		function handleDown(e: PointerEvent) {
			if (e.button !== 0) return;
			if ('windowDrag' in document.documentElement.dataset) return;
			const rect = parent.getBoundingClientRect();
			displayX = targetX = e.clientX - rect.left;
			displayY = targetY = e.clientY - rect.top;
			targetOpacity = 1;
		}

		function handleMove(e: PointerEvent) {
			if ('windowDrag' in document.documentElement.dataset) {
				targetOpacity = 0;
				return;
			}
			const rect = parent.getBoundingClientRect();
			targetX = e.clientX - rect.left;
			targetY = e.clientY - rect.top;
		}

		function handleUp() {
			targetOpacity = 0;
		}

		parent.addEventListener('pointerdown', handleDown);
		window.addEventListener('pointermove', handleMove);
		window.addEventListener('pointerup', handleUp);

		function loop() {
			displayX += (targetX - displayX) * LAG;
			displayY += (targetY - displayY) * LAG;
			currentOpacity += (targetOpacity - currentOpacity) * 0.08;
			draw();
			rafId = requestAnimationFrame(loop);
		}
		rafId = requestAnimationFrame(loop);

		return () => {
			cancelAnimationFrame(rafId);
			ro.disconnect();
			parent.removeEventListener('pointerdown', handleDown);
			window.removeEventListener('pointermove', handleMove);
			window.removeEventListener('pointerup', handleUp);
		};
	});
</script>

<canvas
	bind:this={canvas}
	class="pointer-events-none absolute inset-0 h-full w-full"
	aria-hidden="true"
></canvas>
