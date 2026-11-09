<script lang="ts">
	import * as m from '$lib/paraglide/messages';

	import wallpaperDark from '$lib/assets/wallpaper-dark.png?enhanced&imgWidth=1280';
	import wallpaperLight from '$lib/assets/wallpaper-light.png?enhanced&imgWidth=1280';
	import WindowControl from './window-control.svelte';
	import ThemedImage from '$lib/components/media/themed-image.svelte';

	const buttons = ['minimize', 'maximize', 'close'] as const;
	type BtnType = (typeof buttons)[number];
	let hoveredBtn = $state<BtnType | null>(null);
</script>

<div class="flex flex-col gap-4">
	<div class="overflow-hidden rounded border border-border">
		<div class="flex h-9 items-center justify-between bg-card px-2.5 select-none">
			<div class="flex items-center gap-2">
				<div class="size-4 rounded bg-muted"></div>
				<span class="text-xs text-foreground">BlossomOS</span>
			</div>
			<div class="flex items-center gap-2">
				{#each buttons as btn (btn)}
					<WindowControl
						type={btn}
						hovered={hoveredBtn === btn}
						onmouseenter={() => (hoveredBtn = btn)}
						onmouseleave={() => (hoveredBtn = null)}
					/>
				{/each}
			</div>
		</div>
		<div class="h-32 overflow-hidden">
			<ThemedImage
				dark={wallpaperDark}
				light={wallpaperLight}
				alt="BlossomOS desktop"
				sizes="(min-width: 768px) 50vw, 100vw"
				class="size-full object-cover object-top"
			/>
		</div>
	</div>

	<div
		class="flex items-center justify-center gap-10 rounded-2xl border border-border bg-card/50 py-10"
	>
		{#each buttons as btn (btn)}
			<WindowControl
				type={btn}
				hovered={hoveredBtn === btn}
				class="size-16! transition-transform duration-150 hover:scale-110"
				onmouseenter={() => (hoveredBtn = btn)}
				onmouseleave={() => (hoveredBtn = null)}
			/>
		{/each}
	</div>
	<p class="text-center text-xs text-muted-foreground">{m.design_hint()}</p>
</div>
