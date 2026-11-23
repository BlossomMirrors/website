import { detectOS } from '$lib/components/download/isos';
import type { PageServerLoad } from './$types';

// Detect the visitor's OS on the server so the recommended download renders first without a
// layout shift after hydration.
export const load: PageServerLoad = ({ request }) => ({
	os: detectOS(request.headers.get('user-agent') ?? '')
});
