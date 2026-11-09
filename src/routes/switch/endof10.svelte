<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import NoticePanel from '$lib/components/panels/notice-panel.svelte';
	import TextLink from '$lib/components/elements/text-link.svelte';
	import AlertCircleIcon from '@lucide/svelte/icons/alert-circle';
	import * as m from '$lib/paraglide/messages';
</script>

<NoticePanel
	tone="red"
	icon={AlertCircleIcon}
	eyebrow={m.switch_endof10_badge()}
	title={m.switch_endof10_h2()}
	class="mt-20"
>
	{m.switch_endof10_body()}
	<TextLink href="https://endof10.org">{m.switch_endof10_link()}</TextLink>.

	{#snippet action()}
		<Button href="/downloads" variant="primary">{m.switch_endof10_cta()}</Button>
	{/snippet}
</NoticePanel>
