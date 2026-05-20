<script lang="ts">
	import Navbar from '$lib/components/navbar.svelte';
	import type { NavItem } from '$lib/components/navbar.svelte';
	import ModeToggle from '$lib/components/ui/mode-toggle.svelte';
	import UsersIcon from '@lucide/svelte/icons/users';
	import { localizeHref } from '$lib/paraglide/runtime';
	import MonitorIcon from '@lucide/svelte/icons/monitor';
	import { Building2Icon, ShoppingBagIcon, UserIcon } from 'lucide-svelte';
	import Logo from '$lib/components/logo.svelte';
	import { Button } from '$lib/components/ui/button';
	import { MatrixIcon } from '$lib/components/icons/matrix/index.svelte';
	import { DiscordIcon } from '$lib/components/icons/discord/index.svelte';

	const nav: NavItem[] = [
		{
			type: 'dropdown',
			label: 'Products',
			items: [
				{
					label: 'BlossomOS',
					href: '/',
					description: 'The desktop OS that just works.',
					icon: MonitorIcon
				},
				{
					label: 'Arc Software',
					href: '/arc',
					description: 'Making your apps work with one click.',
					icon: ShoppingBagIcon
				},
				{
					label: 'Blossom Hub',
					href: '/hub',
					description: 'All company resources in one place.',
					badge: 'Coming soon',
					icon: Building2Icon
				}
			]
		},
		{
			type: 'link',
			label: 'About',
			href: '/about'
		},
		{
			type: 'link',
			label: 'Downloads',
			href: '/downloads'
		},
		{
			type: 'dropdown',
			label: 'Community',
			items: [
				{ label: 'Community Forums', href: 'https://community.blossomos.org', icon: UsersIcon },
				{ label: 'Discord', href: 'https://discord.gg/dTqsBdxvNr', icon: DiscordIcon },
				{ label: 'Matrix', href: 'https://matrix.to/#/#blossomos:blossomos.org', icon: MatrixIcon }
			]
		}
	];
</script>

<header class="flex w-full items-center px-8 py-4">
	<div class="flex items-center gap-1">
		<a href={localizeHref('/')} class="mr-4 flex shrink-0 items-center gap-3">
			<Logo size={32} />
			<span class="font-serif text-xl">Blossom</span>
		</a>
		<Navbar items={nav} />
	</div>

	<div class="ml-auto flex shrink-0 items-center gap-2">
		<a href="https://auth.blossomos.org" target="_blank">
			<Button><UserIcon strokeWidth={1.5} />Account</Button>
		</a>
		<ModeToggle />
	</div>
</header>
