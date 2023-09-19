<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="mt-4 items-center mx-auto justify-center">
	<h1>Danke für deine Teilnahme!</h1>
	<br />
	<h3>
		Du hast {data.score} Punkte erreicht, während der Experte {data.expert} Punkte erreicht
		hat.
	</h3>
	<br />
	<h3>Bitte sag uns Bescheid, dass du fertig bist.</h3><br>
	<button class="btn btn-xl variant-ghost-primary" type="button" on:click={() => goto('/')}>Zurück zum Start</button>
</div>
