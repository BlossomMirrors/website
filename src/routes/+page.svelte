<script>
	import Button from "$lib/components/ui/button/button.svelte";
	import * as Modal from '$lib/components/ui/modal';
	import { Input } from '$lib/components/ui/input';
	import logo from "$lib/assets/logo.svg";
	import { Share } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import * as m from '$lib/paraglide/messages';
	import Sha256 from "$lib/components/ui/sha256.svelte";

	const downloadLink = "https://blossomos.org/download"; // Placeholder link
	let isMobile = false;

	function shareLink() {
		navigator.share?.({
            title: m.modal_title(),
            text: 'Get BlossomOS from this link:',
            url: downloadLink
        }) || navigator.clipboard.writeText(downloadLink);
	}

	onMount(() => {
		const mediaQuery = window.matchMedia('(max-width: 768px)');
		isMobile = mediaQuery.matches;
		
		const handleChange = (e) => {
			isMobile = e.matches;
		};
		
		mediaQuery.addEventListener('change', handleChange);
		return () => mediaQuery.removeEventListener('change', handleChange);
	});

</script>

<style>
	@keyframes fadeInBlur {
		from {
			opacity: 0;
			filter: blur(10px);
		}
		to {
			opacity: 1;
			filter: blur(0);
		}
	}

	.fade-in {
		animation: fadeInBlur 1.2s ease-out forwards;
		opacity: 0;
	}

	.fade-in-delayed {
		animation: fadeInBlur 1.2s ease-out forwards;
		animation-delay: 0.3s;
		opacity: 0;
	}

	.fade-in-delayed-more {
		animation: fadeInBlur 1.2s ease-out forwards;
		animation-delay: 0.6s;
		opacity: 0;
	}

    .fade-in-delayed-more-more {
        animation: fadeInBlur 1.2s ease-out forwards;
        animation-delay: 0.9s;
        opacity: 0;
    }
</style>

<div class="mx-auto max-w-2xl text-center">
    <div class="mb-8 fade-in">
        <img src={logo} alt="BlossomOS Logo" class="w-32 h-32 mx-auto" />
    </div>
    <h1 class="text-4xl font-bold mb-4 font-serif fade-in-delayed">{m.home_title()}</h1>
    <p class="text-lg text-white/80 mb-6 fade-in-delayed-more">
        {m.home_subtitle()}
    </p>
    <div class="fade-in-delayed-more-more">
        {#if isMobile}
            <Modal.Root>
                <Modal.Trigger>
                    <Button size="3xl">
                        {m.home_download()}
                    </Button>
                </Modal.Trigger>
                <Modal.Content class="px-8">
                    <Modal.Header>
                        <Modal.Title class="text-white font-serif mt-8 text-2xl">{m.modal_title()}</Modal.Title>
                        <Modal.Description>
                            {m.modal_subtitle()}
                        </Modal.Description>
                    </Modal.Header>
                    <div class="flex flex-col gap-4 py-4">
                        <div class="flex gap-2">
                            <Input 
                                value={downloadLink}
                                readonly
                            />
                            <Button 
                                onclick={shareLink}
                            >
                                <Share class="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </Modal.Content>
            </Modal.Root>
        {:else}
            <Button href={downloadLink} size="3xl">
                {m.home_download()}
            </Button>
        {/if}
    </div>
    <div class="text-sm text-white/60 mt-8 fade-in-delayed-more-more">
        <div class="flex justify-center gap-8 items-center">
            <span>{m.home_version()}</span>
            <a href="/release-notes" class="underline hover:text-white/80">{m.home_release_notes()}</a>
        </div>
        <Sha256 />
    </div>
</div>
