<script lang="ts" module>
	// Styles and variants come from the Blossom UI registry (web-registry). The website adds
	// `href` support on top, so a Button can render as a link.
	import { tv, type VariantProps } from 'tailwind-variants';

	export const buttonVariants = tv({
		base: "relative overflow-hidden inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-button text-sm font-normal transition-[background-color,color,box-shadow] duration-150 ease-[cubic-bezier(0.33,1,0.68,1)] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 cursor-pointer shadow-[0_1px_2px_rgb(0_0_6/0.12)] dark:shadow-[0_1px_2px_rgb(0_0_0/0.4)]",
		variants: {
			variant: {
				default: `font-semibold bg-button text-button-foreground hover:bg-button-hover`,
				primary: `font-semibold bg-primary-500/25 text-primary hover:bg-primary-500/35`,
				destructive: `font-semibold bg-destructive text-destructive-foreground hover:bg-destructive/85 focus-visible:ring-destructive/30`,
				ghost: 'text-foreground hover:bg-button-hover',
				link: 'text-link underline-offset-4 hover:underline',
				outline:
					'border border-border bg-background hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 aria-expanded:bg-muted aria-expanded:text-foreground shadow-xs',
				secondary: `bg-secondary text-secondary-foreground hover:bg-button-hover aria-expanded:bg-secondary aria-expanded:text-secondary-foreground`
			},
			size: {
				default: 'h-9 px-4 py-2 has-[>svg]:px-3',
				sm: 'h-8 gap-1.5 px-3 has-[>svg]:px-2.5',
				lg: "h-11 px-6 has-[>svg]:px-4 text-[0.96875rem] tracking-[-0.01em] gap-[5px] [&_svg:not([class*='size-'])]:size-[26px]",
				icon: 'size-9',
				xs: "h-6 gap-1 rounded-[min(var(--radius-md),8px)] px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
				'icon-xs':
					"size-6 rounded-[min(var(--radius-md),8px)] [&_svg:not([class*='size-'])]:size-3",
				'icon-sm': 'size-8',
				'icon-lg': 'size-10'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		},
		compoundVariants: [
			{
				variant: 'link',
				class: 'px-0 has-[>svg]:px-0 active:scale-[0.93] shadow-none!'
			},
			{
				variant: 'ghost',
				class: 'shadow-none!'
			}
		]
	});

	export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
	export type ButtonSize = VariantProps<typeof buttonVariants>['size'];
</script>

<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { resolve } from '$app/paths';
	import type { Pathname } from '$app/types';
	import type { HTMLButtonAttributes, HTMLAnchorAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	let {
		ref = $bindable(null),
		variant,
		size,
		child,
		children,
		href,
		class: className,
		onpointerdown,
		...restProps
	}: HTMLButtonAttributes &
		Omit<HTMLAnchorAttributes, 'type'> &
		VariantProps<typeof buttonVariants> & {
			child?: Snippet<[{ props: Record<string, unknown> }]>;
			ref?: HTMLElement | null;
			/** Renders the button as a link. Internal paths (starting with `/`) are routed through
			 * SvelteKit's resolve(); anything else is treated as an external URL and opens in a
			 * new tab. */
			href?: string;
		} = $props();

	type Ripple = { id: number; x: number; y: number; size: number };
	let ripples = $state<Ripple[]>([]);
	let nextId = 0;

	function handlePointerDown(e: PointerEvent) {
		if (variant !== 'link') {
			const target = e.currentTarget as HTMLElement;
			const rect = target.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			const size = Math.max(rect.width, rect.height) * 2;
			const id = nextId++;
			ripples = [...ripples, { id, x, y, size }];
			setTimeout(() => {
				ripples = ripples.filter((r) => r.id !== id);
			}, 600);
		}
		if (typeof onpointerdown === 'function') {
			onpointerdown(e as PointerEvent & { currentTarget: EventTarget & HTMLButtonElement });
		}
	}

	const mergedProps = $derived({
		...restProps,
		class: cn(buttonVariants({ variant, size }), className),
		'data-slot': 'button'
	});

	const rippleColorClass = $derived(variant === 'destructive' ? 'bg-foreground' : 'bg-primary');
	const isExternal = $derived(href !== undefined && !href.startsWith('/'));
</script>

{#snippet content()}
	{@render children?.()}
	{#each ripples as ripple (ripple.id)}
		<span
			class="{rippleColorClass} pointer-events-none absolute -translate-1/2 animate-in rounded-full opacity-0 duration-600 ease-[ease-out] fade-in-35 zoom-in"
			style="left: {ripple.x}px; top: {ripple.y}px; width: {ripple.size}px; height: {ripple.size}px;"
		></span>
	{/each}
{/snippet}

{#if child}
	{@render child({ props: mergedProps })}
{:else if href !== undefined && isExternal}
	<a
		{href}
		target="_blank"
		rel="external noreferrer"
		{...mergedProps}
		bind:this={ref}
		onpointerdown={handlePointerDown}
	>
		{@render content()}
	</a>
{:else if href !== undefined}
	<a
		href={resolve(href as Pathname)}
		{...mergedProps}
		bind:this={ref}
		onpointerdown={handlePointerDown}
	>
		{@render content()}
	</a>
{:else if children}
	<button {...mergedProps} bind:this={ref} onpointerdown={handlePointerDown}>
		{@render content()}
	</button>
{/if}
