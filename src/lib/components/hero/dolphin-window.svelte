<script lang="ts">
	import Window from './window.svelte';
	import SvgIcon from './svg-icon.svelte';
	import dolphinPng from '$lib/assets/taskbar/dolphin.png';
	import ToolbarButton from './toolbar-button.svelte';
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
	import LayoutGridIcon from '@lucide/svelte/icons/layout-grid';
	import SearchIcon from '@lucide/svelte/icons/search';
	import MoreHorizontalIcon from '@lucide/svelte/icons/more-horizontal';
	import MonitorIcon from '@lucide/svelte/icons/monitor';
	import HomeIcon from '@lucide/svelte/icons/house';
	import FileTextIcon from '@lucide/svelte/icons/file-text';
	import DownloadIcon from '@lucide/svelte/icons/download';
	import MusicIcon from '@lucide/svelte/icons/music';
	import ImageIcon from '@lucide/svelte/icons/image';
	import VideoIcon from '@lucide/svelte/icons/video';
	import Trash2Icon from '@lucide/svelte/icons/trash-2';
	import NetworkIcon from '@lucide/svelte/icons/network';
	import ClockIcon from '@lucide/svelte/icons/clock';
	import MapPinIcon from '@lucide/svelte/icons/map-pin';
	import HardDriveIcon from '@lucide/svelte/icons/hard-drive';
	import { ArrowLeftIcon, ArrowRightIcon } from '@lucide/svelte';
	import * as m from '$lib/paraglide/messages';
	import { SvelteMap, SvelteSet } from 'svelte/reactivity';

	import desktopColor from '$lib/assets/icons/places/color/desktop.svg?raw';
	import documentsColor from '$lib/assets/icons/places/color/documents.svg?raw';
	import downloadsColor from '$lib/assets/icons/places/color/downloads.svg?raw';
	import musicColor from '$lib/assets/icons/places/color/music.svg?raw';
	import picturesColor from '$lib/assets/icons/places/color/pictures.svg?raw';
	import videosColor from '$lib/assets/icons/places/color/videos.svg?raw';
	import publicColor from '$lib/assets/icons/places/color/public.svg?raw';
	import templatesColor from '$lib/assets/icons/places/color/templates.svg?raw';
	import genericColor from '$lib/assets/icons/places/color/generic.svg?raw';
	import cloudColor from '$lib/assets/icons/places/color/cloud.svg?raw';

	let { onClose, onFocus, zIndex }: { onClose: () => void; onFocus?: () => void; zIndex?: number } =
		$props();

	let selectedFiles = $state<Set<string>>(new Set());
	let containerEl = $state<HTMLElement | null>(null);
	let band = $state<{ x0: number; y0: number; x1: number; y1: number } | null>(null);

	const fileEls = new SvelteMap<string, HTMLButtonElement>();
	let dragStartX = 0;
	let dragStartY = 0;
	let isDragging = false;

	function registerFile(el: HTMLButtonElement, id: string) {
		fileEls.set(id, el);
		return {
			destroy() {
				fileEls.delete(id);
			}
		};
	}

	function gridDown(e: PointerEvent) {
		if (e.button !== 0) return;
		if ((e.target as HTMLElement).closest('button[data-file]')) return;

		const rect = containerEl!.getBoundingClientRect();
		dragStartX = e.clientX - rect.left;
		dragStartY = e.clientY - rect.top;
		isDragging = false;
		band = null;
		selectedFiles = new Set();
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
		e.preventDefault();
	}

	function gridMove(e: PointerEvent) {
		if (!(e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId)) return;
		const rect = containerEl!.getBoundingClientRect();
		const cx = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
		const cy = Math.min(Math.max(e.clientY - rect.top, 0), rect.height);

		if (!isDragging) {
			if (Math.abs(cx - dragStartX) < 4 && Math.abs(cy - dragStartY) < 4) return;
			isDragging = true;
		}

		const b = {
			x0: Math.min(dragStartX, cx),
			y0: Math.min(dragStartY, cy),
			x1: Math.max(dragStartX, cx),
			y1: Math.max(dragStartY, cy)
		};
		band = b;

		const bandLeft = rect.left + b.x0;
		const bandTop = rect.top + b.y0;
		const bandRight = rect.left + b.x1;
		const bandBottom = rect.top + b.y1;

		const next = new SvelteSet<string>();
		for (const [id, el] of fileEls) {
			const er = el.getBoundingClientRect();
			if (
				er.left < bandRight &&
				er.right > bandLeft &&
				er.top < bandBottom &&
				er.bottom > bandTop
			) {
				next.add(id);
			}
		}
		selectedFiles = next;
	}

	function gridUp() {
		isDragging = false;
		band = null;
	}

	const places = $derived([
		{ id: 'home', label: m.dolphin_home(), icon: HomeIcon },
		{ id: 'desktop', label: m.dolphin_desktop(), icon: MonitorIcon },
		{ id: 'documents', label: m.dolphin_documents(), icon: FileTextIcon },
		{ id: 'downloads', label: m.dolphin_downloads(), icon: DownloadIcon },
		{ id: 'music', label: m.dolphin_music(), icon: MusicIcon },
		{ id: 'pictures', label: m.dolphin_pictures(), icon: ImageIcon },
		{ id: 'videos', label: m.dolphin_videos(), icon: VideoIcon },
		{ id: 'trash', label: m.dolphin_trash(), icon: Trash2Icon }
	]);
	const remote = $derived([{ id: 'network', label: m.dolphin_network(), icon: NetworkIcon }]);
	const recent = $derived([
		{ id: 'recent-files', label: m.dolphin_recent_files(), icon: ClockIcon },
		{ id: 'recent-locations', label: m.dolphin_recent_locations(), icon: MapPinIcon }
	]);
	const devices = $derived([
		{ id: 'blossomos', label: 'BlossomOS', icon: HardDriveIcon },
		{ id: 'backups', label: m.dolphin_backups(), icon: HardDriveIcon }
	]);

	const files = $derived([
		{ id: 'desktop', name: m.dolphin_desktop(), svg: desktopColor },
		{ id: 'documents', name: m.dolphin_documents(), svg: documentsColor },
		{ id: 'downloads', name: m.dolphin_downloads(), svg: downloadsColor },
		{ id: 'music', name: m.dolphin_music(), svg: musicColor },
		{ id: 'pictures', name: m.dolphin_pictures(), svg: picturesColor },
		{ id: 'videos', name: m.dolphin_videos(), svg: videosColor },
		{ id: 'public', name: m.dolphin_public(), svg: publicColor },
		{ id: 'templates', name: m.dolphin_templates(), svg: templatesColor },
		{ id: 'projects', name: m.dolphin_projects(), svg: genericColor },
		{ id: 'cloud', name: 'Blossom Cloud', svg: cloudColor }
	]);
