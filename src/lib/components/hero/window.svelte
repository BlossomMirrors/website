<script lang="ts">
	import { onMount, type Snippet } from 'svelte';

	let {
		title,
		icon,
		onClose,
		onFocus,
		zIndex = 30,
		minW = 400,
		minH = 300,
		defaultW = 620,
		defaultH = 400,
		embedded = false,
		closable = true,
		bgClass = 'bg-card',
		children
	}: {
		title: string;
		icon?: string;
		onClose?: () => void;
		onFocus?: () => void;
		zIndex?: number;
		minW?: number;
		minH?: number;
		defaultW?: number;
		defaultH?: number;
		embedded?: boolean;
		closable?: boolean;
		bgClass?: string;
		children: Snippet;
	} = $props();

	const TASKBAR_H = 76;

	let w = $state(0);
	let h = $state(0);
	let x = $state(0);
	let y = $state(0);
	let el = $state<HTMLDivElement | null>(null);
	let drag = $state<{ ox: number; oy: number } | null>(null);
	let resize = $state<{
		handle: string;
		sx: number;
		sy: number;
		sw: number;
		sh: number;
		sxw: number;
		syw: number;
	} | null>(null);
	let pW = 0;
	let pH = 0;

	let hoveredBtn = $state<'min' | 'max' | 'close' | null>(null);
	let isDark = $state(false);
	let closing = $state(false);
	let isMobile = $state(false);

	function handleClose() {
		if (!closable || !onClose || closing) return;
		closing = true;
		setTimeout(onClose, 140);
	}

	onMount(() => {
		isDark = document.documentElement.classList.contains('dark');
		const themeObserver = new MutationObserver(() => {
			isDark = document.documentElement.classList.contains('dark');
		});
		themeObserver.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['class']
		});

		if (embedded) return () => themeObserver.disconnect();

		const parent = el!.parentElement!;
		const { width, height } = parent.getBoundingClientRect();
		pW = width;
		pH = height;
		isMobile = window.innerWidth < 768;
		w = defaultW;
		h = defaultH;
		x = Math.max(0, (pW - w) / 2);
		y = Math.max(0, (pH - h) / 2 - 24);

		const ro = new ResizeObserver(() => {
			const { width: nW, height: nH } = parent.getBoundingClientRect();
			isMobile = window.innerWidth < 768;
			x = Math.max(0, Math.min(x, nW - w));
			y = Math.max(0, Math.min(y, nH - h - TASKBAR_H));
			w = Math.min(w, nW);
			h = Math.min(h, nH - TASKBAR_H);
			pW = nW;
			pH = nH;
		});
		ro.observe(parent);

		return () => {
			ro.disconnect();
			themeObserver.disconnect();
		};
	});

	function startResize(e: PointerEvent, handle: string) {
		resize = { handle, sx: e.clientX, sy: e.clientY, sw: w, sh: h, sxw: x, syw: y };
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
		e.stopPropagation();
		e.preventDefault();
	}

	function doResize(e: PointerEvent) {
		if (!resize) return;
		const dx = e.clientX - resize.sx;
		const dy = e.clientY - resize.sy;
		const { handle, sw, sh, sxw, syw } = resize;

		let nw = sw,
			nh = sh,
			nx = sxw,
			ny = syw;
		if (handle.includes('e')) nw = sw + dx;
		if (handle.includes('s')) nh = sh + dy;
		if (handle.includes('w')) {
			nw = sw - dx;
			nx = sxw + sw - nw;
		}
		if (handle.includes('n')) {
			nh = sh - dy;
			ny = syw + sh - nh;
		}

		nw = Math.max(minW, Math.min(nw, pW - nx));
		nh = Math.max(minH, Math.min(nh, pH - TASKBAR_H - ny));
		nx = Math.max(0, nx);
		ny = Math.max(0, ny);

		w = nw;
		h = nh;
		x = nx;
		y = ny;
	}

	function endResize() {
		resize = null;
	}

	function titleDown(e: PointerEvent) {
		drag = { ox: e.clientX - x, oy: e.clientY - y };
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
		e.preventDefault();
	}
	function titleMove(e: PointerEvent) {
		if (!drag) return;
		x = Math.max(0, Math.min(e.clientX - drag.ox, pW - w));
		y = Math.max(0, Math.min(e.clientY - drag.oy, pH - h - TASKBAR_H));
	}
	function titleUp() {
		drag = null;
	}

	function stopDrag(e: PointerEvent) {
		e.stopPropagation();
	}
</script>

<div
	bind:this={el}
	role="dialog"
	aria-label={title}
	tabindex="-1"
	class="win flex flex-col overflow-hidden border border-border shadow-2xl {bgClass}"
	class:absolute={!embedded}
	class:relative={embedded}
	class:w-full={embedded}
	class:closing
	class:rounded-none={!embedded && isMobile}
	style="{embedded
		? 'border-radius:14px;'
		: isMobile
			? 'inset:0;border-radius:0;'
			: `left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:14px;`}z-index:{zIndex}"
	onpointerdown={embedded ? undefined : () => onFocus?.()}
