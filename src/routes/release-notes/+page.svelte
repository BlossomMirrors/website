<script>
	import Button from "$lib/components/ui/button/button.svelte";
	import { ArrowLeft } from "@lucide/svelte";
</script>

<style>
	.paper-container {
		perspective: 1200px;
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
        margin: 0 auto;
        margin-top: -120px;
	}

	.paper {
		background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%);
		padding: 3rem;
		border-radius: 2px;
		box-shadow: 
			0 20px 60px rgba(0, 0, 0, 0.8),
			inset -1px -1px 0 rgba(255, 255, 255, 0.05);
		transform: rotateX(5deg) rotateZ(-2deg);
		max-width: 800px;
		position: relative;
		border: 1px solid rgba(255, 255, 255, 0.1);
		animation: paperFadeIn 0.8s ease-out forwards;
		opacity: 0;
	}

	@keyframes paperFadeIn {
		from {
			opacity: 0;
			transform: rotateX(15deg) rotateZ(-5deg) translateY(30px);
		}
		to {
			opacity: 1;
			transform: rotateX(5deg) rotateZ(-2deg) translateY(0);
		}
	}

	.paper::before {
		content: '';
		position: absolute;
		top: -10px;
		left: 20%;
		width: 200px;
		height: 200px;
		background: none;
		border-radius: 50%;
		filter: blur(40px);
		pointer-events: none;
	}

	.paper h1 {
		color: #ffffff;
		font-size: 2.5rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
		font-family: serif;
	}

	.paper .subtitle {
		color: #6666FF;
		font-size: 1rem;
		font-weight: 500;
		margin-bottom: 2rem;
		letter-spacing: 0.05em;
	}

	.divider {
		height: 2px;
		background: linear-gradient(90deg, transparent, #6666FF, transparent);
		margin: 2rem 0;
	}

	.release-item {
		margin-bottom: 2rem;
	}

	.release-item h3 {
		color: #6666FF;
		font-size: 1.2rem;
		margin-bottom: 0.5rem;
		font-weight: 600;
	}

	.release-item p {
		color: #cccccc;
		line-height: 1.6;
		font-size: 1rem;
	}

	.release-item ul {
		list-style: none;
		padding-left: 1rem;
		color: #aaaaaa;
	}

	.release-item li {
		margin: 0.5rem 0;
		padding-left: 1.5rem;
		position: relative;
		line-height: 1.6;
	}

	.release-item li::before {
		content: '✓';
		position: absolute;
		left: 0;
		color: #6666FF;
		font-weight: bold;
	}

	.back-button {
		margin-top: 2rem;
	}

	.paper-texture {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-image: 
			repeating-linear-gradient(
				90deg,
				transparent,
				transparent 2px,
				rgba(0, 0, 0, 0.02) 2px,
				rgba(0, 0, 0, 0.02) 4px
			),
			repeating-linear-gradient(
				0deg,
				transparent,
				transparent 2px,
				rgba(0, 0, 0, 0.02) 2px,
				rgba(0, 0, 0, 0.02) 4px
			);
		pointer-events: none;
		border-radius: 2px;
	}

	@media (max-width: 768px) {
		.paper {
			transform: none !important;
			padding: 2rem;
            margin-top: 40px;
		}

		.paper h1 {
			font-size: 2rem;
		}

		.paper .subtitle {
			font-size: 0.9rem;
		}

		.release-item h3 {
			font-size: 1.1rem;
		}

		.release-item p {
			font-size: 0.95rem;
		}
	}
</style>

<div class="paper-container">
	<div class="paper">
		<div class="paper-texture"></div>
		
		<h1>Release Notes</h1>
		<p class="subtitle">BlossomOS v0.1 Alpha</p>
		
		<div class="divider"></div>
		
		<div class="release-item">
			<h3>Welcome to BlossomOS</h3>
			<p>
				BlossomOS is a beautiful, modern Linux distribution designed for an elegant user experience. 
				This is our first alpha release, and we're excited to share it with you!
			</p>
		</div>

		<div class="release-item">
			<h3>✨ Key Features</h3>
			<ul>
				<li>Modern, clean desktop based on KDE Plasma</li>
				<li>Optimized speed and performance</li>
				<li>Beautiful default theme and icon set</li>
				<li>Enhanced package management</li>
				<li>Built-in development tools</li>
                <li>Comprehensive hardware support</li>
			</ul>
		</div>

		<div class="divider"></div>

		<div class="release-item">
			<h3>🐛 Known Issues</h3>
			<ul>
				<li>The installer and postinstall is still a work in progress</li>
                <li>Reinstalling and keeping files with multiple users is not supported yet</li>
                <li>A lot of features are still not localized</li>
                <li>The design is not final</li>
                <li>Some configurations like NVIDIA cards or booting from MBR are untested</li>
			</ul>
		</div>

		<div class="release-item">
			<h3>🔄 Improvements Coming</h3>
			<ul>
				<li>Enhanced installer with better design and more features</li>
                <li>Ability to choose browser and apps in postinstall</li>
                <li>All new app store with support for pacman packages</li>
				<li>Additional language support</li>
				<li>Performance optimizations</li>
				<li>Extended hardware compatibility</li>
			</ul>
		</div>

        <!--
            <div class="divider"></div>
            <div class="release-item">
                <h3>📝 Installation & Support</h3>
                <p>
                    Please refer to our documentation for installation instructions. 
                    If you encounter any issues, please report them on our community forum.
                </p>
            </div>
        -->

		<div class="back-button">
			<Button href="/">
				<ArrowLeft class="w-4 h-4" />
				Back to Home
			</Button>
		</div>
	</div>
</div>
