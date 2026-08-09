export type Credit = {
	name: string;
	url?: string;
};

// Keyed by screenshot filename without extension. Skip an entry for no credit.
// Omit url to show a plain name with no link.
// desktop_overview: { name: Jane Doe, url: https://example.com }
export const credits: Record<string, Credit> = {};
