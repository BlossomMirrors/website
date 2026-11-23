<script lang="ts">
	import IconSun from '@tabler/icons-svelte/icons/sun';
	import IconMoon from '@tabler/icons-svelte/icons/moon';

	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';

	let { label = 'Toggle theme' }: { label?: string } = $props();

	function toggle() {
		if (!document.startViewTransition) return toggleMode();
		document.startViewTransition(() => {
			const dark = document.documentElement.classList.toggle('dark');
			document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
			toggleMode();
		});
	}
</script>

<Button onclick={toggle} size="icon">
	<IconSun
		stroke={1.25}
		class="h-5 w-5 scale-100 rotate-0 transition-all! dark:scale-0 dark:-rotate-90"
	/>
	<IconMoon
		stroke={1.25}
		class="absolute h-5 w-5 scale-0 rotate-90 transition-all! dark:scale-100 dark:rotate-0"
	/>
	<span class="sr-only">{label}</span>
</Button>
