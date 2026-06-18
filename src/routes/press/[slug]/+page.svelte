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

	let canonicalUrl = $derived(`https://blossomos.org/press/${data.slug}`);
	let jsonLd = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'BlogPosting',
			headline: data.title,
			description: data.description,
			datePublished: data.date,
			author: { '@type': 'Organization', name: data.author, url: 'https://blossomos.org' },
			publisher: {
				'@type': 'Organization',
				name: 'BlossomOS',
				url: 'https://blossomos.org',
				logo: { '@type': 'ImageObject', url: 'https://blossomos.org/favicon.svg' }
			},
			mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl }
		})
	);

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
	<title>{getTitle(data.title)}</title>
	<meta name="description" content={data.description} />
	<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
	<link rel="canonical" href={canonicalUrl} />

	<meta property="og:type" content="article" />
	<meta property="og:title" content={getTitle(data.title)} />
	<meta property="og:description" content={data.description} />
	{#if data.image}
		<meta property="og:image" content={data.image} />
	{/if}
	<meta property="article:published_time" content={data.date} />
	<meta property="article:author" content={data.author} />
	<meta property="article:section" content="Blog" />

	<meta name="twitter:title" content={getTitle(data.title)} />
	<meta name="twitter:description" content={data.description} />
	{#if data.image}
		<meta name="twitter:image" content={data.image} />
	{/if}

	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${jsonLd}<` + `/script>`}
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
		<div class="mb-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
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
		<p class="mt-5 text-lg leading-relaxed text-muted-foreground">{data.description}</p>

		<hr class="my-12 border-border" />

		<!-- Body -->
		<div
			class="prose max-w-none prose-neutral dark:prose-invert
				prose-h2:mt-12 prose-h2:mb-4 prose-h2:font-serif
				prose-h2:text-3xl prose-h2:leading-tight prose-h2:font-normal prose-h2:text-foreground prose-h3:mt-8 prose-h3:mb-3 prose-h3:font-serif
				prose-h3:text-xl prose-h3:font-normal prose-h3:text-foreground prose-p:text-base prose-p:leading-8 prose-p:text-foreground/85
				prose-a:text-primary prose-a:no-underline
				hover:prose-a:underline prose-strong:font-semibold
				prose-strong:text-foreground prose-ul:my-6 prose-ul:space-y-2
				prose-li:leading-7 prose-li:text-foreground/85
				prose-hr:my-12 prose-hr:border-border"
		>
			<!-- eslint-disable svelte/no-at-html-tags -->
			{@html marked(data.content)}
		</div>
	</div>
</div>
