<script lang="ts">
    let sha256 = "abc123def456ghi789jkl012mno345pqr678stu901vwx234yz567890ab";
    let isCopied = false;
    
    function copy() {
        navigator.clipboard.writeText(sha256);
        isCopied = true;
        setTimeout(() => {
            isCopied = false;
        }, 1000);
    }
    
    function handleKeyDown(e: KeyboardEvent) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            copy();
        }
    }
</script>

<div class="my-4 text-xs wrap-anywhere">
    sha256: 
	<button
        on:click={copy}
        on:keydown={handleKeyDown}
        id="sha256"
        class="cursor-pointer hover:underline bg-none border-none p-0 font-mono"
        aria-label="Copy SHA256 hash to clipboard"
    >
        {sha256}
    </button>
    <br>
    <span
        id="copied-notification"
        aria-live="polite"
        aria-atomic="true"
        class="transition-opacity text-green-500 {isCopied ? 'opacity-100' : 'opacity-0'}"
    >
        Copied!
    </span>
</div>
