<script lang="ts">
	import * as m from '$lib/paraglide/messages';

	let { class: className = '' }: { class?: string } = $props();

	let email = $state('');
	let status = $state<'idle' | 'loading' | 'success' | 'error'>('idle');

	async function submit(e: SubmitEvent) {
		e.preventDefault();
		if (status === 'loading' || status === 'success') return;
		status = 'loading';
		try {
			const res = await fetch('/api/newsletter', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email })
			});
			status = res.ok ? 'success' : 'error';
		} catch {
			status = 'error';
		}
	}
</script>

<div class={className}>
	{#if status === 'success'}
		<p class="text-sm text-primary">{m.newsletter_success()}</p>
	{:else}
		<form onsubmit={submit} class="flex gap-2">
			<input
				type="email"
				bind:value={email}
				placeholder={m.newsletter_placeholder()}
				required
				disabled={status === 'loading'}
				class="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
			/>
			<button
				type="submit"
				disabled={status === 'loading'}
				class="shrink-0 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
			>
				{status === 'loading' ? '...' : m.newsletter_submit()}
			</button>
		</form>
		{#if status === 'error'}
			<p class="mt-1.5 text-xs text-destructive">{m.newsletter_error()}</p>
		{/if}
	{/if}
</div>
