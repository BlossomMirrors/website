<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { onMount } from 'svelte';
	import UsersRoundIcon from '@lucide/svelte/icons/users-round';
	import { Button } from '$lib/components/ui/button';
	import * as m from '$lib/paraglide/messages';
	import Stats from '$lib/components/community/stats.svelte';

	let onlineCount = $state<number | null>(null);

	onMount(() => {
		fetch('https://discord.com/api/invites/dTqsBdxvNr?with_counts=true')
			.then((r) => r.json())
			.then((d) => {
				onlineCount = d.approximate_presence_count ?? null;
			})
			.catch(() => {});
	});
</script>

<section class="my-16 py-10 md:my-32 md:py-16">
	<div class="grid items-center gap-12 md:grid-cols-2 md:gap-20">
		<div use:reveal>
			<div
				class="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"
			>
				<UsersRoundIcon size={24} strokeWidth={1.5} />
			</div>
			<h2 class="font-serif text-5xl leading-tight md:text-6xl">
				{m.community_people1()}<br />
				{m.community_people2()}
			</h2>
			<p class="mt-6 text-lg leading-relaxed text-muted-foreground">
				{m.community_description()}
			</p>
			<div class="mt-8 flex flex-wrap gap-3">
				<a href="https://community.blossomos.org" target="_blank" rel="noreferrer">
					<Button variant="primary">{m.community_join()}</Button>
				</a>
				<a href="https://git.blossomos.org/Blossom" target="_blank" rel="noreferrer">
					<Button variant="default">{m.contribute_cta()}</Button>
				</a>
			</div>
			{#if onlineCount !== null}
				<p class="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
					<span class="relative flex size-2">
						<span
							class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"
						></span>
						<span class="relative inline-flex size-2 rounded-full bg-green-500"></span>
					</span>
					{onlineCount.toLocaleString()}
					{m.discord_online()}
				</p>
			{/if}
		</div>

		<Stats />
	</div>
</section>
