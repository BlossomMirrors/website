<script lang="ts">
	import Taskbar from '$lib/components/hero/taskbar.svelte';
	import WallpaperReveal from '$lib/components/hero/wallpaper-reveal.svelte';
	import * as m from '$lib/paraglide/messages';
</script>

<div class="mb-8">
	<div
		style="background: url('/noise.png') center center / cover no-repeat;"
		class="cursor-custom relative aspect-video overflow-hidden rounded-2xl"
	>
		<div class="pointer-events-none absolute inset-0 bg-white/50 dark:hidden"></div>
		<WallpaperReveal />
		<Taskbar />
	</div>

	<div class="my-4 grid grid-cols-2 items-center gap-12">
		<div>
			<h1 class="font-serif text-8xl">BlossomOS</h1>
			<p class="mt-2 text-muted-foreground">{m.home_subtitle()}</p>
		</div>
	</div>
</div>

<style>
	.cursor-custom {
		cursor:
			url('/cursor/left_ptr.svg') 0 0,
			auto;
	}
</style>
