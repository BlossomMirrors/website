export type PostMeta = {
	slug: string;
	title: string;
	date: string;
	description: string;
	author: string;
	image?: string;
	readingTime: number;
};

export type Post = PostMeta & { content: string };

function parseFrontmatter(raw: string): { meta: Record<string, string>; content: string } {
	const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
	if (!match) return { meta: {}, content: raw };
	const meta: Record<string, string> = {};
	for (const line of match[1].split(/\r?\n/)) {
		const colon = line.indexOf(':');
		if (colon === -1) continue;
		meta[line.slice(0, colon).trim()] = line.slice(colon + 1).trim();
	}
	return { meta, content: match[2] };
}

function readingTime(content: string): number {
	return Math.max(1, Math.ceil(content.split(/\s+/).length / 200));
}

function slugFromPath(path: string): string {
	return path.split('/').pop()!.replace(/\.md$/, '');
}

const modules = import.meta.glob('/src/content/press/*.md', {
	query: '?raw',
	eager: true
}) as Record<string, { default: string }>;

export function getAllPosts(): PostMeta[] {
	return Object.entries(modules)
		.map(([path, mod]) => {
			const slug = slugFromPath(path);
			const { meta, content } = parseFrontmatter(mod.default);
			return {
				slug,
				title: meta.title ?? slug,
				date: meta.date ?? '',
				description: meta.description ?? '',
				author: meta.author ?? '',
				image: meta.image,
				readingTime: readingTime(content)
			};
		})
		.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | null {
	const entry = Object.entries(modules).find(([path]) => slugFromPath(path) === slug);
	if (!entry) return null;
	const { meta, content } = parseFrontmatter(entry[1].default);
	return {
		slug,
		title: meta.title ?? slug,
		date: meta.date ?? '',
		description: meta.description ?? '',
		author: meta.author ?? '',
		image: meta.image,
		readingTime: readingTime(content),
		content
	};
}
