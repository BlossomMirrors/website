<script lang="ts">
	import ShieldCheckIcon from '@lucide/svelte/icons/shield-check';
	import EyeIcon from '@lucide/svelte/icons/eye';
	import LockKeyholeIcon from '@lucide/svelte/icons/lock-keyhole';
	import { PackageIcon } from '@lucide/svelte';
	import * as m from '$lib/paraglide/messages';
	import FeatureGrid from '$lib/components/cards/feature-grid.svelte';
	import Section from '$lib/components/page/section.svelte';

	const pillars = [
		{
			icon: ShieldCheckIcon,
			title: m.foundation_kde_header(),
			body: m.foundation_kde()
		},
		{
			icon: PackageIcon,
			title: m.immutable_core_header(),
			body: m.immutable_core()
		},
		{
			icon: EyeIcon,
			title: m.open_source_header(),
			body: m.open_source_description()
		},
		{
			icon: LockKeyholeIcon,
			title: m.security_built_in_header(),
			body: m.security_built_in()
		}
	];
</script>

<Section
	eyebrow={m.foundation_subheader()}
	title={[m.foundation_header1(), m.foundation_header2()]}
	class="mt-0 py-10 md:py-16"
>
	<FeatureGrid items={pillars} size="lg" />
</Section>
