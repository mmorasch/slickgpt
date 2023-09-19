<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import type { IChatMessage } from '$misc/michiStores';
	import MichiMessage from './MichiMessage.svelte';

	export let messages: IChatMessage[] = [];

	let chatMessagesContainer;  // Ref for the chat messages container

	onMount(() => {
		chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
	});

	afterUpdate(() => {
		chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
	});
</script>

<style>
.chat-banner {
    position: relative;
    padding: 10px 30px;
    background-color: #333;
    color: #fff;  /* Font color */
    font-size: 1.2rem;
    text-align: center;
    border-radius: 10px 10px 0 0;  /* Rounded corners at the top */
    margin-bottom: 10px;
    margin-top: 20px;
    margin-right: 20px;
}

.chat-messages {
    padding-top: 50px;
    /* Adjust the max-height to subtract the estimated combined heights of chat input, banner, and other potential elements */
    max-height: calc(100vh - 120px - 60px);  /* for chat input and banner respectively; adjust as needed */
    overflow-y: auto;
    margin-bottom: 80px; /* roughly the height of the chat input + some margin */
    margin-right: 20px;
}
</style>

<div class="chat-banner">KI Unterstützung</div>
<div class="chat-messages" bind:this={chatMessagesContainer}>
    {#each messages as message}
        {#if message.role !== 'system'}
            <MichiMessage {message} />
        {/if}
    {/each}
</div>