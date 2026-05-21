<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { Button } from '$lib/components/ui/button';
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
	import MonitorIcon from '@lucide/svelte/icons/monitor';
	import ShoppingBagIcon from '@lucide/svelte/icons/shopping-bag';
	import CloudIcon from '@lucide/svelte/icons/cloud';
	import Building2Icon from '@lucide/svelte/icons/building-2';

	const products = [
		{
			Icon: MonitorIcon,
			name: 'BlossomOS',
			tagline: 'The desktop OS for digital independence.',
			href: '/os',
			cta: 'Learn more'
		},
		{
			Icon: ShoppingBagIcon,
			name: 'Arc Software',
			tagline: 'Any app, any format, one click.',
			href: '/arc',
			cta: 'Learn more'
		},
		{
			Icon: CloudIcon,
			name: 'Blossom Cloud',
			tagline: 'Private cloud storage, hosted in the EU.',
			href: '/cloud',
			cta: 'Learn more'
		},
		{
			Icon: Building2Icon,
			name: 'Blossom Hub',
			tagline: 'All company resources in one place.',
			href: '/hub',
			cta: 'Coming soon',
			soon: true
		}
	];
</script>

<svelte:head>
	<title>Blossom</title>
</svelte:head>

<!-- Hero -->
<div class="flex flex-col items-center py-20 text-center md:py-32" use:reveal>
	<p class="mb-4 text-xs font-semibold tracking-widest text-primary uppercase">
		Open software for everyone
	</p>
	<h1 class="font-serif text-5xl leading-tight md:text-7xl lg:text-8xl">
		Computing the way<br />it should be.
	</h1>
	<p class="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
		Blossom builds open, privacy-respecting software for people who want a computer that works for
		them, not against them.
	</p>
	<div class="mt-8 flex gap-3">
		<a href="/os">
			<Button variant="primary">
				Get BlossomOS
				<ArrowRightIcon size={16} />
			</Button>
		</a>
		<a href="/about">
			<Button>Learn more</Button>
		</a>
	</div>
</div>

<!-- Office video -->
<div class="overflow-hidden rounded-2xl" use:reveal={80}>
	<video src="/office.mp4" autoplay loop muted playsinline class="w-full object-cover"></video>
</div>

<!-- Products -->
<div class="mt-24 md:mt-32">
	<div class="mb-12" use:reveal>
		<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">Our products</p>
		<h2 class="font-serif text-5xl leading-tight md:text-6xl">Everything you need.</h2>
	</div>

	<div class="grid gap-4 sm:grid-cols-2">
		{#each products as p, i (p.name)}
			<a
				href={p.href}
				class="group flex flex-col rounded-2xl border border-border bg-card p-7 transition-colors hover:border-primary/30 hover:bg-primary/3 md:p-9"
				use:reveal={i * 70}
			>
				<div
					class="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"
				>
					<p.Icon size={20} strokeWidth={1.5} />
				</div>
				<div class="flex-1">
					<div class="flex items-center gap-2">
						<h3 class="font-semibold">{p.name}</h3>
						{#if p.soon}
							<span
								class="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold tracking-wide text-muted-foreground uppercase"
							>Soon</span>
						{/if}
					</div>
					<p class="mt-1 text-sm leading-relaxed text-muted-foreground">{p.tagline}</p>
				</div>
				<div class="mt-6 flex items-center gap-1 text-sm font-medium text-primary">
					{p.cta}
					<ArrowRightIcon size={14} class="transition-transform group-hover:translate-x-1" />
				</div>
			</a>
		{/each}
	</div>
</div>

<!-- Mission strip -->
<div
	class="relative mt-24 overflow-hidden rounded-3xl bg-linear-to-br from-primary/10 via-primary/5 to-transparent p-10 md:mt-32 md:p-16"
	use:reveal
>
	<div
		class="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-primary/8 blur-3xl"
	></div>
	<div class="relative max-w-2xl">
		<h2 class="font-serif text-4xl leading-tight md:text-5xl">
			Built in the open.<br />Owned by no one.
		</h2>
		<p class="mt-5 text-lg leading-relaxed text-muted-foreground">
			Every line of Blossom code is public. No investors to answer to, no users to monetise. Just
			software made by people who wanted something better.
		</p>
		<div class="mt-8 flex flex-wrap gap-3">
			<a href="/about">
				<Button variant="primary">About Blossom</Button>
			</a>
			<a href="https://git.blossomos.org/Blossom" target="_blank" rel="noreferrer">
				<Button>View source</Button>
			</a>
		</div>
	</div>
</div>

<div class="mb-16"></div>
