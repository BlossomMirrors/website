<script lang="ts">
	import ShieldCheckIcon from '@lucide/svelte/icons/shield-check';
	import EyeIcon from '@lucide/svelte/icons/eye';
	import LockKeyholeIcon from '@lucide/svelte/icons/lock-keyhole';
	import { PackageIcon } from '@lucide/svelte';
	import * as m from '$lib/paraglide/messages';
	import Features from '$lib/components/ui/features.svelte';
	import SectionHeader from '$lib/components/ui/section-header.svelte';

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
	<SectionHeader subheader={m.foundation_subheader()} class="mb-14">
		{m.foundation_header1()}<br />{m.foundation_header2()}
	</SectionHeader>

	<Features features={pillars} />
</section>
