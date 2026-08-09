const modules = import.meta.glob('/src/lib/llms/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
}) as Record<string, string>;

export const FILES = new Map(
	Object.entries(modules).map(([path, content]) => [path.split('/').pop()!, content])
);

function parseSection(file: string, content: string) {
	const lines = content.split('\n');
	const title = lines[0].replace(/^#\s*/, '').trim();
	const description = lines.slice(1).find((line) => line.trim().length > 0) ?? '';
	return { file, title, description: description.trim() };
}

export const SECTIONS = [...FILES.entries()]
	.map(([file, content]) => parseSection(file, content))
	.sort((a, b) => a.file.localeCompare(b.file));
