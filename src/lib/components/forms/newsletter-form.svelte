<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import posthog from 'posthog-js';

	let {
		class: className = '',
		layout = 'inline',
		label
	}: {
		class?: string;
		/** `stacked` puts the input above a full-width button, for narrow sidebars. */
		layout?: 'inline' | 'stacked';
		/** Visible label above the input; omitted by default. */
		label?: string;
	} = $props();

	const inputId = $props.id();

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
			if (res.ok) {
				status = 'success';
				posthog.capture('newsletter_subscribed');
			} else {
				status = 'error';
			}
		} catch {
			status = 'error';
		}
	}
</script>

<div class={className}>
	{#if status === 'success'}
		<p class="text-sm text-primary">{m.newsletter_success()}</p>
	{:else}
		<form onsubmit={submit} class={layout === 'stacked' ? 'flex flex-col gap-2' : 'flex gap-2'}>
			{#if label}
				<label for={inputId} class="text-sm font-medium">{label}</label>
			{/if}
			<Input
				id={inputId}
				type="email"
				bind:value={email}
				placeholder={m.newsletter_placeholder()}
				required
				disabled={status === 'loading'}
			/>
			<Button
				disabled={status === 'loading'}
				variant="primary"
				class={layout === 'stacked' ? 'self-start' : ''}
			>
				{status === 'loading' ? '...' : m.newsletter_submit()}
			</Button>
		</form>
		{#if status === 'error'}
			<p class="mt-1.5 text-xs text-destructive">{m.newsletter_error()}</p>
		{/if}
	{/if}
</div>
