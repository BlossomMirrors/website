<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import ShieldCheckIcon from '@lucide/svelte/icons/shield-check';
	import EyeIcon from '@lucide/svelte/icons/eye';
	import LockKeyholeIcon from '@lucide/svelte/icons/lock-keyhole';
	import { PackageIcon } from '@lucide/svelte';
	import * as m from '$lib/paraglide/messages';
	import Features from '$lib/components/ui/features.svelte';

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

	<Features features={pillars} />
</section>
