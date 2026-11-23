<script lang="ts">
	import CopyIcon from '@lucide/svelte/icons/copy';
	import CheckIcon from '@lucide/svelte/icons/check';
	import ShieldCheckIcon from '@lucide/svelte/icons/shield-check';
	import * as m from '$lib/paraglide/messages';
	import { UseClipboard } from '$lib/hooks/use-clipboard.svelte';
	import { cn } from '$lib/utils';
	import type { DesktopOS, IsoData } from './isos';

	let {
		data,
		os = 'other',
		class: className
	}: { data: IsoData; os?: DesktopOS; class?: string } = $props();

	type Tab = 'blossomos' | 'linux' | 'mac' | 'windows';
	type Platform = { id: Tab; label: string; command?: string };

	const platforms = $derived<Platform[]>([
		// Already on BlossomOS: Dolphin's Properties dialog checks the hash, no terminal needed.
		{ id: 'blossomos', label: 'BlossomOS' },
		{
			id: 'linux',
			label: 'Linux',
			command: `echo "${data.sha256}  ${data.name}" | sha256sum -c`
		},
		{
			id: 'mac',
			label: 'macOS',
			command: `echo "${data.sha256}  ${data.name}" | shasum -a 256 -c`
		},
		{
			id: 'windows',
			label: 'Windows',
			command: `(Get-FileHash .\\${data.name} -Algorithm SHA256).Hash -eq "${data.sha256}"`
		}
	]);

	const defaultTab: Record<DesktopOS, Tab> = {
		windows: 'windows',
		mac: 'mac',
		other: 'blossomos'
	};

	// svelte-ignore state_referenced_locally
	let selected = $state<Tab>(defaultTab[os]);
	const active = $derived(platforms.find((p) => p.id === selected) ?? platforms[0]);
	const resultHint = $derived(
		selected === 'windows' ? m.downloads_verify_result_windows() : m.downloads_verify_result_unix()
	);

	const hashClipboard = new UseClipboard({ delay: 1500 });
	const commandClipboard = new UseClipboard({ delay: 1500 });
</script>

<details class={cn('group text-xs', className)}>
	<summary
		class="flex cursor-pointer list-none items-center gap-1.5 text-muted-foreground hover:text-foreground [&::-webkit-details-marker]:hidden"
	>
		<ShieldCheckIcon class="size-3.5" />
		{m.downloads_verify_summary()}
	</summary>

	<div class="mt-3 flex flex-col gap-3 rounded-xl border border-border bg-muted/30 p-3">
		<div>
			<p class="mb-1 font-medium text-foreground">SHA256</p>
			<button
				type="button"
				class="group/hash flex w-full cursor-pointer items-start gap-2 text-left font-mono break-all text-muted-foreground hover:text-foreground"
				onclick={() => hashClipboard.copy(data.sha256)}
				aria-label={m.downloads_verify_copy_hash()}
			>
				<span class="flex-1">{data.sha256}</span>
				{#if hashClipboard.copied}
					<CheckIcon class="mt-0.5 size-3.5 shrink-0 text-primary" />
				{:else}
					<CopyIcon class="mt-0.5 size-3.5 shrink-0 opacity-60 group-hover/hash:opacity-100" />
				{/if}
			</button>
		</div>

		<div>
			<div class="mb-2 flex flex-wrap gap-1" role="tablist">
				{#each platforms as platform (platform.id)}
					<button
						type="button"
						role="tab"
						aria-selected={selected === platform.id}
						class={cn(
							'cursor-pointer rounded-md px-2 py-1 transition-colors',
							selected === platform.id
								? 'bg-background text-foreground shadow-xs'
								: 'text-muted-foreground hover:text-foreground'
						)}
						onclick={() => (selected = platform.id)}
					>
						{platform.label}
					</button>
				{/each}
			</div>
			{#if active.command}
				{@const command = active.command}
				<p class="mb-2 text-muted-foreground">{m.downloads_verify_intro()}</p>
				<div class="flex items-start gap-2 rounded-lg bg-background p-2.5 font-mono">
					<code class="flex-1 break-all">{command}</code>
					<button
						type="button"
						class="cursor-pointer text-muted-foreground hover:text-foreground"
						onclick={() => commandClipboard.copy(command)}
						aria-label={m.downloads_verify_copy_command()}
					>
						{#if commandClipboard.copied}
							<CheckIcon class="size-3.5 text-primary" />
						{:else}
							<CopyIcon class="size-3.5" />
						{/if}
					</button>
				</div>
				<p class="mt-2 text-muted-foreground">{resultHint}</p>
			{:else}
				<ol
					class="flex list-decimal flex-col gap-1.5 pl-4 text-muted-foreground marker:text-foreground"
				>
					<li>{m.downloads_verify_step_copy()}</li>
					<li>{m.downloads_verify_step_properties()}</li>
					<li>{m.downloads_verify_step_checksums()}</li>
				</ol>
			{/if}
		</div>
	</div>
</details>
