<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { Button } from '$lib/components/ui/button';
	import CtaPanel from '$lib/components/panels/cta-panel.svelte';
</script>

<CtaPanel
	discord
	title={[m.community_people1(), m.community_people2()]}
	body={m.community_description()}
	class="mt-24 md:mt-32"
>
	{#snippet actions()}
		<Button href="https://discord.gg/dTqsBdxvNr" variant="primary">{m.community_join()}</Button>
		<Button href="https://dev.blossomos.org/Blossom">{m.contribute_cta()}</Button>
	{/snippet}
</CtaPanel>
