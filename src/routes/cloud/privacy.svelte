<script lang="ts">
	import LockIcon from '@lucide/svelte/icons/lock';
	import EyeOffIcon from '@lucide/svelte/icons/eye-off';
	import ShieldIcon from '@lucide/svelte/icons/shield';
	import ServerIcon from '@lucide/svelte/icons/server';
	import * as m from '$lib/paraglide/messages';
	import SplitSection from '$lib/components/page/split-section.svelte';
	import FeatureChipGrid, {
		type FeatureChipItem
	} from '$lib/components/cards/feature-chip-grid.svelte';

	const privacy: FeatureChipItem[] = [
		{ icon: LockIcon, label: m.cloud_privacy_e2e() },
		{ icon: EyeOffIcon, label: m.cloud_privacy_zero_knowledge() },
		{ icon: ShieldIcon, label: m.cloud_privacy_gdpr() },
		{ icon: ServerIcon, label: m.cloud_privacy_eu_hosted() }
	];
</script>

<SplitSection
	panel="primary"
	accent="left-1/4 bg-primary/5"
	splitClass="gap-12 md:gap-12"
	size="md"
	eyebrow={m.cloud_privacy_subheader()}
	title={[m.cloud_privacy_h2_1(), m.cloud_privacy_h2_2()]}
	body={[m.cloud_privacy_body1(), m.cloud_privacy_body2()]}
>
	{#snippet aside()}
		<FeatureChipGrid items={privacy} />
	{/snippet}
</SplitSection>
