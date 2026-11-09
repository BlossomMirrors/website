<script lang="ts">
	import { onMount } from 'svelte';
	import { SvelteURLSearchParams } from 'svelte/reactivity';
	import CheckCircleIcon from '@lucide/svelte/icons/check-circle';
	import Toast from '$lib/components/elements/toast.svelte';
	import * as m from '$lib/paraglide/messages';

	let toast = $state<string | null>(null);

	onMount(() => {
		const params = new SvelteURLSearchParams(window.location.search);
		const newsletter = params.get('newsletter');
		if (newsletter === 'confirmed') {
			toast = m.newsletter_confirmed_toast();
			params.delete('newsletter');
			const newUrl = window.location.pathname + (params.size ? `?${params}` : '');
			history.replaceState(null, '', newUrl);
			setTimeout(() => (toast = null), 5000);
		}
	});
</script>

<Toast message={toast} icon={CheckCircleIcon} />