</script>

<Window
	title={`${m.dolphin_home()} — Dolphin`}
	icon={dolphinPng}
	{onClose}
	{onFocus}
	{zIndex}
	minW={620}
	minH={400}
	defaultW={740}
	defaultH={536}
	offsetX={80}
	offsetY={-20}
	bgClass="bg-background"
>
	<!-- Toolbar -->
	<div class="flex shrink-0 select-none" style="height:38px">
		<div class="flex shrink-0 items-center justify-start gap-1 pr-2 pl-4 sm:w-52">
			<ToolbarButton size="sm" muted>
				<ArrowLeftIcon size={15} />
			</ToolbarButton>
			<ToolbarButton size="sm" muted class="opacity-40">
				<ArrowRightIcon size={15} />
			</ToolbarButton>
			<div
				class="flex h-7 items-center gap-0.5 rounded px-1.5 text-muted-foreground hover:bg-foreground/10"
			>
				<LayoutGridIcon size={13} />
				<ChevronDownIcon size={11} />
			</div>
		</div>
		<!-- Address bar — aligns with file view card -->
		<div class="flex flex-1 items-center gap-1 px-2 sm:pr-2 sm:pl-3">
			<div
				class="flex flex-1 items-center rounded-md border border-foreground/6 px-1.5 py-2 text-sm"
			>
				<ChevronRightIcon size={16} class="mr-1 shrink-0 text-foreground" />
				<span class="text-xs font-semibold text-foreground">{m.dolphin_home()}</span>
			</div>
			<div class="flex items-center gap-0.5">
				<ToolbarButton size="sm" muted>
					<SearchIcon size={14} />
				</ToolbarButton>
				<ToolbarButton size="sm" muted>
					<MoreHorizontalIcon size={14} />
				</ToolbarButton>
			</div>
		</div>
	</div>

	<!-- Main content -->
	<div class="flex min-h-0 flex-1">
		<!-- Sidebar -->
		<div class="hidden w-52 shrink-0 overflow-y-auto py-2 pr-2 pl-4 sm:block">
			<p
				class="mb-1 px-1 text-[10px] font-semibold tracking-widest text-muted-foreground/70 uppercase"
			>
				{m.dolphin_places()}
			</p>
			{#each places as p (p.id)}
				<button
					class="my-1.5 flex w-full cursor-default items-center gap-1.5 rounded-sidebar-item px-2 py-1 text-left text-xs {p.id ===
					'home'
						? 'bg-accent/30 font-semibold text-accent'
						: 'text-foreground/70'}"
				>
					<p.icon size={16} class="shrink-0" />
					<span class="truncate">{p.label}</span>
				</button>
			{/each}

			<p
				class="mt-3 mb-1 px-1 text-[10px] font-semibold tracking-widest text-muted-foreground/70 uppercase"
			>
				{m.dolphin_remote()}
			</p>
			{#each remote as r (r.id)}
				<button
					class="flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-xs text-foreground/70"
				>
					<r.icon size={14} class="shrink-0" />
					<span class="truncate">{r.label}</span>
				</button>
			{/each}

			<p
				class="mt-3 mb-1 px-1 text-[10px] font-semibold tracking-widest text-muted-foreground/70 uppercase"
			>
				{m.dolphin_recent()}
			</p>
			{#each recent as r (r.id)}
				<button
					class="flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-xs text-foreground/70"
				>
					<r.icon size={14} class="shrink-0" />
					<span class="truncate">{r.label}</span>
				</button>
			{/each}

			<p
				class="mt-3 mb-1 px-1 text-[10px] font-semibold tracking-widest text-muted-foreground/70 uppercase"
			>
				{m.dolphin_devices()}
			</p>
			{#each devices as d (d.id)}
				<button
					class="flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-xs text-foreground/70"
				>
					<d.icon size={14} class="shrink-0" />
					<span class="truncate">{d.label}</span>
				</button>
			{/each}
		</div>

		<!-- File grid -->
		<div class="flex-1 overflow-y-auto p-3">
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				bind:this={containerEl}
				class="relative h-full rounded-md border border-border bg-card p-3"
				onpointerdown={gridDown}
				onpointermove={gridMove}
				onpointerup={gridUp}
			>
				<div class="grid grid-cols-3 gap-4 select-none sm:grid-cols-4">
					{#each files as file (file.id)}
						<button
							data-file={file.id}
							use:registerFile={file.id}
							class="flex cursor-default flex-col items-center gap-2 rounded-lg p-3 text-center transition-colors {selectedFiles.has(
								file.id
							)
								? 'bg-primary/12 ring-1 ring-primary/40'
								: 'hover:bg-foreground/6'}"
							onclick={() => (selectedFiles = new Set([file.id]))}
						>
							<SvgIcon svg={file.svg} size={56} class="shrink-0" />
							<span class="line-clamp-2 w-full text-xs leading-tight text-foreground"
								>{file.name}</span
							>
						</button>
					{/each}
				</div>

				<!-- Rubber band selection -->
				{#if band}
					<div
						class="pointer-events-none absolute rounded-lg border border-primary/50 bg-primary/10"
						style="left:{band.x0}px;top:{band.y0}px;width:{band.x1 - band.x0}px;height:{band.y1 -
							band.y0}px"
					></div>
				{/if}
			</div>
		</div>
	</div>
</Window>
