<script lang="ts">
	import { Table, tableMapperValues } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	export let source: { [key: string]: string } = {};
	const sourceData: { position: number; attribute: string; value: string }[] = [];
	for (const [key, value] of Object.entries(source)) {
		if (key === 'expert_opinion' || key === 'threshold' || key === 'prediction' || key === 'id')
			continue;
		sourceData.push({ position: sourceData.length + 1, attribute: key, value: value });
	}
	const tableSimple: TableSource = {
		// A list of heading labels.
		head: ['Attribut', 'Wert'],
		// The data visibly shown in your table body UI.
		body: tableMapperValues(sourceData, ['attribute', 'value']),
		// Optional: The data returned when interactive is enabled and a row is clicked.
		meta: tableMapperValues(sourceData, ['position', 'attribute', 'value'])
	};
</script>

<div class="">
	<Table source={tableSimple} />
</div>
