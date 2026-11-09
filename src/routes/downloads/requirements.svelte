<script lang="ts">
	import CpuIcon from '@lucide/svelte/icons/cpu';
	import MemoryStickIcon from '@lucide/svelte/icons/memory-stick';
	import HardDriveIcon from '@lucide/svelte/icons/hard-drive';
	import MonitorIcon from '@lucide/svelte/icons/monitor';
	import * as m from '$lib/paraglide/messages';
	import Section from '$lib/components/page/section.svelte';
	import Heading from '$lib/components/typography/heading.svelte';
	import IconList, { type IconListEntry } from '$lib/components/cards/icon-list.svelte';
	import Note from '$lib/components/typography/note.svelte';

	const requirements: IconListEntry[] = [
		{ icon: CpuIcon, title: m.downloads_req_cpu(), body: m.downloads_req_cpu_value() },
		{ icon: MemoryStickIcon, title: m.downloads_req_ram(), body: m.downloads_req_ram_value() },
		{
			icon: HardDriveIcon,
			title: m.downloads_req_storage(),
			body: m.downloads_req_storage_value()
		},
		{ icon: MonitorIcon, title: m.downloads_req_display(), body: m.downloads_req_display_value() }
	];
</script>

<Section class="mt-20">
	<Heading size="sm" text={m.downloads_requirements_h2()} />
	<IconList items={requirements} variant="card" cols={2} reveal={false} class="mt-6" />
	<Note class="mt-4">{m.downloads_req_nvidia_note()}</Note>
</Section>
