<script lang="ts">
	import Window from './window.svelte';
	import kamosoPng from '$lib/assets/taskbar/kamoso.png';
	import webcamDisplay from '$lib/assets/webcam.jpg';
	import ToolbarButton from './toolbar-button.svelte';
	import CameraIcon from '@lucide/svelte/icons/camera';
	import VideoIcon from '@lucide/svelte/icons/video';
	import StarIcon from '@lucide/svelte/icons/star';
	import InfoIcon from '@lucide/svelte/icons/info';
	import LayoutGridIcon from '@lucide/svelte/icons/layout-grid';
	import * as m from '$lib/paraglide/messages';
</script>

<Window
	title="Kamoso"
	icon={kamosoPng}
>
	<!-- Toolbar -->
	<div class="flex h-11 shrink-0 items-center gap-1 px-3 select-none">
		<ToolbarButton label={m.kamoso_record_video()}>
			<VideoIcon size={14} />
		</ToolbarButton>
		<ToolbarButton label={m.kamoso_take_picture()}>
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
		<enhanced:img
			src={webcamDisplay}
			alt=""
			sizes="(min-width: 768px) 800px, 100vw"
			class="size-full object-cover"
			loading="lazy"
		/>
	</div>
</Window>
