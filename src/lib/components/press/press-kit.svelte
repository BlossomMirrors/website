<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import DownloadIcon from '@lucide/svelte/icons/download';
	import MailIcon from '@lucide/svelte/icons/mail';
	import * as m from '$lib/paraglide/messages';
	import Button from '$lib/components/ui/button/button.svelte';
	import { getEmail } from '$lib/utils';

	const items = $derived([
		{ label: m.press_kit_logos(), file: '/press/logos.zip' },
		{ label: m.press_kit_screenshots(), file: '/press/screenshots.zip' },
		{ label: m.press_kit_brand(), file: '/press/brand-guidelines.pdf' }
	]);
</script>

<div class="grid gap-6 md:grid-cols-2" use:reveal>
	<div class="rounded-2xl border border-border bg-card p-8">
		<p class="mb-6 text-muted-foreground">{m.press_kit_description()}</p>
		<div class="flex flex-col gap-3">
			{#each items as item (item.label)}
				<!-- eslint-disable svelte/no-navigation-without-resolve -->
				<a
					href={item.file}
					download
					class="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm transition-colors hover:border-primary/40 hover:bg-primary/5"
				>
					<span>{item.label}</span>
					<DownloadIcon size={15} class="text-muted-foreground" />
				</a>
			{/each}
		</div>
	</div>

	<div class="flex flex-col justify-between rounded-2xl border border-border bg-card p-8">
		<div>
			<p class="mb-2 font-semibold">{m.press_contact()}</p>
			<p class="text-sm text-muted-foreground">{m.press_contact_description()}</p>
		</div>
		<div class="mt-6">
			<!-- eslint-disable svelte/no-navigation-without-resolve -->
			<a href={`mailto:${getEmail()}`}>
				<Button variant="ghost">
					<MailIcon size={15} class="mr-2" />
					{getEmail()}
				</Button>
			</a>
		</div>
	</div>
</div>
