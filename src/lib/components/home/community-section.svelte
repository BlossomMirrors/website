<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import CtaArea from '$lib/components/ui/cta-area.svelte';
</script>

<CtaArea
	discord={true}
	title1={m.community_people1()}
	title2={m.community_people2()}
	body={m.community_description()}
	button1Text={m.community_join()}
	button2Text={m.contribute_cta()}
	button1Href="https://community.blossomos.org"
	button2Href="https://dev.blossomos.org/Blossom"
/>
