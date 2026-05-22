import { getAllPosts } from '$lib/press';

export function load() {
	return { posts: getAllPosts() };
}
