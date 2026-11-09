<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import SplitSection from '$lib/components/page/split-section.svelte';
	import Watermark from '$lib/components/elements/watermark.svelte';
	import WindowsIcon from '$lib/components/icons/windows.svelte';
	import * as m from '$lib/paraglide/messages';
</script>

<SplitSection
	panel="primary"
	size="md"
	eyebrow={m.switch_cta2_subheader()}
	title={[m.switch_cta2_h2_1(), m.switch_cta2_h2_2()]}
	body={m.switch_cta2_body()}
>
	{#snippet actions()}
		<Button href="/downloads" variant="primary">{m.cta_download()}</Button>
		<Button href="/about">{m.learn_more()}</Button>
	{/snippet}

	{#snippet aside()}
		<Watermark class="mx-auto size-48 md:size-64">
			<WindowsIcon />
		</Watermark>
	{/snippet}
</SplitSection>
