export function reveal(node: HTMLElement, delay = 0) {
	node.style.transitionDelay = `${delay}ms`;
	node.setAttribute('data-reveal', 'pending');

	let io: IntersectionObserver | null = null;

	// Double rAF ensures the browser paints opacity:0 before we start
	// observing — otherwise elements already in view jump straight to done.
	requestAnimationFrame(() => {
		requestAnimationFrame(() => {
			io = new IntersectionObserver(
				([e]) => {
					if (e.isIntersecting) {
						node.setAttribute('data-reveal', 'done');
						io?.disconnect();
					}
				},
				{ threshold: 0.15 }
			);
			io.observe(node);
		});
	});

	return { destroy: () => io?.disconnect() };
}
