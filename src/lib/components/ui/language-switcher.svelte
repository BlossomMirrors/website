<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';
	import * as Select from '$lib/components/ui/select/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
	import { locales, getLocale, setLocale } from '$lib/paraglide/runtime';

	import enFlag from '$lib/assets/flags/en.svg?raw';
	import deFlag from '$lib/assets/flags/de.svg?raw';

	const flags: Record<string, string> = { en: enFlag, de: deFlag };
	const labels: Record<string, string> = { en: 'English', de: 'Deutsch' };

	let current = $state(getLocale());
</script>

<Select.Root
	type="single"
	value={current}
	onValueChange={(v) => {
		if (v) {
			current = v;
			setLocale(v as never);
		}
	}}
>
	<SelectPrimitive.Trigger class={buttonVariants({ variant: 'default' })}>
		<span class="size-5 shrink-0 overflow-hidden rounded-sm [&>svg]:h-full [&>svg]:w-full" aria-hidden="true">
			{@html flags[current]}
		</span>
		<span class="sr-only">{labels[current]}</span>
		<ChevronDownIcon class="text-muted-foreground ml-auto size-4 pointer-events-none" />
	</SelectPrimitive.Trigger>
	<Select.Content>
		{#each locales as locale (locale)}
			<Select.Item value={locale} label={labels[locale]}>
				<span class="size-5 shrink-0 overflow-hidden rounded-sm [&>svg]:h-full [&>svg]:w-full" aria-hidden="true">
					{@html flags[locale]}
				</span>
				{labels[locale]}
			</Select.Item>
		{/each}
	</Select.Content>
</Select.Root>
