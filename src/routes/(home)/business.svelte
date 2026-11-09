<script lang="ts">
	import ShieldCheckIcon from '@lucide/svelte/icons/shield-check';
	import LockIcon from '@lucide/svelte/icons/lock';
	import RocketIcon from '@lucide/svelte/icons/rocket';
	import UsersIcon from '@lucide/svelte/icons/users';
	import * as m from '$lib/paraglide/messages';
	import libreofficePng from '$lib/assets/taskbar/libreoffice.png';
	import thunderbirdPng from '$lib/assets/taskbar/thunderbird.png';
	import FeatureChipGrid from '$lib/components/cards/feature-chip-grid.svelte';
	import SplitSection from '$lib/components/page/split-section.svelte';

	const features = [
		{ img: libreofficePng, label: m.business_office() },
		{ img: thunderbirdPng, label: m.business_email() },
		{ icon: ShieldCheckIcon, label: m.business_security() },
		{ icon: LockIcon, label: m.business_privacy() },
		{ icon: RocketIcon, label: m.business_deployment() },
		{ icon: UsersIcon, label: m.business_support() }
	];
</script>

<SplitSection
	panel="amber"
	accent="bg-orange-400/8"
	eyebrow={m.business_subheader()}
	eyebrowClass="text-amber-600 dark:text-amber-400"
	title={[m.business_header1(), m.business_header2()]}
	body={m.business_description()}
	size="md"
	class="mt-0 py-10 md:py-16"
>
	{#snippet aside()}
		<FeatureChipGrid items={features} tone="amber" />
	{/snippet}
</SplitSection>
