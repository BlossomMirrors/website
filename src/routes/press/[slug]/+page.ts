import { getPost, getAllPosts } from '$lib/press';
import { error } from '@sveltejs/kit';

export function entries() {
	return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function load({ params }) {
	const post = getPost(params.slug);
	if (!post) error(404, 'Post not found');
	return post;
}
