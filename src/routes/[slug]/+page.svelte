<script lang="ts">
	import type { PageData } from './$types';
	import { chatStore } from '$misc/michiStores';
	import PriceButton from '$lib/PriceButton.svelte';
	import Datapoint from '$lib/Datapoint.svelte';
	import MichiChat from '$lib/MichiChat.svelte';
	import MichiChatInput from '$lib/MichiChatInput.svelte';
	import { fade } from 'svelte/transition';
	import backend from '$misc/backend';
	import { onMount } from 'svelte';
	import type { IDatapoint, IPrediction } from '$misc/types';

	export let data: PageData;

	$: ({ slug } = data);
	$: chat = $chatStore[slug];

	const lessThan: string = 'less';
	const greaterThan: string = 'greater';
	let userPrediction: string | null = null;
	let x: number = 0;
	let new_msg = '';
	let datapoint_promise: Promise<IDatapoint>;
	let prediction_promise: Promise<IPrediction>;

	function send_handler() {
		if (new_msg === '') return;
		console.log('send_handler');
		chatStore.addMessage(slug, { role: 'user', message: new_msg });
		// const response = backend.xai.message
		// 	.post(slug, $chatStore[slug])
		// 	.then((res) => {
		// 		return res.json();
		// 	})
		// 	.then((res) => {
		// 		console.log(res);
		// 		chatStore.addMessage(slug, { role: 'system', message: res.message });
		// 	});

		new_msg = '';
	}

	onMount(async () => {
		datapoint_promise = backend.xai.datapoint.get().then((res) => {
			return res.json();
		});
		prediction_promise = backend.xai.prediction.get((await datapoint_promise).id).then((res) => {
			return res.json();
		});
	});
</script>

{#await datapoint_promise then datapoint}
	<div class="grid grid-cols-4">
		<div class="col-start-1 col-end-4">
			<div class="flex flex-col h-screen justify-between">
				<div class="border-2 border-black mt-4 flex items-center mx-auto justify-center">
					<PriceButton
						on:click={() => {
							console.log('chat: ', chat);
							console.log('chatStore: ', $chatStore[slug]);
							userPrediction = lessThan;
						}}>&#60; {x}</PriceButton
					>
					<Datapoint />
					<PriceButton
						on:click={() => {
							console.log('chat: ', chat);
							console.log('chatStore: ', $chatStore[slug]);
							userPrediction = greaterThan;
						}}>&#62; {x}</PriceButton
					>
				</div>
				<div class="mb-auto" />
				{#if userPrediction}
					<div transition:fade={{ delay: 150, duration: 300 }} class="mb-4">
						<MichiChat messages={chat.messages} />
						<MichiChatInput on:send={send_handler} bind:msg={new_msg} />
					</div>
				{/if}
			</div>
		</div>
		<div class="grid grid-cols-2 w-full place-items-center">
			<span class="divider-vertical h-full" />
			<div class="mr-5">
				<span>hello</span>
			</div>
		</div>
	</div>
{/await}
