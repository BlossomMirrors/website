<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import * as m from '$lib/paraglide/messages';
	import { getTitle } from '$lib/utils';
	import { screenshots } from '$lib/screenshots';
	import * as Dialog from '$lib/components/ui/dialog';
	import ImageOffIcon from '@lucide/svelte/icons/image-off';
	import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left';
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
	import XIcon from '@lucide/svelte/icons/x';

	let activeIndex = $state<number | null>(null);
	const hasMultiple = $derived(screenshots.length > 1);

	function open(i: number) {
		activeIndex = i;
	}

	function close() {
		activeIndex = null;
	}

	function prev() {
		if (activeIndex === null) return;
		activeIndex = (activeIndex - 1 + screenshots.length) % screenshots.length;
	}

	function next() {
		if (activeIndex === null) return;
		activeIndex = (activeIndex + 1) % screenshots.length;
	}

	function onkeydown(e: KeyboardEvent) {
		if (activeIndex === null) return;
		if (e.key === 'ArrowLeft') prev();
		else if (e.key === 'ArrowRight') next();
	}
</script>

<svelte:window {onkeydown} />

<svelte:head>
	<meta name="description" content={m.screenshots_subtitle()} />
	<meta property="og:title" content={getTitle(m.screenshots_tagline())} />
	<meta property="og:description" content={m.screenshots_subtitle()} />
	<meta name="twitter:title" content={getTitle(m.screenshots_tagline())} />
	<meta name="twitter:description" content={m.screenshots_subtitle()} />
	<title>{getTitle(m.screenshots_tagline())}</title>
</svelte:head>

<div class="py-16 md:py-24">
	<div class="mx-auto max-w-3xl text-center" use:reveal>
		<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">
			{m.screenshots_tagline()}
		</p>
		<h1 class="font-serif text-5xl leading-tight md:text-7xl">
			{m.screenshots_h1_1()}<br />{m.screenshots_h1_2()}
		</h1>
		<p class="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
			{m.screenshots_subtitle()}
		</p>
	</div>

	{#if screenshots.length === 0}
		<div
			class="mt-16 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border py-24 text-center"
			use:reveal={120}
		>
			<ImageOffIcon size={28} class="text-muted-foreground" strokeWidth={1.5} />
			<p class="text-muted-foreground">{m.screenshots_empty()}</p>
		</div>
	{:else}
		<div class="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each screenshots as shot, i (shot.name)}
				<button
					type="button"
					class="group overflow-hidden rounded-2xl border border-border"
					onclick={() => open(i)}
					aria-label={shot.name}
					use:reveal={i * 60}
				>
					<div class="aspect-video overflow-hidden bg-muted">
						<enhanced:img
							src={shot.image}
							alt={shot.name}
							class="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
						/>
					</div>
				</button>
			{/each}
		</div>
	{/if}
</div>

<Dialog.Root open={activeIndex !== null} onOpenChange={(o) => !o && close()}>
	<Dialog.Content
		class="max-w-4xl border-none bg-transparent p-0 shadow-none sm:max-w-4xl"
		hideClose
	>
		{#if activeIndex !== null}
			{@const credit = screenshots[activeIndex].credit}
			<Dialog.Title class="sr-only">{screenshots[activeIndex].name}</Dialog.Title>
			<div class="relative">
				<enhanced:img
					src={screenshots[activeIndex].image}
					alt={screenshots[activeIndex].name}
					class="max-h-[80vh] w-full rounded-2xl object-contain"
				/>

				<Dialog.Close
					class="absolute -top-3 -right-3 flex h-9 w-9 items-center justify-center rounded-full bg-background text-foreground shadow-lg"
					aria-label={m.screenshots_close()}
				>
					<XIcon size={16} />
				</Dialog.Close>

				{#if credit}
					<div
						class="absolute bottom-3 left-3 rounded-full bg-background/80 px-3 py-1.5 text-xs text-foreground shadow-lg backdrop-blur"
					>
						{#if credit.url}
							<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
							<a href={credit.url} target="_blank" rel="noreferrer" class="hover:underline">
								{m.screenshots_credit({ name: credit.name })}
							</a>
						{:else}
							{m.screenshots_credit({ name: credit.name })}
						{/if}
					</div>
				{/if}

				{#if hasMultiple}
					<button
						type="button"
						class="absolute top-1/2 left-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground shadow-lg backdrop-blur"
						onclick={prev}
						aria-label={m.screenshots_prev()}
					>
						<ChevronLeftIcon size={18} />
					</button>
					<button
						type="button"
						class="absolute top-1/2 right-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground shadow-lg backdrop-blur"
						onclick={next}
						aria-label={m.screenshots_next()}
					>
						<ChevronRightIcon size={18} />
					</button>
				{/if}
			</div>
		{/if}
	</Dialog.Content>
</Dialog.Root>