>
	<!-- Title bar -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="flex shrink-0 touch-none items-center justify-between px-3 select-none"
		style="height:36px;cursor:{embedded || isMobile
			? 'default'
			: drag
				? "url('/cursor/grabbing.svg') 10 10, grabbing"
				: "url('/cursor/hand1.svg') 8 2, pointer"}"
		onpointerdown={!embedded && !isMobile ? titleDown : undefined}
		onpointermove={!embedded && !isMobile ? titleMove : undefined}
		onpointerup={!embedded && !isMobile ? titleUp : undefined}
	>
		<div class="flex items-center gap-2">
			{#if icon}
				<img src={icon} class="pointer-events-none h-4 w-4" alt="" />
			{/if}
			<span class={`text-xs ${embedded ? 'text-white/80' : 'text-foreground'}`}>{title}</span>
		</div>
		<div class="cursor-custom flex items-center gap-2">
			<button
				class="cursor-custom relative flex h-5 w-5 items-center justify-center"
				onpointerdown={stopDrag}
				onmouseenter={() => (hoveredBtn = 'min')}
				onmouseleave={() => (hoveredBtn = null)}
			>
				<img
					src="/windows/{isDark ? 'normal' : 'normal_light'}/minimize.svg"
					class="absolute h-full w-full transition-opacity duration-150"
					style="opacity:{hoveredBtn === 'min' ? 0 : 1}"
					alt="Minimize"
				/>
				<img
					src="/windows/{isDark ? 'hover' : 'hover_light'}/minimize.svg"
					class="absolute h-full w-full transition-opacity duration-150"
					style="opacity:{hoveredBtn === 'min' ? 1 : 0}"
					alt=""
				/>
			</button>
			<button
				class="cursor-custom relative flex h-5 w-5 items-center justify-center"
				onpointerdown={stopDrag}
				onmouseenter={() => (hoveredBtn = 'max')}
				onmouseleave={() => (hoveredBtn = null)}
			>
				<img
					src="/windows/{isDark ? 'normal' : 'normal_light'}/maximize.svg"
					class="absolute h-full w-full transition-opacity duration-150"
					style="opacity:{hoveredBtn === 'max' ? 0 : 1}"
					alt="Maximize"
				/>
				<img
					src="/windows/{isDark ? 'hover' : 'hover_light'}/maximize.svg"
					class="absolute h-full w-full transition-opacity duration-150"
					style="opacity:{hoveredBtn === 'max' ? 1 : 0}"
					alt=""
				/>
			</button>
			<button
				class="cursor-custom relative flex h-5 w-5 items-center justify-center"
				onpointerdown={stopDrag}
				onclick={handleClose}
				onmouseenter={() => (hoveredBtn = 'close')}
				onmouseleave={() => (hoveredBtn = null)}
			>
				<img
					src="/windows/{isDark ? 'normal' : 'normal_light'}/close.svg"
					class="absolute h-full w-full transition-opacity duration-150"
					style="opacity:{hoveredBtn === 'close' ? 0 : 1}"
					alt="Close"
				/>
				<img
					src="/windows/{isDark ? 'hover' : 'hover_light'}/close.svg"
					class="absolute h-full w-full transition-opacity duration-150"
					style="opacity:{hoveredBtn === 'close' ? 1 : 0}"
					alt=""
				/>
			</button>
		</div>
	</div>

	<!-- Content -->
	<div class="min-h-0 flex-1 overflow-hidden">
		{@render children()}
	</div>

	<!-- Resize handles (desktop, non-embedded only) -->
	{#if !isMobile && !embedded}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="absolute inset-x-0 top-0 h-1"
			style="cursor:url('/cursor/top_side.svg') 10 0,n-resize"
			onpointerdown={(e) => startResize(e, 'n')}
			onpointermove={doResize}
			onpointerup={endResize}
		></div>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="absolute inset-x-0 bottom-0 h-1"
			style="cursor:url('/cursor/bottom_side.svg') 10 19,s-resize"
			onpointerdown={(e) => startResize(e, 's')}
			onpointermove={doResize}
			onpointerup={endResize}
		></div>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="absolute inset-y-0 left-0 w-1"
			style="cursor:url('/cursor/left_side.svg') 0 10,w-resize"
			onpointerdown={(e) => startResize(e, 'w')}
			onpointermove={doResize}
			onpointerup={endResize}
		></div>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="absolute inset-y-0 right-0 w-1"
			style="cursor:url('/cursor/right_side.svg') 19 10,e-resize"
			onpointerdown={(e) => startResize(e, 'e')}
			onpointermove={doResize}
			onpointerup={endResize}
		></div>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="absolute top-0 left-0 h-3 w-3"
			style="cursor:url('/cursor/top_left_corner.svg') 0 0,nw-resize"
			onpointerdown={(e) => startResize(e, 'nw')}
			onpointermove={doResize}
			onpointerup={endResize}
		></div>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="absolute top-0 right-0 h-3 w-3"
			style="cursor:url('/cursor/top_right_corner.svg') 19 0,ne-resize"
			onpointerdown={(e) => startResize(e, 'ne')}
			onpointermove={doResize}
			onpointerup={endResize}
		></div>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="absolute bottom-0 left-0 h-3 w-3"
			style="cursor:url('/cursor/bottom_left_corner.svg') 0 19,sw-resize"
			onpointerdown={(e) => startResize(e, 'sw')}
			onpointermove={doResize}
			onpointerup={endResize}
		></div>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="absolute right-0 bottom-0 h-3 w-3"
			style="cursor:url('/cursor/bottom_right_corner.svg') 19 19,se-resize"
			onpointerdown={(e) => startResize(e, 'se')}
			onpointermove={doResize}
			onpointerup={endResize}
		></div>
	{/if}
</div>

<style>
	@keyframes win-open {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
	@keyframes win-close {
		from {
			opacity: 1;
			transform: scale(1);
		}
		to {
			opacity: 0;
			transform: scale(0.95);
		}
	}
	.win {
		animation: win-open 150ms ease-out forwards;
		transform-origin: center;
	}
	.win.closing {
		animation: win-close 140ms ease-in forwards;
	}
</style>
