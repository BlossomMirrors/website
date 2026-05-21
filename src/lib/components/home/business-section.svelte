<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import ShieldCheckIcon from '@lucide/svelte/icons/shield-check';
	import LockIcon from '@lucide/svelte/icons/lock';
	import RocketIcon from '@lucide/svelte/icons/rocket';
	import UsersIcon from '@lucide/svelte/icons/users';
	import * as m from '$lib/paraglide/messages';

	const features = [
		{ img: '/taskbar/libreoffice.png', label: m.business_office() },
		{ img: '/taskbar/thunderbird.png', label: m.business_email() },
		{ Icon: ShieldCheckIcon, label: m.business_security() },
		{ Icon: LockIcon, label: m.business_privacy() },
		{ Icon: RocketIcon, label: m.business_deployment() },
		{ Icon: UsersIcon, label: m.business_support() }
	] as const;
</script>

<section class="py-10 md:py-16">
	<div
		class="relative overflow-hidden rounded-3xl bg-linear-to-br from-amber-500/10 via-orange-500/5 to-transparent p-10 md:p-16"
		use:reveal
	>
		<div
			class="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-amber-500/8 blur-3xl"
		></div>
		<div
			class="pointer-events-none absolute -bottom-12 left-1/3 h-48 w-48 rounded-full bg-orange-400/8 blur-3xl"
		></div>

		<div class="relative grid items-center gap-10 md:grid-cols-2">
			<div>
				<p class="mb-3 text-xs font-semibold tracking-widest text-amber-600 dark:text-amber-400 uppercase">
					{m.business_subheader()}
				</p>
				<h2 class="font-serif text-4xl leading-tight md:text-5xl">
					{m.business_header1()}<br />{m.business_header2()}
				</h2>
				<p class="mt-4 text-lg leading-relaxed text-muted-foreground">
					{m.business_description()}
				</p>
			</div>

			<div class="grid grid-cols-2 gap-3">
				{#each features as f, i (i)}
					<div
						class="flex items-center gap-3 rounded-xl border border-border bg-card/80 px-4 py-4"
						use:reveal={i * 60}
					>
						<div
							class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400"
						>
							{#if 'img' in f}
								<img src={f.img} alt="" class="h-5 w-5 object-contain" />
							{:else}
								<f.Icon size={16} strokeWidth={1.5} />
							{/if}
						</div>
						<p class="text-sm font-medium">{f.label}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
