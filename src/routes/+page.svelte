<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Modal from '$lib/components/ui/modal';
	import { Input } from '$lib/components/ui/input';
	import logo from '$lib/assets/logo.svg';
	import { Grid2x2, Share } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import * as m from '$lib/paraglide/messages';
	import Sha256 from '$lib/components/ui/sha256.svelte';
	import WindowsIcon from '$lib/components/windows-icon.svelte';

	let downloadLink = '';
	let isoData: { name: string; sha256: string } | null = null;
	let isMobile = false;
	let isWindows = false;

	function shareLink() {
		navigator.share?.({
			title: m.modal_title(),
			text: 'Get BlossomOS from this link:',
			url: downloadLink
		}) || navigator.clipboard.writeText(downloadLink);
	}

	function downloadISO() {
		location.href = `https://cdn.blossomos.org/iso/${isoData.name}`;
	}

	onMount(() => {
		const mediaQuery = window.matchMedia('(max-width: 768px)');
		isMobile = mediaQuery.matches;

		const handleChange = (e: MediaQueryListEvent) => {
			isMobile = e.matches;
		};

		mediaQuery.addEventListener('change', handleChange);

		// Detect if browser is Windows
		isWindows = navigator.platform.indexOf('Win') > -1;

		// Fetch ISO data
		(async () => {
			try {
				const response = await fetch('https://cdn.blossomos.org/iso/isodata.json');
				isoData = await response.json();
				if (isoData) {
					if (isWindows) {
						downloadLink = 'https://cdn.blossomos.org/iso/preptool.exe';
					} else {
						downloadLink = `https://cdn.blossomos.org/iso/${isoData.name}`;
					}
				}
			} catch (error) {
				console.error('Failed to fetch ISO data:', error);
			}
		})();

		return () => mediaQuery.removeEventListener('change', handleChange);
	});
</script>

<div class="mx-auto max-w-2xl text-center">
	<div class="mb-8 fade-in">
		<img src={logo} alt="BlossomOS Logo" class="mx-auto h-32 w-32" />
	</div>
	<h1 class="fade-in-delayed mb-4 font-serif text-4xl font-bold">{m.home_title()}</h1>
	<!--<p class="text-lg text-white/80 mb-6 fade-in-delayed-more">
        {m.home_subtitle()}
    </p>-->
	<div class="fade-in-delayed-more-more mt-6">
		{#if isMobile}
			<Modal.Root>
				<Modal.Trigger>
					<Button size="3xl">
						{m.home_download()}
					</Button>
				</Modal.Trigger>
				<Modal.Content class="px-8">
					<Modal.Header>
						<Modal.Title class="mt-8 font-serif text-2xl text-white">{m.modal_title()}</Modal.Title>
						<Modal.Description>
							{m.modal_subtitle()}
						</Modal.Description>
					</Modal.Header>
					<div class="flex flex-col gap-4 py-4">
						<div class="flex gap-2">
							<Input value={downloadLink} readonly />
							<Button onclick={shareLink}>
								<Share class="h-4 w-4" />
							</Button>
						</div>
					</div>
				</Modal.Content>
			</Modal.Root>
		{:else}
			<Button href={downloadLink} size="3xl">
				{#if isWindows}
					<WindowsIcon />
				{/if}
				{m.home_download_windows()}
			</Button>
		{/if}
	</div>
	<div class="fade-in-delayed-more-more mt-8 text-sm text-white/60">
		{#if isWindows}
			<div class="-mt-6">
				<button
					on:click={downloadISO}
					id="sha256"
					class="cursor-pointer border-none bg-none p-0 hover:underline"
					aria-label="Want the ISO file instead?"
				>
					{m.iso_instead()}
				</button>
			</div>
			<br />
		{/if}
		<div class="flex items-center justify-center gap-8">
			<span>{m.home_version()}</span>
			<!-- <a href="/release-notes" class="underline hover:text-white/80">{m.home_release_notes()}</a> -->
		</div>
		{#if !isWindows}
			<Sha256 sha256={isoData?.sha256 || ''} />
		{/if}
	</div>
</div>

<!-- svelte-ignore css_unused_selector -->
<style>
	@keyframes fadeInBlur {
		from {
			opacity: 0;
			filter: blur(10px);
		}
		to {
			opacity: 1;
			filter: blur(0);
		}
	}

	.fade-in {
		animation: fadeInBlur 1.2s ease-out forwards;
		opacity: 0;
	}

	.fade-in-delayed {
		animation: fadeInBlur 1.2s ease-out forwards;
		animation-delay: 0.3s;
		opacity: 0;
	}

	.fade-in-delayed-more {
		animation: fadeInBlur 1.2s ease-out forwards;
		animation-delay: 0.6s;
		opacity: 0;
	}

	.fade-in-delayed-more-more {
		animation: fadeInBlur 1.2s ease-out forwards;
		animation-delay: 0.9s;
		opacity: 0;
	}
</style>
