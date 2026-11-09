<script lang="ts">
	import { page } from '$app/state';
	import * as m from '$lib/paraglide/messages';
</script>

<div class="flex min-h-[92vh] flex-1 flex-col items-center justify-center p-4">
	<h1 class="text-center font-serif text-5xl">
		{page.status}:
		{#if page.status === 404}
			{m.error_not_found_title()}
		{:else if page.status === 500}
			{m.error_internal_title()}
		{:else}
			{page.error?.message}
		{/if}
	</h1>
	<p class="my-4 text-center font-sans text-lg">
		{#if page.status === 404}
			{m.error_not_found_body()}
		{:else if page.status === 500}
			{m.error_internal_body()}
		{/if}
	</p>
</div>
