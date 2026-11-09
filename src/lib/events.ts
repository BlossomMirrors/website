export type Event = {
	id: string;
	title: string;
	from: string; // ISO 8601 UTC
	to: string; // ISO 8601 UTC
	location: string;
	online: boolean;
	image?: string;
	href?: string;
	talkHref?: string;
};

/*
const events: Event[] = [
	{
		id: 'community-qa-2026-05',
		title: 'Blossom Community Q&A',
		from: '2026-05-21T22:00:00Z',
		to: '2026-05-22T20:00:00Z',
		location: 'Discord',
		online: true,
		image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&fit=crop',
		href: 'https://discord.gg/dTqsBdxvNr'
	},
	{
		id: 'linux-app-summit-2026',
		title: 'Linux App Summit 2026',
		from: '2026-09-12T08:00:00Z',
		to: '2026-09-14T18:00:00Z',
		location: 'Brno, Czech Republic',
		online: false,
		image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&fit=crop',
		href: 'https://linuxappsummit.org'
	},
	{
		id: 'fosdem-2027',
		title: 'FOSDEM 2027',
		from: '2027-02-06T08:00:00Z',
		to: '2027-02-07T18:00:00Z',
		location: 'Brussels, Belgium',
		online: false,
		image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&fit=crop',
		href: 'https://fosdem.org'
	},
	{
		id: 'roadmap-q1-2026',
		title: 'Blossom Roadmap Talk Q1 2026',
		from: '2026-03-08T18:00:00Z',
		to: '2026-03-08T20:00:00Z',
		location: 'YouTube / Peertube',
		online: true,
		image: 'https://images.unsplash.com/photo-1582192730841-2a682d7375f9?w=800&fit=crop',
		talkHref: 'https://dev.blossomos.org/Blossom'
	},
	{
		id: 'fosdem-2026',
		title: 'FOSDEM 2026',
		from: '2026-02-01T08:00:00Z',
		to: '2026-02-02T18:00:00Z',
		location: 'Brussels, Belgium',
		online: false,
		image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&fit=crop',
		talkHref: 'https://fosdem.org/2026'
	}
];
 */

export const events: Event[] = [];

export function formatDateRange(from: string, to: string): string {
	const f = new Date(from);
	const t = new Date(to);
	const opts: Intl.DateTimeFormatOptions = {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
		timeZone: 'UTC'
	};
	if (f.toDateString() === t.toDateString()) return f.toLocaleDateString('en-US', opts);
	if (f.getUTCMonth() === t.getUTCMonth() && f.getUTCFullYear() === t.getUTCFullYear()) {
		return `${f.toLocaleDateString('en-US', { month: 'long', timeZone: 'UTC' })} ${f.getUTCDate()}-${t.getUTCDate()}, ${f.getUTCFullYear()}`;
	}
	return `${f.toLocaleDateString('en-US', opts)} - ${t.toLocaleDateString('en-US', opts)}`;
}

export function splitEvents(list: Event[] = events, now = Date.now()) {
	return {
		live: list.filter((e) => now >= new Date(e.from).getTime() && now <= new Date(e.to).getTime()),
		upcoming: list
			.filter((e) => new Date(e.from).getTime() > now)
			.sort((a, b) => new Date(a.from).getTime() - new Date(b.from).getTime()),
		past: list
			.filter((e) => new Date(e.to).getTime() < now)
			.sort((a, b) => new Date(b.to).getTime() - new Date(a.to).getTime())
	};
}
