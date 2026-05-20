<script lang="ts">
	import Taskbar from '$lib/components/hero/taskbar.svelte';
	import * as m from '$lib/paraglide/messages';
</script>

<div class="mb-8">
	<div
		style="background: url('/noise.png') center center / cover no-repeat;"
		class="cursor-custom relative mb-4 aspect-video overflow-hidden rounded-2xl"
	>
		<Taskbar />
	</div>
	<h1 class="font-serif text-8xl">BlossomOS</h1>
	<p>{m.home_subtitle()}</p>
</div>
