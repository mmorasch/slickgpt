<script lang="ts">
	import { onDestroy, onMount, tick } from 'svelte';
	import hljs from 'highlight.js';
	import type { PageData } from './$types';
	import { chatStore, isLoadingAnswerStore } from '$misc/stores';
	import ChatInput from '$lib/ChatInput.svelte';
	import Chat from '$lib/Chat.svelte';
	import { estimateChatCost } from '$misc/openai';
	import type {
		ChatMessage
	} from '$misc/shared';
	import PriceButton from '$lib/PriceButton.svelte';
	import Datapoint from '$lib/Datapoint.svelte';

	export let data: PageData;

	$: ({ slug } = data);
	$: chat = $chatStore[slug];
	$: cost = chat ? estimateChatCost(chat) : null;

	let chatInput: ChatInput;

	onMount(async () => {
		await highlightCode();
	});

	const unsubscribeChatStore = chatStore.subscribe(async () => {
		await highlightCode();
	});

	const unsubscribeisLoadingAnswerStore = isLoadingAnswerStore.subscribe(async () => {
		await highlightCode();
	});

	onDestroy(() => {
		unsubscribeChatStore();
		unsubscribeisLoadingAnswerStore();
	});

	async function highlightCode() {
		await tick();
		hljs.highlightAll();
	}

	function handleEditMessage(event: CustomEvent<ChatMessage>) {
		chatInput.editMessage(event.detail);
	}
</script>

{#if chat}
	<div class="border-2 border-black mt-4 flex items-center mx-auto justify-center">
		<PriceButton>&#60; 600</PriceButton>
		<Datapoint />
		<PriceButton>&#62; 600</PriceButton>
	</div>
	<Chat {slug} on:editMessage={handleEditMessage} />

	<ChatInput {slug} chatCost={cost} bind:this={chatInput} />
{/if}
