<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Window from './window.svelte';
	import kamosoPng from '$lib/assets/taskbar/kamoso.png';
	import ToolbarButton from './toolbar-button.svelte';
	import CameraIcon from '@lucide/svelte/icons/camera';
	import VideoIcon from '@lucide/svelte/icons/video';
	import StarIcon from '@lucide/svelte/icons/star';
	import InfoIcon from '@lucide/svelte/icons/info';
	import LayoutGridIcon from '@lucide/svelte/icons/layout-grid';
	import * as m from '$lib/paraglide/messages';

	let { onClose, onFocus, zIndex }: { onClose: () => void; onFocus?: () => void; zIndex?: number } =
		$props();

	let video = $state<HTMLVideoElement | null>(null);
	let stream: MediaStream | null = null;

	onMount(() => {
		navigator.mediaDevices
			.getUserMedia({ video: true, audio: false })
			.then((s) => {
				stream = s;
				if (video) video.srcObject = stream;
			})
			.catch(() => {});
	});

	onDestroy(() => {
		stream?.getTracks().forEach((t) => t.stop());
	});

	function takePicture() {
		if (!video) return;
		const canvas = document.createElement('canvas');
		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;
		canvas.getContext('2d')!.drawImage(video, 0, 0);
		const a = document.createElement('a');
		a.href = canvas.toDataURL('image/png');
		a.download = `kamoso-${new Date().toISOString().replace(/[:.]/g, '-')}.png`;
		a.click();
	}
</script>

<Window
	title="Kamoso"
	icon={kamosoPng}
	{onClose}
	{onFocus}
	{zIndex}
	minW={420}
	minH={300}
	defaultW={800}
	defaultH={528}
>
	<!-- Toolbar -->
	<div class="flex shrink-0 items-center gap-1 px-3 select-none" style="height:44px">
		<ToolbarButton label={m.kamoso_record_video()}>
			<VideoIcon size={14} />
		</ToolbarButton>
		<ToolbarButton label={m.kamoso_take_picture()} onclick={takePicture}>
			<CameraIcon size={14} />
		</ToolbarButton>
		<ToolbarButton label={m.kamoso_start_sequence()}>
			<StarIcon size={14} />
		</ToolbarButton>
		<div class="flex-1"></div>
		<ToolbarButton>
			<InfoIcon size={14} />
		</ToolbarButton>
		<ToolbarButton>
			<LayoutGridIcon size={14} />
		</ToolbarButton>
	</div>

	<!-- Camera feed -->
	<div class="min-h-0 flex-1 overflow-hidden p-3 pt-0">
		<div class="relative h-full w-full overflow-hidden rounded-xl bg-black">
			<video
				bind:this={video}
				autoplay
				playsinline
				muted
				class="aspect-video h-full w-full object-contain"
			></video>
		</div>
	</div>
</Window>

<style>
	video {
		transform: scaleX(-1);
	}
</style>
