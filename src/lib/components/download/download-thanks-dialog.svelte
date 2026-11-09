<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import HeartIcon from '@lucide/svelte/icons/heart';
	import { DiscordIcon } from '$lib/components/icons/discord/index.svelte';
	import NewsletterForm from '$lib/components/forms/newsletter-form.svelte';
	import * as m from '$lib/paraglide/messages';

	let { open = $bindable(false) }: { open?: boolean } = $props();
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="gap-0 overflow-hidden p-0 sm:max-w-md" hideClose={false}>
		<div
			class="relative overflow-hidden bg-linear-to-br from-primary/15 via-primary/5 to-transparent px-8 pt-8 pb-6"
		>
			<div
				class="pointer-events-none absolute -top-10 -right-10 size-36 rounded-full bg-primary/15 blur-2xl"
			></div>
			<div
				class="pointer-events-none absolute bottom-0 left-1/3 size-20 rounded-full bg-primary/10 blur-xl"
			></div>
			<div class="relative">
				<h2 class="mt-4 font-serif text-3xl leading-tight">{m.download_dialog_title()}</h2>
			</div>
		</div>

		<div class="px-8 py-5">
			<p class="text-sm leading-relaxed text-muted-foreground">{m.download_dialog_body()}</p>
		</div>

		<div class="grid grid-cols-2 gap-3 px-6">
			<a
				href="https://liberapay.com/blossomos"
				target="_blank"
				rel="noreferrer"
				class="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-xs font-medium transition-colors hover:bg-muted"
			>
				<HeartIcon size={16} class="text-secondary-500" strokeWidth={0} fill="currentColor" />
				{m.donate_nav()}
			</a>
			<a
				href="https://discord.gg/dTqsBdxvNr"
				target="_blank"
				rel="noreferrer"
				class="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-xs font-medium transition-colors hover:bg-muted"
			>
				<DiscordIcon size={16} />
				{m.download_dialog_community()}
			</a>
		</div>

		<div class="px-6 pt-4 pb-6">
			<p class="mb-2 text-xs font-medium text-muted-foreground">{m.newsletter_label()}</p>
			<NewsletterForm />
		</div>
	</Dialog.Content>
</Dialog.Root>
