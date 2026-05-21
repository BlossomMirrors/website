<script>
	import Card from '$lib/components/ui/card/card.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { ArrowRightIcon } from 'lucide-svelte';
</script>

<div class="my-16 flex flex-col items-center justify-center">
	<h1 class="font-serif text-6xl">Creating beyond the limits</h1>
	<p class="mt-8 max-w-prose text-center">
		We are Blossom, dedicated to developing innovative solutions that push the boundaries of what's
		possible.
	</p>
	<p class="my-2 flex gap-4 md:my-8">
		<!-- eslint-disable svelte/no-navigation-without-resolve -->
		<a href="/os">
			<Button variant="primary">
				Get BlossomOS
				<ArrowRightIcon />
			</Button>
		</a>
		<a href="/about">
			<Button>Learn more</Button>
		</a>
	</p>
	<video src="/office.mp4" autoplay loop muted class="h-60 rounded-2xl md:h-125"></video>
</div>

<div class="my-16"></div>

<div class="my-16"></div>
