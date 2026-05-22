<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
	import { getLocale } from '$lib/paraglide/runtime';
	import * as m from '$lib/paraglide/messages';

	type Interview = {
		title: string;
		outlet: string;
		date: string;
		href: string;
	};

	/*const interviews: Interview[] = [
		{
			title: 'BlossomOS wants to make Linux actually usable',
			outlet: 'Linux Weekly News',
			date: '2026-02-10',
			href: 'https://lwn.net'
		},
		{
			title: 'Interview: Building a user-friendly Linux distro from scratch',
			outlet: "It's FOSS",
			date: '2026-01-28',
			href: 'https://itsfoss.com'
		},
		{
			title: 'BlossomOS Alpha 1 reviewed',
			outlet: 'OMG! Ubuntu',
			date: '2026-01-20',
			href: 'https://omgubuntu.co.uk'
		}
		];*/
	const interviews: Interview[] = [];

	function formatDate(iso: string) {
		return new Date(iso).toLocaleDateString(getLocale(), {
			month: 'long',
			day: 'numeric',
			year: 'numeric',
			timeZone: 'UTC'
		});
	}
</script>

{#if interviews.length !== 0}
	<div class="divide-y divide-border rounded-2xl border border-border bg-card" use:reveal>
		{#each interviews as item (item.href)}
			<!-- eslint-disable svelte/no-navigation-without-resolve -->
			<a
				href={item.href}
				target="_blank"
				rel="noreferrer"
				class="flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-muted/40"
			>
				<div>
					<p class="font-medium">{item.title}</p>
					<p class="mt-0.5 text-sm text-muted-foreground">
						{item.outlet} · {formatDate(item.date)}
					</p>
				</div>
				<ExternalLinkIcon size={15} class="shrink-0 text-muted-foreground" />
			</a>
		{/each}
	</div>
{:else}
	<p>{m.press_no_interviews()}</p>
{/if}
