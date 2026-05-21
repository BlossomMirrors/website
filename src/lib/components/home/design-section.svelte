<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { onMount } from 'svelte';
	import * as m from '$lib/paraglide/messages';

	let isDark = $state(false);
	let hoveredBtn = $state<'minimize' | 'maximize' | 'close' | null>(null);

	const buttons = ['minimize', 'maximize', 'close'] as const;

	onMount(() => {
		isDark = document.documentElement.classList.contains('dark');
		const mo = new MutationObserver(() => {
			isDark = document.documentElement.classList.contains('dark');
		});
		mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
		return () => mo.disconnect();
	});
</script>

<section class="py-10 md:py-16">
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
			<!-- Mock window chrome at 1:1 -->
			<div class="overflow-hidden rounded-2xl border border-border">
				<div class="flex items-center justify-between bg-card px-3 select-none" style="height:36px">
					<div class="flex items-center gap-2">
						<div class="h-4 w-4 rounded bg-muted"></div>
						<span class="text-xs text-foreground">BlossomOS</span>
					</div>
					<div class="flex items-center gap-2">
						{#each buttons as btn (btn)}
							<button
								class="relative flex h-5 w-5 items-center justify-center"
								onmouseenter={() => (hoveredBtn = btn)}
								onmouseleave={() => (hoveredBtn = null)}
							>
								<img
									src="/windows/{isDark ? 'normal' : 'normal_light'}/{btn}.svg"
									class="absolute h-full w-full transition-opacity duration-150"
									style="opacity:{hoveredBtn === btn ? 0 : 1}"
									alt={btn}
								/>
								<img
									src="/windows/{isDark ? 'hover' : 'hover_light'}/{btn}.svg"
									class="absolute h-full w-full transition-opacity duration-150"
									style="opacity:{hoveredBtn === btn ? 1 : 0}"
									alt=""
								/>
							</button>
						{/each}
					</div>
				</div>
				<div class="h-32 overflow-hidden">
					<img
						src={isDark ? '/wallpaper-dark.png' : '/wallpaper-light.png'}
						alt="BlossomOS desktop"
						class="h-full w-full object-cover object-top"
					/>
				</div>
			</div>

			<!-- Zoomed button showcase -->
			<div
				class="flex items-center justify-center gap-10 rounded-2xl border border-border bg-card/50 py-10"
			>
				{#each buttons as btn (btn)}
					<button
						class="relative flex h-16 w-16 items-center justify-center transition-transform duration-150 hover:scale-110"
						onmouseenter={() => (hoveredBtn = btn)}
						onmouseleave={() => (hoveredBtn = null)}
					>
						<img
							src="/windows/{isDark ? 'normal' : 'normal_light'}/{btn}.svg"
							class="absolute h-full w-full transition-opacity duration-150"
							style="opacity:{hoveredBtn === btn ? 0 : 1}"
							alt={btn}
						/>
						<img
							src="/windows/{isDark ? 'hover' : 'hover_light'}/{btn}.svg"
							class="absolute h-full w-full transition-opacity duration-150"
							style="opacity:{hoveredBtn === btn ? 1 : 0}"
							alt=""
						/>
					</button>
				{/each}
			</div>
			<p class="text-center text-xs text-muted-foreground">{m.design_hint()}</p>
		</div>
	</div>
</section>
