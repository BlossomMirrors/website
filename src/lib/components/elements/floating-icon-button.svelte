<script lang="ts">
	import { cn } from '$lib/utils';
	import type { IconComponent } from './icon-tile.svelte';

	let {
		icon: Icon,
		label,
		size = 'md',
		translucent = false,
		disabled = false,
		onclick,
		class: className
	}: {
		icon: IconComponent;
		label: string;
		size?: 'md' | 'lg';
		translucent?: boolean;
		disabled?: boolean;
		onclick?: () => void;
		class?: string;
	} = $props();
</script>

<button
	type="button"
	class={cn(
		'flex items-center justify-center rounded-full text-foreground shadow-lg disabled:opacity-40',
		size === 'md' ? 'size-9' : 'size-10',
		translucent ? 'bg-background/80 backdrop-blur' : 'bg-background',
		className
	)}
	{onclick}
	{disabled}
	aria-label={label}
>
	<Icon size={size === 'md' ? 16 : 18} />
</button>
