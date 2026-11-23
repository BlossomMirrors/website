<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
	import DownloadIcon from '@lucide/svelte/icons/download';
	import UsbIcon from '@lucide/svelte/icons/usb';
	import ArrowRightLeftIcon from '@lucide/svelte/icons/arrow-right-left';
	import posthog from 'posthog-js';
	import * as m from '$lib/paraglide/messages';
	import { getLocale } from '$lib/paraglide/runtime';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import Badge from '$lib/components/elements/badge.svelte';
	import SmartLink from '$lib/components/elements/smart-link.svelte';
	import TextLink from '$lib/components/elements/text-link.svelte';
	import WindowsIcon from '$lib/components/icons/windows.svelte';
	import { AppleIcon } from '$lib/components/icons/apple/index.svelte';
	import NewsletterForm from '$lib/components/forms/newsletter-form.svelte';
	import Checksum from '$lib/components/download/checksum.svelte';
	import DownloadThanksDialog from '$lib/components/download/download-thanks-dialog.svelte';
	import { cn } from '$lib/utils';
	import { useVersion } from '$lib/hooks/use-version.svelte';
	import {
		CHANGELOG_URL,
		CODENAME,
		INSTALL_GUIDE_URL,
		OFFLINE_ISOS,
		ONLINE_ISO,
		SWITCH_CDN,
		detectGPU,
		fetchIso,
		isoUrl,
		maybePlayNovideo,
		type DesktopOS,
		type IsoData
	} from '$lib/components/download/isos';

	let { os }: { os: DesktopOS } = $props();

	const version = useVersion();
	const ISOS = [ONLINE_ISO, ...OFFLINE_ISOS];

	let isoData = $state<Record<string, IsoData | null>>({});
	let loading = $state(true);
	let gpu = $state<'nvidia' | 'other'>('other');
	let selectedLabel = $state(ONLINE_ISO.label);
	let thanksOpen = $state(false);

	const selectedIso = $derived(ISOS.find((v) => v.label === selectedLabel) ?? ONLINE_ISO);
	const selectedData = $derived(isoData[selectedIso.file] ?? null);

	onMount(() => {
		gpu = detectGPU();
		Promise.all(ISOS.map((v) => fetchIso(v.file).then((d) => [v.file, d] as const))).then(
			(entries) => {
				isoData = Object.fromEntries(entries);
				loading = false;
			}
		);
	});

	/** The version is a release date like "2026.08.05"; show it as a localized date. */
	const releaseDate = $derived.by(() => {
		const match = version.current.match(/^(\d{4})\.(\d{2})\.(\d{2})/);
		if (!match) return '';
		const date = new Date(Date.UTC(+match[1], +match[2] - 1, +match[3]));
		return new Intl.DateTimeFormat(getLocale(), { dateStyle: 'long', timeZone: 'UTC' }).format(
			date
		);
	});

	function track(variant: string) {
		posthog.capture('download_started', {
			iso_variant: variant,
			version: version.current || null,
			detected_gpu: gpu,
			detected_os: os
		});
		thanksOpen = true;
	}

	// Windows and macOS visitors are recommended Switch, everyone else the online ISO.
	const switchRecommended = $derived(os !== 'other');
	const sections = $derived(switchRecommended ? ['switch', 'iso'] : ['iso', 'switch']);

	// Recommended card gets the registry's primary-500 tint (same hue as the primary button). It is
	// a flat gradient layered over the opaque card colour so the bird behind the cards stays hidden.
	function cardClass(recommended: boolean) {
		return cn(
			'rounded-2xl border bg-card p-6 shadow-sm',
			recommended
				? 'border-primary-500/40 bg-linear-to-b from-primary-500/10 to-primary-500/10'
				: 'border-border'
		);
	}

	const SWITCH_BUILDS = [
		{ os: 'windows', label: 'Windows', href: `${SWITCH_CDN}/blossomos-switch.exe` },
		{ os: 'mac', label: 'macOS', href: `${SWITCH_CDN}/blossomos-switch.zip` }
	] as const;
	// Put the visitor's own platform first.
	const switchBuilds = $derived(
		[...SWITCH_BUILDS].sort((a, b) => Number(b.os === os) - Number(a.os === os))
	);
</script>

<audio id="novideo" src="/novideo.mp3"></audio>
<DownloadThanksDialog bind:open={thanksOpen} />

<div
	class="relative grid items-start gap-x-10 gap-y-8 lg:grid-cols-[minmax(0,36rem)_minmax(0,1fr)_20rem] xl:gap-x-14"
