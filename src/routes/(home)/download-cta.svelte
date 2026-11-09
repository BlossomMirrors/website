<script lang="ts">
	import AnimatedButton from '$lib/components/elements/animated-button.svelte';
	import Section from '$lib/components/page/section.svelte';
	import * as m from '$lib/paraglide/messages';
</script>

<Section
	eyebrow={m.cta_subheader()}
	title={m.cta_header()}
	body={m.cta_description()}
	footnote={m.cta_footer()}
	size="xl"
	align="center"
	class="my-16 py-10 md:my-32 md:py-16"
>
	{#snippet actions()}
		<AnimatedButton href="/downloads" variant="primary" size="lg" icon="download" iconSize={18}>
			{m.cta_download()}
		</AnimatedButton>
		<AnimatedButton href="https://discord.gg/dTqsBdxvNr" variant="ghost" size="lg">
			{m.cta_join_community()}
		</AnimatedButton>
	{/snippet}
</Section>
