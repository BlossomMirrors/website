<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import * as m from '$lib/paraglide/messages';
	import ShieldCheckIcon from '@lucide/svelte/icons/shield-check';
	import CodeIcon from '@lucide/svelte/icons/code';
	import UnlinkIcon from '@lucide/svelte/icons/unlink';
	import BanknoteIcon from '@lucide/svelte/icons/banknote';

	const cards = $derived([
		{ Icon: ShieldCheckIcon, title: m.switch_sov_gdpr_title(), body: m.switch_sov_gdpr_body() },
		{ Icon: CodeIcon, title: m.switch_sov_audit_title(), body: m.switch_sov_audit_body() },
		{ Icon: UnlinkIcon, title: m.switch_sov_nolock_title(), body: m.switch_sov_nolock_body() },
		{ Icon: BanknoteIcon, title: m.switch_sov_cost_title(), body: m.switch_sov_cost_body() }
	]);
</script>

<section class="py-10 md:py-16">
	<div class="grid items-start gap-10 md:grid-cols-2 md:gap-16">
		<div use:reveal>
			<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">
				{m.switch_sov_subheader()}
			</p>
			<h2 class="font-serif text-5xl leading-tight md:text-6xl">
				{m.switch_sov_h2_1()}<br />{m.switch_sov_h2_2()}
			</h2>
			<p class="mt-6 text-lg leading-relaxed text-muted-foreground">
				{m.switch_sov_body()}
			</p>
		</div>
		<div class="grid gap-4 sm:grid-cols-2">
			{#each cards as card, i (card.title)}
				<div class="rounded-2xl border border-border bg-card p-6" use:reveal={i * 70}>
					<div
						class="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary"
					>
						<card.Icon size={18} strokeWidth={1.5} />
					</div>
					<h3 class="mb-1.5 font-semibold">{card.title}</h3>
					<p class="text-sm leading-relaxed text-muted-foreground">{card.body}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
