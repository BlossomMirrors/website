<script lang="ts">
	import Section from '$lib/components/page/section.svelte';
	import FeatureGrid from '$lib/components/cards/feature-grid.svelte';
	import type { Feature } from '$lib/components/cards/feature-card.svelte';
	import ScanIcon from '@lucide/svelte/icons/scan';
	import DownloadIcon from '@lucide/svelte/icons/download';
	import CheckCircleIcon from '@lucide/svelte/icons/check-circle';
	import * as m from '$lib/paraglide/messages';

	const steps: Feature[] = $derived(
		[
			{
				icon: ScanIcon,
				title: m.switch_step1_label(),
				body: m.switch_step1_body()
			},
			{
				icon: DownloadIcon,
				title: m.switch_step2_label(),
				body: m.switch_step2_body()
			},
			{
				icon: CheckCircleIcon,
				title: m.switch_step3_label(),
				body: m.switch_step3_body()
			}
		].map((step, i) => ({ ...step, eyebrow: `${m.switch_step_prefix()} ${i + 1}` }))
	);
</script>

<Section
	eyebrow={m.switch_steps_subheader()}
	title={[m.switch_steps_h2_1(), m.switch_steps_h2_2()]}
>
	<FeatureGrid items={steps} cols={3} gap="lg" stagger={80} />
</Section>
