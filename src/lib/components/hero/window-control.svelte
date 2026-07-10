<script lang="ts">
	import { cn } from '$lib/utils.js';

	type ControlType = 'minimize' | 'maximize' | 'close';

	let {
		type,
		isDark = true,
		hovered: externalHovered = undefined,
		class: className = '',
		onclick,
		onpointerdown,
		onmouseenter,
		onmouseleave
	}: {
		type: ControlType;
		isDark?: boolean;
		hovered?: boolean;
		class?: string;
		onclick?: () => void;
		onpointerdown?: (e: PointerEvent) => void;
		onmouseenter?: () => void;
		onmouseleave?: () => void;
	} = $props();

	let internalHovered = $state(false);
	const hovered = $derived(externalHovered !== undefined ? externalHovered : internalHovered);

	const strokeNormal = $derived(isDark ? '#D8D8DD' : '#505060');
	const strokeHovered = $derived(type === 'close' ? '#ffffff' : isDark ? '#0C0C12' : '#F1F1F3');
	const stroke = $derived(hovered ? strokeHovered : strokeNormal);
</script>

<button
	class={cn('cursor-custom relative flex h-5 w-5 items-center justify-center', className)}
	onmouseenter={() => {
		internalHovered = true;
		onmouseenter?.();
	}}
	onmouseleave={() => {
		internalHovered = false;
		onmouseleave?.();
	}}
	{onclick}
	{onpointerdown}
>
	<svg
		width="100%"
		height="100%"
		viewBox="0 0 16 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		{#if hovered}
			{#if type === 'close'}
				<rect
					x="0.5"
					y="0.5"
					width="15"
					height="15"
					rx="2.5"
					fill="#DE4F4F"
					fill-opacity={isDark ? '0.6' : '1'}
					stroke="#DE4F4F"
				/>
			{:else}
				<rect
					x="0.5"
					y="0.5"
					width="15"
					height="15"
					rx="2.5"
					fill={isDark ? '#F1F1F3' : '#606060'}
					fill-opacity={isDark ? '0.6' : '1'}
					stroke={isDark ? '#D8D8DD' : '#505050'}
				/>
			{/if}
		{/if}

		{#if type === 'minimize'}
			<path
				d="M4 8H12"
				{stroke}
				stroke-width="1.75"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		{:else if type === 'maximize'}
			<path
				d="M5 4H11C11.5523 4 12 4.44772 12 5V11C12 11.5523 11.5523 12 11 12H5C4.44772 12 4 11.5523 4 11V5C4 4.44772 4.44772 4 5 4Z"
				{stroke}
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		{:else if type === 'close'}
			<path
				d="M11.5 4.5L4.5 11.5"
				{stroke}
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M4.5 4.5L11.5 11.5"
				{stroke}
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		{/if}
	</svg>
</button>
