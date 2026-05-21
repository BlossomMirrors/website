<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { Button } from '$lib/components/ui/button';
	import ArcSection from '$lib/components/home/arc-section.svelte';
	import WindowsIcon from '$lib/components/windows-icon.svelte';
	import PackageIcon from '@lucide/svelte/icons/package';
	import LayersIcon from '@lucide/svelte/icons/layers';
	import ZapIcon from '@lucide/svelte/icons/zap';
	import ShieldCheckIcon from '@lucide/svelte/icons/shield-check';

	const formats = ['Flatpak', 'AppImage', '.deb', '.rpm', 'Arch Linux'];

	const unifyFeatures = [
		{
			Icon: LayersIcon,
			title: 'Any format',
			body: 'Flatpak, AppImage, Arch Linux, deb, rpm. Arc Unify handles them all through one consistent interface.'
		},
		{
			Icon: ZapIcon,
			title: 'One click',
			body: 'No terminal. No manual dependency hunting. Click install, watch it work.'
		},
		{
			Icon: ShieldCheckIcon,
			title: 'Sandboxed by default',
			body: 'Apps run in isolated containers. They only get access to what they need.'
		}
	];
</script>

<svelte:head>
	<title>Arc Software - Blossom</title>
</svelte:head>

<div class="py-16 md:py-24">
	<!-- Hero -->
	<div class="mx-auto max-w-3xl text-center" use:reveal>
		<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">Arc Software</p>
		<h1 class="font-serif text-5xl leading-tight md:text-7xl">
			Any software.<br />One click.
		</h1>
		<p class="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
			Arc is the software store built for BlossomOS. Every package format unified. Windows apps
			included. No terminal required.
		</p>
		<div class="mt-8 flex justify-center gap-3">
			<!-- eslint-disable svelte/no-navigation-without-resolve -->
			<a href="/os">
				<Button variant="primary">Get BlossomOS</Button>
			</a>
			<a href="https://git.blossomos.org/Blossom" target="_blank" rel="noreferrer">
				<Button>View source</Button>
			</a>
		</div>
	</div>

	<!-- Arc Unify -->
	<div class="mt-24 grid items-center gap-12 md:grid-cols-2 md:gap-20">
		<div use:reveal>
			<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">Arc Unify</p>
			<h2 class="font-serif text-4xl leading-tight md:text-5xl">
				Every package format.<br />One store.
			</h2>
			<p class="mt-6 text-lg leading-relaxed text-muted-foreground">
				The Linux software ecosystem is fragmented. Flatpak here, AppImage there, deb packages
				somewhere else. Arc Unify brings them all together so you never have to think about formats
				again.
			</p>
			<div class="mt-8 grid gap-4">
				{#each unifyFeatures as f, i (f.title)}
					<div class="flex gap-4" use:reveal={100 + i * 70}>
						<div
							class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
						>
							<f.Icon size={16} strokeWidth={1.5} />
						</div>
						<div>
							<p class="font-semibold">{f.title}</p>
							<p class="mt-1 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div use:reveal={120}>
			<div class="rounded-2xl border border-border bg-card p-8">
				<p class="mb-5 text-sm font-medium text-muted-foreground">Supported formats</p>
				<div class="flex flex-wrap gap-3">
					{#each formats as fmt (fmt)}
						<div
							class="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2"
						>
							<PackageIcon size={14} class="text-primary" />
							<span class="text-sm font-medium">{fmt}</span>
						</div>
					{/each}
				</div>
				<div class="mt-6 rounded-xl bg-muted/50 p-4 font-mono text-sm">
					<p class="text-muted-foreground"># No more of this</p>
					<p class="mt-1 line-through opacity-50">
						sudo apt install libsomething-dev && chmod +x App.AppImage && ./App.AppImage
					</p>
					<p class="mt-3 text-primary">✓ Just click Install</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Arc Winapps -->
	<div class="mt-24 grid items-center gap-12 md:grid-cols-2 md:gap-20">
		<div class="order-2 md:order-1" use:reveal={120}>
			<div class="flex items-center justify-center rounded-2xl border border-border bg-card p-12">
				<div class="text-center">
					<div
						class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#0078d4]/10 fill-[#0078d4] p-4"
					>
						<WindowsIcon />
					</div>
					<p class="font-semibold">Windows apps</p>
					<p class="mt-2 text-sm text-muted-foreground">Running natively on BlossomOS</p>
					<div class="mt-4 flex justify-center gap-2">
						{#each ['Affinity Photo', 'FL Studio', 'Foobar 2000'] as app (app)}
							<span class="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
								{app}
							</span>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<div class="order-1 md:order-2" use:reveal>
			<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">Arc Winapps</p>
			<h2 class="font-serif text-4xl leading-tight md:text-5xl">
				Windows apps.<br />On BlossomOS.
			</h2>
			<p class="mt-6 text-lg leading-relaxed text-muted-foreground">
				Some software only exists on Windows. Arc Winapps brings those apps to BlossomOS through
				Wine. They appear in your app store, launch like native apps, and integrate with your
				desktop.
			</p>
			<p class="mt-4 text-lg leading-relaxed text-muted-foreground">
				No dual-boot. No VM management. Just your apps.
			</p>
		</div>
	</div>

	<!-- Interactive demo -->
	<div class="mt-32">
		<div class="text-center" use:reveal>
			<h2 class="font-serif text-4xl leading-tight md:text-5xl">See it in action.</h2>
			<p class="text-lg text-muted-foreground">
				The store you would expect, for the OS you deserve.
			</p>
		</div>
		<ArcSection />
	</div>
</div>
