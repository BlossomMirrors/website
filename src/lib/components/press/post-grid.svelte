<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import CalendarIcon from '@lucide/svelte/icons/calendar';
	import ClockIcon from '@lucide/svelte/icons/clock';
	import * as m from '$lib/paraglide/messages';
	import { getLocale } from '$lib/paraglide/runtime';
	import type { PostMeta } from '$lib/press';

	let { posts }: { posts: PostMeta[] } = $props();

	function formatDate(iso: string) {
		return new Date(iso).toLocaleDateString(getLocale(), {
			month: 'long',
			day: 'numeric',
			year: 'numeric',
			timeZone: 'UTC'
		});
	}
</script>

{#if posts.length > 0}
	<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each posts as post, i (post.slug)}
			<!-- eslint-disable svelte/no-navigation-without-resolve -->
			<a
				href="/press/{post.slug}"
				class="group overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/40"
				use:reveal={i * 60}
			>
				{#if post.image}
					<div class="overflow-hidden">
						<img
							src={post.image}
							alt={post.title}
							class="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
						/>
					</div>
				{/if}
				<div class="p-6">
					<div class="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
						<span class="flex items-center gap-1.5">
							<CalendarIcon size={12} />
							{formatDate(post.date)}
						</span>
						<span class="flex items-center gap-1.5">
							<ClockIcon size={12} />
							{post.readingTime}
							{m.press_min_read()}
						</span>
					</div>
					<h2 class="mb-2 leading-snug font-semibold">{post.title}</h2>
					<p class="text-sm leading-relaxed text-muted-foreground">{post.description}</p>
					<p class="mt-4 text-sm font-medium text-primary">{m.press_read_more()} →</p>
				</div>
			</a>
		{/each}
	</div>
{:else}
	<p class="text-muted-foreground" use:reveal>{m.press_no_posts()}</p>
{/if}
