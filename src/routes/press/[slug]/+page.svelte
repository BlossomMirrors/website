<script lang="ts">
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import CalendarIcon from '@lucide/svelte/icons/calendar';
	import ClockIcon from '@lucide/svelte/icons/clock';
	import UserIcon from '@lucide/svelte/icons/user';
	import { marked } from 'marked';
	import * as m from '$lib/paraglide/messages';
	import { getLocale } from '$lib/paraglide/runtime';
	import { getTitle } from '$lib/utils.js';

	marked.setOptions({ breaks: true });

	const { data } = $props();

	function formatDate(iso: string) {
		return new Date(iso).toLocaleDateString(getLocale(), {
			month: 'long',
			day: 'numeric',
			year: 'numeric',
			timeZone: 'UTC'
		});
	}
</script>

<svelte:head>
	<meta name="description" content={data.description} />
	<meta property="og:description" content={data.description} />
	<meta property="twitter:description" content={data.description} />
	<title>{getTitle(data.title)}</title>
</svelte:head>

<div class="py-16 md:py-24">
	<div class="mx-auto max-w-2xl">
		<!-- Back -->
		<!-- eslint-disable svelte/no-navigation-without-resolve -->
		<a
			href="/press"
			class="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
		>
			<ArrowLeftIcon size={15} />
			{m.press_back()}
		</a>

		<!-- Hero image -->
		{#if data.image}
			<img
				src={data.image}
				alt={data.title}
				class="mb-10 h-64 w-full rounded-2xl object-cover md:h-80"
			/>
		{/if}

		<!-- Meta -->
		<div class="mb-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
			<span class="flex items-center gap-1.5">
				<CalendarIcon size={13} />
				{formatDate(data.date)}
			</span>
			<span class="flex items-center gap-1.5">
				<ClockIcon size={13} />
				{data.readingTime}
				{m.press_min_read()}
			</span>
			<span class="flex items-center gap-1.5">
				<UserIcon size={13} />
				{m.press_by()}
				{data.author}
			</span>
		</div>

		<h1 class="font-serif text-4xl leading-tight md:text-5xl">{data.title}</h1>
		<p class="mt-4 text-lg text-muted-foreground">{data.description}</p>

		<hr class="my-10 border-border" />

		<!-- Body -->
		<div
			class="prose prose-neutral dark:prose-invert max-w-none [&>h2]:font-serif [&>h2]:font-normal [&>p]:leading-relaxed [&>ul]:mt-2"
		>
			<!-- eslint-disable svelte/no-at-html-tags -->
			{@html marked(data.content)}
		</div>
	</div>
</div>
