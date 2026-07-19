<script lang="ts">
	import { cn } from '$lib/utils.js';
	import Navbar from '$lib/components/navbar.svelte';
	import type { NavItem } from '$lib/components/navbar.svelte';
	import ModeToggle from '$lib/components/ui/mode-toggle.svelte';
	import LanguageSwitcher from '$lib/components/ui/language-switcher.svelte';
	import UsersIcon from '@lucide/svelte/icons/users';
	import MonitorIcon from '@lucide/svelte/icons/monitor';
	import MenuIcon from '@lucide/svelte/icons/menu';
	import XIcon from '@lucide/svelte/icons/x';
	import ArrowRightLeftIcon from '@lucide/svelte/icons/arrow-right-left';
	import HeartIcon from '@lucide/svelte/icons/heart';
	import { Building2Icon, CloudIcon, ShoppingBagIcon, UserIcon } from 'lucide-svelte';
	import Logo from '$lib/components/logo.svelte';
	import { Button } from '$lib/components/ui/button';
	import { MatrixIcon } from '$lib/components/icons/matrix/index.svelte';
	import { DiscordIcon } from '$lib/components/icons/discord/index.svelte';
	import * as m from '$lib/paraglide/messages';
	import { onMount } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';
	import { IsMobile } from '$lib/components/hooks/is-mobile.svelte.js';

	const nav: NavItem[] = [
		{
			type: 'dropdown',
			label: m.products(),
			singleCol: true,
			items: [
				{
					label: 'BlossomOS',
					href: '/',
					description: m.blossomos_tooltip(),
					icon: MonitorIcon
				},
				{
					label: 'Arc Software',
					href: '/arc',
					description: m.arc_header_tooltip(),
					icon: ShoppingBagIcon
				},
				{
					label: 'Blossom Cloud',
					href: '/cloud',
					description: m.cloud_tooltip(),
					icon: CloudIcon
				},
				{
					label: 'Blossom Hub',
					href: '/hub',
					description: m.hub_tooltip(),
					badge: m.coming_soon(),
					icon: Building2Icon
				},
				{
					label: 'Switch',
					href: '/switch',
					description: m.switch_nav_description(),
					badge: m.coming_soon(),
					icon: ArrowRightLeftIcon
				}
			]
		},
		{
			type: 'link',
			label: m.about(),
			href: '/about'
		},
		{
			type: 'link',
			label: m.downloads(),
			href: '/downloads'
		},
		{
			type: 'link',
			label: m.screenshots_nav(),
			href: '/screenshots'
		},
		/*{
			type: 'link',
			label: m.events(),
			href: '/events'
		},*/
		{
			type: 'dropdown',
			label: m.community(),
			items: [
				{ label: m.community_forums(), href: 'https://community.blossomos.org', icon: UsersIcon },
				{ label: m.discord(), href: 'https://discord.gg/dTqsBdxvNr', icon: DiscordIcon },
				{
					label: m.matrix(),
					href: 'https://matrix.to/#/#blossomos:blossomos.org',
					icon: MatrixIcon
				}
			]
		}
	];

	let { sticky = true }: { sticky?: boolean } = $props();

	const isMobile = new IsMobile();
	let mobileOpen = $state(false);
	let isOSPage = $state(false);
	let title = $state('Blossom');

	const translateY = new Tween(0, { duration: 250, easing: cubicInOut });

	$effect(() => {
		if (!isMobile.current || mobileOpen) {
			translateY.set(0);
		}
	});

	onMount(() => {
		window.setInterval(() => {
			isOSPage = window.location.pathname == '/';
			if (isOSPage) {
				title = 'BlossomOS';
			} else {
				title = 'Blossom';
			}
		}, 0);

		let lastScrollY = window.scrollY;

		const handleScroll = () => {
			if (!isMobile.current || mobileOpen) return;
			const currentScrollY = window.scrollY;
			if (currentScrollY > lastScrollY && currentScrollY > 60) {
				translateY.set(-100);
			} else {
				translateY.set(0);
			}
			lastScrollY = currentScrollY;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<header
	class={cn('relative w-full bg-background', sticky && 'sticky top-0 z-50')}
	style={isMobile.current ? `transform: translateY(${translateY.current}%)` : ''}
>
	<div class="mx-auto flex max-w-7xl items-center px-4 py-4 md:px-8">
		<div class="flex items-center gap-1">
			<!-- eslint-disable svelte/no-navigation-without-resolve -->
			<a href="/" class="mr-4 flex shrink-0 items-center gap-3">
				<Logo size={32} />
				<span class="font-serif text-xl">
					{title}
				</span>
			</a>
			<div class="hidden md:block">
				<Navbar items={nav} />
			</div>
		</div>

		<div class="ml-auto flex shrink-0 items-center gap-2">
			<a
				href="https://liberapay.com/blossomos"
				target="_blank"
				rel="noreferrer"
				class="hidden sm:block"
			>
				<Button
					variant="ghost"
					class="text-destructive hover:bg-destructive/10 hover:text-destructive"
				>
					<HeartIcon size={14} strokeWidth={0} fill="currentColor" />{m.donate_nav()}
				</Button>
			</a>
			<a href="https://auth.blossomos.org" target="_blank" rel="noreferrer" class="hidden sm:block">
				<Button><UserIcon strokeWidth={1.5} />{m.account()}</Button>
			</a>
			<LanguageSwitcher />
			<ModeToggle />
			<button
				class="flex h-9 w-9 items-center justify-center rounded-md text-foreground hover:bg-foreground/8 md:hidden"
				onclick={() => (mobileOpen = !mobileOpen)}
				aria-label="Toggle menu"
			>
				{#if mobileOpen}
					<XIcon size={20} />
				{:else}
					<MenuIcon size={20} />
				{/if}
			</button>
		</div>
	</div>

	{#if mobileOpen}
		<div
			class="absolute top-full right-0 left-0 z-50 border-b border-border bg-background px-4 pb-4 md:hidden"
		>
			{#each nav as item (item.label)}
				{#if item.type === 'link'}
					<a
						href={item.href}
						onclick={() => (mobileOpen = false)}
						class="flex items-center rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-foreground/8"
					>
						{item.label}
					</a>
				{:else}
					<p
						class="mt-3 mb-1 px-3 text-[10px] font-semibold tracking-widest text-muted-foreground uppercase"
					>
						{item.label}
					</p>
					{#each item.items as sub (sub.href)}
						<a
							href={sub.href}
							target={sub.href.includes('http') ? '_blank' : undefined}
							onclick={() => (mobileOpen = false)}
							class="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-foreground/8"
						>
							{#if sub.icon}
								{@const Icon = sub.icon}
								<Icon size={16} class="shrink-0 text-muted-foreground" strokeWidth={1.5} />
							{/if}
							{sub.label}
							{#if sub.badge}
								<span class="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary"
									>{sub.badge}</span
								>
							{/if}
						</a>
					{/each}
				{/if}
			{/each}
			<div class="mt-3 flex flex-col gap-2 border-t border-border pt-3">
				<a href="https://auth.blossomos.org" target="_blank" rel="noreferrer">
					<Button class="w-full"><UserIcon strokeWidth={1.5} />{m.account()}</Button>
				</a>
				<a href="https://liberapay.com/blossomos" target="_blank" rel="noreferrer">
					<Button
						variant="ghost"
						class="w-full text-destructive hover:bg-destructive/10 hover:text-destructive"
					>
						<HeartIcon size={14} strokeWidth={0} fill="currentColor" />{m.donate_nav()}
					</Button>
				</a>
			</div>
		</div>
	{/if}
</header>
