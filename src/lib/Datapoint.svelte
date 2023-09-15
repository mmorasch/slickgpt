<script lang="ts">
	import { Table, tableMapperValues } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	export let source: { [key: string]: string } = {};

    // Define the custom order
	const custom_key_order_de = [
		"Stadt",
		"Zustand",
		"Neubau",
		"Baujahr",
		"Wohnungsart",
		"Wohnraum",
		"Zimmeranzahl",
		"Küche vorhanden",
		"Balkon vorhanden",
		"Heizungsart"
	];

    // Reorder the source dictionary based on the custom order
	let orderedSource = {};
	for (const key of custom_key_order_de) {
		if (source.hasOwnProperty(key)) {
			orderedSource[key] = source[key];
		}
	}

	const sourceData: { position: number; attribute: string; value: string }[] = [];
	for (const [key, value] of Object.entries(orderedSource)) {
		if (key === 'expert_opinion' || key === 'threshold' || key === 'prediction' || key === 'id')
			continue;
		sourceData.push({ position: sourceData.length + 1, attribute: key, value: value });
	}

	const tableSimple: TableSource = {
		head: ['Apartment',""],
		body: tableMapperValues(sourceData, ['attribute', 'value']),
		meta: tableMapperValues(sourceData, ['position', 'attribute', 'value'])
	};
</script>

<div class="">
	<Table source={tableSimple} />
</div>
