<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import CloudIcon from '@lucide/svelte/icons/cloud';
	import FolderSyncIcon from '@lucide/svelte/icons/folder-sync';
	import VideoIcon from '@lucide/svelte/icons/video';
	import ShieldIcon from '@lucide/svelte/icons/shield';
	import SettingsIcon from '@lucide/svelte/icons/settings';

	const features = [
		{ Icon: FolderSyncIcon, label: 'File sync', done: true },
		{ Icon: VideoIcon, label: 'Video calls', done: true },
		{ Icon: ShieldIcon, label: 'EU data centers', done: true },
		{ Icon: SettingsIcon, label: 'Settings sync', done: false }
	];
</script>

<section class="mt-48 mb-32">
	<div
		class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-10 md:p-16"
		use:reveal
	>
		<div
			class="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-primary/8 blur-3xl"
		></div>
		<div
			class="pointer-events-none absolute -bottom-12 left-1/3 h-48 w-48 rounded-full bg-secondary-400/10 blur-3xl"
		></div>

		<div class="relative grid items-center gap-10 md:grid-cols-2">
			<div>
				<div
					class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary"
				>
					<CloudIcon size={24} strokeWidth={1.5} />
				</div>
				<h2 class="font-serif text-4xl leading-tight md:text-5xl">Blossom Cloud</h2>
				<p class="mt-4 text-lg leading-relaxed text-muted-foreground">
					Sync your files, collaborate on documents, and jump on a video call. All on EU-based
					servers with strong encryption. A reinstall shouldn't be a big deal.
				</p>
			</div>

			<div class="grid grid-cols-2 gap-3">
				{#each features as f, i}
					<div
						class="flex items-center gap-3 rounded-xl border border-border bg-card/80 px-4 py-4"
						use:reveal={i * 60}
					>
						<div
							class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg {f.done
								? 'bg-primary/10 text-primary'
								: 'bg-muted text-muted-foreground'}"
						>
							<f.Icon size={16} strokeWidth={1.5} />
						</div>
						<div>
							<p class="text-sm font-medium">{f.label}</p>
							{#if !f.done}
								<p class="text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
									Soon
								</p>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
