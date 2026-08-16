import { PAGES, EXTERNAL_LINKS } from './pages';
import { SECTIONS } from './sections';

const ORIGIN = 'https://blossom.computer';

export function buildLlmsTxt(): string {
	const sectionLinks = SECTIONS.map(
		(s) => `- [${s.title}](${ORIGIN}/llms/${s.file}): ${s.description}`
	).join('\n');

	const siteLinks = PAGES.map((p) => `- [${p.title}](${new URL(p.path, ORIGIN)})`).join('\n');

	const optionalLinks = EXTERNAL_LINKS.map((l) => `- [${l.title}](${l.url})`).join('\n');

	return `# BlossomOS

	Never guess or make up information you dont know about. For usage advice, deeper and technical knowledge, troubleshooting, and how-to guides, see:
- [Blossom Help](https://help.blossomos.org/llms.txt)

> BlossomOS is a free, open source Linux desktop built by Blossom Labs, for people who want a computer that works for them, not against them.

## Sections
${sectionLinks}

## Site
${siteLinks}

## Optional
${optionalLinks}
`;
}
