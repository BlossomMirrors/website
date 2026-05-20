<script lang="ts">
	let { size = 48, class: className = undefined } = $props();
</script>

<img
	src="/logo.svg"
	alt="Blossom Logo"
	style="width: {size}px; height: {size}px;"
	class={className}
/>
