<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { marked } from 'marked';

	marked.setOptions({ breaks: true });

	const sections = [
		{ h2: m.privacy_controller_h2(), body: m.privacy_controller_body() },
		{ h2: m.privacy_hosting_h2(), body: m.privacy_hosting_body() },
		{ h2: m.privacy_cdn_h2(), body: m.privacy_cdn_body() },
		{ h2: m.privacy_cloud_h2(), body: m.privacy_cloud_body() },
		{ h2: m.privacy_sso_h2(), body: m.privacy_sso_body() },
		{ h2: m.privacy_matrix_h2(), body: m.privacy_matrix_body() },
		{ h2: m.privacy_forums_h2(), body: m.privacy_forums_body() },
		{ h2: m.privacy_analytics_h2(), body: m.privacy_analytics_body() },
		{ h2: m.privacy_cookies_h2(), body: m.privacy_cookies_body() },
		{ h2: m.privacy_rights_h2(), body: m.privacy_rights_body() },
		{ h2: m.privacy_contact_h2(), body: m.privacy_contact_body() },
		{ h2: m.privacy_changes_h2(), body: m.privacy_changes_body() }
	];
</script>

<svelte:head>
	<title>Privacy Policy - Blossom</title>
</svelte:head>

<div class="py-16 md:py-24">
	<div class="mx-auto max-w-2xl">
		<div>
			<p class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">
				{m.privacy_tagline()}
			</p>
			<h1 class="font-serif text-5xl leading-tight md:text-7xl">{m.privacy_h1()}</h1>
			<p class="mt-4 text-sm text-muted-foreground">{m.privacy_updated()}</p>
			<p class="mt-6 text-lg leading-relaxed text-muted-foreground">{m.privacy_intro()}</p>
		</div>

		<div class="mt-16 flex flex-col gap-10">
			{#each sections as s (s.h2)}
				<div>
					<h2 class="mb-3 font-semibold">{s.h2}</h2>
					<div
						class="prose-sm prose-neutral dark:prose-invert prose max-w-none text-muted-foreground [&>p]:leading-relaxed [&>ul]:mt-2"
					>
						<!-- eslint-disable svelte/no-at-html-tags -->
						{@html marked(s.body)}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
