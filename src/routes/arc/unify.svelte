<script lang="ts">
	import SplitSection from '$lib/components/page/split-section.svelte';
	import IconList from '$lib/components/cards/icon-list.svelte';
	import Card from '$lib/components/cards/card.svelte';
	import ChipList from '$lib/components/elements/chip-list.svelte';
	import TerminalSnippet from '$lib/components/elements/terminal-snippet.svelte';
	import PackageIcon from '@lucide/svelte/icons/package';
	import LayersIcon from '@lucide/svelte/icons/layers';
	import ZapIcon from '@lucide/svelte/icons/zap';
	import ShieldCheckIcon from '@lucide/svelte/icons/shield-check';
	import * as m from '$lib/paraglide/messages';

	const formats = ['Flatpak', 'AppImage', '.deb', '.rpm', 'Arch Linux'].map((label) => ({
		label,
		icon: PackageIcon
	}));

	const features = [
		{ icon: LayersIcon, title: m.arc_unify_feature1_title(), body: m.arc_unify_feature1_body() },
		{ icon: ZapIcon, title: m.arc_header2(), body: m.arc_unify_feature2_body() },
		{
			icon: ShieldCheckIcon,
			title: m.arc_unify_feature3_title(),
			body: m.arc_unify_feature3_body()
		}
	];
</script>

<SplitSection
	size="md"
	eyebrow={m.arc_unify_subheader()}
	title={[m.arc_unify_h2_1(), m.arc_unify_h2_2()]}
	body={m.arc_unify_body()}
>
	<IconList items={features} delay={100} class="mt-8" />

	{#snippet aside()}
		<Card class="p-8">
			<ChipList items={formats} label={m.arc_unify_formats_label()} pillClass="bg-background" />
			<TerminalSnippet
				comment={m.arc_unify_terminal_comment()}
				command="sudo apt install libsomething-dev && chmod +x App.AppImage && ./App.AppImage"
				result={m.arc_unify_terminal_cta()}
				class="mt-6"
			/>
		</Card>
	{/snippet}
</SplitSection>
