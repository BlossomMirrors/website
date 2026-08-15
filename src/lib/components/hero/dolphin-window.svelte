<script lang="ts">
	import Window from './window.svelte';
	import SidebarItem from './sidebar-item.svelte';
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
	import HardDriveIcon from '@lucide/svelte/icons/hard-drive';
	import { ArrowLeftIcon, ArrowRightIcon, BookOpen, Film } from '@lucide/svelte';
	import * as m from '$lib/paraglide/messages';

	import {
		DesktopPlaceIcon,
		DocumentsPlaceIcon,
		DownloadsPlaceIcon,
		MusicPlaceIcon,
		PicturesPlaceIcon,
		VideosPlaceIcon,
		PublicPlaceIcon,
		TemplatesPlaceIcon,
		GenericPlaceIcon,
		CloudPlaceIcon
	} from '$lib/components/icons/place';

	const places = $derived([
		{ id: 'home', label: m.dolphin_home(), icon: HomeIcon },
		{ id: 'desktop', label: m.dolphin_desktop(), icon: MonitorIcon },
		{ id: 'documents', label: m.dolphin_documents(), icon: BookOpen },
		{ id: 'downloads', label: m.downloads(), icon: DownloadIcon },
		{ id: 'music', label: m.dolphin_music(), icon: MusicIcon },
		{ id: 'pictures', label: m.dolphin_pictures(), icon: ImageIcon },
		{ id: 'videos', label: m.dolphin_videos(), icon: Film },
		{ id: 'trash', label: m.dolphin_trash(), icon: Trash2Icon }
	]);
	const remote = $derived([{ id: 'network', label: m.dolphin_network(), icon: NetworkIcon }]);
	const devices = $derived([
		{ id: 'blossomos', label: 'BlossomOS', icon: HardDriveIcon },
		{ id: 'backups', label: m.dolphin_backups(), icon: HardDriveIcon }
	]);

	const files = $derived([
		{ id: 'desktop', name: m.dolphin_desktop(), icon: DesktopPlaceIcon },
		{ id: 'documents', name: m.dolphin_documents(), icon: DocumentsPlaceIcon },
		{ id: 'downloads', name: m.downloads(), icon: DownloadsPlaceIcon },
		{ id: 'music', name: m.dolphin_music(), icon: MusicPlaceIcon },
		{ id: 'pictures', name: m.dolphin_pictures(), icon: PicturesPlaceIcon },
		{ id: 'videos', name: m.dolphin_videos(), icon: VideosPlaceIcon },
		{ id: 'public', name: m.dolphin_public(), icon: PublicPlaceIcon },
		{ id: 'templates', name: m.dolphin_templates(), icon: TemplatesPlaceIcon },
		{ id: 'projects', name: m.dolphin_projects(), icon: GenericPlaceIcon },
		{ id: 'cloud', name: 'Blossom Cloud', icon: CloudPlaceIcon }
	]);
</script>

<Window title={`${m.dolphin_home()} — Dolphin`} icon={dolphinPng} bgClass="bg-background">
	<!-- Toolbar -->
	<div class="flex h-9.5 shrink-0 select-none">
		<div class="flex shrink-0 items-center justify-start gap-1 pr-2 pl-4 sm:w-42">
			<ToolbarButton muted>
				<ArrowLeftIcon size={15} />
			</ToolbarButton>
			<ToolbarButton muted class="opacity-40">
				<ArrowRightIcon size={15} />
			</ToolbarButton>
			<ToolbarButton muted>
				<LayoutGridIcon size={13} />
				<ChevronDownIcon size={11} />
			</ToolbarButton>
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
				<ToolbarButton muted>
					<SearchIcon size={14} />
				</ToolbarButton>
				<ToolbarButton muted>
					<MoreHorizontalIcon size={14} />
				</ToolbarButton>
			</div>
		</div>
	</div>

	<!-- Main content -->
	<div class="flex min-h-0 flex-1">
		<!-- Sidebar -->
		<div class="hidden w-42 shrink-0 overflow-y-auto py-2 pr-2 pl-4 sm:block">
			<p class="mb-1 px-1 text-[10px] font-semibold tracking-widest text-muted-foreground/70">
				{m.dolphin_places()}
			</p>
			{#each places as p (p.id)}
				<SidebarItem icon={p.icon} label={p.label} active={p.id === 'home'} />
			{/each}

			<p class="mt-3 mb-1 px-1 text-[10px] font-semibold tracking-widest text-muted-foreground/70">
				{m.dolphin_remote()}
			</p>
			{#each remote as r (r.id)}
				<SidebarItem icon={r.icon} label={r.label} />
			{/each}

			<p class="mt-3 mb-1 px-1 text-[10px] font-semibold tracking-widest text-muted-foreground/70">
				{m.dolphin_devices()}
			</p>
			{#each devices as d (d.id)}
				<SidebarItem icon={d.icon} label={d.label} />
			{/each}
		</div>

		<!-- File grid -->
		<div class="flex-1 overflow-y-auto p-3">
			<div class="relative h-full rounded-[5px] border border-border bg-card p-3">
				<div class="grid grid-cols-3 gap-4 select-none sm:grid-cols-4">
					{#each files as file (file.id)}
						<div
							data-file={file.id}
							class="flex cursor-default flex-col items-center gap-2 rounded-lg p-3 text-center"
						>
							<file.icon size={75} class="shrink-0" />
							<span class="line-clamp-2 w-full text-xs leading-tight text-foreground"
								>{file.name}</span
							>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</Window>
