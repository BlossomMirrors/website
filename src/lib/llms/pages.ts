// Single source of truth for the site's top-level static routes, shared by
// src/routes/sitemap.xml/+server.ts and src/routes/llms.txt/+server.ts so
// neither has to hand-maintain its own copy of the route list.
export const PAGES: { path: string; title: string }[] = [
	{ path: '/', title: 'Home' },
	{ path: '/about', title: 'About' },
	{ path: '/arc', title: 'Arc' },
	{ path: '/cloud', title: 'Blossom Cloud' },
	{ path: '/hub', title: 'Blossom Hub' },
	{ path: '/switch', title: 'BlossomOS Switch' },
	{ path: '/downloads', title: 'Downloads' },
	{ path: '/screenshots', title: 'Screenshots' },
	{ path: '/events', title: 'Events' },
	{ path: '/privacy', title: 'Privacy Policy' }
];

// External community/social links, not part of this site's route tree, so
// they can't be discovered from the filesystem the way pages/sections can.
export const EXTERNAL_LINKS: { title: string; url: string }[] = [
	{ title: 'Discord', url: 'https://discord.gg/dTqsBdxvNr' },
	{ title: 'Documentation', url: 'https://help.blossomos.org' },
	{ title: 'Source (Blossom Git)', url: 'https://dev.blossomos.org/blossom' },
	{ title: 'Bluesky', url: 'https://bsky.app/profile/blossomos.org' },
	{ title: 'Liberapay (donate)', url: 'https://liberapay.com/blossomos' }
];
