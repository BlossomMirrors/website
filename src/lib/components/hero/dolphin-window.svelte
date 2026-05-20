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

	let { onClose, onFocus, zIndex }: { onClose: () => void; onFocus?: () => void; zIndex?: number } = $props();

	let selectedFile = $state<string | null>(null);

	const places = [
		{ label: 'Home', icon: HomeIcon },
		{ label: 'Desktop', icon: MonitorIcon },
		{ label: 'Documents', icon: FileTextIcon },
		{ label: 'Downloads', icon: DownloadIcon },
		{ label: 'Music', icon: MusicIcon },
		{ label: 'Pictures', icon: ImageIcon },
		{ label: 'Videos', icon: VideoIcon },
		{ label: 'Trash', icon: Trash2Icon }
	];
	const remote = [{ label: 'Network', icon: NetworkIcon }];
	const recent = [
		{ label: 'Recent Files', icon: ClockIcon },
		{ label: 'Recent Locations', icon: MapPinIcon }
	];
	const devices = [
		{ label: 'BlossomOS', icon: HardDriveIcon },
		{ label: 'Backups', icon: HardDriveIcon }
	];

	const files: { name: string; icon: unknown }[] = [
		{ name: 'Desktop', icon: MonitorIcon },
		{ name: 'Documents', icon: FileTextIcon },
		{ name: 'Downloads', icon: DownloadIcon },
		{ name: 'Music', icon: Music2Icon },
		{ name: 'Pictures', icon: ImageIcon },
		{ name: 'Videos', icon: VideoIcon },
		{ name: 'Public', icon: UsersIcon },
		{ name: 'Templates', icon: CopyIcon },
		{ name: 'Projects', icon: CodeIcon },
		{ name: 'Games', icon: GamepadIcon },
		{ name: 'Blossom Cloud', icon: CloudIcon },
		{ name: 'AppImages', icon: PackageIcon }
	];
</script>

<Window
	title="Home — Dolphin"
	icon="/taskbar/dolphin.png"
	{onClose}
	{onFocus}
	{zIndex}
	minW={750}
	minH={500}
	defaultW={750}
	defaultH={500}
>
	<!-- Toolbar -->
	<div class="flex shrink-0 items-center gap-1 px-2 select-none" style="height:38px">
		<ToolbarButton size="sm" muted>
			<ArrowLeftIcon size={15} />
		</ToolbarButton>
		<ToolbarButton size="sm" muted class="opacity-40">
			<ArrowRightIcon size={15} />
		</ToolbarButton>
		<div class="flex h-7 items-center gap-0.5 rounded px-1.5 text-muted-foreground hover:bg-foreground/10">
			<LayoutGridIcon size={13} />
			<ChevronDownIcon size={11} />
		</div>
		<div class="flex flex-1 items-center rounded-md border border-foreground/6 px-1.5 py-2 text-sm">
			<ChevronRightIcon size={16} class="mr-1 shrink-0 text-foreground" />
			<span class="text-xs font-semibold text-foreground">Home</span>
		</div>
		<div class="ml-1 flex items-center gap-0.5">
			<ToolbarButton size="sm" muted>
				<SearchIcon size={14} />
			</ToolbarButton>
			<ToolbarButton size="sm" muted>
				<MoreHorizontalIcon size={14} />
			</ToolbarButton>
		</div>
	</div>

	<!-- Main content -->
	<div class="flex min-h-0 flex-1">
		<!-- Sidebar -->
		<div class="hidden w-48 shrink-0 overflow-y-auto px-2 py-2 sm:block">
			<p class="mb-1 px-1 text-[10px] font-semibold tracking-widest text-muted-foreground/70 uppercase">Places</p>
			{#each places as p (p.label)}
				<button class="flex w-full cursor-default items-center gap-2.5 rounded px-2 py-1 text-left text-xs {p.label === 'Home' ? 'bg-primary/20 font-semibold text-primary' : 'text-foreground/70'}">
					<p.icon size={14} class="shrink-0" />
					{p.label}
				</button>
			{/each}

			<p class="mt-3 mb-1 px-1 text-[10px] font-semibold tracking-widest text-muted-foreground/70 uppercase">Remote</p>
			{#each remote as r (r.label)}
				<button class="flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-xs text-foreground/70">
					<r.icon size={14} class="shrink-0" />
					{r.label}
				</button>
			{/each}

			<p class="mt-3 mb-1 px-1 text-[10px] font-semibold tracking-widest text-muted-foreground/70 uppercase">Recent</p>
			{#each recent as r (r.label)}
				<button class="flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-xs text-foreground/70">
					<r.icon size={14} class="shrink-0" />
					{r.label}
				</button>
			{/each}

			<p class="mt-3 mb-1 px-1 text-[10px] font-semibold tracking-widest text-muted-foreground/70 uppercase">Devices</p>
			{#each devices as d (d.label)}
				<button class="flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-xs text-foreground/70">
					<d.icon size={14} class="shrink-0" />
					<span class="truncate">{d.label}</span>
				</button>
			{/each}
		</div>

		<!-- File grid -->
		<div class="flex-1 overflow-y-auto p-3">
			<div class="relative h-full rounded-xl border border-border bg-muted/40 p-3">
				<div class="grid grid-cols-3 gap-2 sm:grid-cols-4">
					{#each files as file (file.name)}
						{@const Icon = file.icon as any}
						<button
							class="cursor-default flex flex-col items-center gap-2 rounded-lg p-3 text-center transition-colors {selectedFile === file.name ? 'bg-primary/12 ring-1 ring-primary/40' : 'hover:bg-foreground/6'}"
							onclick={() => (selectedFile = file.name)}
						>
							<Icon size={40} class="shrink-0 text-foreground/70" strokeWidth={1.2} />
							<span class="line-clamp-2 w-full text-xs leading-tight text-foreground">{file.name}</span>
						</button>
					{/each}
				</div>
				<div
					class="pointer-events-none absolute right-0 bottom-0 left-0 flex items-end justify-start rounded-b-xl px-3 pt-8 pb-2"
					style="background:linear-gradient(to top, color-mix(in srgb, var(--color-muted) 60%, transparent), transparent)"
				>
					<span class="text-[11px] text-muted-foreground select-none">12 folders, 0 files</span>
				</div>
			</div>
		</div>
	</div>
</Window>
