<script lang="ts">
	import UsersIcon from '@lucide/svelte/icons/users';
	import * as m from '$lib/paraglide/messages';
	import PageHero from '$lib/components/page/page-hero.svelte';
</script>

<PageHero
	icon={UsersIcon}
	eyebrow={m.community()}
	title={m.community_discover()}
	subtitle={m.community_hero_body()}
	class="max-w-4xl"
/>
