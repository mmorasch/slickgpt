<script lang="ts">
	import type { IChatMessage } from '$misc/michiStores';
	import MichiMessage from './MichiMessage.svelte';

	export let messages: IChatMessage[] = [];
</script>

{#each messages as message}
	<MichiMessage {message} />
{/each}
