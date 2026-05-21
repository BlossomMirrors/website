<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { Button } from '$lib/components/ui/button';
	import { onMount } from 'svelte';
	import * as m from '$lib/paraglide/messages';

	type Props = {
		button1Text: string;
		button2Text: string;
		button1Href?: string;
		button2Href?: string;
		title1: string;
		title2?: string;
		body: string;
		discord?: boolean;
	};

	let onlineCount: number | null = $state(null);

	let props: Props = $props();

	onMount(() => {
		if (props.discord) {
			fetch('https://discord.com/api/invites/dTqsBdxvNr?with_counts=true')
				.then((r) => r.json())
				.then((d) => {
					onlineCount = d.approximate_presence_count ?? null;
				})
				.catch(() => {});
		}
	});
</script>

<div
	class="relative mt-24 overflow-hidden rounded-3xl bg-linear-to-br from-primary/10 via-primary/5 to-transparent p-10 md:mt-32 md:p-16"
	use:reveal
>
	<div
		class="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-primary/8 blur-3xl"
	></div>
	<div class="relative max-w-2xl">
		<h2 class="font-serif text-4xl leading-tight md:text-5xl">
			{props.title1}<br />
			{props.title2 && props.title2}
		</h2>
		<p class="mt-5 text-lg leading-relaxed text-muted-foreground">
			{props.body}
		</p>
		{#if props.discord}
			<p class="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
				<span class="relative flex size-2">
					<span
						class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"
					></span>
					<span class="relative inline-flex size-2 rounded-full bg-green-500"></span>
				</span>
				{onlineCount?.toLocaleString()}
				{m.discord_online()}
			</p>
		{/if}
		<div class="mt-8 flex flex-wrap gap-3">
			<!-- eslint-disable svelte/no-navigation-without-resolve -->
			<a
				href={props.button1Href ?? '/about'}
				target={props.button1Href?.startsWith('http') && props.button1Href.includes('://')
					? '_blank'
					: undefined}
			>
				<Button variant="primary">{props.button1Text}</Button>
			</a>
			<a
				href={props.button2Href ?? 'https://git.blossomos.org/Blossom'}
				target={props.button2Href?.startsWith('http') && props.button2Href.includes('://')
					? '_blank'
					: undefined}
				rel="noreferrer"
			>
				<Button>{props.button2Text}</Button>
			</a>
		</div>
	</div>
</div>
