<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import ShieldCheckIcon from '@lucide/svelte/icons/shield-check';
	import EyeIcon from '@lucide/svelte/icons/eye';
	import LockKeyholeIcon from '@lucide/svelte/icons/lock-keyhole';
	import { PackageIcon } from '@lucide/svelte';
	import * as m from '$lib/paraglide/messages';

	const pillars = [
		{
			Icon: ShieldCheckIcon,
			title: m.foundation_kde_header(),
			body: m.foundation_kde()
		},
		{
			Icon: PackageIcon,
			title: m.immutable_core_header(),
			body: m.immutable_core()
		},
		{
			Icon: EyeIcon,
			title: m.open_source_header(),
			body: m.open_source_description()
		},
		{
			Icon: LockKeyholeIcon,
			title: m.security_built_in_header(),
			body: m.security_built_in()
		}
	];
</script>

<section class="py-10 md:py-16">
	<div class="mb-14" use:reveal>
		<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">
			{m.foundation_subheader()}
		</p>
		<h2 class="font-serif text-5xl leading-tight md:text-6xl">
			{m.foundation_header1()}<br />{m.foundation_header2()}
		</h2>
	</div>

	<div class="grid gap-4 sm:grid-cols-2 md:gap-6">
		{#each pillars as p, i (p.title)}
			<div class="rounded-2xl border border-border bg-card p-7 md:p-9" use:reveal={i * 80}>
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
