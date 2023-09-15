<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function send() {
        dispatch('send');
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // Prevents adding a new line to the textarea
            send();
        }
    }

    export let msg = '';
</script>

<style>
    .input-group {
        display: flex;
        align-items: center; /* This will vertically align the button and the textarea */
        position: fixed;
        bottom: 20px;
        left: 50%;
        width: 650px;
        max-width: 90%;
        transform: translateX(-50%);
        padding: 10px 20px;
        z-index: 1000;
        border-radius: 10px;
    }

    button.variant-filled-primary {
        padding: 10px 10px;
        font-size: 0.7rem;
    }

    textarea {
        flex-grow: 1; /* This lets the textarea grow to occupy available space */
    }

    body {
    padding-bottom: 60px;  /* Keep this if needed */
}


</style>

<div class="input-group input-group-divider rounded-container-token">
    <textarea
        bind:value={msg}
        class="bg-transparent border-0 ring-0"
        name="prompt"
        id="prompt"
        placeholder="Stelle eine Frage..."
        rows="1"
        on:keydown={handleKeydown}
    />
    <button class="variant-filled-primary" on:click={send}>Senden</button>
</div>
