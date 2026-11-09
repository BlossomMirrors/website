<script lang="ts">
	import ImageOffIcon from '@lucide/svelte/icons/image-off';
	import * as m from '$lib/paraglide/messages';
	import { screenshots } from '$lib/screenshots';
	import Grid from '$lib/components/page/grid.svelte';
	import EmptyState from '$lib/components/elements/empty-state.svelte';
	import ScreenshotThumb from '$lib/components/media/screenshot-thumb.svelte';
	import Lightbox from '$lib/components/media/lightbox.svelte';

	let index = $state<number | null>(null);
</script>

{#if screenshots.length === 0}
	<EmptyState icon={ImageOffIcon} text={m.screenshots_empty()} reveal={120} class="mt-16" />
{:else}
	<Grid cols={3} class="mt-16">
		{#each screenshots as shot, i (shot.name)}
			<ScreenshotThumb {shot} reveal={i * 60} onclick={() => (index = i)} />
		{/each}
	</Grid>
{/if}

<Lightbox images={screenshots} bind:index />
