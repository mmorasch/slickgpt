<script lang="ts">
	import type { IDatapoint } from '$misc/types';

  export let text: string = '';
  export let datapoint: IDatapoint = {threshold: "0", expert_opinion: "0", prediction: "0", id: "0"};
</script>

<button type="button" class="btn btn-xl variant-ghost-secondary mx-12" on:click >
  {text} {datapoint.threshold}
</button>
