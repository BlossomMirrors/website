import { MediaQuery } from 'svelte/reactivity';

const MOBILE_BREAKPOINT = 768;

export class IsMobile {
	#mq = new MediaQuery(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

	get current() {
		return this.#mq.current;
	}
}
