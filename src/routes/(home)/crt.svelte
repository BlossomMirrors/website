<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { Recycle } from '@lucide/svelte';
	import SplitSection from '$lib/components/page/split-section.svelte';
	import CrtMonitor from '$lib/components/media/crt-monitor.svelte';
</script>

<SplitSection
	eyebrow={m.crt_subheader()}
	eyebrowClass="text-green-500"
	body={m.crt_description()}
	class="my-16 py-10 md:my-32 md:py-16"
>
	{#snippet heading()}
		{m.crt_header1()}
		{m.crt_header2()}
		<Recycle color="oklch(72.3% 0.219 149.579)" class="mb-2 inline animate-spin" />
	{/snippet}

	{#snippet aside()}
		<CrtMonitor />
	{/snippet}
</SplitSection>
