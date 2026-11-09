<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import SplitSection from '$lib/components/page/split-section.svelte';
	import WindowControlsShowcase from '$lib/components/desktop/window-controls-showcase.svelte';
</script>

<SplitSection
	eyebrow={m.design_subheader()}
	title={[m.design_header1(), m.design_header2()]}
	body={m.design_description()}
	class="my-16 py-10 md:py-16"
>
	{#snippet aside()}
		<WindowControlsShowcase />
	{/snippet}
</SplitSection>
