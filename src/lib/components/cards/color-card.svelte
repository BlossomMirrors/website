<script lang="ts">
	import { reveal as revealAction } from '$lib/actions/reveal';

	let {
		label,
		color,
		reveal = false
	}: { label: string; color: string; reveal?: number | false } = $props();
</script>

<div
	class="flex min-h-20 items-center justify-center rounded-2xl p-6 md:rounded-3xl md:p-10"
	style:background-color={color}
	use:revealAction={reveal}
>
	<p class="font-serif text-xl leading-snug text-white md:text-2xl">{label}</p>
</div>
