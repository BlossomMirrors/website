<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import * as m from '$lib/paraglide/messages';
	import { mode } from 'mode-watcher';
	import wallpaperDark from '$lib/assets/wallpaper-dark.png';
	import wallpaperLight from '$lib/assets/wallpaper-light.png';
	import WindowControl from '$lib/components/hero/window-control.svelte';

	const isDark = $derived(mode.current === 'dark');
	const buttons = ['minimize', 'maximize', 'close'] as const;
	type BtnType = (typeof buttons)[number];
	let hoveredBtn = $state<BtnType | null>(null);
</script>

<section class="my-16 py-10 md:py-16">
	<div class="grid items-center gap-12 md:grid-cols-2 md:gap-20">
		<div use:reveal>
			<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">
				{m.design_subheader()}
			</p>
			<h2 class="font-serif text-5xl leading-tight md:text-6xl">
				{m.design_header1()}<br />{m.design_header2()}
			</h2>
			<p class="mt-6 text-lg leading-relaxed text-muted-foreground">
				{m.design_description()}
			</p>
		</div>

		<div class="flex flex-col gap-4" use:reveal={120}>
			<!-- Mock window -->
			<div class="overflow-hidden rounded-2xl border border-border">
				<div class="flex items-center justify-between bg-card px-3 select-none" style="height:36px">
					<div class="flex items-center gap-2">
						<div class="h-4 w-4 rounded bg-muted"></div>
						<span class="text-xs text-foreground">BlossomOS</span>
					</div>
					<div class="flex items-center gap-2">
						{#each buttons as btn (btn)}
							<WindowControl
								type={btn}
								{isDark}
								hovered={hoveredBtn === btn}
								onmouseenter={() => (hoveredBtn = btn)}
								onmouseleave={() => (hoveredBtn = null)}
							/>
						{/each}
					</div>
				</div>
				<div class="h-32 overflow-hidden">
					{#if isDark}
						<enhanced:img
							src={wallpaperDark}
							alt="BlossomOS desktop"
							class="h-full w-full object-cover object-top"
						/>
					{:else}
						<enhanced:img
							src={wallpaperLight}
							alt="BlossomOS desktop"
							class="h-full w-full object-cover object-top"
						/>
					{/if}
				</div>
			</div>

			<!-- Zoomed button showcase -->
			<div
				class="flex items-center justify-center gap-10 rounded-2xl border border-border bg-card/50 py-10"
			>
				{#each buttons as btn (btn)}
					<WindowControl
						type={btn}
						{isDark}
						hovered={hoveredBtn === btn}
						class="!h-16 !w-16 transition-transform duration-150 hover:scale-110"
						onmouseenter={() => (hoveredBtn = btn)}
						onmouseleave={() => (hoveredBtn = null)}
					/>
				{/each}
			</div>
			<p class="text-center text-xs text-muted-foreground">{m.design_hint()}</p>
		</div>
	</div>
</section>
