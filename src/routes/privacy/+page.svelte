<script lang="ts">
	import { m } from "$lib/paraglide/messages";
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
        <p>{m.privacy_updated({ date: "2026-07-13" })}</p>
	</div>
</div>
