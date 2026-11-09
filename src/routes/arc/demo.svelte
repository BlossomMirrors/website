<script lang="ts">
	import Section from '$lib/components/page/section.svelte';
	import ArcSection from '$lib/components/sections/arc-section.svelte';
	import * as m from '$lib/paraglide/messages';
</script>

<Section class="mt-32" size="md" align="center" title={m.arc_demo_h2()} body={m.arc_demo_body()}>
	<ArcSection learnMore={false} />
</Section>
