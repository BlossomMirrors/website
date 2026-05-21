<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { Button } from '$lib/components/ui/button';
	import CloudIcon from '@lucide/svelte/icons/cloud';
	import FolderSyncIcon from '@lucide/svelte/icons/folder-sync';
	import VideoIcon from '@lucide/svelte/icons/video';
	import ShieldIcon from '@lucide/svelte/icons/shield';
	import SettingsIcon from '@lucide/svelte/icons/settings';
	import LockIcon from '@lucide/svelte/icons/lock';
	import ServerIcon from '@lucide/svelte/icons/server';
	import EyeOffIcon from '@lucide/svelte/icons/eye-off';
	import * as m from '$lib/paraglide/messages';

	const features = [
		{ Icon: FolderSyncIcon, title: m.cloud_feature_file_sync_title(), body: m.cloud_file_sync_body(), done: true },
		{ Icon: VideoIcon, title: m.cloud_feature_video_title(), body: m.cloud_video_body(), done: true },
		{ Icon: ServerIcon, title: m.cloud_feature_eu_title(), body: m.cloud_eu_body(), done: true },
		{ Icon: SettingsIcon, title: m.cloud_feature_settings_title(), body: m.cloud_settings_body(), done: false }
	];

	const privacy = [
		{ Icon: LockIcon, label: m.cloud_privacy_e2e() },
		{ Icon: EyeOffIcon, label: m.cloud_privacy_zero_knowledge() },
		{ Icon: ShieldIcon, label: m.cloud_privacy_gdpr() },
		{ Icon: ServerIcon, label: m.cloud_privacy_eu_hosted() }
	];
</script>

<svelte:head>
	<title>Blossom Cloud - Blossom</title>
</svelte:head>

<div class="py-16 md:py-24">
	<!-- Hero -->
	<div class="mx-auto max-w-3xl text-center" use:reveal>
		<div
			class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary"
		>
			<CloudIcon size={32} strokeWidth={1.5} />
		</div>
		<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">Blossom Cloud</p>
		<h1 class="font-serif text-5xl leading-tight md:text-7xl">
			{m.cloud_page_h1_1()}<br />{m.cloud_page_h1_2()}
		</h1>
		<p class="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
			{m.cloud_page_subtitle()}
		</p>
		<div class="mt-8 flex justify-center gap-3">
			<a href="https://auth.blossomos.org" target="_blank" rel="noreferrer">
				<Button variant="primary">{m.cloud_get_started()}</Button>
			</a>
			<!-- eslint-disable svelte/no-navigation-without-resolve -->
			<a href="/os">
				<Button>{m.cloud_get_blossomos()}</Button>
			</a>
		</div>
	</div>

	<!-- Features -->
	<div class="mt-24">
		<div class="mb-14" use:reveal>
			<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">{m.cloud_features_subheader()}</p>
			<h2 class="font-serif text-5xl leading-tight md:text-6xl">{m.cloud_features_h2()}</h2>
		</div>

		<div class="grid gap-6 sm:grid-cols-2">
			{#each features as f, i (f.title)}
				<div
					class="rounded-2xl border border-border bg-card p-8"
					use:reveal={i * 80}
				>
					<div
						class="mb-5 flex h-10 w-10 items-center justify-center rounded-xl {f.done
							? 'bg-primary/10 text-primary'
							: 'bg-muted text-muted-foreground'}"
					>
						<f.Icon size={20} strokeWidth={1.5} />
					</div>
					<div class="flex items-center gap-2">
						<h3 class="font-semibold">{f.title}</h3>
						{#if !f.done}
							<span
								class="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold tracking-wide text-muted-foreground uppercase"
							>{m.coming_soon()}</span>
						{/if}
					</div>
					<p class="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- Privacy section -->
	<div
		class="relative mt-24 overflow-hidden rounded-3xl bg-linear-to-br from-primary/10 via-primary/5 to-transparent p-10 md:p-16"
		use:reveal
	>
		<div
			class="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-primary/8 blur-3xl"
		></div>
		<div
			class="pointer-events-none absolute -bottom-12 left-1/4 h-48 w-48 rounded-full bg-primary/5 blur-3xl"
		></div>

		<div class="relative grid items-center gap-12 md:grid-cols-2">
			<div>
				<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">
					{m.cloud_privacy_subheader()}
				</p>
				<h2 class="font-serif text-4xl leading-tight md:text-5xl">
					{m.cloud_privacy_h2_1()}<br />{m.cloud_privacy_h2_2()}
				</h2>
				<p class="mt-6 text-lg leading-relaxed text-muted-foreground">
					{m.cloud_privacy_body1()}
				</p>
				<p class="mt-4 text-lg leading-relaxed text-muted-foreground">
					{m.cloud_privacy_body2()}
				</p>
			</div>

			<div class="grid grid-cols-2 gap-3">
				{#each privacy as p, i (p.label)}
					<div
						class="flex items-center gap-3 rounded-xl border border-border bg-card/80 px-4 py-4"
						use:reveal={i * 60}
					>
						<div
							class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
						>
							<p.Icon size={16} strokeWidth={1.5} />
						</div>
						<p class="text-sm font-medium">{p.label}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- CTA -->
	<div class="mt-24 text-center" use:reveal>
		<h2 class="font-serif text-4xl leading-tight md:text-5xl">{m.cloud_cta_h2()}</h2>
		<p class="mt-4 text-lg text-muted-foreground">
			{m.cloud_cta_body()}
		</p>
		<div class="mt-8 flex justify-center gap-3">
			<a href="https://auth.blossomos.org" target="_blank" rel="noreferrer">
				<Button variant="primary">{m.cloud_create_account()}</Button>
			</a>
		</div>
	</div>
</div>
