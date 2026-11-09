<script lang="ts">
	import * as m from '$lib/paraglide/messages';

	let { size = 48, class: className = undefined } = $props();
</script>

<img
	src="/logo.svg"
	alt={m.alt_logo()}
	style="width: {size}px; height: {size}px;"
	class={className}
/>
