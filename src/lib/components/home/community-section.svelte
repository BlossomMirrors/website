<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { onMount } from 'svelte';
	import UsersRoundIcon from '@lucide/svelte/icons/users-round';
	import { Button } from '$lib/components/ui/button';

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
				Made by people<br />like you.
			</h2>
			<p class="mt-6 text-lg leading-relaxed text-muted-foreground">
				BlossomOS is built in the open by volunteers, designers, and everyday users who got tired of
				the alternatives. No corporation calling the shots. No agenda beyond making something
				genuinely good.
			</p>
			<div class="mt-8 flex flex-wrap gap-3">
				<a href="https://community.blossomos.org" target="_blank" rel="noreferrer">
					<Button variant="primary">Join the community</Button>
				</a>
				<a href="https://git.blossomos.org/Blossom" target="_blank" rel="noreferrer">
					<Button variant="default">Contribute on Blossom Git</Button>
				</a>
			</div>
			{#if onlineCount !== null}
				<p class="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
					<span
						class="mx-2 h-2 w-2 rounded-full bg-green-500 shadow-[0_0_6px_2px_rgba(34,197,94,0.5)]"
					></span>
					{onlineCount.toLocaleString()} people online on Discord right now
				</p>
			{/if}
		</div>

		<div class="grid grid-cols-2 gap-4" use:reveal={120}>
			{#each [{ value: '100+', label: 'Contributors' }, { value: '5k+', label: 'Community members' }, { value: 'Free', label: 'Forever' }, { value: '100%', label: 'Open source' }] as stat, i (stat.label)}
				<div class="rounded-2xl border border-border bg-card p-6" use:reveal={i * 80}>
					<p class="font-serif text-4xl">{stat.value}</p>
					<p class="mt-1 text-sm text-muted-foreground">{stat.label}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
