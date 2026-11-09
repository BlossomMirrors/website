<script lang="ts">
	import { cn } from '$lib/utils.js';

	let {
		type,
		hovered = false,
		class: className = '',
		onmouseenter,
		onmouseleave
	}: {
		type: 'minimize' | 'maximize' | 'close';
		/** Forces the hover look, so linked controls can light up together */
		hovered?: boolean;
		class?: string;
		onmouseenter?: () => void;
		onmouseleave?: () => void;
	} = $props();

	let hovering = $state(false);
	const active = $derived(hovered || hovering);
</script>

<button
	type="button"
	data-active={active || undefined}
	class={cn(
		'group cursor-custom relative flex size-5 items-center justify-center text-[#505060] dark:text-[#D8D8DD]',
		type === 'close'
			? 'data-active:text-white'
			: 'data-active:text-[#F1F1F3] dark:data-active:text-[#0C0C12]',
		className
	)}
	onmouseenter={() => {
		hovering = true;
		onmouseenter?.();
	}}
	onmouseleave={() => {
		hovering = false;
		onmouseleave?.();
	}}
>
	<svg
		class="size-full"
		viewBox="0 0 16 16"
		fill="none"
		stroke="currentColor"
		stroke-width="1.5"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<rect
			x="0.5"
			y="0.5"
			width="15"
			height="15"
			rx="2.5"
			stroke-width="1"
			class={cn(
				'hidden group-data-active:block',
				type === 'close'
					? 'fill-[#DE4F4F] stroke-[#DE4F4F] dark:fill-[#DE4F4F]/60'
					: 'fill-[#606060] stroke-[#505050] dark:fill-[#F1F1F3]/60 dark:stroke-[#D8D8DD]'
			)}
		/>

		{#if type === 'minimize'}
			<path d="M4 8H12" stroke-width="1.75" />
		{:else if type === 'maximize'}
			<path
				d="M5 4H11C11.5523 4 12 4.44772 12 5V11C12 11.5523 11.5523 12 11 12H5C4.44772 12 4 11.5523 4 11V5C4 4.44772 4.44772 4 5 4Z"
			/>
		{:else}
			<path d="M11.5 4.5L4.5 11.5M4.5 4.5L11.5 11.5" />
		{/if}
	</svg>
</button>
