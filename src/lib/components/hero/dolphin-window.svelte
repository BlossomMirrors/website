<script lang="ts">
	import Window from './window.svelte';
	import ToolbarButton from './toolbar-button.svelte';
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
	import LayoutGridIcon from '@lucide/svelte/icons/layout-grid';
	import SearchIcon from '@lucide/svelte/icons/search';
	import MoreHorizontalIcon from '@lucide/svelte/icons/more-horizontal';
	import Music2Icon from '@lucide/svelte/icons/music-2';
	import CloudIcon from '@lucide/svelte/icons/cloud';
	import GamepadIcon from '@lucide/svelte/icons/gamepad-2';
	import PackageIcon from '@lucide/svelte/icons/package';
	import CodeIcon from '@lucide/svelte/icons/code-2';
	import UsersIcon from '@lucide/svelte/icons/users';
	import CopyIcon from '@lucide/svelte/icons/copy';
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

	let { onClose, onFocus, zIndex }: { onClose: () => void; onFocus?: () => void; zIndex?: number } =
		$props();

	let selectedFile = $state<string | null>(null);

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

	const files = $derived<{ id: string; name: string; icon: unknown }[]>([
		{ id: 'desktop', name: m.dolphin_desktop(), icon: MonitorIcon },
		{ id: 'documents', name: m.dolphin_documents(), icon: FileTextIcon },
		{ id: 'downloads', name: m.dolphin_downloads(), icon: DownloadIcon },
		{ id: 'music', name: m.dolphin_music(), icon: Music2Icon },
		{ id: 'pictures', name: m.dolphin_pictures(), icon: ImageIcon },
		{ id: 'videos', name: m.dolphin_videos(), icon: VideoIcon },
		{ id: 'public', name: m.dolphin_public(), icon: UsersIcon },
		{ id: 'templates', name: m.dolphin_templates(), icon: CopyIcon },
		{ id: 'projects', name: m.dolphin_projects(), icon: CodeIcon },
		{ id: 'games', name: m.dolphin_games(), icon: GamepadIcon },
		{ id: 'cloud', name: 'Blossom Cloud', icon: CloudIcon },
		{ id: 'appimages', name: 'AppImages', icon: PackageIcon }
	]);
</script>

<Window
	title="Home — Dolphin"
	icon="/taskbar/dolphin.png"
	{onClose}
	{onFocus}
	{zIndex}
	minW={750}
	minH={536}
	defaultW={750}
	defaultH={536}
>
	<!-- Toolbar -->
	<div class="flex shrink-0 select-none" style="height:38px">
		<!-- Nav buttons — same width as sidebar -->
		<div class="flex shrink-0 items-center gap-1 px-2 sm:w-48">
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
		<div class="hidden w-48 shrink-0 overflow-y-auto px-2 py-2 sm:block">
			<p
				class="mb-1 px-1 text-[10px] font-semibold tracking-widest text-muted-foreground/70 uppercase"
			>
				{m.dolphin_places()}
			</p>
			{#each places as p (p.id)}
				<button
					class="flex w-full cursor-default items-center gap-2.5 rounded-sidebar-item px-2 py-1 text-left text-xs {p.id ===
					'home'
						? 'bg-primary/20 font-semibold text-primary'
						: 'text-foreground/70'}"
				>
					<p.icon size={14} class="shrink-0" />
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
			<div class="relative h-full rounded-xl border border-border bg-muted/40 p-3">
				<div class="grid grid-cols-3 gap-2 sm:grid-cols-4">
					{#each files as file (file.id)}
						{@const Icon = file.icon as ConstructorOfATypedSvelteComponent | null | undefined}
						<button
							class="flex cursor-default flex-col items-center gap-2 rounded-lg p-3 text-center transition-colors {selectedFile ===
							file.id
								? 'bg-primary/12 ring-1 ring-primary/40'
								: 'hover:bg-foreground/6'}"
							onclick={() => (selectedFile = file.id)}
						>
							<Icon size={40} class="shrink-0 text-foreground/70" strokeWidth={1.2} />
							<span class="line-clamp-2 w-full text-xs leading-tight text-foreground"
								>{file.name}</span
							>
						</button>
					{/each}
				</div>
			</div>
		</div>
	</div>
</Window>
