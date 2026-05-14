<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Modal from '$lib/components/ui/modal';
	import { Input } from '$lib/components/ui/input';
	import logo from '$lib/assets/logo.svg';
	import { Share } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import * as m from '$lib/paraglide/messages';
	import Sha256 from '$lib/components/ui/sha256.svelte';
	import WindowsIcon from '$lib/components/windows-icon.svelte';

	let downloadLink = '';
	let isoDataAmd: { name: string; sha256: string } | null = null;
	let isoDataNvidia: { name: string; sha256: string } | null = null;
	let isMobile = false;
	let isWindows = false;
	let animationPlayed = false;
	let gpuVendor: 'amd' | 'nvidia' | 'unknown' = 'unknown';
	let selectedGPU: 'amd' | 'nvidia' = 'amd';
	let ISOsha256 = '';

	function detectGPU(): 'amd' | 'nvidia' | 'unknown' {
		try {
			const canvas = document.createElement('canvas');
			const gl =
				(canvas.getContext('webgl') as WebGLRenderingContext | null) ||
				(canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);
			if (!gl) return 'unknown';
			const ext = gl.getExtension('WEBGL_debug_renderer_info');
			if (!ext) return 'unknown';
			const renderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) as string;
			if (/nvidia/i.test(renderer)) return 'nvidia';
			if (/amd|radeon|ati/i.test(renderer)) return 'amd';
			return 'unknown';
		} catch {
			return 'unknown';
		}
	}

	function getActiveIsoData() {
		if (selectedGPU) {
			return selectedGPU === 'nvidia' ? isoDataNvidia : isoDataAmd;
		} else {
			return detectGPU() === 'nvidia' ? isoDataNvidia : isoDataAmd;
		}
	}

	function updateDownloadLink() {
		const isoData = getActiveIsoData();
		if (isoData) {
			ISOsha256 = isoData.sha256;
			downloadLink = `https://cdn.blossomos.org/iso/${isoData.name}`;
		}
	}

	function onGPUChange() {
		updateDownloadLink();
	}

	function shareLink() {
		void (
			navigator.share?.({
				title: m.modal_title(),
				text: 'Get BlossomOS from this link:',
				url: downloadLink
			}) || navigator.clipboard.writeText(downloadLink)
		);
	}

	function downloadISO() {
		const isoData = getActiveIsoData();
		if (isoData) {
			location.href = `https://cdn.blossomos.org/iso/${isoData.name}`;
		}
	}

	onMount(() => {
		const mediaQuery = window.matchMedia('(max-width: 768px)');
		isMobile = mediaQuery.matches;

		const handleChange = (e: MediaQueryListEvent) => {
			isMobile = e.matches;
		};

		mediaQuery.addEventListener('change', handleChange);

		// Detect if browser is Windows (temporarily disabled)
		// isWindows = navigator.platform.indexOf('Win') > -1;

		// Check if animation has already been played in this session
		animationPlayed = sessionStorage.getItem('blurfadeAnimationPlayed') === 'true';

		// Detect GPU vendor and auto-select
		gpuVendor = detectGPU();
		if (gpuVendor !== 'unknown') {
			selectedGPU = gpuVendor;
		}

		// Fetch ISO data for both AMD and NVIDIA
		(async () => {
			try {
				const ts = Date.now();
				const [amdRes, nvidiaRes] = await Promise.all([
					fetch(`https://cdn.blossomos.org/iso/isodata.json?${ts}`),
					fetch(`https://cdn.blossomos.org/iso/isodata-nvidia.json?${ts}`)
				]);
				if (amdRes.ok) isoDataAmd = await amdRes.json();
				if (nvidiaRes.ok) isoDataNvidia = await nvidiaRes.json();
				updateDownloadLink();
			} catch (error) {
				console.error('Failed to fetch ISO data:', error);
			}
		})();

		// Set animation as played after the longest animation completes
		if (!animationPlayed) {
			setTimeout(() => {
				sessionStorage.setItem('blurfadeAnimationPlayed', 'true');
				animationPlayed = true;
			}, 2100); // 1.2s animation + 0.9s delay = 2.1s
		}

		return () => mediaQuery.removeEventListener('change', handleChange);
	});
