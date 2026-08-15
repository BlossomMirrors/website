<script lang="ts">
	import FolderWidget from './folder-widget.svelte';
</script>

<div class="pointer-events-none absolute inset-0 translate-y-[12%]">
    <!-- Circle -->
	<div
		class="widget-in pointer-events-auto absolute top-[16%] left-[5%] z-10 cursor-default touch-none opacity-0 select-none [--tilt:-8deg] [animation-delay:1.1s]"
	>
		<svg width="62" height="62" viewBox="0 0 62 62" xmlns="http://www.w3.org/2000/svg">
			<circle cx="31" cy="31" r="31" fill="#3e78ff" fill-opacity="0.72" />
		</svg>
	</div>
	<!-- Triangle -->
	<div
		class="widget-in pointer-events-auto absolute top-[26%] left-[6%] z-10 cursor-default touch-none opacity-0 select-none [--tilt:13deg] [animation-delay:1.25s]"
	>
		<svg width="68" height="60" viewBox="0 0 68 60" xmlns="http://www.w3.org/2000/svg">
			<polygon points="34,2 66,58 2,58" fill="#ff2ea1" fill-opacity="0.68" />
		</svg>
	</div>
	<!-- Square -->
	<div
		class="widget-in pointer-events-auto absolute top-[36%] left-[4%] z-10 cursor-default touch-none opacity-0 select-none [--tilt:-4deg] [animation-delay:1.15s]"
	>
		<svg width="58" height="78" viewBox="0 0 58 78" xmlns="http://www.w3.org/2000/svg">
			<polygon points="29,2 56,39 29,76 2,39" fill="#fff200" fill-opacity="0.80" />
		</svg>
	</div>
	<!-- Cross -->
	<div
		class="widget-in pointer-events-auto absolute top-[49%] left-[7%] z-10 cursor-default touch-none opacity-0 select-none [--tilt:16deg] [animation-delay:1.3s]"
	>
		<svg width="56" height="56" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M20 0 L36 0 L36 20 L56 20 L56 36 L36 36 L36 56 L20 56 L20 36 L0 36 L0 20 L20 20 Z"
				fill="#00ff73"
				fill-opacity="0.72"
			/>
		</svg>
	</div>

	<FolderWidget />
</div>

<style>
	@keyframes widget-in {
		from {
			opacity: 0;
			transform: translateY(10px) rotate(var(--tilt));
		}
		to {
			opacity: 1;
			transform: translateY(0) rotate(var(--tilt));
		}
	}
	.widget-in {
		animation: widget-in 0.35s ease-out forwards;
		transform: rotate(var(--tilt));
	}
</style>
