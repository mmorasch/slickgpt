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
	import type { IDatapoint } from '$misc/types';
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';

	export let data: PageData;

	$: ({ slug } = data);
	$: chat = $chatStore[slug];

	const lessThan = 'less';
	const greaterThan = 'greater';
	const maxRounds = 5;
	let currentRound = 1;
	let score = 0;
	let predictionPossible: boolean = true;
	let userPrediction: 'less' | 'greater' | null = null;
	let new_msg = '';
	let datapoint_promise: Promise<IDatapoint>;

	function send_handler() {
		if (new_msg === '') return;
		console.log('send_handler');
		chatStore.addMessage(slug, { role: 'user', message: new_msg });
		const response = backend.xai.message
			.post(slug, $chatStore[slug])
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				console.log(res);
				chatStore.addMessage(slug, { role: 'assistant', message: res.messages[0] });
			});

		new_msg = '';
	}

	function prediction_handler(prediction_user: 'less' | 'greater') {
		return async () => {
			if (!predictionPossible) return;
			predictionPossible = false;
			const isPredictionCorrect: boolean = await (async () => {
				const {threshold, prediction} = await datapoint_promise
				return (prediction_user === 'less' && Number(prediction) < Number(threshold)) || (prediction_user === 'greater' && Number(prediction) > Number(threshold))
			})()
			if (isPredictionCorrect) {
				score++;
			}
			const res = await backend.xai.start_prompt.get(slug, prediction_user === 'less' ? '0' : '1');
			const res_p = await res.json();
			console.log(res_p);
			for (let i = 0; i < res_p.messages.length; i++) {
				chatStore.addMessage(slug, res_p.messages[i]);
			}
			userPrediction = prediction_user;
		};
	}

	function clear_chat() {
		chatStore.clear(slug);
	}

	function reset_chat_handler() {
		clear_chat();
		predictionPossible = true;
		userPrediction = null;
	}

	function next_datapoint_handler() {
		if (currentRound == maxRounds) {
			goto('/')
		} else {
			currentRound++;
			reset_chat_handler();
			datapoint_promise = backend.xai.datapoint.get().then((res) => {
				return res.json();
			});
		}
	}

	onMount(async () => {
		datapoint_promise = backend.xai.datapoint.get().then((res) => {
			return res.json();
		});
	});
</script>

{#await datapoint_promise then datapoint}
	<div class="grid grid-cols-4">
		<div class="col-start-1 col-end-4">
			<div class="flex flex-col h-screen justify-between">
				<div class="mt-4 flex items-center mx-auto justify-center">
					<PriceButton text={'< €'} {datapoint} on:click={prediction_handler(lessThan)} />
					<Datapoint source={datapoint} />
					<PriceButton text={`> €`} {datapoint} on:click={prediction_handler(greaterThan)} />
				</div>
				<div class="mb-auto" />
				{#if userPrediction}
					<div
						transition:fade={{ delay: 150, duration: 300 }}
						class="mb-4 scroll-smooth gap-4 overflow-x-auto"
					>
						<MichiChat messages={chat.messages} />
						<MichiChatInput on:send={send_handler} bind:msg={new_msg} />
					</div>
				{/if}
			</div>
		</div>
		<div class="grid grid-cols-2 w-full place-items-center">
			<span class="divider-vertical h-full" />
			<div class="mr-5 flex flex-col h-screen justify-between">
				<div class="mt-8">
					<p class="mt-4">Round: {currentRound} / {maxRounds}</p>
					<ProgressBar label="Progress Bar" value={currentRound} max={maxRounds} />
					<p class="mt-4">Score: {score} / {maxRounds}</p>
					<ProgressBar label="Progress Bar" value={score} max={maxRounds} />
				</div>
				{#if userPrediction}
					<div class="mt-16 mb-auto"><p>expert answer</p></div>
					<div class="mb-8 place-items-center">
						<button
							class="btn btn-xl variant-ghost-primary"
							type="button"
							on:click={reset_chat_handler}>Reset Chat</button
						>
						<button
							class="btn btn-xl variant-ghost-primary"
							type="button"
							on:click={next_datapoint_handler}>Next Datapoint</button
						>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/await}
