<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as m from '$lib/paraglide/messages';
	import Section from '$lib/components/page/section.svelte';
</script>

<Section align="center" size="md" title={m.cloud_cta_h2()} body={m.cloud_cta_body()}>
	{#snippet actions()}
		<Button href="https://auth.blossomos.org" variant="primary">{m.cloud_create_account()}</Button>
	{/snippet}
</Section>
