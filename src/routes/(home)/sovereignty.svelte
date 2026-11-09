<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import ShieldCheckIcon from '@lucide/svelte/icons/shield-check';
	import CodeIcon from '@lucide/svelte/icons/code';
	import UnlinkIcon from '@lucide/svelte/icons/unlink';
	import BanknoteIcon from '@lucide/svelte/icons/banknote';
	import FeatureGrid from '$lib/components/cards/feature-grid.svelte';
	import SplitSection from '$lib/components/page/split-section.svelte';

	const cards = $derived([
		{ icon: ShieldCheckIcon, title: m.switch_sov_gdpr_title(), body: m.switch_sov_gdpr_body() },
		{ icon: CodeIcon, title: m.switch_sov_audit_title(), body: m.switch_sov_audit_body() },
		{ icon: UnlinkIcon, title: m.switch_sov_nolock_title(), body: m.switch_sov_nolock_body() },
		{ icon: BanknoteIcon, title: m.switch_sov_cost_title(), body: m.switch_sov_cost_body() }
	]);
</script>

<SplitSection
	eyebrow={m.switch_sov_subheader()}
	title={[m.switch_sov_h2_1(), m.switch_sov_h2_2()]}
	body={m.switch_sov_body()}
	class="mt-0 py-10 md:py-16"
	splitClass="items-start gap-10 md:gap-16"
>
	{#snippet aside()}
		<FeatureGrid items={cards} size="sm" />
	{/snippet}
</SplitSection>
