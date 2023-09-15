<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<div class="mt-4 items-center mx-auto justify-center">
  <h1>Danke für deine Teilnahme!</h1><br>
  <h3>Du hast einen Score von {data.score} erreicht, während der Makler einen Score von {data.expert} erreicht hat.</h3><br>
  <h3>Bitte sag uns Bescheid, dass du fertig bist.</h3>
</div>