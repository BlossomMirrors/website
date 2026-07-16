import { PostHog } from 'posthog-node';
import { env } from '$env/dynamic/public';

let posthogClient: PostHog | null = null;

export function getPostHogClient() {
	if (!posthogClient) {
		posthogClient = new PostHog(env.PUBLIC_POSTHOG_PROJECT_TOKEN ?? '', {
			host: env.PUBLIC_POSTHOG_HOST,
			flushAt: 1,
			flushInterval: 0
		});
	}
	return posthogClient;
}
