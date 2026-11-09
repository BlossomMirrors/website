<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import CtaPanel from '$lib/components/panels/cta-panel.svelte';
</script>

<CtaPanel title={m.hub_cta_h2()} body={m.hub_cta_body()} newsletter class="mt-24 md:mt-32" />
