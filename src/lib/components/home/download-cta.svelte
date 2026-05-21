<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { Button } from '$lib/components/ui/button';
	import DownloadIcon from '@lucide/svelte/icons/download';
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
</script>

<section class="my-16 py-10 md:my-32 md:py-16" use:reveal>
	<div class="text-center">
		<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">
			Standing still is not an option
		</p>
		<h2 class="font-serif text-5xl leading-tight md:text-7xl">Ready when you are.</h2>
		<p class="mx-auto mt-6 max-w-md text-lg text-muted-foreground">
			Free, open, and built to last. Try BlossomOS today. It takes less time to install than you'd
			think.
		</p>
		<div class="mt-10 flex flex-wrap items-center justify-center gap-4">
			<a href="/downloads">
				<Button variant="primary" size="lg">
					<DownloadIcon size={18} />
					Download BlossomOS
				</Button>
			</a>
			<a href="https://community.blossomos.org" target="_blank" rel="noreferrer">
				<Button variant="ghost" size="lg">
					Join the community
					<ArrowRightIcon size={16} />
				</Button>
			</a>
		</div>
		<p class="mt-6 text-xs text-muted-foreground">Free forever. No credit card. No catch.</p>
	</div>
</section>
