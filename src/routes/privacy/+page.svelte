<script lang="ts">
	import { getLocale } from "$lib/paraglide/runtime";
	import PrivacyDe from "../../content/privacy/de.md";
	import PrivacyEn from "../../content/privacy/en.md";

	const language = getLocale();
</script>

<div class="py-16 md:py-24">
	<div class="mx-auto max-w-2xl typeset">
        {#if language === "de"}
            <PrivacyDe />
        {:else}
            <PrivacyEn />
        {/if}
	</div>
</div>
