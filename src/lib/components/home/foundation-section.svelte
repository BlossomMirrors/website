<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import ShieldCheckIcon from '@lucide/svelte/icons/shield-check';
	import RefreshCwOffIcon from '@lucide/svelte/icons/refresh-cw-off';
	import EyeIcon from '@lucide/svelte/icons/eye';
	import LockKeyholeIcon from '@lucide/svelte/icons/lock-keyhole';

	const pillars = [
		{
			Icon: ShieldCheckIcon,
			title: 'KDE Plasma',
			body: 'A mature, open-source desktop, currently funded by the German federal government with over €1.2 million. Stable, beautiful, accountable to no one but its community.'
		},
		{
			Icon: RefreshCwOffIcon,
			title: 'Immutable Core',
			body: 'The system core is unchangeable. It stays clean, predictable, and stable. More stable than your first feature phone. You install software exactly as you always have.'
		},
		{
			Icon: EyeIcon,
			title: 'Open Source',
			body: "Every line of code is open for inspection. Security researchers, users, and hardware partners can verify for themselves that it's secure and private."
		},
		{
			Icon: LockKeyholeIcon,
			title: 'Security Built In',
			body: 'State-of-the-art offline encryption and hardware-assisted security features, baked into the foundation from the start. Not bolted on as an afterthought.'
		}
	];
</script>

<section class="py-10 md:py-16">
	<div class="mb-14" use:reveal>
		<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">
			Built on a stable foundation
		</p>
		<h2 class="font-serif text-5xl leading-tight md:text-6xl">
			Solid, secure,<br />built to last.
		</h2>
	</div>

	<div class="grid gap-4 sm:grid-cols-2 md:gap-6">
		{#each pillars as p, i}
			<div
				class="rounded-2xl border border-border bg-card p-7 md:p-9"
				use:reveal={i * 80}
			>
				<div
					class="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"
				>
					<p.Icon size={20} strokeWidth={1.5} />
				</div>
				<h3 class="mb-2 font-semibold">{p.title}</h3>
				<p class="text-sm leading-relaxed text-muted-foreground">{p.body}</p>
			</div>
		{/each}
	</div>
</section>
