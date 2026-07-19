<script lang="ts">
	import Window from './window.svelte';
	import kamosoPng from '$lib/assets/taskbar/kamoso.png';
	import webcamJpg from '$lib/assets/webcam.jpg';
	import ToolbarButton from './toolbar-button.svelte';
	import CameraIcon from '@lucide/svelte/icons/camera';
	import VideoIcon from '@lucide/svelte/icons/video';
	import StarIcon from '@lucide/svelte/icons/star';
	import InfoIcon from '@lucide/svelte/icons/info';
	import LayoutGridIcon from '@lucide/svelte/icons/layout-grid';
	import * as m from '$lib/paraglide/messages';

	let { onClose, onFocus, zIndex }: { onClose: () => void; onFocus?: () => void; zIndex?: number } =
		$props();

	function takePicture() {
		const a = document.createElement('a');
		a.href = webcamJpg;
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
	offsetX={-20}
	offsetY={20}
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
	<div class="relative min-h-0 flex-1 overflow-hidden bg-black">
		<img src={webcamJpg} alt="" class="h-full w-full object-cover" />
	</div>
</Window>
