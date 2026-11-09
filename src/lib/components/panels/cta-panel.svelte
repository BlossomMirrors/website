<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import * as m from '$lib/paraglide/messages';
	import GlowPanel from './glow-panel.svelte';
	import Heading, { type HeadingText } from '$lib/components/typography/heading.svelte';
	import Lead from '$lib/components/typography/lead.svelte';
	import LiveDot from '$lib/components/elements/live-dot.svelte';
	import NewsletterForm from '$lib/components/forms/newsletter-form.svelte';

	let {
		title,
		body,
		discord = false,
		newsletter = false,
		class: className,
		actions
	}: {
		title: HeadingText;
		body: string;
		discord?: boolean;
		newsletter?: boolean;
		class?: string;
		actions?: Snippet;
	} = $props();

	let onlineCount: number | null = $state(null);

	onMount(() => {
		if (!discord) return;
		fetch('https://discord.com/api/invites/dTqsBdxvNr?with_counts=true')
			.then((r) => r.json())
			.then((d) => {
				onlineCount = d.approximate_presence_count ?? null;
			})
			.catch(() => {});
	});
</script>

<GlowPanel class={className}>
	<div class="max-w-2xl">
		<Heading size="md" text={title} />
		<Lead class="mt-5">{body}</Lead>
		{#if discord}
			<p class="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
				<LiveDot />
				{onlineCount?.toLocaleString()}
				{m.discord_online()}
			</p>
		{/if}
		{#if newsletter}
			<div class="mt-8 max-w-sm">
				<p class="mb-2 text-sm font-medium text-muted-foreground">{m.newsletter_label()}</p>
				<NewsletterForm />
			</div>
		{/if}
		{#if actions}
			<div class="mt-8 flex flex-wrap gap-3">
				{@render actions()}
			</div>
		{/if}
	</div>
</GlowPanel>
