<script lang="ts">
	import { onMount } from 'svelte';
	import SplitSection from '$lib/components/page/split-section.svelte';
	import AnimatedButton from '$lib/components/elements/animated-button.svelte';
	import Note from '$lib/components/typography/note.svelte';
	import ArcStoreWindow from '$lib/components/desktop/arc-store-window.svelte';
	import * as m from '$lib/paraglide/messages';

	let { learnMore = true }: { learnMore?: boolean } = $props();

	let isLinux = $state(false);

	onMount(() => {
		isLinux = /Linux/.test(navigator.userAgent) && !/Android/.test(navigator.userAgent);
	});
</script>

{#snippet learnMoreAction()}
	<AnimatedButton href="/arc" variant="primary">{m.learn_more()}</AnimatedButton>
{/snippet}

<SplitSection
	class="mt-0 py-24 md:py-36"
	splitClass="gap-12 md:gap-16"
	eyebrow="Arc Software"
	title={[`${m.arc_header1()}.`, `${m.arc_header2()}.`]}
	body={m.arc_description()}
	actions={learnMore ? learnMoreAction : undefined}
>
	{#if isLinux}
		<Note class="mt-4 text-primary">{m.arc_linux()}</Note>
	{/if}

	{#snippet aside()}
		<ArcStoreWindow {isLinux} />
	{/snippet}
</SplitSection>