>
	<!-- Decorative bird, 806px wide (80% of the 1008x792 original). The upper wing is centred in the
	     gap between the download cards and the newsletter card: its centre of mass is at x=210 in the
	     original (168px displayed). The top wing pixel at y=48 (38px displayed) is level with the top
	     of the cards. -->
	<div class="relative hidden self-stretch lg:col-start-2 lg:row-start-2 lg:block">
		<img
			src="/bird.png"
			alt=""
			width="1008"
			height="792"
			class="pointer-events-none absolute top-0 left-1/2 z-0 w-[806px] max-w-none -translate-x-[168px] -translate-y-[38px] select-none"
		/>
	</div>

	<!-- Title -->
	<div class="w-full max-w-xl lg:col-start-1 lg:row-start-1">
		<h1 class="relative z-10 font-serif text-4xl md:text-5xl">
			<span class="sr-only">BlossomOS </span>{CODENAME}
		</h1>
		<div class="relative z-10 mt-2 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
			{#if releaseDate}
				<p class="text-muted-foreground">{releaseDate}</p>
			{:else}
				<div class="loading-glare h-5 w-36 rounded bg-muted"></div>
			{/if}
			<SmartLink
				href={CHANGELOG_URL}
				class="inline-flex -translate-y-10 items-center gap-1 text-primary underline-offset-4 hover:underline"
			>
				{m.downloads_changelog()}
				<ArrowRightIcon class="size-4" />
			</SmartLink>
		</div>
	</div>

	<!-- Downloads; shares a row with the newsletter so both cards start at the same height -->
	<div class="w-full max-w-xl lg:col-start-1 lg:row-start-2">
		<div class="relative z-10 flex flex-col gap-4">
			{#each sections as section (section)}
				{#if section === 'switch'}
					{@render switchSection()}
				{:else}
					{@render isoSection()}
				{/if}
			{/each}
		</div>

		<p class="mt-8 text-sm text-muted-foreground">
			{m.downloads_install_note()}
			<TextLink href={INSTALL_GUIDE_URL} tone="primary">{m.downloads_install_link()}</TextLink>
		</p>
	</div>

	<!-- Newsletter -->
	<aside
		class="relative z-10 rounded-2xl border border-border bg-card p-6 shadow-sm lg:col-start-3 lg:row-start-2"
	>
		<h2 class="font-serif text-2xl">{m.newsletter_label()}</h2>
		<p class="mt-2 text-sm leading-relaxed text-muted-foreground">
			{m.downloads_newsletter_body()}
		</p>
		<NewsletterForm layout="stacked" label={m.newsletter_email_label()} class="mt-5" />
	</aside>
</div>

{#snippet windowsIcon()}
	<span class="inline-flex size-4 [&_svg]:size-full [&_svg]:fill-current"><WindowsIcon /></span>
{/snippet}

{#snippet appleIcon()}
	<AppleIcon size={16} />
{/snippet}

{#snippet header(icon: Snippet, title: string, recommended: boolean, aside?: Snippet)}
	<div class="mb-2.5 flex items-center justify-between gap-4">
		<div class="flex items-center gap-2 font-medium">
			{@render icon()}
			{title}
			{#if recommended}
				<Badge>{m.recommended()}</Badge>
			{/if}
		</div>
		{@render aside?.()}
	</div>
{/snippet}

{#snippet switchIcon()}
	<ArrowRightLeftIcon class="size-4" />
{/snippet}

{#snippet switchLink()}
	<TextLink
		href="/switch"
		tone="primary"
		class="inline-flex items-center gap-0.5 text-sm no-underline hover:underline"
	>
		{m.learn_more()}
		<ChevronRightIcon class="size-4" />
	</TextLink>
{/snippet}

{#snippet switchSection()}
	<section class={cardClass(switchRecommended)}>
		{@render header(switchIcon, 'BlossomOS Switch', switchRecommended, switchLink)}
		<div class="flex flex-wrap gap-2">
			{#each switchBuilds as build (build.os)}
				<Button
					href={build.href}
					target="_self"
					download
					variant={os === build.os ? 'primary' : 'default'}
					onclick={() => track(`Switch ${build.label}`)}
					data-umami-event="download"
					data-umami-event-label={`Switch ${build.label}`}
				>
					{#if build.os === 'windows'}
						{@render windowsIcon()}
					{:else}
						{@render appleIcon()}
					{/if}
					{build.label}
				</Button>
			{/each}
		</div>
		<p class="mt-2 text-xs leading-relaxed text-muted-foreground">{m.downloads_switch_desc()}</p>
	</section>
{/snippet}

{#snippet isoIcon()}
	<UsbIcon class="size-4" />
{/snippet}

{#snippet isoPicker()}
	<Select.Root type="single" bind:value={selectedLabel}>
		<Select.Trigger aria-label={m.downloads_iso_pick()}>{selectedIso.name()}</Select.Trigger>
		<Select.Content>
			<Select.Group>
				<Select.GroupHeading>{m.iso_group_online()}</Select.GroupHeading>
				<Select.Item value={ONLINE_ISO.label} label={ONLINE_ISO.name()} />
			</Select.Group>
			<Select.Separator />
			<Select.Group>
				<Select.GroupHeading>{m.iso_group_offline()}</Select.GroupHeading>
				{#each OFFLINE_ISOS as iso (iso.label)}
					<Select.Item value={iso.label} label={iso.name()} />
				{/each}
			</Select.Group>
		</Select.Content>
	</Select.Root>
{/snippet}

{#snippet isoSection()}
	<section class={cardClass(os === 'other')}>
		{@render header(isoIcon, m.downloads_iso_title(), os === 'other', isoPicker)}
		{#if loading}
			<div class="loading-glare h-11 w-44 rounded-[var(--radius-button)] bg-muted"></div>
		{:else if !selectedData}
			<Button disabled>{m.iso_unavailable()}</Button>
		{:else}
			<Button
				href={isoUrl(selectedData)}
				target="_self"
				download
				class="self-start"
				onclick={(e) => {
					maybePlayNovideo(e, selectedIso.label);
					track(selectedIso.label);
				}}
				data-umami-event="download"
				data-umami-event-label={selectedIso.label}
			>
				<DownloadIcon />
				{m.downloads_download_now()}
			</Button>
		{/if}
		<p class="mt-2 text-xs leading-relaxed text-muted-foreground">
			{selectedIso.description()}
		</p>
		{#if selectedData}
			<Checksum data={selectedData} {os} class="mt-3" />
		{/if}
	</section>
{/snippet}