</script>

<a href="https://discord.gg/dTqsBdxvNr" target="_blank" title="Discord">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		fill="currentColor"
		class="bi bi-discord absolute top-8 right-8"
		viewBox="0 0 16 16"
	>
		<path
			d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612"
		/>
	</svg>
</a>
<div class="mx-auto max-w-2xl text-center">
	<div class="mb-8 {animationPlayed ? 'fade-in-played' : 'fade-in'}">
		<img src={logo} alt="BlossomOS Logo" class="mx-auto h-32 w-32" />
	</div>
	<h1
		class="{animationPlayed
			? 'fade-in-played'
			: 'fade-in-delayed'} font-header mb-4 text-4xl font-bold"
	>
		{m.home_title()}
	</h1>
	<p
		class="{animationPlayed
			? 'fade-in-played'
			: 'fade-in-delayed-more'}  mb-8 text-lg text-white/80"
	>
		{m.home_subtitle()}
	</p>
	<div class="{animationPlayed ? 'fade-in-played' : 'fade-in-delayed-more-more'} mt-6">
		{#if isMobile}
			<div class="relative inline-block">
				<Modal.Root>
					<Modal.Trigger>
						<Button size="3xl" data-umami-event="Download ISO">
							{m.home_download()}
						</Button>
					</Modal.Trigger>
					<Modal.Content class="px-8">
						<Modal.Header>
							<Modal.Title class="font-header mt-8 text-2xl text-white"
								>{m.modal_title()}</Modal.Title
							>
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
				<div class="in-development-banner">{m.in_development()}</div>
			</div>
		{:else}
			<div class="relative inline-block">
				<Button href={downloadLink} size="3xl">
					{#if isWindows}
						<WindowsIcon />
						{m.home_download_windows()}
					{:else}
						{m.home_download()}
					{/if}
				</Button>
				<div class="in-development-banner">
					{m.in_development()}
				</div>
			</div>
		{/if}

		<!-- GPU selection radio buttons -->
		<div class="gpu-selector mt-6 flex items-center justify-center gap-6">
			<span class="text-sm text-white/60">{m.gpu_select()}:</span>
			<label class="gpu-label">
				<input
					type="radio"
					name="gpu"
					value="amd"
					bind:group={selectedGPU}
					on:change={onGPUChange}
					class="gpu-radio"
				/>
				<span class:auto-detected={gpuVendor === 'amd'}>{m.gpu_amd()}</span>
			</label>
			<label class="gpu-label">
				<input
					type="radio"
					name="gpu"
					value="nvidia"
					bind:group={selectedGPU}
					on:change={onGPUChange}
					class="gpu-radio"
				/>
				<span class:auto-detected={gpuVendor === 'nvidia'}>{m.gpu_nvidia()}</span>
			</label>
		</div>
	</div>
	<div
		class="{animationPlayed
			? 'fade-in-played'
			: 'fade-in-delayed-more-more'} mt-8 text-sm text-white/60"
	>
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
		<Sha256 sha256={ISOsha256 || ''} />
	</div>
</div>

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

	.fade-in-played {
		opacity: 1;
		filter: blur(0);
	}

	.in-development-banner {
		position: absolute;
		top: -12px;
		right: -20px;
		background-color: #ef4444;
		color: white;
		padding: 4px 12px;
		font-size: 0.75rem;
		font-weight: 600;
		border-radius: 4px;
		transform: rotate(15deg);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		white-space: nowrap;
		z-index: 10;
	}

	.gpu-selector {
		font-size: 0.875rem;
	}

	.gpu-label {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		cursor: pointer;
		color: rgba(255, 255, 255, 0.7);
		transition: color 0.15s;
	}

	.gpu-label:hover {
		color: rgba(255, 255, 255, 0.95);
	}

	.gpu-radio {
		accent-color: #5c64ff;
		width: 1rem;
		height: 1rem;
		cursor: pointer;
	}

	.auto-detected {
		color: #5c64ff;
		font-weight: 600;
	}

	.auto-detected::after {
		content: ' ✓';
		font-size: 0.75rem;
	}
</style>
