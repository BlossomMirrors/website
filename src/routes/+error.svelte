<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="flex min-h-[92vh] flex-1 flex-col items-center justify-center p-4">
	<h1 class="text-center font-serif text-5xl">{page.status} – {page.error?.message}</h1>
	<p class="my-4 text-center font-sans text-lg">
		{#if page.status === 404}
			The page you are looking for does not exist.
		{/if}
		{#if page.status === 500}
			An internal server error occurred.
		{/if}
	</p>
</div>
